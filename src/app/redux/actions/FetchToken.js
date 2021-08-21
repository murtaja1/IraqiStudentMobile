import axios from "axios"
import * as t from "../types"
import Const from "../../Const"

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
				console.log(data.status)
				dispatch({
					type: t.fetchToken,
					payload: credentials.username
				})
			})
			.catch((err) =>
				dispatch({
					type: t.fetchToken,
					payload: false
				})
			)
	}
}
