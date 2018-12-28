# Redux

### 不需要使用 Redux
+ 如果 UI 层非常简单，没有很多互动，Redux 就是不必要的，用了反而增加复杂性
+ 用户的使用方式非常简单
+ 用户之间没有协作
+ 不需要与服务器大量交互，也没有使用 WebSocket
+ 视图层（View）只从单一来源获取数据

### 需要使用 Redux（即：多交互、多数据资源）
+ 用户的使用方式复杂
+ 不同身份的用户有不同的使用方式（比如普通用户和管理员）
+ 多个用户之间可以协作
+ 与服务器大量交互，或者使用了WebSocket
+ View要从多个来源获取

### 从组件角度看，需要使用 Redux
+ 某个组件的状态需要共享
+ 某个状态需要在任何地方都可以拿到
+ 一个组件需要改变全局状态
+ 一个组件组要改变另一个组件的状态

# 设计思想
+ Web 应用是一个状态机，视图与状态是一一对应的
+ 所有的状态，保存在一个对象里面

# 基本概念和 API

### Store
+ 保存数据的地方，可以把它看成一个容器
+ 整个应用只能有一个 Store
+ Redux 提供 createStore 方法，用来创建 Store
+ createStore 函数接受另一个函数作为参数，返回新生成的 Store 对象
+ createStore 函数还可以接受第二个参数，表示 State 的最初状态；这通常是服务器给出的
+ **注意** 如果提供第二个参数，它会覆盖 Reducer 函数的默认初始值
```js
import { createStore } from 'redux'
const store = createStore(fn)
```

### State
+ Store 对象包含所有数据
+ 某个时点的数据集合就叫做 State
+ 通过 store.getState() 获取当前时刻的 State
+ 一个 State 对应一个 View
+ 知道 State，就知道 View 是什么样，反之亦然
```js
import { createStore } from 'redux'
const store = createStore(fn)
const state = store.getState()
```

### Action
+ State 的变化会导致 View 的变化
+ 用户接触不到 State，只能接触到 View。所以，State 的变化必须是 View 导致的
+ Action 就是 View 发出的通知，表示 State 应该要发生变化了
+ Action 是一个对象。其中的 type 属性是必须的，表示 Action 的名称。其他属性可以自由设置
+ Action 描述当前发生的事情
+ 改变 State 的唯一办法，就是使用 Action，它会运送数据到 Store
```js
const action = {
  type: 'ADD_TODO',
  payload: 'Learn Redux'
}
```

### Action Creator
+ View 要发送多少种消息，就会有多少种 Action，如果都手写，会很麻烦
+ 可以定义一个函数来生成 Action，这个函数就叫 Action Creator
```js
const ADD_TODO = 'ADD_TODO'
function addTodo (text) {
  return {
    type: ADD_TODO,
    text
  }
}
```

### store.dispath()
+ View 发出 Action 的唯一方法
```js
import { createStore } from 'redux'

// 创建仓库
const store = createStore(fn)

// 描述当前 Action 发生的事情
const ADD_TODO = 'ADD_TODO'

// 生成 Action 函数
function addTodo (text) {
  return {
    type: ADD_TODO,
    text
  }
}

// 发出 Action
store.dispath(addTodo('做作业'))
```

### Reducer
+ Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化，这种 State 的计算过程就叫做 Reducer
+ Reducer 是一个纯函数，它接受 Action 和当前 State 作为参数，返回一个新的 State
```js
// 初始化状态
const defaultState = 0

// 描述 Action
const ADD = 'ADD'

// 创建 Action 函数
function add (payload) {
  return {
    type: ADD,
    payload
  }
}

// 通过 Reducer 函数计算后返回新的 State
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD':
      return state + action.payload
    default: 
      return state
  }
}

// 手动调用 reducer
const state = reducer(1, add(2))
```
+ 实际引用中，Reducer 函数不用像上面代码中手动调用，store.dispatch 方法会触发 Reducer 的自动执行，因此，Store 需要知道 Reducer 函数，做法就是在生成 Store 的时候，将 Reducer 传入 createStore 方法
```js
import { createStore } from 'redux'

// 初始化状态
const defaultState = 0

// 描述 Action
const ADD = 'ADD'

// 创建 Action 函数
function add (payload) {
  return {
    type: ADD,
    payload
  }
}

// 通过 Reducer 函数计算后返回新的 State
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD':
      return state + action.payload
    default: 
      return state
  }
}

// 创建仓库
const store = createStore(reducer)

// 发出 Action
store.dispatch(add(3))

// 获取当前状态
console.log(store.getState())
```

### store.subscribe()
+ Store 允许使用 store.subscribe 方法设置监听函数，一旦 State 发生变化，就自动执行这个函数
+ store.subscribe 方法返回一个函数，调用这个函数就可以解除监听

### combineReducers 辅助函数
+ Reducer 函数负责生成 State
+ 由于整个应用只有一个 State 对象，包含所有数据，对于大型应用来说，这个 State 必然十分庞大，导致 Reducer 函数也十分庞大
+ Redux 提供了一个 combineReducers 方法，用于 Reducer 的拆分
```js
const createStore = require('redux').createStore
const combineReducers = require('redux').combineReducers
const firstNamedReducer = (state = 1, action) => state
const secondNamedReducer = (state = 1, action) => state
const thirdNamedReducer = (state = 1, action) => state
const rootReducer = combineReducers({
  one: firstNamedReducer,
  secondNamedReducer,
  thirdNamedReducer
})
const store = createStore(rootReducer, { one: 10 })
console.log(store.getState())
```

### Reducer 异步操作
+ Action 发出以后，Reducer 立即算出 State，这叫做同步
+ Action 发出以后，过一段时间再执行 Reducer，这叫做异步
+ 怎么才能 Reducer 在异步操作结束后自动执行呢？这就要用中间件（middleware）applyMiddleware 辅助函数
+ 中间件的雏形：对 store.dispatch 进行改造
+ 注意：中间件的书写顺序

# 纯函数
+ 只要是同样的输入，必定得到同样的输出
+ 纯函数是函数式编程的概念，必须遵守以下约束
  + 不得改写参数
  + 不能调用系统 I/O 的 API
  + 不能调用 Date.now() 或 Math.random() 等不纯的方法，因为每次会得到不一样的结果
+ 由于 Reducer 是纯函数，就可以保证同样的 State 必定得到同样的 View，因此 Reducer 函数里面不能改变 State，必须返回一个全新的对象
```js
// State 是一个对象
function reducer (state, action) {
  return Object.assign({}, state, { 改变的属性 })
  // 或者
  return { ...state, ...newState }
}

// State 是一个数组
function reducer (state, action) {
  return [...state, newItem]
}
```
+ 【建议】最好把 State 对象设成只读，那么就无法改变它，要得到新的 State，唯一的办法就是生成新对象；这样的好处是：任何时候，与某个 View 对应的 State 总是一个不可变的对象
