"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setRelayStatus = setRelayStatus;
exports.hma2time = exports.whereInSched = exports.getNow = exports.m2ms = exports.m2hm = exports.add2sched = exports.newInterval = exports.endWhen = exports.startWhen = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var getNow = function getNow(tzadj) {
  var d = new Date();
  var hr = d.getHours() * 1;
  var min = d.getMinutes() * 1;
  var t = tzadj.split(':'); //-04:00 +240(browser UTC offset)

  var tzadjmin = t[0] * 60 + t[1] * 1 + d.getTimezoneOffset();
  var adjmin = hr * 60 + min + tzadjmin;
  adjmin = adjmin < 0 ? adjmin + 24 * 60 : adjmin;
  adjmin = adjmin > 24 * 60 ? adjmin - 24 * 60 : adjmin;
  hr = Math.floor(adjmin / 60);
  min = adjmin % 60;
  return [hr, min];
};

exports.getNow = getNow;

var startWhen = function startWhen(tzadj, delay) {
  var _getNow = getNow(tzadj),
      _getNow2 = _slicedToArray(_getNow, 2),
      hr = _getNow2[0],
      min = _getNow2[1];

  var de = delay ? delay.split(':') : [0, 0];
  hr += de[0] * 1;
  min += de[1] * 1;

  if (min >= 60) {
    min = min - 60;
    hr = hr + 1;
  }

  if (hr >= 24) {
    hr = 23;
    min = 59;
  }

  hr = hr < 1 ? 24 + hr : hr;
  return [hr, min];
};

exports.startWhen = startWhen;

var endWhen = function endWhen(start, dur) {
  var add = dur.split(':');
  var min = start[1] + add[1] * 1;
  var hr = start[0] + add[0] * 1;

  if (min > 60) {
    min -= 60;
    hr += 1;
  }

  if (hr >= 24) {
    hr = 23;
    min = 59;
  }

  return [hr, min];
};

exports.endWhen = endWhen;

var m2hm = function m2hm(dur) {
  var decmin = Math.floor(dur % 1 * 60);
  var hrs = Math.floor(dur / 60);
  var min = dur - hrs * 60 + decmin;
  return "".concat(hrs, ":").concat(min);
};

exports.m2hm = m2hm;

var m2ms = function m2ms(dur) {
  var sec = Math.floor(dur / 60 % 1 * 60);
  var min = Math.floor(dur / 60);
  return "".concat(min, ":").concat(sec);
};

exports.m2ms = m2ms;

var arrEqual = function arrEqual(arr1, arr2) {
  var ae = arr1.reduce(function (acc, a1, idx) {
    return a1 == arr2[idx] ? acc + 1 : acc + 0;
  }, 0);
  return ae == arr1.length ? 1 : 0;
};

var hm2m = function hm2m(hm) {
  return hm[0] * 60 + hm[1] * 1;
};

var last = function last(arr) {
  return arr[arr.length - 1];
};

var newInterval = function newInterval(starttime, startval, endtime, endval) {
  var st = starttime.concat(startval);
  var en = endtime.concat(endval);
  return [st, en];
};

exports.newInterval = newInterval;

var hma2time = function hma2time(hma) {
  var ap = 'am';
  var hr = hma[0];
  var min = hma[1];

  if (hr > 12) {
    hr = hr - 12;
    ap = 'pm';
  }

  if (hr == 12) ap = 'pm';
  if (hr == 0 && min == 0) hr = 12;
  hr = hr.toString().padStart(2, '');
  min = min.toString().padStart(2, '0');
  return "".concat(hr, ":").concat(min, " ").concat(ap);
};

exports.hma2time = hma2time;

var whereInSched = function whereInSched(sched, tzadj) {
  var now = getNow(tzadj);
  var idx = sched.findIndex(function (s) {
    return hm2m(s) > hm2m(now);
  });

  if (idx > -1) {//  console.log('hm2m(sched[idx]): ', hma2time(sched[idx]))
  } // console.log('idx: ', idx)


  return idx;
};

exports.whereInSched = whereInSched;

var add2sched = function add2sched(osched, nintvl, tzadj) {
  var i = 0;
  var now = getNow(tzadj);
  var sched = osched.slice();
  var newsched = sched.reduce(function (acc, cur, idx) {
    //console.log('cur: ', JSON.stringify(cur))
    if (i == 0) {
      /*bump til now */
      if (hm2m(cur) <= hm2m(last(acc))) {
        acc.push(acc.pop().slice(0, 2).concat(cur.slice(2)));
      } else {
        i = 1;
      }
      /*if we are at end of sched */


      if (idx == sched.length - 1) {
        i = 2;
      }
    }

    if (i == 1) {
      /*push til start */
      if (cur.length < 3 || hm2m(cur) < hm2m(nintvl[0])) {
        acc.push(cur);
      } else if (hm2m(cur) == hm2m(nintvl[0])) {
        acc.pop();
        acc.push(nintvl[0]);
      } else {
        i = 2;
      }
      /*if we are at end of sched go add interval*/


      if (sched.length > 1 && idx == sched.length - 1) {
        i = 2;
      }
    }

    if (i == 2) {
      /*push interval */
      //console.log('acc: ', JSON.stringify(acc))
      //console.log('last, nintvl[0]: ',hm2m(last(acc)) , hm2m(nintvl[0]))
      if (hm2m(last(acc)) == hm2m(nintvl[0])) {
        acc.pop(); //console.log('popped acc: ', JSON.stringify(acc))
      }

      if (last(acc) && arrEqual(last(acc).slice(2), nintvl[0].slice(2))) {
        /*if start action same */
        acc.push(nintvl[1]);
      } else {
        //console.log('should push both')
        acc.push(nintvl[0]);
        acc.push(nintvl[1]); //console.log('acc: ', JSON.stringify(acc))
      }

      i = 3;
      /*if we are at end of sched go add interval*/

      if (sched.length > 1 && idx == sched.length - 1) {
        i = 4;
      }
    }

    if (i == 3) {
      //console.log('in case 3')

      /*skip til end of interval */
      if (hm2m(cur) > hm2m(nintvl[1])) {
        i = 4;
      }
      /*if we are at end of sched go add the rest*/


      if (sched.length > 1 && idx == sched.length - 1) {
        i = 4;
      } //console.log('cur: ', cur)

    }

    if (i == 4) {
      //console.log('in case 4')

      /*if end action is same as next get rid of it*/
      if (arrEqual(nintvl[1].slice(2), cur.slice(2))) {
        acc = acc.concat(sched.slice(idx + 1));
      } else {
        /*push the rest */
        //console.log('acc: ', JSON.stringify(acc))
        //console.log('sched.slice(idx): ', JSON.stringify(sched.slice(idx)))
        acc = acc.concat(sched.slice(idx)); //console.log('acc: ', JSON.stringify(acc))
      }

      i = 5;
    } //console.log('acc: ', JSON.stringify(acc))


    return acc;
  }, [now]);
  newsched.unshift([0, 0, 0]);
  return newsched;
};

exports.add2sched = add2sched;

function setRelayStatus(bs) {
  if (bs.timeleft > 0) {
    bs.status = 'timed';
  } else if (bs.darr[0] == 1 && bs.timeleft == 0) {
    bs.status = 'on';
  } else bs.status = 'off';

  return bs;
}