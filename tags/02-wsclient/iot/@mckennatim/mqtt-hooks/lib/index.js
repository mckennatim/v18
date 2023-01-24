"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Context", {
  enumerable: true,
  get: function get() {
    return _context.Context;
  }
});
Object.defineProperty(exports, "connect", {
  enumerable: true,
  get: function get() {
    return _mq.connect;
  }
});
Object.defineProperty(exports, "monitorFocus", {
  enumerable: true,
  get: function get() {
    return _mq.monitorFocus;
  }
});
Object.defineProperty(exports, "subscribe", {
  enumerable: true,
  get: function get() {
    return _mq.subscribe;
  }
});
Object.defineProperty(exports, "req", {
  enumerable: true,
  get: function get() {
    return _mq.req;
  }
});
Object.defineProperty(exports, "setupSocket", {
  enumerable: true,
  get: function get() {
    return _mq.setupSocket;
  }
});
Object.defineProperty(exports, "startWhen", {
  enumerable: true,
  get: function get() {
    return _utility.startWhen;
  }
});
Object.defineProperty(exports, "endWhen", {
  enumerable: true,
  get: function get() {
    return _utility.endWhen;
  }
});
Object.defineProperty(exports, "newInterval", {
  enumerable: true,
  get: function get() {
    return _utility.newInterval;
  }
});
Object.defineProperty(exports, "add2sched", {
  enumerable: true,
  get: function get() {
    return _utility.add2sched;
  }
});
Object.defineProperty(exports, "m2hm", {
  enumerable: true,
  get: function get() {
    return _utility.m2hm;
  }
});
Object.defineProperty(exports, "m2ms", {
  enumerable: true,
  get: function get() {
    return _utility.m2ms;
  }
});
Object.defineProperty(exports, "getNow", {
  enumerable: true,
  get: function get() {
    return _utility.getNow;
  }
});
Object.defineProperty(exports, "setRelayStatus", {
  enumerable: true,
  get: function get() {
    return _utility.setRelayStatus;
  }
});
Object.defineProperty(exports, "whereInSched", {
  enumerable: true,
  get: function get() {
    return _utility.whereInSched;
  }
});
Object.defineProperty(exports, "hma2time", {
  enumerable: true,
  get: function get() {
    return _utility.hma2time;
  }
});
Object.defineProperty(exports, "fetchWeekSched", {
  enumerable: true,
  get: function get() {
    return _fetches.fetchWeekSched;
  }
});
Object.defineProperty(exports, "replaceWeekSched", {
  enumerable: true,
  get: function get() {
    return _fetches.replaceWeekSched;
  }
});
Object.defineProperty(exports, "replaceZoneScheds", {
  enumerable: true,
  get: function get() {
    return _fetches.replaceZoneScheds;
  }
});
Object.defineProperty(exports, "replaceHold", {
  enumerable: true,
  get: function get() {
    return _fetches.replaceHold;
  }
});
Object.defineProperty(exports, "fetchSched", {
  enumerable: true,
  get: function get() {
    return _fetches.fetchSched;
  }
});
Object.defineProperty(exports, "deleteHolds", {
  enumerable: true,
  get: function get() {
    return _fetches.deleteHolds;
  }
});
Object.defineProperty(exports, "fetchBigData", {
  enumerable: true,
  get: function get() {
    return _fetches.fetchBigData;
  }
});
exports.getDinfo = exports.getZinfo = exports.useDevSpecs = exports.processMessage = exports.ClientSocket = void 0;

var _provider = _interopRequireDefault(require("./provider"));

var _processMessage = require("./processMessage");

var _useDevSpecs = require("./useDevSpecs");

var _context = require("./context");

var _mq = require("./mq");

var _utility = require("./utility");

var _fetches = require("./fetches");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getZinfo = function getZinfo(label, zones) {
  return zones.find(function (zone) {
    return zone.id == label;
  });
};

exports.getZinfo = getZinfo;

var getDinfo = function getDinfo(label, devs) {
  var found = {};
  Object.keys(devs).map(function (dev) {
    devs[dev].map(function (a) {
      if (a.label == label) {
        found.dev = dev;
        found.sr = a.sr;
        found.label = a.label;
        return found;
      }
    });
  });
  return found;
};

exports.getDinfo = getDinfo;
var ClientSocket = _provider["default"];
exports.ClientSocket = ClientSocket;
var processMessage = _processMessage.processMessage;
exports.processMessage = processMessage;
var useDevSpecs = _useDevSpecs.useDevSpecs;
exports.useDevSpecs = useDevSpecs;