const createStore = require('redux').createStore

const initState = 0

// Action 的描述
const INCREMENT = 'INCREMENT'
const DECREMENT = 'DECREMENT'

// Action 的生成函数
function increment (payload) {
  return {
    type: INCREMENT,
    payload
  }
}

function decrement (payload) {
  return {
    type: DECREMENT,
    payload
  }
}

// Reducer 纯函数
function reducer (state = initState, action) {
  switch (action.type) {
    case INCREMENT:
      return state + 1
    case DECREMENT:
      return state - 1
    default:
      return state
  }
}

// createStore 函数接受另一个函数作为参数，返回新生成的 Store 对象
let store = createStore(reducer, 10)

// Store 允许使用 store.subscribe 方法设置监听函数，一旦 State 发生变化，就自动执行这个函数
// 当前时刻的 State，可以通过 store.getState() 拿到
store.subscribe(() => console.log(store.getState()))

// store.dispatch() 是 View 发出 Action 的唯一方法
store.dispatch(increment(1))
store.dispatch(increment(1))
store.dispatch(decrement(1))
