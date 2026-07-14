let routes = [];
let stations = {};
let dataSource = {};

loadRailwayData();

async function loadRailwayData() {
  try {
    const response = await fetch("data/railway-data.json");
    if (!response.ok) throw new Error(`铁路数据加载失败：${response.status}`);
    initApp(await response.json());
  } catch (error) {
    const panelContent = document.getElementById("panel-content");
    if (panelContent) {
      panelContent.innerHTML = `
        <div class="panel-inner">
          <p class="eyebrow">DATA UNAVAILABLE</p>
          <div class="panel-title-row">
            <span class="panel-icon">!</span>
            <div><h1>铁路数据暂时不可用</h1><p>${error.message}</p></div>
          </div>
        </div>`;
    }
    console.error(error);
  }
}

function initApp(data) {
  routes = data.routes || [];
  stations = data.stations || {};
  dataSource = data.source || {};

function routeDisplayColor(route) {
  return document.documentElement.dataset.theme === "dark" ? route.darkColor : route.color;
}

const map = L.map("map", { zoomControl: false, minZoom: 4, maxZoom: 12 }).setView([32.2, 108.4], 5);
L.control.zoom({ position: "bottomright", zoomInTitle: "放大", zoomOutTitle: "缩小" }).addTo(map);
map.createPane("geoPane");
map.getPane("geoPane").style.zIndex = 350;
map.getPane("geoPane").style.pointerEvents = "none";
const tileLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  maxZoom: 19,
  crossOrigin: true
}).addTo(map);

const mapStatus = document.getElementById("map-status");
const mapStatusTitle = document.getElementById("map-status-title");
const mapStatusMessage = document.getElementById("map-status-message");
const mapRetryButton = document.getElementById("map-retry-button");
let geoLayer = null;
let tileLoads = 0;
let tileErrors = 0;
let tileHealthTimer = null;
let tilesDegraded = false;
let geometryUnavailable = false;

tileLayer.on("loading", () => {
  tileLoads = 0;
  tileErrors = 0;
  clearTimeout(tileHealthTimer);
});
tileLayer.on("tileload", () => {
  tileLoads += 1;
  scheduleTileHealthCheck();
});
tileLayer.on("tileerror", () => {
  tileErrors += 1;
  scheduleTileHealthCheck();
});

function scheduleTileHealthCheck() {
  clearTimeout(tileHealthTimer);
  tileHealthTimer = setTimeout(() => {
    const total = tileLoads + tileErrors;
    const degraded = total >= 6 && tileErrors / total > .35;
    tilesDegraded = degraded;
    map.getContainer().classList.toggle("map-tiles-degraded", tilesDegraded);
    geoLayer?.setStyle(geometryStyle);
    updateMapStatus();
  }, 450);
}

function updateMapStatus() {
  if (tilesDegraded) {
    mapStatusTitle.textContent = "底图加载不稳定";
    mapStatusMessage.textContent = "在线地图瓦片加载失败较多，已自动切换到行政区划底图。线路、车站和搜索仍可正常使用。";
    mapStatus.hidden = false;
    return;
  }
  if (geometryUnavailable) {
    mapStatusTitle.textContent = "行政区划底图加载失败";
    mapStatusMessage.textContent = "备用地图轮廓暂时不可用，但线路、车站和车次信息仍可正常查看。";
    mapStatus.hidden = false;
    return;
  }
  mapStatus.hidden = true;
}

mapRetryButton.addEventListener("click", () => {
  tileLoads = 0;
  tileErrors = 0;
  tilesDegraded = false;
  map.getContainer().classList.remove("map-tiles-degraded");
  tileLayer.redraw();
  loadGeometry();
  updateMapStatus();
  requestAnimationFrame(() => map.invalidateSize({ pan: false }));
});

