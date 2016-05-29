export function createAction(type, status) {
	if (status) {
		return (...args) => (dispatch) => {
			return dispatch({
				type,
				status,
				dispatch,
				payload: {
					...args
				}
			})
		}
	} else {
		return (...args) => {
			return {
				type,
				status,
				payload: {
					...args
				}
			}
		}
	}
}