import { Formik } from "formik"
import React from "react"
import { View, StyleSheet, Text, TextInput, Button } from "react-native"
import * as yup from "yup"

const loginSchema = yup.object({
	username: yup.string().required("يجب ان تكتب اسم المستخدم"),
	password: yup.string().required("يجب ان تكتب رمز المرور")
})

function LogIn() {
	return (
		<View style={styles.container}>
			<Formik
				validationSchema={loginSchema}
				initialValues={{
					username: "",
					password: ""
				}}
				onSubmit={(values) => console.log(values)}>
				{(props) => (
					<View>
						<Text>ادخل اسم المستخدم: </Text>
						<TextInput
							style={styles.input}
							placeholder="الاسم"
							onChangeText={props.handleChange("username")}
							value={props.values.username}
						/>
						{props.touched.username && <Text style={styles.error}>{props.errors.username}</Text>}
						<Text>ادخل رمز المرور: </Text>
						<TextInput
							style={styles.input}
							placeholder="رمز المرور"
							onChangeText={props.handleChange("password")}
							value={props.values.password}
							keyboardType="numeric"
						/>
						{props.touched.username && <Text style={styles.error}>{props.errors.password}</Text>}

						<Button onPress={props.handleSubmit} title="تسجيل الدخول" />
					</View>
				)}
			</Formik>
		</View>
	)
}

export default LogIn

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
