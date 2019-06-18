"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Panel = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

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

var Panel =
/*#__PURE__*/
function (_Component) {
  _inherits(Panel, _Component);

  function Panel(props) {
    var _this;

    _classCallCheck(this, Panel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Panel).call(this, props));
    _this.state = {
      enableViews: true
    };
    _this.toggleViews = _this.toggleViews.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Panel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var channel = this.props.channel;
      channel.on('responsive-addons/check_status', function () {
        channel.emit('responsive-addons/enable_views', _this2.state.enableViews);
      });
    }
  }, {
    key: "toggleViews",
    value: function toggleViews() {
      var _this3 = this;

      this.setState({
        enableViews: !this.state.enableViews
      }, function () {
        return _this3.props.channel.emit('responsive-addons/enable_views', _this3.state.enableViews);
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.props.active) return null;
      return _react["default"].createElement("div", {
        style: {
          padding: 10
        }
      }, _react["default"].createElement("input", {
        type: "checkbox",
        checked: this.state.enableViews,
        onClick: this.toggleViews
      }), _react["default"].createElement("label", {
        style: {
          fontSize: 14,
          fontWeight: 'bold',
          marginLeft: 5
        }
      }, this.state.enableViews ? 'Disable responsive views 😥' : 'Enable responsive views 🙌'));
    }
  }]);

  return Panel;
}(_react.Component);

exports.Panel = Panel;

_defineProperty(Panel, "propTypes", {
  api: _propTypes["default"].shape({
    getQueryParam: _propTypes["default"].func,
    setQueryParams: _propTypes["default"].func
  }).isRequired,
  channel: _propTypes["default"].shape({
    emit: _propTypes["default"].func,
    on: _propTypes["default"].func,
    removeListener: _propTypes["default"].func
  }),
  active: _propTypes["default"].bool
});

_defineProperty(Panel, "defaultProps", {
  channel: undefined,
  active: false
});