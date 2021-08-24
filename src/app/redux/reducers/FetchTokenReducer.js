import * as t from "../types"

const FetchTokenReducer = (
	state = { username: "", fail: false, access: "", refresh: "" },
	action
) => {
	switch (action.type) {
		case t.fetchToken:
			state = {
				username: action.payload.username,
				fail: action.payload.fail,
				access: action.payload.access,
				refresh: action.payload.refresh
			}
			return state
		case t.retrieveTokens:
			state = {
				username: action.payload.username,
				fail: action.payload.fail,
				access: action.payload.access,
				refresh: action.payload.refresh
			}
			return state
		default:
			return state
	}
}

export default FetchTokenReducer
