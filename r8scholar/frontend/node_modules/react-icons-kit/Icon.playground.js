"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__PlaygroundIcon = void 0;

var _react = _interopRequireDefault(require("react"));

var _Icon = _interopRequireDefault(require("./Icon"));

var icons = _interopRequireWildcard(require("./md/"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __PlaygroundIcon = function __PlaygroundIcon() {
  return _react.default.createElement("div", {
    style: {
      color: 'green',
      margin: 2,
      padding: 4
    }
  }, Object.keys(icons).map(function (key) {
    return _react.default.createElement(_Icon.default, {
      icon: icons[key],
      size: 42
    });
  }));
};

exports.__PlaygroundIcon = __PlaygroundIcon;