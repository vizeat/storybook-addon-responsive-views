"use strict";

var _react = _interopRequireDefault(require("react"));

var _addons = _interopRequireDefault(require("@storybook/addons"));

var _Panel = require("./Panel");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_addons["default"].register('responsive-addon', function (api) {
  _addons["default"].addPanel('responsive-addon/panel', {
    title: 'Responsive Views',
    // eslint-disable-next-line react/prop-types
    render: function render(_ref) {
      var active = _ref.active;
      return _react["default"].createElement(_Panel.Panel, {
        channel: _addons["default"].getChannel(),
        api: api,
        active: active
      });
    } // eslint-disable-line react/display-name

  });
});