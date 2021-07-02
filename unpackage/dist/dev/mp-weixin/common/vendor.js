(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance");}function _iterableToArray(iter) {if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) {for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {arr2[i] = arr[i];}return arr2;}}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.then(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return res.then(function (res) {
      return res[1];
    }).catch(function (res) {
      return res[0];
    });
  } };


var SYNC_API_RE =
/^\$|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

var CALLBACK_API_RE = /^on/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name);
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name);
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
      /* eslint-disable no-extend-native */
      if (!Promise.prototype.finally) {
        Promise.prototype.finally = function (callback) {
          var promise = this.constructor;
          return this.then(
          function (value) {return promise.resolve(callback()).then(function () {return value;});},
          function (reason) {return promise.resolve(callback()).then(function () {
              throw reason;
            });});

        };
      }
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };




var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  interceptors: interceptors,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor });


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}
var protocols = {
  previewImage: previewImage,
  getSystemInfo: {
    returnValue: addSafeAreaInsets },

  getSystemInfoSync: {
    returnValue: addSafeAreaInsets } };


var todos = [
'vibrate'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });




var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions['behaviors'];
  var vueExtends = vueOptions['extends'];
  var vueMixins = vueOptions['mixins'];

  var vueProps = vueOptions['props'];

  if (!vueProps) {
    vueOptions['props'] = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps['name'] = {
            type: String,
            default: '' };

          vueProps['value'] = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts['default'];
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          ret.push(handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName)));

        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin']['options']) {
      Object.assign(options, vueOptions['mp-weixin']['options']);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };



  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (target[name]) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ 112:
/*!***************************************!*\
  !*** F:/工作/KAPP/static/icon/shan.png ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 14:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    options.components = Object.assign(components, options.components || {})
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 15:
/*!***********************************!*\
  !*** F:/工作/KAPP/store/unihttp.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var http = function http(obj) {
  return new Promise(function (resolve, reject) {
    uni.showLoading({
      title: '加载中' });

    uni.request({
      url: obj.url,
      method: obj.method,
      header: {
        'Token': obj.header },

      data: obj.data,
      success: function success(res) {
        if (JSON.parse(res.data).Code != 0) {
          uni.showToast({
            title: JSON.parse(res.data).Msg,
            icon: "none" });

          return false;
        }
        resolve(JSON.parse(res.data));
        console.log(JSON.parse(res.data));
        setTimeout(function () {uni.hideLoading();}, 100);
      },
      fail: function fail(err) {
        console.log('err');
        reject(err);
        setTimeout(function () {uni.hideLoading();}, 100);
      },
      complete: function complete() {

      } });

  });
};var _default =

http;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 16:
/*!*********************************!*\
  !*** F:/工作/KAPP/store/index.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 17));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
_vue.default.use(_vuex.default);
var store = new _vuex.default.Store({
  state: {
    token: 'zhaohongfei', //············································身份信息
    CusId: '', //````````````````````````````````````````````````````````		CusId
    url: 'http://39.101.201.199:6001/api/', //  ·············接口头部
    httpurl: 'http://39.101.201.199:6001', //  ··············外部路径
    httpimgs: 'http://39.101.201.199:6001', // ··············零配件  九图  链接头部

    sparePartsReclassifys: [], //商品列表
    NinedetailsHTML: '', //大图地址
    productCodce: '', //当前查看商品编码
    Contactperson: {} //切换联系人
  },
  mutations: {},
  actions: {} });var _default =


store;exports.default = _default;

/***/ }),

/***/ 17:
/*!********************************************!*\
  !*** ./node_modules/vuex/dist/vuex.esm.js ***!
  \********************************************/
/*! exports provided: Store, install, mapState, mapMutations, mapGetters, mapActions, createNamespacedHelpers, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Store", function() { return Store; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapState", function() { return mapState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapMutations", function() { return mapMutations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapGetters", function() { return mapGetters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return mapActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNamespacedHelpers", function() { return createNamespacedHelpers; });
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (true) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (true) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (true) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (true) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (true) {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
     true &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (true) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (true) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (true) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if ( true && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (true) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (true) {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (true) {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (true) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if ( true && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if ( true && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["default"] = (index_esm);


/***/ }),

