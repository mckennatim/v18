"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDevSpecs = useDevSpecs;

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// import {connect } from './index'
var geta = function geta(dotstr, obj) {
  return dotstr.split(".").slice(1).reduce(function (xs, x) {
    return xs && xs[x] ? xs[x] : null;
  }, obj);
};

function useDevSpecs(ls, cfg, client, cb) {
  var lsh = ls.getItem();

  var _useState = (0, _react.useState)({}),
      _useState2 = _slicedToArray(_useState, 2),
      zones = _useState2[0],
      setZones = _useState2[1];

  var _useState3 = (0, _react.useState)({}),
      _useState4 = _slicedToArray(_useState3, 2),
      binfo = _useState4[0],
      setBinfo = _useState4[1];

  var _useState5 = (0, _react.useState)(undefined),
      _useState6 = _slicedToArray(_useState5, 2),
      devs = _useState6[0],
      setDevs = _useState6[1];

  var _useState7 = (0, _react.useState)(undefined),
      _useState8 = _slicedToArray(_useState7, 2),
      specs = _useState8[0],
      setSpecs = _useState8[1];

  var _useState9 = (0, _react.useState)(undefined),
      _useState10 = _slicedToArray(_useState9, 2),
      error = _useState10[0],
      setError = _useState10[1];

  var _useState11 = (0, _react.useState)(false),
      _useState12 = _slicedToArray(_useState11, 2),
      mounted = _useState12[0],
      setMounted = _useState12[1];

  var fetchDevZones = function fetchDevZones() {
    if (geta('lsh.token', lsh)) {
      var url = cfg.url.api + '/admin/i/devzones';
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

  (0, _react.useEffect)(function () {
    var didCancel = false;

    if (!didCancel) {
      fetchDevZones().then(function (data) {
        if (data) {
          if (data && data.qmessage) {
            setError(data);
          } else {
            setZones(data.zones);
            Object.keys(data.devs);
            setDevs(data.devs);
            setBinfo(data.binfo);
            setSpecs(data.specs);
            cb(data.devs, data.zones); // if (!client.isConnected()){
            //   connect(client, lsh, ()=>cb(client,data.devs)) 
            // }
          }
        }
      });
    }

    return function () {
      didCancel = true;
      setMounted(false);

      if (client.isConnected()) {
        // console.log('client disconnecting')
        client.disconnect();
      }
    };
  }, []);
  return {
    devs: devs,
    zones: zones,
    binfo: binfo,
    specs: specs,
    error: error,
    mounted: mounted
  };
}