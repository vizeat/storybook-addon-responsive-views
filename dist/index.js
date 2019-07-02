"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResponsiveViewContext = exports.withResponsiveViews = exports.Decorator = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ResponsiveView = require("./ResponsiveView");

var _addons = _interopRequireWildcard(require("@storybook/addons"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Decorator =
/*#__PURE__*/
function (_Component) {
  _inherits(Decorator, _Component);

  function Decorator(props) {
    var _this;

    _classCallCheck(this, Decorator);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Decorator).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "state", {
      enableViews: true
    });

    _defineProperty(_assertThisInitialized(_this), "renderStory", function () {
      return _react["default"].createElement("div", {
        style: {
          margin: 15
        }
      }, _this.story);
    });

    _defineProperty(_assertThisInitialized(_this), "renderViews", function () {
      return _react["default"].createElement(_react.Fragment, null, _this.renderStory(), _react["default"].createElement(_ResponsiveView.ResponsiveView, {
        breakpoints: _this.props.breakpoints
      }, _this.story.props.children));
    });

    var channel = props.channel,
        story = props.story;

    if (channel) {
      _this.channel = channel;
    } else {
      _this.channel = _addons["default"].getChannel();
    }

    _this.story = story;
    return _this;
  }

  _createClass(Decorator, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.channel.emit('responsive-addons/check_status');
      this.channel.on('responsive-addons/enable_views', function (isEnabled) {
        _this2.setState({
          enableViews: isEnabled
        });
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.story !== prevProps.story) {
        this.story = this.props.story;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var enableViews = this.state.enableViews;
      return enableViews ? this.renderViews() : this.renderStory();
    }
  }]);

  return Decorator;
}(_react.Component);

exports.Decorator = Decorator;

_defineProperty(Decorator, "propTypes", {
  channel: _propTypes["default"].shape({
    emit: _propTypes["default"].func,
    on: _propTypes["default"].func,
    removeListener: _propTypes["default"].func
  }),
  story: _propTypes["default"].func.isRequired,
  breakpoints: _propTypes["default"].objectOf(_propTypes["default"].number)
});

_defineProperty(Decorator, "defaultProps", {
  channel: undefined,
  breakpoints: {
    tablet: 768,
    desktop: 1024
  }
});

var withResponsiveViews = (0, _addons.makeDecorator)({
  name: 'withResponsiveViews',
  parameterName: 'responsiveViews',
  wrapper: function wrapper(getStory, context, _ref) {
    var options = _ref.options;
    // eslint-disable-line react/display-name
    return _react["default"].createElement(Decorator, {
      story: getStory(context),
      breakpoints: options
    });
  }
});
exports.withResponsiveViews = withResponsiveViews;
var ResponsiveViewContext = _ResponsiveView.ResponsiveContext;
exports.ResponsiveViewContext = ResponsiveViewContext;