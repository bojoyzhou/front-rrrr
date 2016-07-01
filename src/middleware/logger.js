import configure from '../store'
export default store => next => action => {
    const state = next(action)
    console.log('action')
    console.log(action)
    console.log('state')
    console.log(store.getState())
    return state
}
