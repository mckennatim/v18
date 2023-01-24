"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processMessage = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var messageReducer = function messageReducer(state, action) {
  var keys = Object.keys(state);
  var newstate = keys.reduce(function (newdata, label) {
    if (action.type == label) {
      var tmp = {};
      tmp[label] = _objectSpread({}, newdata[label]); //

      Object.keys(state[label]).map(function (d) {
        if (typeof action.payload[d] !== 'undefined') {
          tmp[label][d] = action.payload[d];
        }
      });
      newdata[label] = tmp[label];
    }

    return newdata;
  }, _objectSpread({}, state));
  return newstate;
};

var extractLabelArray = function extractLabelArray(message, devs) {
  //app could have may devs each with its own srs
  var dev = Object.keys(devs).find(function (key) {
    return key === message.dev;
  }); //messages all have dev/topic

  var srlabelarr = []; //[{sr:2, labe:'bridge}, {sr:4, label:'pond}]

  if (message.topic == 'srstate') {
    srlabelarr = devs[dev].filter(function (a) {
      return a.sr === message.payload.id;
    });
  }

  if (message.topic == 'timr') {
    if (message.payload.tIMElEFT.reduce(function (a, v) {
      return a + v;
    }) == 0) {
      srlabelarr = devs[dev]; //if /timr comes in as [0,0,0,0,0]then send it to all
    } else {
      srlabelarr = devs[dev].filter(function (a) {
        return message.payload.tIMElEFT[a.sr] > 0;
      });
    }
  }

  if (message.topic == 'sched') {
    srlabelarr = devs[dev].filter(function (a) {
      return a.sr === message.payload.id;
    });
  }

  return srlabelarr;
};

var processRawMessage = function processRawMessage(mess) {
  var narr = mess.destinationName.split('/');
  var dev = narr[0];
  var topic = narr[1];
  var pls = mess.payloadString;
  var payload = JSON.parse(pls); // console.log('payload: ',dev, topic, JSON.stringify(payload))

  var message = {
    dev: dev,
    topic: topic,
    payload: payload
  };
  return message;
};

var processMessage = function processMessage(mess, devs, bigstate) {
  var message = processRawMessage(mess);
  var newstates = [];
  var devinfArr = extractLabelArray(message, devs);
  devinfArr.map(function (devinf) {
    var action = {};
    action.payload = {};

    if (message.topic == 'srstate') {
      if (devinf && devinf.label) {
        action.type = devinf.label;
        action.payload.darr = message.payload.darr;

        if (message.payload.darr[0] == 0) {
          action.payload.timeleft = 0;
        }
      }
    }

    if (message.topic == 'timr') {
      if (devinf && devinf.label) {
        action.type = devinf.label;
        action.payload.timeleft = message.payload.tIMElEFT[devinf.sr];
      }
    }

    if (message.topic == 'sched') {
      if (devinf && devinf.label) {
        action.type = devinf.label;
        action.payload.pro = message.payload.pro;
      }
    }

    if (message.topic == 'devtime') {
      action.type = 'time';
      action.payload = message.payload;
    } // console.log('action: ', JSON.stringify(action))


    if (Object.entries(action.payload).length != 0) {
      var prt = {};
      prt[action.type] = _objectSpread({}, bigstate[action.type]);
      var newstate = messageReducer(prt, action);
      newstates.push(newstate);
    }
  });

  if (message.topic == 'devtime') {
    newstates[0] = {
      jdtime: message.payload
    };
  }

  if (message.topic == 'jdtime') {
    newstates[0] = {
      jdtime: message.payload
    };
  }

  return newstates;
};

exports.processMessage = processMessage;