/***/ 2:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2020 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  // fixed by xxxxxx (nvue vuex)
  /* eslint-disable no-undef */
  if(typeof SharedObject !== 'undefined'){
    this.id = SharedObject.uid++;
  } else {
    this.id = uid++;
  }
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = typeof SharedObject !== 'undefined' ? SharedObject : {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i++, i)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    vm.mpHost !== 'mp-toutiao' && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    vm.mpHost !== 'mp-toutiao' && initProvide(vm); // resolve provide after data/props
    vm.mpHost !== 'mp-toutiao' && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);
  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  vm.mpHost !== 'mp-toutiao' && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err) {
    console.error(err);
    /* eslint-disable no-undef */
    var app = getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      this.$scope['triggerEvent'](event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    target[key] = value;
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string,number
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),

/***/ 24:
/*!**************************************!*\
  !*** F:/工作/KAPP/static/imags/05.png ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 25:
/*!**************************************!*\
  !*** F:/工作/KAPP/static/imags/01.png ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 26:
/*!**************************************!*\
  !*** F:/工作/KAPP/static/imags/04.png ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAANRUlEQVR4Xu2de3BU1R3Hz7l3369EkgEyIlQEpEZTQFGsiCB5QBZBbXxgqzFYa0SnVRQkSksC0U4NFurYTKPGF0Kt0kpNjeFVFbU6OoCKU8fAIIGAPPIkJLt77917OmdDnEze4Pmd7KW/ZfYfdvd7zvmcT+7uPfeecyjBBxIAIEABMjESCRAUCyUAIYBigWDFUBQLHQAhgGKBYMVQFAsdACGAYoFgxVAUCx0AIYBigWDFUBQLHQAhgGKBYMVQFAsdACGAYoFgxVAUCx0AIYBigWDFUBQLHQAhgGKBYMVQFAsdACGAYoFgxVAUCx0AIYBigWDFUBQLHQAhgGKBYMVQFAsdACGAYoFgxVAUCx0AIYBigWDFUBQLHQAhgGKBYMVQFAsdACGAYoFgxVAUCx0AIYBigWDFUBQLHQAhgGKBYMVQFAsdACGAYoFgxVAUCx0AIYBigWDFUBQLHQAhgGKBYMVQFAsdACGAYoFgxVAUS6ADb3310eRDLQ05LZG2cVFiDlUYCTBKPIQRN6FEJSy2E0jHM0QIaWaENFJKv3OqjvcTvK7XF0zKPi6wSoMWZXmxNuzenvb1sZqCcFRL03QjOcqibsKIkxGmUELUUx3ZGTAjhPBnlBGiU0Z1qtCTNkVtcNhstQGX793UlDEvZY+dNOAOXr97e9reYwdXh/TQVD1qOEzTJOyURf31LK8I5f8oJaqiNjlt9i8SXP41D0/L2djfZ+P5dUuL9fLOrTnfHKt5JqSHhzHGu+iHPxSqkIDbW31JygVFP0udur6/xOd2VF2973jtupAWPq+/9w70dYUqkUSPf/NlI1PvOh3BB5ov432WFWv97q1pu2u/rQzpkXNFg+JHD5/Dc+SnYybMnX3BxM96yy//dMvo6rp9WyKGPhqiDgGX98OZF19147SUsQM+eoqux5nmWVaswi0vbW0KnZx5pg3v73NcrkS3/+/L0+/I6e29BVXPbw5p4Yz+ss70dV6HYf7kN5dOv+XGM80YrM9ZUqzSj/85d2/doQ0mM+3A4A6tmXv/iJ7KWPPhxlv2N9SuI+2/48AeClVCs8dfmZ0xduJ7YIUABFtSrJXbXl1X39p0GwCPrpHmjxKHT3xgWs6XXV9YvvnlN5rDLb0ezUTWLXX4+U/ffXnwNyIzobMsKdZjm8p3tEZCk6Dh8HyPw/3wE7PueqprWUsqy3Zphj5BRh1SAklVj0yfP1tGWaLKsKRYj1Q+WxMxtJGiIPSV47TZ/vSH7PwHur5n0b9Ka0zTlFKHc9z+Hcszci+T0V5RZVhSrCWVZQ2aoZ8jCkJfOTbV9uKqYP6CbmJVlNabzBwiow4Jbv+eoozccTLKElWGVcVq1QzdIwpCXzl2VX2jJHjvzT2I1WIy0yejDokuf21hZq6wcTIZdbaqWJpm6NBnhDH+dpv9rZLse+b1IFbYZKZTRicluP3HizJyh8ooS1QZVhXL0Awd9DS/A7BDtb39ZDB/Tg9iaRKGO2LF+pzehuKsvCRRnS4jx6pimZqhS6m7XbVVlQTzu52RLaooNUxmSpHb5/Q0F2ctSJQhhKgypHSOqMp25CypLGOaoYuO7THPrtq2lATzM3s4YpkmM6Xw8zm9TcVZeVJOVkRBlQJGVGU7iRXVDF0RndtTXnyI5akvzlqQLKO9osqwqljyfrz3fsRiJjNF9UOfOQGX9+iKzLzhUgoTVIhVxWrRDF3KqX4fRyxpYiW6/QcKM3JHCepzKTFWFatOM3QpZ0lxIlZ1YUbuhVKMEFSIVcU6qBl6j3cdCOLyfUw8iJXg9u8qysiVcm1UFD+riiXtAnBciOXx/7soPRfs3jNRMnXOsaRYBe88/3ZID2dDAOmaGQ9iJfvO+duya39+q4z2iirDkmIt3/Lyk82hlsWiIPSVEw9ijU4697e/vuqGYhntFVWGJcX64wcbRh9oPLKb3y4lCkRvOXEgljZj3IS0eeOnfgPdVpH5lhSLAyioev7dkBaeLhLGaQ6Qgg83tN93H/hkefrtV0K3U3S+ZcXi066qj9RU6FE9QTSUznmDdcTiUjltjrbpYybkzxo7eS1kGyGyLSsWh1H6ScV9NU1HiiNaBOwC7WCIxec2+pzu5jFJI0vuuHTm4xAdD51pabE4nLW7tl6/r/7Q4jY9coURjar8Mgufu0p/YMva578yYlcdW0qCv+rpInTsq5AfWUQ8YjOhqcLsquNggsuz88cpo5+Ye+Hlvc5pFFEmZIYYKpA1HGD2q59vnVPX2jy9TQuPMKIskRHmp4w5qUL5dHsbYVQhjLRfuKaxKfaxafaEUJMQZtD2KfexJ6X8/wm/LSbqVB2fFcyYv7RrNVZsW8v47Gs+Pb6HB/98LOPUk9+KYRDCNEKoRgjhzzAjpIUS0qIotM6pOvZ4XZ7tC6+Y88EAmxzXbztrxJJN+ciJhkdNRtsUarYRhZ4kJjlBCWnUbaxmhCepVnZ94q08FCveeuQsqQ+KdZZ0ZLw1A8WKtx45S+pz1oj12q73Jh8LNcxu0yIjDNMMmCZzUcrshLb/aOcrUJ1un0VZlDhU+86efryv3PYqa18Dq99Yfjdg5yf/4R4ilLQRRloJJUcooTVOu+3LJK//r7jw2un2EtD713/x/rV76mp+H9Yik7SoYWN8uIGf8gkZcuDDDb3e885MflbYr1cDa/ip4YYGh83xeaLLV774mpv7XZtrYMmD8y5BWAan8s9+WpW+v6H2lTYtnAJVg0EaINUS3f63xg8ZtfDmSdMstzZW+4iORR+Qi551RjIYYsU6hlLidbgri7MWBK3YRZYV67GqF6patbYsaOiDJVaHXMMCQ1YtvWa+lFuERLK0pFhPf7Qx59uGQ68xxsAnjA6mWDG5FLp/9Zz7zhfZ6TKyLCnWim1r/9HQ2nyDDECDLRZv47iho+5fOOW6P8tor6gyLClWQdULX4W0tlRREPrKiQexhvqGrHv02tt+IaO9osqwpFiPVD57OGJoYGeC8fDjvXMdEl3+Twszc68Q1ekyciwqVllzxNADMgDFwxErwe3bW5Rx51gZ7RVVhiXFWlJZFtIM3SUKQrx/Ffpd3sMrM/OEr2cPyc+qYumaodsgwXRkx8MRy+f0NhZn5UlZllIUU6uK9X+22oz3RHFWHui9/aKE6sixqlgyF17bXBLM7zYQK3fhNW9zcVYe2H39oqWKjb9BhEJnylx4zWazbVqVnT+ra5sWVZTKXCoSF16DlornL6ksk3bE6kMsaYvb4hqkMqxqF0vi4rbqO08G7+22TsSiitKTJjO9Mprsc3qPFmfhwmvgrJdUlslc0W9jSTC/2+WjhypK66LMlLJGV8Dl278i805LXS+06m8saRsIqIr6xlNzetxAoNZkppSxpQS3/+uijNyLwP9iBRZgVbHqNUOXMq5jU5VXVgUX5nZl/mBFaTVjppTR8AS3f0cR7qUjUPteomRu0mRX7atLgvcs6uGs8GOTmVPgW0vIEE+g6nfpd+DuX9CwH60q39GmydpWzvnwE7Pu7rat3OK3//KmHjWuh24rzx/uTypfOmP+L2WUJaoMS34VFm57ZV1T6wkZG2FGz/MnT31oxq2fdAW+bFN54clIaLmojugrZ9zQkQ8unDJ3jYyyRJVhSbFW/+fN6w/UH36dMQa7URMjtWvm3d/jrlunFn/7LyEEdKMmSmnT6uvus9SuFJYdeecVf6yqfGurFgJb8DW2k73Tu2Fl5p039fZXvLTyuffDRmSaqL/y7jmUJHsD25bNvD0drgyYZEsesTiKlz6vSv368IFNEUMTfsrPpfI4XMcvH5WaPm/8lG77QXd0xXOfVebsOX7wRYjNDE7VofmaCyYFM8dM/Aim++FSLSsWR8I7dl/94WdCWniYKER80TOv07P34uGjFt+SNmNjf7mlH1csq2n8bmnE0ISNwvM6JHi8xy8aNrrwpouvLu2vDvH4uqXF4kDX796eVn10f0HE0C4xokZylJkeFtugkvK1sPiTt7FzO/lEab4mFl8bK0oJDfPp7ipRmxw227c+l3d7wfRbS06ns17YuXl+Tf13izVD/4luGopp8tnYsZXbBvTg0/RjM6EVxXSo9kMBt/fDyeeNeXrG+Zd2O2kYUGAcvMnyYsUBw++rsOGrD+YfbWmceVILpZjRaCJjxM0U4lL4gm+MKKx9wbf2xdgoixBKW0iUnFBU0uhQHdWJbt/mBZfN2hlPbTrTuqBYZ0oOP9cnARQLBQEhgGKBYMVQFAsdACGAYoFgxVAUCx0AIYBigWDFUBQLHQAhgGKBYMVQFAsdACGAYoFgxVAUCx0AIYBigWDFUBQLHQAhgGKBYMVQFAsdACGAYoFgxVAUCx0AIYBigWDFUBQLHQAhgGKBYMVQFAsdACGAYoFgxVAUCx0AIYBigWDFUBQLHQAhgGKBYMVQFAsdACGAYoFgxVAUCx0AIYBigWDFUBQLHQAhgGKBYMVQFAsdACGAYoFgxVAUCx0AIYBigWDFUBQLHQAhgGKBYMVQFAsdACGAYoFgxVAUCx0AIYBigWDFUBQLHQAh8D99VbnTTEO80QAAAABJRU5ErkJggg=="

/***/ }),

