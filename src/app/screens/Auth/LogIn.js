import { Formik } from "formik"
import React from "react"
import { View, StyleSheet, Text, TextInput, TouchableHighlight } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import { navigate } from "../../navigation/RootNavigation"
import { FetchToken } from "../../redux/actions/FetchToken"
import { loginSchema } from "../../utilities/YupSchemas"
import global from "../../styles/global"

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
						<View style={styles.loginContainer}>
							<TouchableHighlight
								activeOpactity={0.9}
								style={styles.submitBtn}
								underlayColor={"#2b6369"}
								onPress={handleSubmit}>
								<Text style={styles.btnText}>تسجيل الدخول</Text>
							</TouchableHighlight>

							<Text style={styles.restText} onPress={() => navigate("resetPW")}>
								نسيت كلمة المرور؟
							</Text>
						</View>
						<View style={styles.rgstTextContainer}>
							<Text style={{ fontSize: 17 }}>ليس لديك حساب مسبقاً؟</Text>
							<Text style={styles.rgstText} onPress={() => navigate("register")}>
								أنشاء حساب
							</Text>
						</View>
					</View>
				)}
			</Formik>
		</View>
	)
}

export default LogIn

const styles = StyleSheet.create({
	input: global.input,
	container: {
		marginTop: 30,
		margin: 10
	},
	error: {
		textAlign: "center",
		color: "crimson",
		marginBottom: 10
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
	},
	loginContainer: {
		alignItems: "center",
		flexDirection: "row-reverse"
	},
	restText: { color: "blue", paddingRight: 10, fontSize: 15 },
	rgstTextContainer: { alignItems: "center", paddingTop: 10 },
	rgstText: { color: "blue", paddingTop: 5, fontSize: 15 }
})
