(function() {
  // 判断当前执行环境
  var root =
    (typeof self === 'object' && self.self === self && self) ||
    (typeof global === 'object' && global.global === global && global) ||
    this ||
    {};

  function EventEmitter() {
    this.__events = {};
  }

  EventEmitter.VERSION = '1.0.0';

  var proto = EventEmitter.prototype;

  /**
   * 添加事件
   *
   * @param {String} eventName
   * @param {Function} listener
   * @returns {Object}
   */
  proto.on = function(eventName, listener) {
    if (!eventName || !listener) return;

    if (!utils.isValidListener(listener)) {
      throw new TypeError('listener must be a function');
    }

    var events = this.__events;
    var listeners = (events[eventName] = events[eventName] || []);
    var listenerIsWrapped = typeof listener === 'object';

    if (utils.indexOf(listeners, listener) === -1) {
      listeners.push(
        listenerIsWrapped
          ? listener
          : {
              listener: listener,
              once: false
            }
      );
    }
    return this;
  };

  /**
   * 添加一次性事件
   *
   * @param {String} eventName
   * @param {Funtion} listener
   * @returns {Object}
   */
  proto.once = function(eventName, listener) {
    return this.on(eventName, {
      listener: listener,
      once: true
    });
  };

  /**
   * 移除事件
   *
   * @param {String} eventName
   * @param {Function} listener
   * @returns {Object}
   */
  proto.off = function(eventName, listener) {
    var listeners = this.__events[eventName];
    if (!listeners) return;

    var index;
    for (var i = 0; i < listeners.length; i++) {
      if (listeners[i] && listeners[i].listener === listener) {
        index = i;
        break;
      }
    }

    if (typeof index === 'number') {
      listeners.splice(index, 1);
    }
    return this;
  };
  /**
   * 触发事件
   *
   * @param {String} eventName
   * @param {Array} args
   * @returns
   */
  proto.emit = function(eventName, args) {
    var listeners = this.__events[eventName];
    if (!listeners) return;

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      if (listener) {
        listener.listener.apply(this, args || []);
        if (listener.once) {
          this.off(eventName, listener.listener);
        }
      }
    }

    return this;
  };

  /**
   * 移除某一个的所有事件 或 所有事件
   *
   * @param {String} eventName
   */
  proto.allOff = function(eventName) {
    if (eventName && this.__events[eventName]) {
      this.__events[eventName] = [];
    } else {
      this.__events = {};
    }
  };

  var utils = {
    isValidListener: function(listener) {
      if (typeof listener === 'function') {
        return true;
      } else if (listener && typeof listener === 'object') {
        return isValidListener(listener.listener);
      } else {
        return false;
      }
    },
    indexOf: function(array, item) {
      if (array.indexOf) {
        return array.indexOf(item);
      } else {
        var result = -1;
        for (var i = 0; i < array.length; i++) {
          if (array[i] === item) {
            result = i;
            break;
          }
        }
        return result;
      }
    }
  };

  // 导出 EventEmitter
  // 如果是 Node.js 环境
  if (typeof exports !== 'undefined' && !exports.nodeType) {
    // 检查 exports 和 module 的nodeType属性，来确保他们不是 HTML dom元素
    if (typeof module !== 'undefined' && !module.nodeType && module.exports) {
      exports = module.exports = EventEmitter;
    }
    // 兼容对module.exports支持不好的旧的commonJS规范
    // 引用时可以 var EventEmitter = require('My-EventEmitter').EventEmitter
    exports.EventEmitter = EventEmitter;
  } else {
    // 或是浏览器环境
    root.EventEmitter = EventEmitter;
  }
})();
