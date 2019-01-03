
const { applyMiddleware, createStore, combineReducers } = require('redux')
const { createLogger } = require('redux-logger')
const logger = createLogger()
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
const store = createStore(
  reducer,
  applyMiddleware(logger)
)

store.dispatch(increment(100))