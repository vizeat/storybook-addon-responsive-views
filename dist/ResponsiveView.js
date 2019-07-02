"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResponsiveView = ResponsiveView;
exports.ResponsiveContext = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _htmlReactParser = _interopRequireDefault(require("html-react-parser"));

var _reactFrameComponent = _interopRequireWildcard(require("react-frame-component"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ResponsiveView(props) {
  if (!props.renderViews) return null;
  var VIEWPORTS = Object.keys(props.breakpoints).reduce(function (acc, item) {
    var key = item.toLowerCase().replace(/^(.)|\s(.)/g, function ($1) {
      return $1.toUpperCase();
    });
    var value = props.breakpoints[item];
    var belowBreakpoint = {
      name: "".concat(key, ": ").concat(value - 1, "px (limit before breakpoint)"),
      width: "".concat(value - 1, "px")
    };
    var breakpoint = {
      name: "".concat(key, ": ").concat(value, "px"),
      width: "".concat(value, "px")
    };
    return [].concat(_toConsumableArray(acc), [belowBreakpoint, breakpoint]);
  }, [{
    name: "Minimum: 320px",
    width: '320px'
  }]);
  /**
   * All storybook stories are rendered inside an iFrame that contains the styles
   * We have to parse the document's head to extract all the styles that are applied
   * to the components being rendered.
   *
   * We also filter elements that are not object because the parser sometimes returns
   * empty elements which cause errors on the Frame component
   */

  var reactHtmlHead = (0, _htmlReactParser["default"])(document.head.innerHTML).filter(function (element) {
    return _typeof(element) === 'object';
  });
  return _react["default"].createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap'
    }
  }, VIEWPORTS.map(function (_ref, i) {
    var name = _ref.name,
        width = _ref.width;
    return _react["default"].createElement("div", {
      key: i,
      style: {
        margin: 15
      }
    }, _react["default"].createElement("p", {
      style: {
        fontFamily: 'sans-serif'
      }
    }, name), _react["default"].createElement("div", {
      style: {
        height: 300,
        width: width
      }
    }, _react["default"].createElement(_reactFrameComponent["default"], {
      head: reactHtmlHead,
      style: {
        height: '100%',
        width: '100%',
        border: 'none',
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 4px 10px 0px'
      }
    }, _react["default"].createElement(_reactFrameComponent.FrameContextConsumer, null, function (_ref2) {
      var document = _ref2.document,
          window = _ref2.window;
      return props.children;
    }))));
  }));
}

ResponsiveView.propTypes = {
  children: _propTypes["default"].node.isRequired,
  breakpoints: _propTypes["default"].objectOf(_propTypes["default"].number).isRequired,
  renderViews: _propTypes["default"].bool
};
ResponsiveView.defaultProps = {
  renderViews: true
};
var ResponsiveContext = _reactFrameComponent.FrameContext;
exports.ResponsiveContext = ResponsiveContext;