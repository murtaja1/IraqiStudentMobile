import axios from "axios"
import * as t from "../types"
import Const from "../../Const"
import { navigate } from "../../navigation/RootNavigation"
import AsyncStorage from "@react-native-async-storage/async-storage"

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
			.then(({ data }) => {
				navigate("Home")
				AsyncStorage.setItem("access", data.access)
				AsyncStorage.setItem("refresh", data.refresh)
				AsyncStorage.setItem("username", credentials.username)

				dispatch({
					type: t.fetchToken,
					payload: {
						username: credentials.username,
						fail: false,
						access: data.access,
						refresh: data.refresh
					}
				})
			})
			.catch((err) => {
				dispatch({
					type: t.fetchToken,
					payload: { username: "", fail: true, access: "", refresh: "" }
				})
				console.log(err)
			})
	}
}

export const RetrieveTokens = (credentials) => ({
	type: t.retrieveTokens,
	payload: credentials
})
