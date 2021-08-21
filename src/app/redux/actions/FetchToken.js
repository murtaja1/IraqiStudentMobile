import axios from "axios"
import * as t from "../types"
import Const from "../../Const"
import { navigate } from "../../navigation/RootNavigation"

export const FetchToken = (credentials) => {
	return (dispatch) => {
		axios({
			method: "post",
			url: Const.mainUrl + "api/token/",
			data: {
				username: credentials.username,
				password: credentials.password
			},
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			}
		})
			.then((data) => {
				navigate("Home")
				dispatch({
					type: t.fetchToken,
					payload: credentials.username
				})
			})
			.catch((err) => {
				dispatch({
					type: t.fetchToken,
					payload: null
				})
				console.log(err)
			})
	}
}
