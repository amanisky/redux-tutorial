const createStore = require('redux').createStore

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
      return state;
  }
}

// 创建仓库，并将 Reducer 传入 createStore 方法，从而实现 store.dispatch 方法会触发 Reducer 的自动执行
const store = createStore(reducer)

// 发出 Action
store.dispatch(add(3))

// 获取当前状态
console.log(store.getState())