/***/ 27:
/*!**************************************!*\
  !*** F:/工作/KAPP/static/imags/03.png ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 28:
/*!**************************************!*\
  !*** F:/工作/KAPP/static/imags/06.png ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 29:
/*!**************************************!*\
  !*** F:/工作/KAPP/static/imags/07.png ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 3:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 30:
/*!**************************************!*\
  !*** F:/工作/KAPP/static/imags/09.png ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 4:
/*!*****************************!*\
  !*** F:/工作/KAPP/pages.json ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),

/***/ 5:
/*!*******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/dist/index.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {var _package = __webpack_require__(/*! ../package.json */ 6);function _possibleConstructorReturn(self, call) {if (call && (typeof call === "object" || typeof call === "function")) {return call;}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });if (superClass) _setPrototypeOf(subClass, superClass);}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}

var STAT_VERSION = _package.version;
var STAT_URL = 'https://tongji.dcloud.io/uni/stat';
var STAT_H5_URL = 'https://tongji.dcloud.io/uni/stat.gif';
var PAGE_PVER_TIME = 1800;
var APP_PVER_TIME = 300;
var OPERATING_TIME = 10;

var UUID_KEY = '__DC_STAT_UUID';
var UUID_VALUE = '__DC_UUID_VALUE';

function getUuid() {
  var uuid = '';
  if (getPlatformName() === 'n') {
    try {
      uuid = plus.runtime.getDCloudId();
    } catch (e) {
      uuid = '';
    }
    return uuid;
  }

  try {
    uuid = uni.getStorageSync(UUID_KEY);
  } catch (e) {
    uuid = UUID_VALUE;
  }

  if (!uuid) {
    uuid = Date.now() + '' + Math.floor(Math.random() * 1e7);
    try {
      uni.setStorageSync(UUID_KEY, uuid);
    } catch (e) {
      uni.setStorageSync(UUID_KEY, UUID_VALUE);
    }
  }
  return uuid;
}

