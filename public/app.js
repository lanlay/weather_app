(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = null;
    hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("api/openWeatherMap.js", function(exports, require, module) {
'use strict';

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiKey = '893c23322ceed38784d041b0a0622043';
var OPEN_WEATHER_MAP_URL = 'http://api.openweathermap.org/data/2.5/weather?appid=' + apiKey + '&units=imperial';
module.exports = {
    getTemp: function getTemp(location) {
        var endcodedLocation = encodeURI(location);
        var requestUrl = OPEN_WEATHER_MAP_URL + '&q=' + endcodedLocation;
        return _axios2.default.get(requestUrl).then(function (res) {
            return res.data.main.temp;
        }).catch(function (error) {
            return error;
        });
    }
};
});

require.register("components/About.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var About = function About() {
    return _react2.default.createElement(
        'h2',
        null,
        'About Component'
    );
};

exports.default = About;
});

require.register("components/App.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactRouter = require('react-router');

var _Main = require('./Main');

var _Main2 = _interopRequireDefault(_Main);

var _Weather = require('./Weather');

var _Weather2 = _interopRequireDefault(_Weather);

var _About = require('./About');

var _About2 = _interopRequireDefault(_About);

var _Examples = require('./Examples');

var _Examples2 = _interopRequireDefault(_Examples);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App() {
        _classCallCheck(this, App);

        return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
    }

    _createClass(App, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _reactRouter.Router,
                { history: _reactRouter.hashHistory },
                _react2.default.createElement(
                    _reactRouter.Route,
                    { path: '/', component: _Main2.default },
                    _react2.default.createElement(_reactRouter.IndexRoute, { component: _Weather2.default }),
                    _react2.default.createElement(_reactRouter.Route, { path: 'about', component: _About2.default }),
                    _react2.default.createElement(_reactRouter.Route, { path: 'examples', component: _Examples2.default })
                )
            );
        }
    }]);

    return App;
}(_react2.default.Component);

exports.default = App;
});

;require.register("components/Examples.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Examples = function (_Component) {
    _inherits(Examples, _Component);

    function Examples() {
        _classCallCheck(this, Examples);

        return _possibleConstructorReturn(this, (Examples.__proto__ || Object.getPrototypeOf(Examples)).apply(this, arguments));
    }

    _createClass(Examples, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'h2',
                null,
                'Examples Component'
            );
        }
    }]);

    return Examples;
}(_react.Component);

exports.default = Examples;
});

;require.register("components/Main.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Nav = require('./Nav');

var _Nav2 = _interopRequireDefault(_Nav);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Main = function Main(props) {
    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_Nav2.default, null),
        _react2.default.createElement(
            'h2',
            null,
            'Main Component'
        ),
        props.children
    );
};

exports.default = Main;
});

require.register("components/Nav.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Nav = function Nav() {
    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            'h2',
            null,
            'Nav Component'
        ),
        _react2.default.createElement(
            _reactRouter.Link,
            { to: '/' },
            'Get Weather'
        ),
        _react2.default.createElement(
            _reactRouter.Link,
            { to: '/about' },
            'About'
        ),
        _react2.default.createElement(
            _reactRouter.Link,
            { to: '/examples' },
            'Examples'
        )
    );
};

exports.default = Nav;
});

require.register("components/Weather.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _WeatherForm = require('./WeatherForm');

var _WeatherForm2 = _interopRequireDefault(_WeatherForm);

var _WeatherMessage = require('./WeatherMessage');

var _WeatherMessage2 = _interopRequireDefault(_WeatherMessage);

var _openWeatherMap = require('../api/openWeatherMap');

var _openWeatherMap2 = _interopRequireDefault(_openWeatherMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Weather = function (_Component) {
    _inherits(Weather, _Component);

    function Weather() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Weather);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Weather.__proto__ || Object.getPrototypeOf(Weather)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
            isLoading: false
        }, _this.handleSearch = function (location) {
            _this.setState({ isLoading: true });

            _openWeatherMap2.default.getTemp(location).then(function (temp) {
                _this.setState({
                    location: location,
                    temp: temp,
                    isLoading: false
                });
            }).catch(function (error) {
                return alert('Can\'t connect to the server.');
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    //noinspection JSDuplicatedDeclaration


    _createClass(Weather, [{
        key: 'render',
        value: function render() {
            var _state = this.state,
                location = _state.location,
                temp = _state.temp,
                isLoading = _state.isLoading;

            var renderMessage = function renderMessage() {
                if (isLoading) {
                    return _react2.default.createElement(
                        'h3',
                        null,
                        'Fetching weather...'
                    );
                } else if (temp && location) {
                    return _react2.default.createElement(_WeatherMessage2.default, { location: location, temp: temp });
                }
            };

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'h2',
                    null,
                    'Weather Component'
                ),
                _react2.default.createElement(_WeatherForm2.default, { onSearch: this.handleSearch }),
                renderMessage()
            );
        }
    }]);

    return Weather;
}(_react.Component);

exports.default = Weather;
});

;require.register("components/WeatherForm.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WeatherForm = function (_Component) {
    _inherits(WeatherForm, _Component);

    function WeatherForm() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, WeatherForm);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = WeatherForm.__proto__ || Object.getPrototypeOf(WeatherForm)).call.apply(_ref, [this].concat(args))), _this), _this.onFormSubmit = function (e) {
            e.preventDefault();

            var location = _this.refs.location.value;

            if (location.length > 0) {
                _this.refs.location.value = '';
                _this.props.onSearch(location);
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(WeatherForm, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'form',
                    { onSubmit: this.onFormSubmit },
                    _react2.default.createElement('input', { type: 'text', ref: 'location' }),
                    _react2.default.createElement(
                        'button',
                        null,
                        'Get Weather'
                    )
                )
            );
        }
    }]);

    return WeatherForm;
}(_react.Component);

exports.default = WeatherForm;
});

;require.register("components/WeatherMessage.js", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WeatherMessage = function WeatherMessage(_ref) {
    var location = _ref.location,
        temp = _ref.temp;
    return _react2.default.createElement(
        'h3',
        null,
        'It\'s ',
        temp,
        ' in ',
        location
    );
};

exports.default = WeatherMessage;
});

require.register("initialize.js", function(exports, require, module) {
'use strict';

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _App = require('components/App');

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  _reactDom2.default.render(_react2.default.createElement(_App2.default, null), document.querySelector('#app'));
});
});

require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map