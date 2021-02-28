"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.horizontalCenter = void 0;

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var horizontalCenter = function horizontalCenter(Component) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$rAlign = _ref.rAlign,
      rAlign = _ref$rAlign === void 0 ? false : _ref$rAlign,
      _ref$space = _ref.space,
      space = _ref$space === void 0 ? 4 : _ref$space;

  return function (props) {
    return _react.default.createElement(Component, props, _react.default.createElement("div", {
      style: {
        display: 'inline-flex',
        justifyContent: 'center',
        'alignItems': 'center'
      }
    }, _react.Children.toArray(props.children).map(function (child, idx) {
      var spacerField = rAlign ? 'paddingLeft' : 'paddingRight';
      return _react.default.createElement("div", {
        key: idx,
        style: _defineProperty({
          display: 'inline-block'
        }, spacerField, space)
      }, child);
    })));
  };
};

exports.horizontalCenter = horizontalCenter;
var _default = horizontalCenter;
exports.default = _default;