var getSgin = function getSgin(statData) {
  var arr = Object.keys(statData);
  var sortArr = arr.sort();
  var sgin = {};
  var sginStr = '';
  for (var i in sortArr) {
    sgin[sortArr[i]] = statData[sortArr[i]];
    sginStr += sortArr[i] + '=' + statData[sortArr[i]] + '&';
  }
  // const options = sginStr.substr(0, sginStr.length - 1)
  // sginStr = sginStr.substr(0, sginStr.length - 1) + '&key=' + STAT_KEY;
  // const si = crypto.createHash('md5').update(sginStr).digest('hex');
  return {
    sign: '',
    options: sginStr.substr(0, sginStr.length - 1) };

};

var getSplicing = function getSplicing(data) {
  var str = '';
  for (var i in data) {
    str += i + '=' + data[i] + '&';
  }
  return str.substr(0, str.length - 1);
};

var getTime = function getTime() {
  return parseInt(new Date().getTime() / 1000);
};

var getPlatformName = function getPlatformName() {
  var platformList = {
    'app-plus': 'n',
    'h5': 'h5',
    'mp-weixin': 'wx',
    'mp-alipay': 'ali',
    'mp-baidu': 'bd',
    'mp-toutiao': 'tt',
    'mp-qq': 'qq' };

  return platformList["mp-weixin"];
};

var getPackName = function getPackName() {
  var packName = '';
  if (getPlatformName() === 'wx' || getPlatformName() === 'qq') {
    // 兼容微信小程序低版本基础库
    if (uni.canIUse('getAccountInfoSync')) {
      packName = uni.getAccountInfoSync().miniProgram.appId || '';
    }
  }
  return packName;
};

var getVersion = function getVersion() {
  return getPlatformName() === 'n' ? plus.runtime.version : '';
};

var getChannel = function getChannel() {
  var platformName = getPlatformName();
  var channel = '';
  if (platformName === 'n') {
    channel = plus.runtime.channel;
  }
  return channel;
};

var getScene = function getScene(options) {
  var platformName = getPlatformName();
  var scene = '';
  if (options) {
    return options;
  }
  if (platformName === 'wx') {
    scene = uni.getLaunchOptionsSync().scene;
  }
  return scene;
};
var First__Visit__Time__KEY = 'First__Visit__Time';
var Last__Visit__Time__KEY = 'Last__Visit__Time';

var getFirstVisitTime = function getFirstVisitTime() {
  var timeStorge = uni.getStorageSync(First__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = getTime();
    uni.setStorageSync(First__Visit__Time__KEY, time);
    uni.removeStorageSync(Last__Visit__Time__KEY);
  }
  return time;
};

var getLastVisitTime = function getLastVisitTime() {
  var timeStorge = uni.getStorageSync(Last__Visit__Time__KEY);
  var time = 0;
  if (timeStorge) {
    time = timeStorge;
  } else {
    time = '';
  }
  uni.setStorageSync(Last__Visit__Time__KEY, getTime());
  return time;
};


var PAGE_RESIDENCE_TIME = '__page__residence__time';
var First_Page_residence_time = 0;
var Last_Page_residence_time = 0;


var setPageResidenceTime = function setPageResidenceTime() {
  First_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    uni.setStorageSync(PAGE_RESIDENCE_TIME, getTime());
  }
  return First_Page_residence_time;
};

var getPageResidenceTime = function getPageResidenceTime() {
  Last_Page_residence_time = getTime();
  if (getPlatformName() === 'n') {
    First_Page_residence_time = uni.getStorageSync(PAGE_RESIDENCE_TIME);
  }
  return Last_Page_residence_time - First_Page_residence_time;
};
var TOTAL__VISIT__COUNT = 'Total__Visit__Count';
var getTotalVisitCount = function getTotalVisitCount() {
  var timeStorge = uni.getStorageSync(TOTAL__VISIT__COUNT);
  var count = 1;
  if (timeStorge) {
    count = timeStorge;
    count++;
  }
  uni.setStorageSync(TOTAL__VISIT__COUNT, count);
  return count;
};

var GetEncodeURIComponentOptions = function GetEncodeURIComponentOptions(statData) {
  var data = {};
  for (var prop in statData) {
    data[prop] = encodeURIComponent(statData[prop]);
  }
  return data;
};

var Set__First__Time = 0;
var Set__Last__Time = 0;

