import * as t from "../types"

const FetchTokenReducer = (state = { username: "" }, action) => {
	switch (action.type) {
		case t.fetchToken:
			state = { username: action.payload }
			return state
		default:
			return state
	}
}

export default FetchTokenReducer
