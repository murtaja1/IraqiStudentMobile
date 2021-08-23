import { Formik } from "formik"
import * as yup from "yup"
import React, { useState } from "react"
import { Text, TextInput, View, StyleSheet, Button, ScrollView } from "react-native"
import axios from "axios"
import Const from "../Const"

function Register({ navigation }) {
	const [error, setError] = useState({ email: false, username: false })
	const registerSchema = yup.object({
		username: yup
			.string()
			.required("يجب ان تكتب اسم المستخدم")
			.min(6, "يجب ان يكون اسم المستخدم اكثر من 6 احرف")
			.max(64, "يجب ان يكون اسم المستخدم اقل من 64 احرف"),
		email: yup
			.string()
			.required("يجب أن تكتب الايميل الخاص بك!!")
			.email("يجب أن يكون الايميل صالح للاستخدام!"),
		password: yup
			.string()
			.required("يجب ان تكتب رمز المرور")
			.min(6, "يجب ان يكون رمز المرور اكثر من 6 احرف")
			.max(100, "يجب ان يكون رمز المرور اقل من 100 احرف"),
		password2: yup.string().oneOf([yup.ref("password"), null], "رمز المرور غير متطابق!")
	})

	const handleRegister = (values, resetForm) => {
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
			.then((res) => {
				console.log(res)
				resetForm()
				navigation.navigate("login")
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

	return (
		<ScrollView style={styles.container}>
			<Formik
				validationSchema={registerSchema}
				initialValues={{ username: "", email: "", password: "", password2: "" }}
				onSubmit={(values, { resetForm }) => {
					handleRegister(values, resetForm)
				}}>
				{({ handleChange, errors, values, handleSubmit, touched }) => (
					<View>
						<Text>ادخل اسم المستخدم: </Text>
						<TextInput
							style={styles.input}
							placeholder="اسم المستخدم"
							onChangeText={handleChange("username")}
							value={values.username}
						/>
						{/* show only when the submit is hit and there is error to avoid the space when hit submit under the fields */}
						{errors.username && touched.username && (
							<Text style={styles.error}>{errors.username}</Text>
						)}
						{/* server error */}
						{error.username && <Text style={styles.error}>تم أخذ هذا الأسم, ادخل اسم اخر. </Text>}

						<Text>ادخل الايميل: </Text>
						<TextInput
							style={styles.input}
							placeholder="الايميل"
							onChangeText={handleChange("email")}
							value={values.email}
						/>
						{errors.email && touched.email && <Text style={styles.error}>{errors.email}</Text>}
						{error.email && <Text style={styles.error}>تم أخذ هذا الايميل, ادخل ايميل اخر.</Text>}

						<Text>ادخل رمز المرور: </Text>
						<TextInput
							secureTextEntry={true}
							style={styles.input}
							placeholder="رمز المرور"
							onChangeText={handleChange("password")}
							value={values.password}
						/>
						{errors.password && touched.password && (
							<Text style={styles.error}>{errors.password}</Text>
						)}

						<Text>تأكيد رمز المرور: </Text>
						<TextInput
							secureTextEntry={true}
							style={styles.input}
							placeholder="تأكيد رمز المرور"
							onChangeText={handleChange("password2")}
							value={values.password2}
						/>
						{errors.password2 && touched.password2 && (
							<Text style={styles.error}>{errors.password2}</Text>
						)}

						<Button onPress={handleSubmit} title="انشاء حساب" />
					</View>
				)}
			</Formik>
		</ScrollView>
	)
}

export default Register

const styles = StyleSheet.create({
	input: {
		borderColor: "gray",
		borderWidth: 1,
		padding: 10,
		marginTop: 10,
		marginBottom: 10,
		borderRadius: 6,
		textAlign: "right"
	},
	container: {
		marginTop: 30,
		margin: 10
	},
	error: {
		textAlign: "center",
		color: "crimson",
		marginBottom: 10
	}
})
