import { Formik } from "formik"
import React from "react"
import { View, StyleSheet, Text, TextInput, Button } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { FetchToken } from "../redux/actions/FetchToken"
import { loginSchema } from "../utilities/YupSchemas"

function LogIn() {
	const dispatch = useDispatch()
	const state = useSelector((state) => state.fail)

	return (
		<View style={styles.container}>
			{state && <Text style={styles.error}>اسم المستخدم او رمز المرور غير صحيح! </Text>}
			<Formik
				validationSchema={loginSchema}
				initialValues={{
					username: "",
					password: ""
				}}
				onSubmit={(values) => {
					dispatch(FetchToken(values))
				}}>
				{({ handleChange, errors, values, handleSubmit, touched }) => (
					<View>
						<Text>ادخل اسم المستخدم: </Text>
						<TextInput
							style={styles.input}
							placeholder="الاسم"
							onChangeText={handleChange("username")}
							value={values.username}
						/>
						{touched.username && errors.username && (
							<Text style={styles.error}>{errors.username}</Text>
						)}
						<Text>ادخل رمز المرور: </Text>
						<TextInput
							secureTextEntry={true}
							style={styles.input}
							placeholder="رمز المرور"
							onChangeText={handleChange("password")}
							value={values.password}
						/>
						{touched.password && errors.password && (
							<Text style={styles.error}>{errors.password}</Text>
						)}

						<Button onPress={handleSubmit} title="تسجيل الدخول" />
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
