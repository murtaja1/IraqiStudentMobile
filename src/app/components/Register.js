import { Formik } from "formik"
import * as yup from "yup"
import React from "react"
import { Text, TextInput, View, StyleSheet, Button, ScrollView } from "react-native"

function Register() {
	const registerSchema = yup.object({
		username: yup.string().required("يجب ان تكتب اسم المستخدم"),
		email: yup.string().email("يجب أن يكون عنوان البريد صالح للاستخدام!"),
		password: yup.string().required("يجب ان تكتب رمز المرور"),
		password2: yup.string().oneOf([yup.ref("password"), null], "رمز المرور غير متطابق!")
	})
	return (
		<ScrollView style={styles.container}>
			<Formik
				validationSchema={registerSchema}
				initialValues={{ username: "", email: "", password: "", password2: "" }}
				onSubmit={(values) => console.log(values)}>
				{(props) => (
					<View>
						<TextInput
							style={styles.input}
							placeholder="اسم المستخدم"
							onChangeText={props.handleChange("username")}
						/>
						{props.touched.username && <Text style={styles.error}>{props.errors.username}</Text>}

						<TextInput
							style={styles.input}
							placeholder="عنوان البريد"
							onChangeText={props.handleChange("email")}
						/>
						{props.touched.email && <Text style={styles.error}>{props.errors.email}</Text>}

						<TextInput
							style={styles.input}
							placeholder="رمز المرور"
							onChangeText={props.handleChange("password")}
						/>
						{props.touched.password && <Text style={styles.error}>{props.errors.password}</Text>}

						<TextInput
							style={styles.input}
							placeholder="تأكيد رمز المرور"
							onChangeText={props.handleChange("password2")}
						/>
						{props.touched.password2 && <Text style={styles.error}>{props.errors.password2}</Text>}

						<Button onPress={props.handleSubmit} title="انشاء حساب" />
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
