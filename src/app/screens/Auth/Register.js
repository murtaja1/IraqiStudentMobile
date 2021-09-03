import { Formik } from "formik"
import React, { useState } from "react"
import { Text, TextInput, View, StyleSheet, ScrollView, TouchableHighlight } from "react-native"
import { registerSchema } from "../../utilities/YupSchemas"
import { handleRegister } from "../../api/auth"
import { navigate } from "../../navigation/RootNavigation"

function Register() {
	const [error, setError] = useState({ email: false, username: false })

	return (
		<ScrollView style={styles.container}>
			<Formik
				validationSchema={registerSchema}
				initialValues={{ username: "", email: "", password: "", password2: "" }}
				onSubmit={(values, { resetForm }) => {
					handleRegister(values, resetForm, setError)
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
						<View style={styles.rgstBtnContainer}>
							<TouchableHighlight
								activeOpactity={0.9}
								style={styles.submitBtn}
								underlayColor={"#2b6369"}
								onPress={handleSubmit}>
								<Text style={styles.btnText}>انشاء حساب</Text>
							</TouchableHighlight>
						</View>
						<View style={styles.loginTextContainer}>
							<Text style={{ fontSize: 17 }}>هل لديك حساب مسبقاً؟</Text>
							<Text style={styles.loginText} onPress={() => navigate("login")}>
								تسجيل الدخول
							</Text>
						</View>
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
	rgstBtnContainer: { flexDirection: "row-reverse" },
	error: {
		textAlign: "center",
		color: "crimson",
		marginBottom: 10
	},
	loginTextContainer: {
		alignItems: "center",
		paddingTop: 10
	},
	loginText: {
		color: "blue",
		paddingTop: 5,
		fontSize: 15
	},
	submitBtn: {
		backgroundColor: "#297F87",
		width: 100,
		height: 35,
		borderRadius: 6,
		justifyContent: "center",
		alignItems: "center"
	},
	btnText: {
		color: "#fff"
	}
})
