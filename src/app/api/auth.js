import axios from "axios"
import Const from "../Const"
import { navigate } from "../navigation/RootNavigation"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as t from "../redux/types"

export const handleSendEmail = (email, setRequestFail) => {
	axios({
		url: Const.mainUrl + "api/password_reset/",
		method: "post",
		headers: {
			"Content-Type": "application/json"
		},
		data: {
			email: email
		}
	})
		.then(() => navigate("setNewPW"))
		.catch(() => setRequestFail(true))
}

export const handleSetNewPW = (values, setRequestFail) => {
	axios({
		url: Const.mainUrl + "api/password_reset/confirm/",
		method: "post",
		headers: {
			"Content-Type": "application/json"
		},
		data: {
			token: values.token,
			password: values.password
		}
	})
		.then(() => navigate("login2"))
		.catch((err) => {
			if (err.response.data.token) {
				setRequestFail({ email: true, password: false })
			} else {
				setRequestFail({ email: false, password: true })
			}
		})
}

export const handleRegister = (values, resetForm, setError) => {
	axios({
		url: Const.mainUrl + "register",
		method: "post",
		data: {
			username: values.username,
			email: values.email,
			password: values.password,
			password2: values.password2
		},
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		}
	})
		.then(() => {
			resetForm()
			navigate("login")
		})
		.catch((err) => {
			const errMessage = err.response.data
			// to avoid setting useState for error
			const dubleErr = { email: false, username: false }
			console.log(errMessage)
			if (errMessage.email) dubleErr.email = true
			if (errMessage.username) dubleErr.username = true
			setError(dubleErr)
		})
}

export const handleLogin = (dispatch, credentials) => {
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
		.catch(() => {
			dispatch({
				type: t.fetchToken,
				payload: { username: "", fail: true, access: "", refresh: "" }
			})
		})
}
