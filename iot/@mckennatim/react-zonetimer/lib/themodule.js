"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.themodule = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var themodule = function themodule(range) {
  var centx = 170;
  var centy = 200;
  var inr = 90;
  var outr = 150;
  var pi = Math.PI;
  var width = 340;
  var height = 400;
  var m = (range[1] - range[0]) / (outr - inr);
  var b = range[0] - m * inr;

  var hrmin2arr = function hrmin2arr(hrmin) {
    var hm = hrmin.split(':');
    return [hm[0] * 1, hm[1] * 1];
  };

  var largeArcFlag = function largeArcFlag(hma1, hma2) {
    var hrdiff = Math.abs(hma1[0] + hma1[1] / 60 - (hma2[0] + hma2[1] / 60));
    return hrdiff > 12 ? 1 : 0; //set large arc flag
  };

  var time2xy = function time2xy(_ref, r) {
    var _ref2 = _slicedToArray(_ref, 2),
        hr = _ref2[0],
        min = _ref2[1];

    var nhr = hr > 6 ? hr * 1 - 6 : hr * 1 + 18;
    var rad = 2 * pi * ((nhr + min / 60 * 1) / 24);
    var x = (r * Math.cos(rad) + centx).toFixed(2) * 1;
    var y = (-r * Math.sin(rad) + centy).toFixed(2) * 1;
    return [x, y];
  };

  var calcAng = function calcAng(y, x) {
    var ang;
    var dx = x - centx;
    var dy = y - centy;

    if (dx == 0) {
      dy > 0 ? ang = pi / 2 : ang = 3 * pi / 2;
    } else {
      ang = Math.atan(dy / dx);
    }

    if (dx > 0 && dy < 0) {
      ang = ang + 2 * pi;
    } else if (dx < 0) {
      ang = ang + pi;
    }

    return ang;
  };

  var rad2x = function rad2x(r, ang) {
    return (r * Math.cos(ang) + centx).toFixed(1);
  };

  var rad2y = function rad2y(r, ang) {
    return (r * Math.sin(ang) + centy).toFixed(1);
  };

  var xy2time = function xy2time(x, y) {
    var tx = Math.round(x);
    var ty = Math.round(y);
    var ang = calcAng(ty, tx);
    var dec = (24 - ang * 3.819719).toFixed(1);
    dec = dec < 18 ? dec * 1 + 6 : dec * 1 - 18;
    var min = Math.floor(dec % 1 * 60);
    var hr = Math.floor(dec);
    var hms = "".concat(hr, ":").concat(min);
    return {
      a: [hr, min],
      s: hms
    };
  };

  var hma2time = function hma2time(hma) {
    var ap = 'am';
    var hr = hma[0];
    var min = hma[1];

    if (hr > 12) {
      hr = hr - 12;
      ap = 'pm';
    }

    hr = hr.toString().padStart(2, '');
    min = min.toString().padStart(2, '0');
    return "".concat(hr, ":").concat(min, " ").concat(ap);
  };

  var hrXmin = function hrXmin(schedidx) {
    return schedidx[0] * 60 + schedidx[1] * 1;
  };

  var addMin = function addMin(hrmin, dur) {
    var hma = hrmin2arr(hrmin);
    var min1 = hma[0] * 60 + hma[1];
    var min2 = (min1 + dur) / 60;
    var min = Math.floor(min2 % 1 * 60);
    var hr = Math.floor(min2);
    return [hr, min];
  };

  return {
    centx: centx,
    centy: centy,
    inr: inr,
    outr: outr,
    pi: pi,
    width: width,
    height: height,
    v2r: function v2r(v) {
      return (v - b) / m;
    },
    xy2time: xy2time,
    time2xy: time2xy,
    hma2time: hma2time,
    hrmin2arr: hrmin2arr,
    hrXmin: hrXmin,
    calcAng: calcAng,
    rad2x: rad2x,
    rad2y: rad2y,
    largeArcFlag: largeArcFlag,
    addMin: addMin,
    hrmin2time: function hrmin2time(hrmin) {
      var hma = hrmin2arr(hrmin);
      return hma2time(hma);
    },
    setxy: function setxy(dx, dy, r) {
      var ang = calcAng(dy, dx);
      var x = rad2x(r, ang);
      var y = rad2y(r, ang);
      return {
        x: x,
        y: y
      };
    },
    getNow: function getNow(tzadj) {
      var d = new Date().toUTCString().split(':');
      var z = tzadj.split(':');
      var rh = d[0].slice(-2) * 1 + z[0] * 1;
      var h = rh < 0 ? rh + 24 : rh;
      return "".concat(h, ":").concat(d[1] * 1 + z[1] * (z[0] * 1 > 0 ? 1 : -1));
    },
    createInterval: function createInterval(hrmin, dur, sched, idx, temp, isdiff, diff) {
      var hma = hrmin2arr(hrmin);
      var hma2 = addMin(hrmin, dur); // const min1 = hma[0]*60+hma[1]
      // const min2 = (min1+dur)/60
      // const min = Math.floor(min2%1*60)
      // const hr = Math.floor(min2)

      if (!isdiff) {
        hma.push(temp);
        hma2.push(sched[idx][2]);
        return [hma, hma2];
      } else {
        hma.push(temp + diff / 2);
        hma.push(temp - diff / 2);
        hma2.push(sched[idx][2]);
        hma2.push(sched[idx][3]);
        return [hma, hma2];
      }
    },
    insertInterval: function insertInterval(intvl, sched) {
      var gi = true;
      var ns = sched.reduce(function (acc, s, i) {
        if (intvl[0][0] < s[0] && gi) {
          acc.push(intvl[0]);
          acc.push(intvl[1]);
          gi = false;
        }

        acc.push(s);

        if (i == sched.length - 1 && gi) {
          acc.push(intvl[0]);
          acc.push(intvl[1]);
        }

        return acc;
      }, []);
      /*FIX if inserting from beginning  */

      if (ns[1][0] * 60 + ns[1][1] < 20) {
        ns.shift();
        ns[0][1] = 0;
      }

      return ns;
    },
    replaceInterval: function replaceInterval(sched, hm, idx, interval) {
      var newidx = idx;

      if (idx >= 0 && hrXmin(hm.a) > hrXmin(sched[idx])) {
        sched[idx][0] = hm.a[0];
        sched[idx][1] = hm.a[1];
      }

      var mintvl = interval.slice(0);

      if (idx >= 0 && sched.length > idx + 1 && hrXmin(sched[idx]) > hrXmin(sched[idx + 1])) {
        var rev = sched[idx].slice(0, 2).concat(sched[idx + 1].slice(2));
        sched[idx] = rev;
        mintvl[1] = rev;
        sched.splice(idx + 1, 1);
        newidx += -1;

        if (sched[newidx][2] == sched[newidx + 1][2] && sched[newidx][3] == sched[newidx + 1][3]) {
          sched.splice(newidx + 1, 1);
          if (sched[newidx + 1]) mintvl[1] = sched[newidx + 1];
          newidx += -1;
        }
      }

      return {
        rsched: sched,
        rinterval: mintvl,
        ridx: newidx
      };
    },
    drawDayNight: function drawDayNight(sunrise, sunset) {
      var setarr = hrmin2arr(sunset);
      var risearr = hrmin2arr(sunrise);
      var laf = largeArcFlag(setarr, risearr);
      var sset = time2xy([setarr[0], setarr[1]], outr);
      var srise = time2xy([risearr[0], risearr[1]], outr);
      var dnight = "M".concat(centx, " ").concat(centy, " ").concat(sset[0], ",").concat(sset[1], " A").concat(outr, ", ").concat(outr, " 0 ").concat(!laf * 1, ", 0, ").concat(srise[0], ",").concat(srise[1], " Z");
      var dday = "M".concat(centx, " ").concat(centy, " ").concat(srise[0], ",").concat(srise[1], " A").concat(outr, ", ").concat(outr, " 0 ").concat(laf, ", 0, ").concat(sset[0], ",").concat(sset[1], " Z");
      var noony = "".concat(centy - outr - 5);
      var midy = "".concat(centy + outr + 15);
      return {
        dnight: dnight,
        dday: dday,
        noony: noony,
        midy: midy
      };
    },
    absorbEvent: function absorbEvent(event) {
      var e = event || window.event;
      e.preventDefault && e.preventDefault();
      e.stopPropagation && e.stopPropagation();
      e.cancelBubble = true;
      e.returnValue = false;
      return false;
    }
  };
};

exports.themodule = themodule;