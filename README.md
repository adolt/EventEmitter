# EventEmitter

## 介绍

一个简单的 EventEmitter，实现了简单的事件注册、调用、移除，支持Node.js 和浏览器环境运行


## 使用

```html
<script src="path/EventEmitter.js"></script>
```

或者

```js
import eventEmitter from 'path/EventEmitter.js'
```

## API

```js
var ee = new EventEmitter();
```

### on

添加一个事件监听器，支持链式调用

```js
ee.on(eventName, listener)
```

* eventName 事件名称
* listener 监听器函数

### off

删除一个事件监听器，支持链式调用

```js
ee.on(eventName, listener)
```

* eventName 事件名称
* listener 监听器函数

### once

添加一个只能触发一次的事件监听器，支持链式调用

```js
ee.once(eventName, listener)
```

* eventName 事件名称
* listener 监听器函数

### emit

触发事件，支持链式调用

```js
ee.emit(eventName, args)
```

* eventName 事件名称
* arg 数组形式，传入事件监听器的参数

### allOff

删除某个事件或者所有事件

```js
ee.allOff(eventName)
```

* eventName 事件名称 如果不传，则删除所有事件
