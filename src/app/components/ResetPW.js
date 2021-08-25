import axios from "axios"
import { Formik } from "formik"
import React from "react"
import { View, StyleSheet, Text, TextInput, TouchableHighlight } from "react-native"
import Const from "../Const"
import { resetPWSchema } from "../utilities/YupSchemas"

function ResetPW() {
	const handleSubmit = (email) => {
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
			.then((res) => console.log(res))
			.catch((error) => JSON.stringify(error))
	}
	return (
		<View style={styles.container}>
			<Formik
				validationSchema={resetPWSchema}
				initialValues={{
					email: ""
				}}
				onSubmit={(values) => {
					handleSubmit(values.email)
				}}>
				{({ handleChange, errors, values, handleSubmit, touched }) => (
					<View>
						<Text>ادخل الايميل الخاص بك ليتم ارسال رمز التحقق: </Text>
						<TextInput
							style={styles.input}
							placeholder="الاسم"
							onChangeText={handleChange("email")}
							value={values.email}
						/>
						{touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
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

export default ResetPW
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
