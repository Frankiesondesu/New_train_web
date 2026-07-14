const routes = [
  {
    id: "jinghu",
    name: "京沪高速铁路",
    shortName: "京沪高铁",
    type: "highspeed",
    color: "#c24d33",
    darkColor: "#ef765c",
    distance: 1318,
    duration: "4时18分",
    description: "纵贯华北与江南，在城市天际线与水乡平原之间飞驰。",
    stations: ["beijing", "jinan", "nanjing", "suzhou", "shanghai"],
    trains: [
      { no: "G1", from: "北京南", to: "上海虹桥", depart: "07:00", arrive: "11:32", duration: "4时32分", note: "每日开行 · 商务座 / 一等座 / 二等座" },
      { no: "G5", from: "北京南", to: "上海虹桥", depart: "09:00", arrive: "13:37", duration: "4时37分", note: "每日开行 · 复兴号智能动车组" },
      { no: "G11", from: "北京南", to: "上海虹桥", depart: "12:00", arrive: "16:38", duration: "4时38分", note: "每日开行 · 大站快车" }
    ]
  },
  {
    id: "jingguang",
    name: "京广高速铁路",
    shortName: "京广高铁",
    type: "highspeed",
    color: "#386b8c",
    darkColor: "#73acd0",
    distance: 2298,
    duration: "7时16分",
    description: "从北国古都一路南下，穿越中原、湖湘，抵达岭南。",
    stations: ["beijing", "shijiazhuang", "zhengzhou", "wuhan", "changsha", "guangzhou"],
    trains: [
      { no: "G77", from: "北京西", to: "广州南", depart: "08:00", arrive: "15:39", duration: "7时39分", note: "每日开行 · 复兴号" },
      { no: "G79", from: "北京西", to: "广州南", depart: "10:00", arrive: "17:22", duration: "7时22分", note: "每日开行 · 大站快车" }
    ]
  },
  {
    id: "xicheng",
    name: "西成客运专线",
    shortName: "西成高铁",
    type: "scenic",
    color: "#c98a2e",
    darkColor: "#e2ad5a",
    distance: 658,
    duration: "3时31分",
    description: "穿越秦岭腹地，把关中平原、蜀道山川与成都烟火串成一线。",
    stations: ["xian", "hanzhong", "guangyuan", "chengdu"],
    trains: [
      { no: "D1911", from: "西安北", to: "成都东", depart: "07:05", arrive: "10:42", duration: "3时37分", note: "每日开行 · 沿途山景" },
      { no: "G89", from: "西安北", to: "成都东", depart: "13:12", arrive: "16:38", duration: "3时26分", note: "每日开行 · 复兴号" }
    ]
  },
  {
    id: "huming",
    name: "沪昆高速铁路",
    shortName: "沪昆高铁",
    type: "scenic",
    color: "#6c7d42",
    darkColor: "#a2b96f",
    distance: 2252,
    duration: "10时42分",
    description: "从海派都会向云贵高原延伸，沿途尽览江南、湘西与喀斯特地貌。",
    stations: ["shanghai", "hangzhou", "nanchang", "changsha", "guiyang", "kunming"],
    trains: [
      { no: "G1373", from: "上海虹桥", to: "昆明南", depart: "08:53", arrive: "19:34", duration: "10时41分", note: "每日开行 · 跨越五省" },
      { no: "G1375", from: "上海虹桥", to: "昆明南", depart: "11:11", arrive: "22:01", duration: "10时50分", note: "每日开行 · 沿途风景丰富" }
    ]
  }
];

