import axios from "axios"
import Const from "../Const"
import { navigate } from "../navigation/RootNavigation"

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