var getFirstTime = function getFirstTime() {
  var time = new Date().getTime();
  Set__First__Time = time;
  Set__Last__Time = 0;
  return time;
};


var getLastTime = function getLastTime() {
  var time = new Date().getTime();
  Set__Last__Time = time;
  return time;
};


var getResidenceTime = function getResidenceTime(type) {
  var residenceTime = 0;
  if (Set__First__Time !== 0) {
    residenceTime = Set__Last__Time - Set__First__Time;
  }

  residenceTime = parseInt(residenceTime / 1000);
  residenceTime = residenceTime < 1 ? 1 : residenceTime;
  if (type === 'app') {
    var overtime = residenceTime > APP_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: overtime };

  }
  if (type === 'page') {
    var _overtime = residenceTime > PAGE_PVER_TIME ? true : false;
    return {
      residenceTime: residenceTime,
      overtime: _overtime };

  }

  return {
    residenceTime: residenceTime };


};

var getRoute = function getRoute() {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;

  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is;
  } else {
    return _self.$scope && _self.$scope.route || _self.$mp && _self.$mp.page.route;
  }
};

var getPageRoute = function getPageRoute(self) {
  var pages = getCurrentPages();
  var page = pages[pages.length - 1];
  var _self = page.$vm;
  var query = self._query;
  var str = query && JSON.stringify(query) !== '{}' ? '?' + JSON.stringify(query) : '';
  // clear
  self._query = '';
  if (getPlatformName() === 'bd') {
    return _self.$mp && _self.$mp.page.is + str;
  } else {
    return _self.$scope && _self.$scope.route + str || _self.$mp && _self.$mp.page.route + str;
  }
};

var getPageTypes = function getPageTypes(self) {
  if (self.mpType === 'page' || self.$mp && self.$mp.mpType === 'page' || self.$options.mpType === 'page') {
    return true;
  }
  return false;
};

