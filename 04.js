const { createStore, combineReducers } = require('redux')
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