const stations = {
  beijing: station("北京南站", 39.865, 116.379, "华北枢纽", "连接古都胡同与国家铁路网的起点。", {
    attractions: [place("天坛公园", "皇家坛庙与古柏林", "4.8", "6.2 km", "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=500&q=80"), place("前门大街", "老字号与京味街巷", "4.6", "5.1 km", "https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?auto=format&fit=crop&w=500&q=80")],
    scenery: [place("景山日落", "俯瞰北京中轴线", "推荐", "9.4 km", "https://images.unsplash.com/photo-1584646098378-0874589d76b1?auto=format&fit=crop&w=500&q=80")],
    stays: [place("前门四合院", "胡同里的院落住宿", "¥680起", "5.4 km", "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=500&q=80")]
  }),
  jinan: station("济南西站", 36.668, 116.89, "泉城门户", "从高铁站出发，寻访泉水与老城。"),
  nanjing: station("南京南站", 31.968, 118.792, "江南枢纽", "六朝古都的现代铁路门户。", {
    attractions: [place("中山陵", "梧桐大道与近代建筑", "4.8", "14 km", "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=500&q=80"), place("夫子庙", "秦淮河畔的旧城夜色", "4.7", "8.5 km", "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=500&q=80")]
  }),
  suzhou: station("苏州北站", 31.423, 120.643, "园林之城", "下车便能开启一场园林与水巷之旅。"),
  shanghai: station("上海虹桥站", 31.194, 121.327, "华东枢纽", "铁路、航空与城市交通交汇的超级枢纽。", {
    attractions: [place("外滩", "万国建筑与浦江夜景", "4.9", "19 km", "https://images.unsplash.com/photo-1537531383496-f4749b8032cf?auto=format&fit=crop&w=500&q=80"), place("武康路", "梧桐树下的城市漫步", "4.7", "12 km", "https://images.unsplash.com/photo-1548919973-5cef591cdbc9?auto=format&fit=crop&w=500&q=80")],
    stays: [place("衡山路精品酒店", "安静街区与梧桐景观", "¥720起", "11 km", "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80")]
  }),
  shijiazhuang: station("石家庄站", 38.01, 114.484, "燕赵枢纽", "通往太行山与古城正定的中转站。"),
  zhengzhou: station("郑州东站", 34.755, 113.783, "中原枢纽", "八方铁路在中原腹地交汇。"),
  wuhan: station("武汉站", 30.607, 114.424, "江城门户", "从高铁站去看长江、东湖和百年街区。", {
    attractions: [place("湖北省博物馆", "曾侯乙编钟与楚文化", "4.8", "8.6 km", "https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=500&q=80"), place("黄鹤楼", "登楼远眺长江与三镇", "4.6", "14 km", "https://images.unsplash.com/photo-1598935898639-81586f7d2129?auto=format&fit=crop&w=500&q=80")]
  }),
  changsha: station("长沙南站", 28.147, 113.064, "湖湘门户", "一站抵达山水洲城与热辣烟火。"),
  guangzhou: station("广州南站", 22.99, 113.269, "岭南枢纽", "连接粤港澳大湾区的繁忙门户。"),
  xian: station("西安北站", 34.378, 108.94, "关中枢纽", "从盛唐长安出发，向秦岭与巴蜀前行。", {
    attractions: [place("西安城墙", "骑行在完整古城垣之上", "4.8", "13 km", "https://images.unsplash.com/photo-1591123720164-de1348028a82?auto=format&fit=crop&w=500&q=80"), place("大唐不夜城", "盛唐主题步行街夜游", "4.7", "20 km", "https://images.unsplash.com/photo-1627624676456-63a20c7b12bd?auto=format&fit=crop&w=500&q=80")]
  }),
  hanzhong: station("汉中站", 33.073, 107.034, "秦巴山城", "在秦岭与巴山之间寻找油菜花海和古蜀道。", {
    scenery: [place("汉中油菜花海", "春日金色田野与秦巴远山", "3—4月", "约25 km", "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=500&q=80"), place("黎坪国家森林公园", "红叶、峡谷与高山溪流", "推荐", "约65 km", "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=500&q=80")]
  }),
  guangyuan: station("广元站", 32.44, 105.84, "蜀道门户", "循着剑门蜀道，进入层叠山川。"),
  chengdu: station("成都东站", 30.629, 104.14, "天府枢纽", "抵达成都，从茶馆、美食到雪山脚下。", {
    attractions: [place("成都大熊猫基地", "看大熊猫晨间活动", "4.8", "17 km", "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?auto=format&fit=crop&w=500&q=80"), place("宽窄巷子", "老成都院落与市井生活", "4.5", "12 km", "https://images.unsplash.com/photo-1545893835-abaa50cbe628?auto=format&fit=crop&w=500&q=80")],
    stays: [place("太古里设计酒店", "城市中心的现代川西体验", "¥860起", "8 km", "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=500&q=80")]
  }),
  hangzhou: station("杭州东站", 30.293, 120.212, "钱塘门户", "下车后，在西湖与茶山之间慢下来。"),
  nanchang: station("南昌西站", 28.623, 115.793, "赣鄱枢纽", "沿赣江进入英雄城，也通往庐山与婺源。"),
  guiyang: station("贵阳北站", 26.618, 106.674, "黔中门户", "从城市出发，探访瀑布、苗寨与喀斯特峰林。"),
  kunming: station("昆明南站", 24.88, 102.832, "春城门户", "四季如春的终点，也是通往滇南的起点。", {
    scenery: [place("滇池海埂", "冬日观鸥与西山剪影", "推荐", "31 km", "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=500&q=80"), place("石林风景区", "世界自然遗产喀斯特奇观", "4.7", "64 km", "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=500&q=80")],
    stays: [place("翠湖边精品民宿", "步行探索昆明老街", "¥420起", "29 km", "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=500&q=80")]
  })
};

function station(name, lat, lng, tag, description, content = {}) {
  return {
    name, lat, lng, tag, description,
    attractions: content.attractions || [place("城市漫游", "从车站出发探索当地人文地标", "推荐", "市区", "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=500&q=80")],
    scenery: content.scenery || [place("近郊风景", "适合半日或一日的自然之旅", "推荐", "近郊", "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=500&q=80")],
    stays: content.stays || [place("车站精选住宿", "交通便利，适合铁路旅行者", "¥380起", "3 km内", "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=500&q=80")]
  };
}

function place(name, description, rating, distance, image) {
  return { name, description, rating, distance, image };
}

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

let geoLayer = null;
let tileLoads = 0;
let tileErrors = 0;
let tileHealthTimer = null;

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
    map.getContainer().classList.toggle("map-tiles-degraded", degraded);
    geoLayer?.setStyle(geometryStyle);
  }, 450);
}

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

fetch("https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json")
  .then(response => {
    if (!response.ok) throw new Error("行政区划数据加载失败");
    return response.json();
  })
  .then(geojson => {
    geoLayer = L.geoJSON(geojson, {
      pane: "geoPane",
      interactive: false,
      style: geometryStyle
    }).addTo(map);
  })
  .catch(() => {
    document.getElementById("map").classList.add("map-geometry-unavailable");
  });

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
        <div class="stat"><b>${routes.reduce((sum, route) => sum + route.trains.length, 0)}</b><span>示例车次</span></div>
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
      <div class="hint-box">${icon("pointer")}<span>地图上的彩色线条代表铁路线路，圆点代表主要车站。选择任意节点开始探索。</span></div>
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
      <div class="hint-box">${icon("info")}<span>车次与时刻为产品演示数据。实际出行前，请以铁路官方售票平台为准。</span></div>
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
