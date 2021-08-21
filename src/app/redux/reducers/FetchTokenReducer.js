import * as t from "../types"

const FetchTokenReducer = (state = {}, action) => {
	switch (action.type) {
		case t.fetchToken:
			state = { username: action.payload }
			return state
		default:
			return state
	}
}

export default FetchTokenReducer
