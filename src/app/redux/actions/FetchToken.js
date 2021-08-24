import * as t from "../types"
import { handleLogin } from "../../api/auth.js"

export const FetchToken = (credentials) => {
	return (dispatch) => {
		handleLogin(dispatch, credentials)
	}
}

export const RetrieveTokens = (credentials) => ({
	type: t.retrieveTokens,
	payload: credentials
})