function cssToken(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function geometryStyle() {
  return {
    color: cssToken("--geo-line"),
    weight: 0.8,
    opacity: 0.78,
    fillColor: cssToken("--geo-fill"),
    fillOpacity: map.getContainer().classList.contains("map-tiles-degraded") ? 0.78 : 0.34
  };
}

function loadGeometry() {
  fetch("https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json")
    .then(response => {
      if (!response.ok) throw new Error("行政区划数据加载失败");
      return response.json();
    })
    .then(geojson => {
      geometryUnavailable = false;
      map.getContainer().classList.remove("map-geometry-unavailable");
      if (geoLayer) geoLayer.remove();
      geoLayer = L.geoJSON(geojson, {
        pane: "geoPane",
        interactive: false,
        style: geometryStyle
      }).addTo(map);
      updateMapStatus();
    })
    .catch(() => {
      geometryUnavailable = true;
      map.getContainer().classList.add("map-geometry-unavailable");
      updateMapStatus();
    });
}

loadGeometry();

const routeLayers = new Map();
const stationMarkers = new Map();
let activeRouteId = null;
let activeStationId = null;
let activeFilter = "all";

routes.forEach(route => {
  const coordinates = route.stations.map(id => [stations[id].lat, stations[id].lng]);
  const casing = L.polyline(coordinates, { color: cssToken("--route-casing"), weight: 8, opacity: .92, lineCap: "round", lineJoin: "round", interactive: false }).addTo(map);
  const line = L.polyline(coordinates, { color: routeDisplayColor(route), weight: 4, opacity: .9, lineCap: "round", lineJoin: "round" }).addTo(map);
  line.bindTooltip(route.shortName, { sticky: true, className: "route-label", direction: "top" });
  line.on("click", () => selectRoute(route.id));
  line.on("mouseover", () => line.setStyle({ weight: 7, opacity: 1 }));
  line.on("mouseout", () => line.setStyle({ weight: activeRouteId === route.id ? 6 : 4, opacity: activeRouteId && activeRouteId !== route.id ? .28 : .9 }));
  routeLayers.set(route.id, { line, casing, route });
});

Object.entries(stations).forEach(([id, item]) => {
  const icon = L.divIcon({ className: "rail-station-icon", html: `<span class="station-marker" data-station-marker="${id}"></span>`, iconSize: [20, 20], iconAnchor: [10, 10] });
  const marker = L.marker([item.lat, item.lng], { icon, title: item.name }).addTo(map);
  marker.bindTooltip(item.name.replace("站", ""), { permanent: map.getZoom() >= 6, direction: "top", offset: [0, -10], className: "station-tooltip" });
  marker.on("click", () => selectStation(id));
  stationMarkers.set(id, marker);
});

map.on("zoomend", () => {
  const permanent = map.getZoom() >= 6;
  stationMarkers.forEach((marker, id) => {
    marker.unbindTooltip();
    marker.bindTooltip(stations[id].name.replace("站", ""), { permanent, direction: "top", offset: [0, -10], className: "station-tooltip" });
  });
});

function resetLayerStyles() {
  routeLayers.forEach(({ line, casing, route }, id) => {
    const visible = activeFilter === "all" || route.type === activeFilter;
    const selected = id === activeRouteId;
    line.setStyle({ opacity: visible ? (activeRouteId && !selected ? .2 : .9) : 0, weight: selected ? 6 : 4 });
    casing.setStyle({ opacity: visible ? (activeRouteId && !selected ? .08 : .92) : 0 });
  });
  document.querySelectorAll(".station-marker").forEach(el => el.classList.toggle("active", el.dataset.stationMarker === activeStationId));
}

function selectRoute(id, shouldFit = true) {
  const route = routes.find(item => item.id === id);
  if (!route) return;
  activeRouteId = id;
  activeStationId = null;
  renderRoute(route);
  resetLayerStyles();
  if (shouldFit) map.fitBounds(routeLayers.get(id).line.getBounds(), { padding: [55, 55], maxZoom: 6 });
  updateMobileTitle(route.shortName);
  openMobilePanel();
}

function selectStation(id, shouldPan = true) {
  const item = stations[id];
  if (!item) return;
  activeStationId = id;
  activeRouteId = null;
  renderStation(id, "attractions");
  resetLayerStyles();
  if (shouldPan) map.flyTo([item.lat, item.lng], Math.max(map.getZoom(), 7), { duration: .65 });
  updateMobileTitle(item.name);
  openMobilePanel();
}

function renderWelcome() {
  document.getElementById("panel-content").innerHTML = `
    <div class="panel-inner">
      <p class="eyebrow">EXPLORE BY RAIL</p>
      <div class="panel-title-row">
        <span class="panel-icon">${icon("compass")}</span>
        <div><h1>发现铁路旅行</h1><p>点击地图上的线路或车站，探索车次与沿途旅行灵感。</p></div>
      </div>
      <div class="stat-row">
        <div class="stat"><b>${routes.length}</b><span>精选线路</span></div>
        <div class="stat"><b>${Object.keys(stations).length}</b><span>沿途车站</span></div>
        <div class="stat"><b>${routes.reduce((sum, route) => sum + route.trains.length, 0)}</b><span>真实车次</span></div>
      </div>
      <div class="panel-divider"></div>
      <div class="section-heading"><h2>精选铁路线路</h2><span>点击查看车次</span></div>
      <div class="route-list">
        ${routes.map(route => `
          <button class="route-card" type="button" data-route="${route.id}">
            <span class="route-color" style="background:${routeDisplayColor(route)}"></span>
            <span><b>${route.shortName}</b><small>${route.distance.toLocaleString()} 公里 · ${route.duration}</small></span>
            <span class="route-arrow">›</span>
          </button>`).join("")}
      </div>
      <div class="hint-box">${icon("pointer")}<span>地图上的彩色线条代表铁路线路，圆点代表主要车站。车次时刻取自 ${dataSource.provider} ${dataSource.scheduleDate} 查询结果。</span></div>
    </div>`;
  bindPanelEvents();
}

function renderRoute(route) {
  document.getElementById("panel-content").innerHTML = `
    <div class="panel-inner">
      <button class="back-button" type="button" data-back>${icon("arrow-left")} 返回线路列表</button>
      <p class="eyebrow">RAILWAY LINE</p>
      <div class="panel-title-row">
        <span class="panel-icon">${icon("train")}</span>
        <div><h1>${route.shortName}</h1><p>${route.description}</p></div>
      </div>
      <div class="route-heading-line" style="background:${routeDisplayColor(route)}"></div>
      <div class="stat-row">
        <div class="stat"><b>${route.distance.toLocaleString()}</b><span>线路公里</span></div>
        <div class="stat"><b>${route.stations.length}</b><span>精选车站</span></div>
        <div class="stat"><b>${route.duration}</b><span>最快用时</span></div>
      </div>
      <div class="station-strip" aria-label="线路车站">
        ${route.stations.map(id => `<button class="station-stop" type="button" data-station="${id}" style="color:${routeDisplayColor(route)}"><i></i><span>${stations[id].name.replace("站", "")}</span></button>`).join("")}
      </div>
      <div class="panel-divider"></div>
      <div class="section-heading"><h2>代表车次</h2><span>${route.trains.length} 趟</span></div>
      <div class="train-list">${route.trains.map(trainCard).join("")}</div>
      <div class="hint-box">${icon("info")}<span>车次与时刻取自 ${dataSource.provider} ${dataSource.scheduleDate} 查询结果。实际出行前，请以铁路官方售票平台为准。</span></div>
    </div>`;
  bindPanelEvents();
}

function renderStation(id, tab) {
  const item = stations[id];
  const passingRoutes = routes.filter(route => route.stations.includes(id));
  const passingTrains = passingRoutes.flatMap(route => route.trains).slice(0, 3);
  document.getElementById("panel-content").innerHTML = `
    <div class="panel-inner">
      <button class="back-button" type="button" data-back>${icon("arrow-left")} 返回线路列表</button>
      <p class="eyebrow">RAILWAY STATION</p>
      <div class="panel-title-row">
        <span class="panel-icon">${icon("station")}</span>
        <div><h1>${item.name}</h1><p>${item.description}</p></div>
      </div>
      <div class="station-lines">
        ${passingRoutes.map(route => `<button type="button" class="line-pill" data-route="${route.id}"><i style="background:${routeDisplayColor(route)}"></i>${route.shortName}</button>`).join("")}
      </div>
      <div class="panel-divider"></div>
      <div class="section-heading"><h2>停靠车次</h2><span>部分车次</span></div>
      <div class="train-list">${passingTrains.length ? passingTrains.map(trainCard).join("") : '<p class="search-empty">暂无车次数据</p>'}</div>
      <div class="panel-divider"></div>
      <div class="section-heading"><h2>车站周边</h2><span>${item.tag}</span></div>
      <div class="tabs" role="tablist" aria-label="周边信息分类">
        <button class="tab ${tab === "attractions" ? "active" : ""}" type="button" role="tab" aria-selected="${tab === "attractions"}" data-tab="attractions">景点</button>
        <button class="tab ${tab === "scenery" ? "active" : ""}" type="button" role="tab" aria-selected="${tab === "scenery"}" data-tab="scenery">风景</button>
        <button class="tab ${tab === "stays" ? "active" : ""}" type="button" role="tab" aria-selected="${tab === "stays"}" data-tab="stays">住宿</button>
      </div>
      <div class="place-list">${item[tab].map(placeCard).join("")}</div>
    </div>`;
  bindPanelEvents();
}

function trainCard(train) {
  return `<article class="train-card">
    <div class="train-top"><span class="train-number">${train.no}</span><span class="train-tag">${train.duration}</span></div>
    <div class="train-path">
      <div><time>${train.depart}</time><small>${train.from}</small></div>
      <span class="path-rule"></span>
      <div><time>${train.arrive}</time><small>${train.to}</small></div>
    </div>
    <div class="train-meta">${train.note}</div>
  </article>`;
}

function placeCard(item) {
  return `<article class="place-card">
    <div class="place-image" style="background-image:linear-gradient(135deg,rgba(31,91,69,.08),rgba(20,35,28,.08)),url('${item.image}')"></div>
    <div class="place-info"><b>${item.name}</b><p>${item.description}</p><div class="place-meta"><span>${item.rating}</span><span>${item.distance}</span></div></div>
  </article>`;
}

function icon(name) {
  const paths = {
    compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5 5-2Z"/>',
    pointer: '<path d="m4 4 7.7 16 2.1-6.2L20 11.7 4 4Z"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/>',
    train: '<rect x="5" y="3" width="14" height="15" rx="3"/><path d="M5 12h14M9 21l3-3 3 3M9 8h.01M15 8h.01"/>',
    station: '<path d="M5 21V6l7-3 7 3v15M3 21h18M9 9h6v5H9zM9 21v-4h6v4"/>',
    "arrow-left": '<path d="m15 18-6-6 6-6"/>'
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[name] || ""}</svg>`;
}

function bindPanelEvents() {
  document.querySelectorAll("[data-route]").forEach(button => button.addEventListener("click", () => selectRoute(button.dataset.route)));
  document.querySelectorAll("[data-station]").forEach(button => button.addEventListener("click", () => selectStation(button.dataset.station)));
  document.querySelectorAll("[data-tab]").forEach(button => button.addEventListener("click", () => renderStation(activeStationId, button.dataset.tab)));
  document.querySelector("[data-back]")?.addEventListener("click", () => {
    activeRouteId = null;
    activeStationId = null;
    resetLayerStyles();
    renderWelcome();
    map.flyTo([32.2, 108.4], 5, { duration: .6 });
    updateMobileTitle("发现铁路旅行");
  });
}

document.querySelectorAll(".filter-chip").forEach(button => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    document.querySelectorAll(".filter-chip").forEach(item => item.classList.toggle("active", item === button));
    activeRouteId = null;
    resetLayerStyles();
    const visibleBounds = L.latLngBounds([]);
    routeLayers.forEach(({ route, line }) => {
      if (activeFilter === "all" || route.type === activeFilter) visibleBounds.extend(line.getBounds());
    });
    if (visibleBounds.isValid()) map.fitBounds(visibleBounds, { padding: [45, 45], maxZoom: 5 });
  });
});

const searchInput = document.getElementById("search-input");
const searchResults = document.getElementById("search-results");
searchInput.addEventListener("input", () => renderSearch(searchInput.value));
searchInput.addEventListener("focus", () => { if (searchInput.value.trim()) renderSearch(searchInput.value); });
document.getElementById("search-form").addEventListener("submit", event => {
  event.preventDefault();
  searchResults.querySelector(".search-result")?.click();
});

document.addEventListener("keydown", event => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    searchInput.focus();
  }
  if (event.key === "Escape") {
    searchResults.hidden = true;
    searchInput.blur();
  }
});

document.addEventListener("click", event => {
  if (!event.target.closest(".global-search")) searchResults.hidden = true;
});

function renderSearch(query) {
  const keyword = query.trim().toLowerCase();
  if (!keyword) { searchResults.hidden = true; return; }
  const results = [];
  Object.entries(stations).forEach(([id, item]) => {
    if (item.name.toLowerCase().includes(keyword)) results.push({ id, name: item.name, type: "车站", kind: "station" });
  });
  routes.forEach(route => {
    if (`${route.name}${route.shortName}`.toLowerCase().includes(keyword)) results.push({ id: route.id, name: route.shortName, type: "线路", kind: "route" });
    route.trains.forEach(train => {
      if (train.no.toLowerCase().includes(keyword)) results.push({ id: route.id, name: `${train.no} · ${train.from}—${train.to}`, type: "车次", kind: "route" });
    });
  });
  searchResults.innerHTML = results.length
    ? results.slice(0, 7).map(result => `<button class="search-result" type="button" data-search-kind="${result.kind}" data-search-id="${result.id}"><span>${result.name}</span><span class="result-type">${result.type}</span></button>`).join("")
    : '<p class="search-empty">没有找到相关结果</p>';
  searchResults.hidden = false;
  searchResults.querySelectorAll(".search-result").forEach(button => button.addEventListener("click", () => {
    button.dataset.searchKind === "station" ? selectStation(button.dataset.searchId) : selectRoute(button.dataset.searchId);
    searchResults.hidden = true;
    searchInput.value = "";
  }));
}

const panel = document.getElementById("detail-panel");
const panelHandle = document.getElementById("mobile-panel-handle");
panelHandle.addEventListener("click", () => panel.classList.toggle("open"));
function openMobilePanel() { if (window.matchMedia("(max-width: 760px)").matches) panel.classList.add("open"); }
function updateMobileTitle(title) { document.getElementById("mobile-panel-title").textContent = title; }

const themeToggle = document.getElementById("theme-toggle");
const themeColor = document.getElementById("theme-color");

function applyTheme(theme, persist = true) {
  const dark = theme === "dark";
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  themeToggle.setAttribute("aria-pressed", String(dark));
  themeToggle.setAttribute("aria-label", dark ? "切换到亮色模式" : "切换到暗色模式");
  themeColor.setAttribute("content", dark ? "#151d19" : "#fffefa");
  if (persist) {
    try { localStorage.setItem("tugui-theme", dark ? "dark" : "light"); } catch { /* 存储不可用时仍保留当前主题 */ }
  }
  geoLayer?.setStyle(geometryStyle);
  routeLayers.forEach(({ line, casing, route }) => {
    line.setStyle({ color: routeDisplayColor(route) });
    casing.setStyle({ color: cssToken("--route-casing") });
  });
  const panelContent = document.getElementById("panel-content");
  if (panelContent.hasChildNodes()) {
    const activeTab = document.querySelector(".tab.active")?.dataset.tab || "attractions";
    if (activeStationId) renderStation(activeStationId, activeTab);
    else if (activeRouteId) renderRoute(routes.find(route => route.id === activeRouteId));
    else renderWelcome();
  }
  requestAnimationFrame(() => map.invalidateSize({ pan: false }));
}

themeToggle.addEventListener("click", () => {
  applyTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
});

const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
systemTheme.addEventListener?.("change", event => {
  let hasSavedTheme = false;
  try { hasSavedTheme = Boolean(localStorage.getItem("tugui-theme")); } catch { /* 使用系统主题 */ }
  if (!hasSavedTheme) applyTheme(event.matches ? "dark" : "light", false);
});

const resizeMap = () => requestAnimationFrame(() => map.invalidateSize({ pan: false }));
if ("ResizeObserver" in window) new ResizeObserver(resizeMap).observe(document.querySelector(".map-shell"));
window.addEventListener("resize", resizeMap, { passive: true });
window.addEventListener("load", resizeMap, { once: true });

applyTheme(document.documentElement.dataset.theme || "light", false);

renderWelcome();

}


