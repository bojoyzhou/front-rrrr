import { handleActions } from 'redux-actions'

const initialState = {
    version: '----'
}

// export default handleActions({
//     'none' (state, action) {
//         return state
//     }
// }, initialState)

export default function CreateState(state = initialState, action) {
    switch (action.type) {
        default:
            return state
    }
}
