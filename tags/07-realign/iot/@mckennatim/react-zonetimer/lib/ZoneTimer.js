"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ZoneTimer = void 0;

var _react = _interopRequireWildcard(require("react"));

var _usePosition2 = _interopRequireDefault(require("./usePosition"));

var _styles = require("./styles");

var _reactRangeslider = _interopRequireDefault(require("react-rangeslider"));

require("react-rangeslider/lib/index.css");

var _themodule = require("./themodule");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

console.log('doggggggy');

var ZoneTimer = function ZoneTimer(props) {
  var sunrise = props.sunrise,
      sunset = props.sunset,
      range = props.range,
      difrange = props.difrange,
      dif = props.dif;
  var dur = props.dur ? props.dur : 20;
  var now = props.now ? props.now : "7:30";
  var asched = props.asched;

  if (!asched) {
    asched = range[0] == 0 ? [[0, 0, 0]] : [[0, 0, range[0], range[0] + 2]];
  }

  console.log('now: ', now);
  var tm = (0, _themodule.themodule)(props.range);
  var hma = tm.hrmin2arr(now);
  var xy = tm.time2xy(hma, tm.inr);
  console.log('xy: ', xy);
  var isdiff = asched[0].length > 3 ? true : false;
  var ref = (0, _react.useRef)(null);

  var _usePosition = (0, _usePosition2["default"])(ref),
      left = _usePosition.left,
      top = _usePosition.top;

  var _useState = (0, _react.useState)('touch'),
      _useState2 = _slicedToArray(_useState, 2),
      pointerType = _useState2[0],
      setPointerType = _useState2[1];

  var _useState3 = (0, _react.useState)(0),
      _useState4 = _slicedToArray(_useState3, 2),
      sidx = _useState4[0],
      setSidx = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      hasCapture = _useState6[0],
      setHasCapture = _useState6[1]; // const[knobx, setKnobx ] = useState(tm.centx)
  // const[knoby, setKnoby ] = useState(tm.centy + tm.v2r(asched[0][2]))


  var _useState7 = (0, _react.useState)(xy[0]),
      _useState8 = _slicedToArray(_useState7, 2),
      knobx = _useState8[0],
      setKnobx = _useState8[1];

  var _useState9 = (0, _react.useState)(xy[1]),
      _useState10 = _slicedToArray(_useState9, 2),
      knoby = _useState10[0],
      setKnoby = _useState10[1]; // const[hrmin, setHrmin] = useState('6:0')


  var _useState11 = (0, _react.useState)(now),
      _useState12 = _slicedToArray(_useState11, 2),
      hrmin = _useState12[0],
      setHrmin = _useState12[1];

  var _useState13 = (0, _react.useState)(asched),
      _useState14 = _slicedToArray(_useState13, 2),
      sched = _useState14[0],
      setSched = _useState14[1];

  var _useState15 = (0, _react.useState)(false),
      _useState16 = _slicedToArray(_useState15, 2),
      isout = _useState16[0],
      setIsOut = _useState16[1];

  var _useState17 = (0, _react.useState)([]),
      _useState18 = _slicedToArray(_useState17, 2),
      interval = _useState18[0],
      setInterval = _useState18[1];

  var _useState19 = (0, _react.useState)(dif),
      _useState20 = _slicedToArray(_useState19, 2),
      diff = _useState20[0],
      setDiff = _useState20[1];

  var _useState21 = (0, _react.useState)(range[1]),
      _useState22 = _slicedToArray(_useState21, 2),
      temp = _useState22[0],
      setTemp = _useState22[1];

  (0, _react.useEffect)(function () {
    function detectInputType(e) {
      tm.absorbEvent(e);
      setPointerType(e.pointerType);
      window.removeEventListener('pointerdown', detectInputType);
    }

    window.addEventListener("pointerdown", detectInputType, {
      passive: false
    });
    return function () {
      window.removeEventListener('pointerdown', detectInputType);
    };
  }, []);

  var handleStart = function handleStart(e) {
    setHasCapture(true);
    tm.absorbEvent(e);
  };

  var handleMove = function handleMove(ev) {
    var r = tm.v2r(sched[sidx][2]);

    if (isdiff) {
      r = tm.v2r((sched[sidx][2] + sched[sidx][3]) / 2);
    }

    tm.absorbEvent(ev);

    if (hasCapture) {
      var e = pointerType == "mouse" ? ev : ev.touches[0];
      var tx = Math.round(e.pageX) - left;
      var ty = Math.round(e.pageY) - top;

      var _tm$setxy = tm.setxy(tx, ty, r),
          x = _tm$setxy.x,
          y = _tm$setxy.y;

      setKnobx(x);
      setKnoby(y);
      var hm = tm.xy2time(x, y);
      setHrmin(hm.s);
      var didx = sched.findIndex(function (d) {
        return tm.hrXmin(d) > tm.hrXmin(hm.a);
      });
      didx = didx == -1 ? sched.length - 1 : didx - 1;
      setSidx(didx);

      if (isout) {
        var idx = sched.findIndex(function (s) {
          return interval[1] && interval[1][0] == s[0] && interval[1][1] == s[1];
        });

        var _tm$replaceInterval = tm.replaceInterval(sched, hm, idx, interval),
            rsched = _tm$replaceInterval.rsched,
            rinterval = _tm$replaceInterval.rinterval,
            ridx = _tm$replaceInterval.ridx;

        var nridx = ridx == -1 ? sched.length - 1 : ridx;
        setInterval(rinterval);
        setSched(rsched);
        setSidx(nridx);
      }
    }
  };

  var handleEnd = function handleEnd(e) {
    tm.absorbEvent(e);
    setHasCapture(false);
  };

  var handleTempChangeStart = function handleTempChangeStart() {
    console.log('temp change start');
  };

  var handleTempChange = function handleTempChange(value) {
    setTemp(value);
  };

  var handleTempChangeComplete = function handleTempChangeComplete() {// console.log('temp change end')
  };

  var handleDiffChangeStart = function handleDiffChangeStart() {
    console.log('temp change start');
  };

  var handleDiffChange = function handleDiffChange(value) {
    setDiff(value);
  };

  var handleDiffChangeComplete = function handleDiffChangeComplete() {// console.log('temp change end')
  };

  var butStart = function butStart() {
    var intvl = tm.createInterval(hrmin, dur, sched, sidx, temp, isdiff, diff);
    console.log('intvl: ', intvl);
    setInterval(intvl);
    var nsched = tm.insertInterval(intvl, sched);
    setSched(nsched);
    var r = tm.v2r(temp);
    var ang = tm.calcAng(knoby, knobx);
    var nx = tm.rad2x(r, ang);
    var ny = tm.rad2y(r, ang);
    setIsOut(true);
    setKnobx(nx);
    setKnoby(ny);
  };

  var butEnd = function butEnd() {
    var ang = tm.calcAng(knoby, knobx);
    var nx = tm.rad2x(tm.inr, ang);
    var ny = tm.rad2y(tm.inr, ang);
    setIsOut(false);
    setKnobx(nx);
    setKnoby(ny);
  };

  var tapStartEnd = function tapStartEnd() {
    if (isout) {
      butEnd();
    } else {
      butStart();
    }
  };

  var butDel = function butDel() {
    var nsched = sched.slice(0); //copy

    if (sidx == 0 && nsched.length > 1) {
      nsched.splice(sidx, 1);
      nsched[0][0] = 0;
      nsched[0][1] = 0;
    } else if (sidx == sched.length - 1) {
      nsched.splice(sidx, 1);
    } else {
      /*prevent multiple similar entries in sched when values are the same on either side of a delete */
      if (!isdiff) nsched.splice(sidx, 2);

      if (isdiff) {
        if (nsched[sidx - 1][2] == nsched[sidx + 1][2] && nsched[sidx - 1][3] == nsched[sidx + 1][3]) {
          nsched.splice(sidx, 2);
        } else {
          nsched.splice(sidx, 1);
        }
      }
    }

    if (nsched.length == 0) {
      var midrange = (range[0] + range[1]) / 2;
      isdiff ? nsched.push([0, 0, midrange + diff / 2, midrange - diff / 2]) : nsched.push([0, 0, range[0]]);
    }

    setSched(nsched);
    setSidx(nsched.length - 1);
  };

  var renderNightDay = function renderNightDay() {
    var _tm$drawDayNight = tm.drawDayNight(sunrise, sunset),
        dnight = _tm$drawDayNight.dnight,
        dday = _tm$drawDayNight.dday,
        noony = _tm$drawDayNight.noony,
        midy = _tm$drawDayNight.midy;

    return /*#__PURE__*/_react["default"].createElement("g", null, /*#__PURE__*/_react["default"].createElement("path", {
      d: dnight,
      stroke: "black",
      strokeWidth: ".5",
      fill: "#37c7ef"
    }), /*#__PURE__*/_react["default"].createElement("path", {
      d: dday,
      stroke: "black",
      strokeWidth: ".5",
      fill: "#f9fc67"
    }), /*#__PURE__*/_react["default"].createElement("text", {
      x: tm.centx,
      y: noony,
      textAnchor: "middle"
    }, "noon"), /*#__PURE__*/_react["default"].createElement("text", {
      x: tm.centx,
      y: midy,
      textAnchor: "middle"
    }, "midnight"));
  };

  var renderTempLines = function renderTempLines() {
    var tcircs = props.templines.map(function (t, i) {
      var rad = tm.v2r(t.v);
      return /*#__PURE__*/_react["default"].createElement("g", {
        key: i
      }, /*#__PURE__*/_react["default"].createElement("circle", {
        style: _styles.styles.templines,
        cx: tm.centx,
        cy: tm.centy,
        r: rad,
        stroke: t.c
      }), /*#__PURE__*/_react["default"].createElement("text", {
        fontSize: "8",
        x: tm.centx,
        y: tm.centy - rad,
        textAnchor: "middle"
      }, t.v));
    });
    return /*#__PURE__*/_react["default"].createElement("g", null, tcircs);
  };

  _styles.styles.knob = {
    r: hasCapture ? 16 : 14,
    fill: hasCapture ? 'pink' : 'yellow',
    stroke: "red",
    strokeWidth: 3
  };
  _styles.styles.svg = {
    stroke: 'blue',
    strokeWidth: 2,
    fill: hasCapture ? 'yellow' : 'white'
  };
  _styles.styles.rngdiv = {
    width: tm.width,
    "float": 'left',
    background: 'white',
    borderStyle: 'solid',
    borderColor: 'blue'
  };

  var renderSVGsched = function renderSVGsched(schedarr) {
    // eslint-disable-line 
    var sa = schedarr.reduce(function (acc, s, i) {
      var r = isdiff ? tm.v2r((s[2] + s[3]) / 2) : tm.v2r(s[2]);
      var xy = tm.time2xy([s[0] * 1, s[1] * 1], r);
      var begarc = "M".concat(xy[0], " ").concat(xy[1], " A").concat(r, " ").concat(r);
      var datarr = {
        r: r,
        stHM: [s[0], s[1]],
        begarc: [begarc],
        xy: [0, 0],
        xytxt: [0, 0]
      };
      var laf;

      if (i > 0) {
        var endHM = [s[0], s[1]]; //end [hr,min]

        var stHM = acc[i - 1].stHM; //start [hr,min]

        laf = tm.largeArcFlag(stHM, endHM);
        acc[i - 1].endHM = endHM; //adds the end [hr,min] to acc

        var xye = tm.time2xy([s[0] * 1, s[1] * 1], acc[i - 1].r);
        var xyl = tm.time2xy([s[0] * 1, s[1] * 1], r);
        var xytxt = tm.time2xy([s[0] * 1, s[1] * 1], tm.inr - 5);
        var tang = tm.calcAng(xytxt[1], xytxt[0]) / (2 * tm.pi) * 360 - 180;
        acc[i - 1].tang = tang;
        acc[i - 1].xytxt = xytxt;
        var _begarc = acc[i - 1].begarc[0];
        var arc = "".concat(_begarc, " 0 ").concat(laf, ",0 ").concat(xye[0], " ").concat(xye[1]);
        var rayln = "M".concat(xye[0], " ").concat(xye[1], " L").concat(xyl[0], " ").concat(xyl[1]);

        if (!acc[i - 1].d) {
          acc[i - 1].d = [];
        }

        acc[i - 1].d[0] = arc;
        acc[i - 1].d[1] = rayln;
      }

      if (i == schedarr.length - 1) {
        //just segment ending at [23,59]
        var _endHM = [23, 59];
        var _stHM = [s[0], s[1]];
        laf = schedarr.length == 1 ? 1 : tm.largeArcFlag(_stHM, _endHM);
        datarr.endHM = _endHM;
        var xyee = tm.time2xy([0, 0], r);

        var _arc = "".concat(begarc, " 0 ").concat(laf, ",0 ").concat(xyee[0] - 1, " ").concat(xyee[1]);

        if (!datarr.d) {
          datarr.d = [];
        }

        datarr.d[0] = _arc;
      }

      acc[i] = datarr;
      return acc;
    }, []); // setDiffs(difs)

    return /*#__PURE__*/_react["default"].createElement("g", {
      style: _styles.styles.g
    }, sa.map(function (s, i) {
      var txtang = s.tang ? s.tang : 0;
      var trans = "rotate(".concat(txtang, ",").concat(s.xytxt[0], ",").concat(s.xytxt[1], ")");
      return /*#__PURE__*/_react["default"].createElement("g", {
        key: i
      }, /*#__PURE__*/_react["default"].createElement("path", {
        d: s.d[0]
      }), s.d[1] && /*#__PURE__*/_react["default"].createElement("path", {
        d: s.d[1]
      }), /*#__PURE__*/_react["default"].createElement("text", {
        style: _styles.styles.t,
        x: s.xytxt[0],
        y: s.xytxt[1],
        transform: trans
      }, tm.hma2time(s.endHM)));
    }));
  };

  var schedSVG = renderSVGsched(sched);

  var renderSVG = function renderSVG() {
    var hi = sched[sidx] && sched[sidx][2];
    var lo = sched[sidx] && sched[sidx][3];
    var d = hi - lo;
    var hl = sched[sidx] && sched[sidx][3] ? "".concat(hi, "-").concat(lo, "(").concat(d, ")") : "".concat(hi);
    return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("svg", {
      id: "svg",
      width: tm.width + 2,
      height: tm.height + 2,
      xmlns: "http://www.w3.org/2000/svg",
      version: "1.1",
      onMouseMove: handleMove,
      onMouseUp: handleEnd
    }, /*#__PURE__*/_react["default"].createElement("rect", {
      style: _styles.styles.svg,
      d: "rect",
      x: "1",
      y: "1",
      width: tm.width,
      height: tm.height
    }), /*#__PURE__*/_react["default"].createElement("text", {
      x: tm.centx,
      y: "20",
      textAnchor: "middle"
    }, hl, "\xB0 ", tm.hrmin2time(hrmin)), /*#__PURE__*/_react["default"].createElement("text", {
      x: "20",
      y: "25",
      fontSize: "24",
      fill: "green",
      stroke: "red",
      strokeWidth: "1",
      onClick: tapStartEnd
    }, isout ? "finish" : "set"), /*#__PURE__*/_react["default"].createElement("text", {
      x: "250",
      y: "25",
      fontSize: "24",
      fill: "green",
      stroke: "red",
      strokeWidth: "1",
      onClick: butDel
    }, "delete"), /*#__PURE__*/_react["default"].createElement("text", {
      x: "20",
      y: "40"
    }, temp), isdiff && /*#__PURE__*/_react["default"].createElement("text", {
      x: "20",
      y: "53"
    }, temp + diff / 2, "-", temp - diff / 2), /*#__PURE__*/_react["default"].createElement("text", {
      x: "250",
      y: tm.height - 20,
      fontSize: "24",
      fill: "green",
      stroke: "red",
      strokeWidth: "1",
      onClick: props.retNewSched(sched)
    }, "save"), renderNightDay(), renderTempLines(), schedSVG, /*#__PURE__*/_react["default"].createElement("circle", {
      style: _styles.styles.knob,
      id: "knob",
      cx: knobx,
      cy: knoby,
      onTouchEnd: handleEnd,
      onTouchMove: handleMove,
      onTouchStart: handleStart,
      onMouseDown: handleStart
    })));
  };

  var renderDiffSlider = function renderDiffSlider() {
    if (isdiff) {
      var drng = difrange ? [0, difrange] : [0, 6];
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: _styles.styles.rngdiv
      }, "set difference", /*#__PURE__*/_react["default"].createElement("div", {
        className: "slider"
      }, /*#__PURE__*/_react["default"].createElement(_reactRangeslider["default"], {
        min: drng[0],
        max: drng[1],
        value: diff,
        onChangeStart: handleDiffChangeStart,
        onChange: handleDiffChange,
        onChangeComplete: handleDiffChangeComplete
      })));
    }

    return /*#__PURE__*/_react["default"].createElement("div", null);
  };

  return /*#__PURE__*/_react["default"].createElement("div", {
    ref: ref,
    styles: _styles.styles.wrapper
  }, renderSVG(), /*#__PURE__*/_react["default"].createElement("div", {
    style: _styles.styles.rngdiv
  }, "set value", /*#__PURE__*/_react["default"].createElement("div", {
    className: "slider"
  }, /*#__PURE__*/_react["default"].createElement(_reactRangeslider["default"], {
    min: range[0],
    max: range[1],
    value: temp,
    onChangeStart: handleTempChangeStart,
    onChange: handleTempChange,
    onChangeComplete: handleTempChangeComplete
  }))), renderDiffSlider());
};

exports.ZoneTimer = ZoneTimer;