var calibration = function calibration(eventName, options) {
  //  login 、 share 、pay_success 、pay_fail 、register 、title
  if (!eventName) {
    console.error("uni.report \u7F3A\u5C11 [eventName] \u53C2\u6570");
    return true;
  }
  if (typeof eventName !== 'string') {
    console.error("uni.report [eventName] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u7C7B\u578B");
    return true;
  }
  if (eventName.length > 255) {
    console.error("uni.report [eventName] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (typeof options !== 'string' && typeof options !== 'object') {
    console.error("uni.report [options] \u53C2\u6570\u7C7B\u578B\u9519\u8BEF,\u53EA\u80FD\u4E3A String \u6216 Object \u7C7B\u578B");
    return true;
  }

  if (typeof options === 'string' && options.length > 255) {
    console.error("uni.report [options] \u53C2\u6570\u957F\u5EA6\u4E0D\u80FD\u5927\u4E8E 255");
    return true;
  }

  if (eventName === 'title' && typeof options !== 'string') {
    console.error('uni.report [eventName] 参数为 title 时，[options] 参数只能为 String 类型');
    return true;
  }
};

var PagesJson = __webpack_require__(/*! uni-pages?{"type":"style"} */ 7).default;
var statConfig = __webpack_require__(/*! uni-stat-config */ 8).default || __webpack_require__(/*! uni-stat-config */ 8);

var resultOptions = uni.getSystemInfoSync();var

Util = /*#__PURE__*/function () {
  function Util() {_classCallCheck(this, Util);
    this.self = '';
    this._retry = 0;
    this._platform = '';
    this._query = {};
    this._navigationBarTitle = {
      config: '',
      page: '',
      report: '',
      lt: '' };

    this._operatingTime = 0;
    this._reportingRequestData = {
      '1': [],
      '11': [] };

    this.__prevent_triggering = false;

    this.__licationHide = false;
    this.__licationShow = false;
    this._lastPageRoute = '';
    this.statData = {
      uuid: getUuid(),
      ut: getPlatformName(),
      mpn: getPackName(),
      ak: statConfig.appid,
      usv: STAT_VERSION,
      v: getVersion(),
      ch: getChannel(),
      cn: '',
      pn: '',
      ct: '',
      t: getTime(),
      tt: '',
      p: resultOptions.platform === 'android' ? 'a' : 'i',
      brand: resultOptions.brand || '',
      md: resultOptions.model,
      sv: resultOptions.system.replace(/(Android|iOS)\s/, ''),
      mpsdk: resultOptions.SDKVersion || '',
      mpv: resultOptions.version || '',
      lang: resultOptions.language,
      pr: resultOptions.pixelRatio,
      ww: resultOptions.windowWidth,
      wh: resultOptions.windowHeight,
      sw: resultOptions.screenWidth,
      sh: resultOptions.screenHeight };


  }_createClass(Util, [{ key: "_applicationShow", value: function _applicationShow()

    {
      if (this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('app');
        if (time.overtime) {
          var options = {
            path: this._lastPageRoute,
            scene: this.statData.sc };

          this._sendReportRequest(options);
        }
        this.__licationHide = false;
      }
    } }, { key: "_applicationHide", value: function _applicationHide(

    self, type) {

      this.__licationHide = true;
      getLastTime();
      var time = getResidenceTime();
      getFirstTime();
      var route = getPageRoute(this);
      this._sendHideRequest({
        urlref: route,
        urlref_ts: time.residenceTime },
      type);
    } }, { key: "_pageShow", value: function _pageShow()

    {
      var route = getPageRoute(this);
      var routepath = getRoute();
      this._navigationBarTitle.config = PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].titleNView &&
      PagesJson.pages[routepath].titleNView.titleText ||
      PagesJson &&
      PagesJson.pages[routepath] &&
      PagesJson.pages[routepath].navigationBarTitleText || '';

      if (this.__licationShow) {
        getFirstTime();
        this.__licationShow = false;
        // console.log('这是 onLauch 之后执行的第一次 pageShow ，为下次记录时间做准备');
        this._lastPageRoute = route;
        return;
      }

      getLastTime();
      this._lastPageRoute = route;
      var time = getResidenceTime('page');
      if (time.overtime) {
        var options = {
          path: this._lastPageRoute,
          scene: this.statData.sc };

        this._sendReportRequest(options);
      }
      getFirstTime();
    } }, { key: "_pageHide", value: function _pageHide()

    {
      if (!this.__licationHide) {
        getLastTime();
        var time = getResidenceTime('page');
        this._sendPageRequest({
          url: this._lastPageRoute,
          urlref: this._lastPageRoute,
          urlref_ts: time.residenceTime });

        this._navigationBarTitle = {
          config: '',
          page: '',
          report: '',
          lt: '' };

        return;
      }
    } }, { key: "_login", value: function _login()

    {
      this._sendEventRequest({
        key: 'login' },
      0);
    } }, { key: "_share", value: function _share()

    {
      this._sendEventRequest({
        key: 'share' },
      0);
    } }, { key: "_payment", value: function _payment(
    key) {
      this._sendEventRequest({
        key: key },
      0);
    } }, { key: "_sendReportRequest", value: function _sendReportRequest(
    options) {

      this._navigationBarTitle.lt = '1';
      var query = options.query && JSON.stringify(options.query) !== '{}' ? '?' + JSON.stringify(options.query) : '';
      this.statData.lt = '1';
      this.statData.url = options.path + query || '';
      this.statData.t = getTime();
      this.statData.sc = getScene(options.scene);
      this.statData.fvts = getFirstVisitTime();
      this.statData.lvts = getLastVisitTime();
      this.statData.tvc = getTotalVisitCount();
      if (getPlatformName() === 'n') {
        this.getProperty();
      } else {
        this.getNetworkInfo();
      }
    } }, { key: "_sendPageRequest", value: function _sendPageRequest(

    opt) {var

      url =


      opt.url,urlref = opt.urlref,urlref_ts = opt.urlref_ts;
      this._navigationBarTitle.lt = '11';
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '11',
        ut: this.statData.ut,
        url: url,
        tt: this.statData.tt,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "_sendHideRequest", value: function _sendHideRequest(

    opt, type) {var

      urlref =

      opt.urlref,urlref_ts = opt.urlref_ts;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '3',
        ut: this.statData.ut,
        urlref: urlref,
        urlref_ts: urlref_ts,
        ch: this.statData.ch,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options, type);
    } }, { key: "_sendEventRequest", value: function _sendEventRequest()



    {var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},_ref$key = _ref.key,key = _ref$key === void 0 ? '' : _ref$key,_ref$value = _ref.value,value = _ref$value === void 0 ? "" : _ref$value;
      var route = this._lastPageRoute;
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '21',
        ut: this.statData.ut,
        url: route,
        ch: this.statData.ch,
        e_n: key,
        e_v: typeof value === 'object' ? JSON.stringify(value) : value.toString(),
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }, { key: "getNetworkInfo", value: function getNetworkInfo()

    {var _this = this;
      uni.getNetworkType({
        success: function success(result) {
          _this.statData.net = result.networkType;
          _this.getLocation();
        } });

    } }, { key: "getProperty", value: function getProperty()

    {var _this2 = this;
      plus.runtime.getProperty(plus.runtime.appid, function (wgtinfo) {
        _this2.statData.v = wgtinfo.version || '';
        _this2.getNetworkInfo();
      });
    } }, { key: "getLocation", value: function getLocation()

    {var _this3 = this;
      if (statConfig.getLocation) {
        uni.getLocation({
          type: 'wgs84',
          geocode: true,
          success: function success(result) {
            if (result.address) {
              _this3.statData.cn = result.address.country;
              _this3.statData.pn = result.address.province;
              _this3.statData.ct = result.address.city;
            }

            _this3.statData.lat = result.latitude;
            _this3.statData.lng = result.longitude;
            _this3.request(_this3.statData);
          } });

      } else {
        this.statData.lat = 0;
        this.statData.lng = 0;
        this.request(this.statData);
      }
    } }, { key: "request", value: function request(

    data, type) {var _this4 = this;
      var time = getTime();
      var title = this._navigationBarTitle;
      data.ttn = title.page;
      data.ttpj = title.config;
      data.ttc = title.report;

      var requestData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        requestData = uni.getStorageSync('__UNI__STAT__DATA') || {};
      }
      if (!requestData[data.lt]) {
        requestData[data.lt] = [];
      }
      requestData[data.lt].push(data);

      if (getPlatformName() === 'n') {
        uni.setStorageSync('__UNI__STAT__DATA', requestData);
      }
      if (getPageResidenceTime() < OPERATING_TIME && !type) {
        return;
      }
      var uniStatData = this._reportingRequestData;
      if (getPlatformName() === 'n') {
        uniStatData = uni.getStorageSync('__UNI__STAT__DATA');
      }
      // 时间超过，重新获取时间戳
      setPageResidenceTime();
      var firstArr = [];
      var contentArr = [];
      var lastArr = [];var _loop = function _loop(

      i) {
        var rd = uniStatData[i];
        rd.forEach(function (elm) {
          var newData = getSplicing(elm);
          if (i === 0) {
            firstArr.push(newData);
          } else if (i === 3) {
            lastArr.push(newData);
          } else {
            contentArr.push(newData);
          }
        });};for (var i in uniStatData) {_loop(i);
      }

      firstArr.push.apply(firstArr, contentArr.concat(lastArr));
      var optionsData = {
        usv: STAT_VERSION, //统计 SDK 版本号
        t: time, //发送请求时的时间戮
        requests: JSON.stringify(firstArr) };


      this._reportingRequestData = {};
      if (getPlatformName() === 'n') {
        uni.removeStorageSync('__UNI__STAT__DATA');
      }

      if (data.ut === 'h5') {
        this.imageRequest(optionsData);
        return;
      }

      if (getPlatformName() === 'n' && this.statData.p === 'a') {
        setTimeout(function () {
          _this4._sendRequest(optionsData);
        }, 200);
        return;
      }
      this._sendRequest(optionsData);
    } }, { key: "_sendRequest", value: function _sendRequest(
    optionsData) {var _this5 = this;
      uni.request({
        url: STAT_URL,
        method: 'POST',
        // header: {
        //   'content-type': 'application/json' // 默认值
        // },
        data: optionsData,
        success: function success() {
          // if (process.env.NODE_ENV === 'development') {
          //   console.log('stat request success');
          // }
        },
        fail: function fail(e) {
          if (++_this5._retry < 3) {
            setTimeout(function () {
              _this5._sendRequest(optionsData);
            }, 1000);
          }
        } });

    }
    /**
       * h5 请求
       */ }, { key: "imageRequest", value: function imageRequest(
    data) {
      var image = new Image();
      var options = getSgin(GetEncodeURIComponentOptions(data)).options;
      image.src = STAT_H5_URL + '?' + options;
    } }, { key: "sendEvent", value: function sendEvent(

    key, value) {
      // 校验 type 参数
      if (calibration(key, value)) return;

      if (key === 'title') {
        this._navigationBarTitle.report = value;
        return;
      }
      this._sendEventRequest({
        key: key,
        value: typeof value === 'object' ? JSON.stringify(value) : value },
      1);
    } }]);return Util;}();var



