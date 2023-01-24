/*https://github.com/tranbathanhtung/usePosition */
'use strict';

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('react'),
    useState = _require.useState,
    useLayoutEffect = _require.useLayoutEffect;

function getStyle(el, styleName) {
  return window.getComputedStyle(el)[styleName];
}

function getOffset(el) {
  if (!el) {
    return {
      top: 0,
      left: 0
    };
  }

  var rect = el.getBoundingClientRect();
  var doc = el.ownerDocument;
  if (!doc) throw new Error('Unexpectedly missing <document>.');
  var win = doc.defaultView || doc.parentWindow;
  var winX = win.pageXOffset !== undefined ? win.pageXOffset : (doc.documentElement || doc.body.parentNode || doc.body).scrollLeft;
  var winY = win.pageYOffset !== undefined ? win.pageYOffset : (doc.documentElement || doc.body.parentNode || doc.body).scrollTop;
  return {
    top: rect.top + winX,
    left: rect.left + winY
  };
}

function getPosition(el) {
  if (!el) {
    return {
      top: 0,
      left: 0
    };
  }

  var offset = getOffset(el);
  var parentOffset = {
    top: 0,
    left: 0
  };
  var marginTop = parseInt(getStyle(el, 'marginTop')) || 0;
  var marginLeft = parseInt(getStyle(el, 'marginLeft')) || 0;

  if (getStyle(el, 'position') === 'fixed') {
    offset = el.getBoundingClientRect();
  } else {
    var doc = el.ownerDocument;
    var offsetParent = el.offsetParent || doc.documentElement;

    while (offsetParent && (offsetParent === doc.body || offsetParent === doc.documentElement)) {
      offsetParent = offsetParent.parentNode;
    }

    if (offsetParent && offsetParent !== el && offsetParent.nodeType === 1) {
      parentOffset = getOffset(offsetParent);
      parentOffset.top += parseInt(getStyle(offsetParent, 'borderTopWidth')) || 0;
      parentOffset.left += parseInt(getStyle(offsetParent, 'borderLeftWidth')) || 0;
    }
  }

  return {
    top: offset.top - parentOffset.top - marginTop,
    left: offset.left - parentOffset.left - marginLeft
  };
}

function usePosition(ref) {
  var _getPosition = getPosition(ref.current),
      top = _getPosition.top,
      left = _getPosition.left;

  var _useState = useState({
    top: top,
    left: left
  }),
      _useState2 = _slicedToArray(_useState, 2),
      ElementPosition = _useState2[0],
      setElementPosition = _useState2[1];

  function handleChangePosition() {
    if (ref && ref.current) {
      setElementPosition(getPosition(ref.current));
    }
  }

  useLayoutEffect(function () {
    handleChangePosition();
    window.addEventListener('resize', handleChangePosition);
    return function () {
      window.removeEventListener('resize', handleChangePosition);
    };
  }, [ref]);
  return ElementPosition;
}

module.exports = usePosition;