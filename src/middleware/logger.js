import configure from '../store'
export default store => next => action => {
    // console.log('action')
    // console.info(action.type)
    const state = next(action)
    // console.log('state')
    // console.info(store.getState())
    return state
}
