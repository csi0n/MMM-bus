"use strict";

/* Magic Mirror
 * Module: MMM-RNV
 *
 * By Stefan Krause http://yawns.de
 * MIT Licensed.
 */

const NodeHelper = require("node_helper");
var request = require("request");
var moment = require("moment");

module.exports = NodeHelper.create({

	start: function() {
		this.started = false;
		this.config = null;
	},
	getParams:function () {
		var params="?action="+this.config.action;
		params+="&direction="+this.config.direction;
		params+="&lineid="+this.config.lineid;
		params+="&name="+this.config.name;
		params+="&stopid="+this.config.stopid;
		return params;
	},

	getData: function() {
		var self = this;
		var myUrl = this.config.apiBase + this.getParams();
		request({
			url: myUrl,
			method: "GET"
		}, function (error, response, body) {
            self.sendSocketNotification("DATA", body);
			// if (!error && response.statusCode === 200) {
			//
			// }else {
			// 	self.sendSocketNotification("DATA",body)
			// }
		});

		setTimeout(function() { self.getData(); }, this.config.refreshInterval);
	},

	socketNotificationReceived: function(notification, payload) {
		var self = this;
		if (notification === "CONFIG" && self.started == false) {
			self.config = payload;
			self.sendSocketNotification("STARTED", true);
			self.getData();
			self.started = true;
		}
	}
});