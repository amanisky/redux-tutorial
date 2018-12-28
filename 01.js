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

const state = reducer(1, add(2))

console.log(state)