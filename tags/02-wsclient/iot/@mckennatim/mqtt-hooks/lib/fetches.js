"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchBigData = exports.deleteHolds = exports.replaceHold = exports.fetchSched = exports.replaceZoneScheds = exports.replaceWeekSched = exports.fetchWeekSched = void 0;

var fetchWeekSched = function fetchWeekSched(ls, cfg, devid, senrel) {
  var lsh = ls.getItem();

  if (lsh) {
    var url = cfg.url.api + '/admin/u/scheds/' + devid + '/' + senrel;
    var options = {
      headers: {
        'Authorization': 'Bearer ' + lsh['token']
      },
      method: 'GET'
    };
    return fetch(url, options).then(function (response) {
      return response.json();
    });
  } else {
    var p2 = Promise.resolve({
      qmessage: 'you dont exist! '
    });
    return p2;
  }
};

exports.fetchWeekSched = fetchWeekSched;

var replaceWeekSched = function replaceWeekSched(ls, cfg, keyvals) {
  console.log('in rplace');
  var lsh = ls.getItem();
  console.log('keyvals: ', keyvals);

  if (lsh) {
    var url = cfg.url.api + '/admin/u/scheds';
    var options = {
      headers: {
        'Authorization': 'Bearer ' + lsh['token'],
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(keyvals)
    };
    return fetch(url, options).then(function (response) {
      return response.json();
    });
  } else {
    var p2 = Promise.resolve({
      qmessage: 'you dont exist! '
    });
    return p2;
  }
};

exports.replaceWeekSched = replaceWeekSched;

var replaceZoneScheds = function replaceZoneScheds(ls, cfg, keyvals) {
  console.log('in rplace');
  var lsh = ls.getItem();
  console.log('keyvals: ', keyvals);

  if (lsh) {
    var url = cfg.url.api + '/admin/u/zonescheds';
    var options = {
      headers: {
        'Authorization': 'Bearer ' + lsh['token'],
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(keyvals)
    };
    return fetch(url, options).then(function (response) {
      return response.json();
    });
  } else {
    var p2 = Promise.resolve({
      qmessage: 'you dont exist! '
    });
    return p2;
  }
};

exports.replaceZoneScheds = replaceZoneScheds;

var fetchSched = function fetchSched(ls, cfg, devid, senrel, dow) {
  var lsh = ls.getItem();

  if (lsh) {
    var url = "".concat(cfg.url.api, "/admin/u/unhold/").concat(devid, "/").concat(senrel, "/").concat(dow);
    var options = {
      headers: {
        'Authorization': 'Bearer ' + lsh['token'],
        'Content-Type': 'application/json'
      },
      method: 'GET'
    };
    return fetch(url, options).then(function (response) {
      return response.json();
    });
  } else {
    var p2 = Promise.resolve({
      qmessage: 'you dont exist! '
    });
    return p2;
  }
};

exports.fetchSched = fetchSched;

var deleteHolds = function deleteHolds(ls, cfg, ds) {
  var lsh = ls.getItem();

  if (lsh) {
    var url = cfg.url.api + '/admin/u/holds';
    var options = {
      headers: {
        'Authorization': 'Bearer ' + lsh['token'],
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
      body: JSON.stringify(ds)
    };
    return fetch(url, options).then(function (response) {
      return response.json();
    });
  } else {
    var p2 = Promise.resolve({
      qmessage: 'you dont exist! '
    });
    return p2;
  }
};

exports.deleteHolds = deleteHolds;

var replaceHold = function replaceHold(ls, cfg, db) {
  var lsh = ls.getItem();

  if (lsh) {
    var url = cfg.url.api + '/admin/u/hold';
    var options = {
      headers: {
        'Authorization': 'Bearer ' + lsh['token'],
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(db)
    };
    return fetch(url, options).then(function (response) {
      return response.json();
    });
  } else {
    var p2 = Promise.resolve({
      qmessage: 'you dont exist! '
    });
    return p2;
  }
};

exports.replaceHold = replaceHold;

var fetchBigData = function fetchBigData(ls, cfg, db) {
  var lsh = ls.getItem();

  if (lsh) {
    var url = cfg.url.api + '/admin/u/bigdata';
    var options = {
      headers: {
        'Authorization': 'Bearer ' + lsh['token'],
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(db)
    };
    return fetch(url, options).then(function (response) {
      return response.json();
    });
  } else {
    var p2 = Promise.resolve({
      qmessage: 'you dont exist! '
    });
    return p2;
  }
};

exports.fetchBigData = fetchBigData;