Stat = /*#__PURE__*/function (_Util) {_inherits(Stat, _Util);_createClass(Stat, null, [{ key: "getInstance", value: function getInstance()
    {
      if (!this.instance) {
        this.instance = new Stat();
      }
      return this.instance;
    } }]);
  function Stat() {var _this6;_classCallCheck(this, Stat);
    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(Stat).call(this));
    _this6.instance = null;
    // 注册拦截器
    if (typeof uni.addInterceptor === 'function' && "development" !== 'development') {
      _this6.addInterceptorInit();
      _this6.interceptLogin();
      _this6.interceptShare(true);
      _this6.interceptRequestPayment();
    }return _this6;
  }_createClass(Stat, [{ key: "addInterceptorInit", value: function addInterceptorInit()

    {
      var self = this;
      uni.addInterceptor('setNavigationBarTitle', {
        invoke: function invoke(args) {
          self._navigationBarTitle.page = args.title;
        } });

    } }, { key: "interceptLogin", value: function interceptLogin()

    {
      var self = this;
      uni.addInterceptor('login', {
        complete: function complete() {
          self._login();
        } });

    } }, { key: "interceptShare", value: function interceptShare(

    type) {
      var self = this;
      if (!type) {
        self._share();
        return;
      }
      uni.addInterceptor('share', {
        success: function success() {
          self._share();
        },
        fail: function fail() {
          self._share();
        } });

    } }, { key: "interceptRequestPayment", value: function interceptRequestPayment()

    {
      var self = this;
      uni.addInterceptor('requestPayment', {
        success: function success() {
          self._payment('pay_success');
        },
        fail: function fail() {
          self._payment('pay_fail');
        } });

    } }, { key: "report", value: function report(

    options, self) {
      this.self = self;
      // if (process.env.NODE_ENV === 'development') {
      //   console.log('report init');
      // }
      setPageResidenceTime();
      this.__licationShow = true;
      this._sendReportRequest(options, true);
    } }, { key: "load", value: function load(

    options, self) {
      if (!self.$scope && !self.$mp) {
        var page = getCurrentPages();
        self.$scope = page[page.length - 1];
      }
      this.self = self;
      this._query = options;
    } }, { key: "show", value: function show(

    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageShow(self);
      } else {
        this._applicationShow(self);
      }
    } }, { key: "ready", value: function ready(

    self) {
      // this.self = self;
      // if (getPageTypes(self)) {
      //   this._pageShow(self);
      // }
    } }, { key: "hide", value: function hide(
    self) {
      this.self = self;
      if (getPageTypes(self)) {
        this._pageHide(self);
      } else {
        this._applicationHide(self, true);
      }
    } }, { key: "error", value: function error(
    em) {
      if (this._platform === 'devtools') {
        if (true) {
          console.info('当前运行环境为开发者工具，不上报数据。');
        }
        // return;
      }
      var emVal = '';
      if (!em.message) {
        emVal = JSON.stringify(em);
      } else {
        emVal = em.stack;
      }
      var options = {
        ak: this.statData.ak,
        uuid: this.statData.uuid,
        lt: '31',
        ut: this.statData.ut,
        ch: this.statData.ch,
        mpsdk: this.statData.mpsdk,
        mpv: this.statData.mpv,
        v: this.statData.v,
        em: emVal,
        usv: this.statData.usv,
        t: getTime(),
        p: this.statData.p };

      this.request(options);
    } }]);return Stat;}(Util);


