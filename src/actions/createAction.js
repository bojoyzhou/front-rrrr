import { createAction } from 'redux-actions'

export default _createAction

function _createAction(type, status) {
	if (status) {
		return (action) => (dispatch) => {
			return dispatch({
				type,
				status,
				dispatch,
				payload: action
			})
		}
	} else {
		return createAction(type)
	}
}
