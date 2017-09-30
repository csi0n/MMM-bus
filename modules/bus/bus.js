/**
 * @desc 公交车
 */
Module.register("bus",{
	defaults:{
		apiBase:"http://xxbs.sh.gov.cn:8080/weixinpage/HandlerBus.ashx",
		action:"Three",
		direction:1,
		lineid:"073500",
		name:"735",
		stopid:4,
		refreshInterval:1000*3,
		currentBusInfo:{}
	},
	getScripts:function(){
		return ["moment.js"];
	},
	getStyles:function(){
		return ["bus.css","font-awesome.css"];
	},

	start:function(){
		this.sendSocketNotification("CONFIG",this.config);
	},
	socketNotificationReceived:function(notification, payload){
		if (notification === "STARTED") {
			this.updateDom();
		}
		else if (notification === "DATA") {
			this.loaded = true;
			this.processBusInfo(JSON.parse(payload));
			this.updateDom();
		}
	},
	processBusInfo:function (busInfo) {
		this.config.currentBusInfo=busInfo;
	},
	getDom:function(){
		var busInfo=this.config.currentBusInfo;

		var wrapper=document.createElement("div");
		wrapper.className="module-content";

		if (!busInfo||!busInfo.cars||!busInfo.cars[0]) {
			var noCarDiv=document.createElement("div");
			noCarDiv.innerHTML="暂时还没车";
			noCarDiv.className="bus_no_car";
			return wrapper;
		}

		var distanceDiv = document.createElement("div");
		distanceDiv.innerHTML="距离:"+busInfo.cars[0]["distance"]+" m";
		distanceDiv.className="bus_distance";


		var terminalDiv = document.createElement("div");
		terminalDiv.innerHTML="车牌:"+busInfo.cars[0]["terminal"];
		terminalDiv.className="bus_terminal";


		var timeDiv = document.createElement("div");
		timeDiv.innerHTML="距离到站还剩:"+parseInt(busInfo.cars[0]["time"]/60)+":"+busInfo.cars[0]["time"]%60;
		timeDiv.className="bus_time";

		wrapper.appendChild(distanceDiv);
		wrapper.appendChild(terminalDiv);
		wrapper.appendChild(timeDiv);
		return wrapper;
	}
});