var stat = Stat.getInstance();
var isHide = false;
var lifecycle = {
  onLaunch: function onLaunch(options) {
    stat.report(options, this);
  },
  onReady: function onReady() {
    stat.ready(this);
  },
  onLoad: function onLoad(options) {
    stat.load(options, this);
    // 重写分享，获取分享上报事件
    if (this.$scope && this.$scope.onShareAppMessage) {
      var oldShareAppMessage = this.$scope.onShareAppMessage;
      this.$scope.onShareAppMessage = function (options) {
        stat.interceptShare(false);
        return oldShareAppMessage.call(this, options);
      };
    }
  },
  onShow: function onShow() {
    isHide = false;
    stat.show(this);
  },
  onHide: function onHide() {
    isHide = true;
    stat.hide(this);
  },
  onUnload: function onUnload() {
    if (isHide) {
      isHide = false;
      return;
    }
    stat.hide(this);
  },
  onError: function onError(e) {
    stat.error(e);
  } };


function main() {
  if (true) {
    uni.report = function (type, options) {};
  } else { var Vue; }
}

main();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 55:
/*!********************************************!*\
  !*** F:/工作/KAPP/static/imags/download.jpg ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/jpeg;base64,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"

/***/ }),

/***/ 6:
/*!******************************************************!*\
  !*** ./node_modules/@dcloudio/uni-stat/package.json ***!
  \******************************************************/
/*! exports provided: _from, _id, _inBundle, _integrity, _location, _phantomChildren, _requested, _requiredBy, _resolved, _shasum, _spec, _where, author, bugs, bundleDependencies, deprecated, description, devDependencies, files, gitHead, homepage, license, main, name, repository, scripts, version, default */
/***/ (function(module) {

module.exports = {"_from":"@dcloudio/uni-stat@next","_id":"@dcloudio/uni-stat@2.0.0-26420200313001","_inBundle":false,"_integrity":"sha512-7dPuazTiDmUyRcw+WW+UlWGKH0eeCUB+p0P4pJVKEHjpdXnXgvDQCSdJk764NH99TfsUycnuxecP5oHckVa88g==","_location":"/@dcloudio/uni-stat","_phantomChildren":{},"_requested":{"type":"tag","registry":true,"raw":"@dcloudio/uni-stat@next","name":"@dcloudio/uni-stat","escapedName":"@dcloudio%2funi-stat","scope":"@dcloudio","rawSpec":"next","saveSpec":null,"fetchSpec":"next"},"_requiredBy":["#USER","/","/@dcloudio/vue-cli-plugin-uni"],"_resolved":"https://registry.npmjs.org/@dcloudio/uni-stat/-/uni-stat-2.0.0-26420200313001.tgz","_shasum":"a006e329e033cd412accfa635f8933dbb822a9c3","_spec":"@dcloudio/uni-stat@next","_where":"/Users/guoshengqiang/Documents/dcloud-plugins/release/uniapp-cli","author":"","bugs":{"url":"https://github.com/dcloudio/uni-app/issues"},"bundleDependencies":false,"deprecated":false,"description":"","devDependencies":{"@babel/core":"^7.5.5","@babel/preset-env":"^7.5.5","eslint":"^6.1.0","rollup":"^1.19.3","rollup-plugin-babel":"^4.3.3","rollup-plugin-clear":"^2.0.7","rollup-plugin-commonjs":"^10.0.2","rollup-plugin-copy":"^3.1.0","rollup-plugin-eslint":"^7.0.0","rollup-plugin-json":"^4.0.0","rollup-plugin-node-resolve":"^5.2.0","rollup-plugin-replace":"^2.2.0","rollup-plugin-uglify":"^6.0.2"},"files":["dist","package.json","LICENSE"],"gitHead":"b1fdbafab5dd4673cff64188a5203d0c947e4f50","homepage":"https://github.com/dcloudio/uni-app#readme","license":"Apache-2.0","main":"dist/index.js","name":"@dcloudio/uni-stat","repository":{"type":"git","url":"git+https://github.com/dcloudio/uni-app.git","directory":"packages/uni-stat"},"scripts":{"build":"NODE_ENV=production rollup -c rollup.config.js","dev":"NODE_ENV=development rollup -w -c rollup.config.js"},"version":"2.0.0-26420200313001"};

/***/ }),

/***/ 7:
/*!**********************************************!*\
  !*** F:/工作/KAPP/pages.json?{"type":"style"} ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "pages": { "pages/home/home": { "navigationBarTitleText": "主页" }, "pages/index/index": { "navigationBarTitleText": "消息" }, "pages/car/car": { "navigationBarTitleText": "购物车" }, "pages/me/me": { "navigationBarTitleText": "我" }, "pages/mgou/mgou": { "navigationBarTitleText": "选购商品" }, "pages/Logo/Logo": { "navigationBarTitleText": "选购商品" }, "pages/mgou/buy/Navigationindetail": { "navigationBarTitleText": "选购商品" }, "pages/mgou/buy/drawings": { "navigationBarTitleText": "选购商品" }, "pages/mgou/buy/ProductDetails": { "navigationBarTitleText": "选购商品" }, "pages/mgou/buy/buy": { "navigationBarTitleText": "订单" }, "pages/mgou/buy/ShoppingCart": {}, "pages/mgou/buy/qielxr": {} }, "globalStyle": { "navigationBarTextStyle": "black", "navigationBarTitleText": "uni-app", "navigationBarBackgroundColor": "#F8F8F8", "backgroundColor": "#F8F8F8" } };exports.default = _default;

/***/ }),

/***/ 8:
/*!*********************************************!*\
  !*** F:/工作/KAPP/pages.json?{"type":"stat"} ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = { "appid": "__UNI__1EA9CC4" };exports.default = _default;

/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map