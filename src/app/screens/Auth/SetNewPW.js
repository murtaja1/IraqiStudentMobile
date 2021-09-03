import { Formik } from "formik"
import React from "react"
import { useState } from "react"
import { View, StyleSheet, Text, TextInput, TouchableHighlight } from "react-native"
import { handleSetNewPW } from "../../api/auth"

import { setNewPWSchema } from "../../utilities/YupSchemas"

function SetNewPW() {
	const [requestFail, setRequestFail] = useState({ token: false, password: false })

	return (
		<View style={styles.container}>
			<Formik
				validationSchema={setNewPWSchema}
				initialValues={{
					token: "",
					password: ""
				}}
				onSubmit={(values) => {
					handleSetNewPW(values, setRequestFail)
				}}>
				{({ handleChange, errors, values, handleSubmit, touched }) => (
					<View>
						<Text>يرجى ادخال الرمز الذي تم ارساله: </Text>
						<TextInput
							style={styles.input}
							placeholder="الرمز"
							onChangeText={handleChange("token")}
							value={values.token}
						/>
						{requestFail.token && <Text style={styles.error}>هذا الرمز غير صالح للاستخدام!</Text>}
						{touched.token && errors.token && <Text style={styles.error}>{errors.token}</Text>}
						<Text>كلمة المرور جديده: </Text>
						<TextInput
							secureTextEntry={true}
							style={styles.input}
							placeholder="كلمة المرور"
							onChangeText={handleChange("password")}
							value={values.password}
						/>
						{requestFail.password && <Text style={styles.error}>يرجى ادخال كلمة مرور اقوى!</Text>}
						{touched.password && errors.password && (
							<Text style={styles.error}>{errors.password}</Text>
						)}
						<View style={styles.btnContainer}>
							<TouchableHighlight
								activeOpactity={0.9}
								style={styles.submitBtn}
								underlayColor={"#2b6369"}
								onPress={handleSubmit}>
								<Text style={styles.btnText}>ارسال</Text>
							</TouchableHighlight>
						</View>
					</View>
				)}
			</Formik>
		</View>
	)
}

export default SetNewPW
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
	btnContainer: {
		alignItems: "center",
		flexDirection: "row-reverse"
	}
})
