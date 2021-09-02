import { Formik } from "formik"
import React, { useState } from "react"
import { View, StyleSheet, TextInput } from "react-native"
import { Text, Button } from "react-native-elements"
import { useSelector } from "react-redux"
import { sendReview } from "../../api/SendingData"
import { reviewSchema } from "../../utilities/YupSchemas"

function AddReview({ subUrl, id, handleFetching }) {
	const [loading, setLoading] = useState(false)
	const state = useSelector((state) => state)

	const handleSendReview = (text, resetForm) => {
		setLoading(true)
		sendReview(text, subUrl, state.refresh, state.username, id).then(() => {
			handleFetching()
			setLoading(false)
			resetForm()
		})
	}
	return (
		<View>
			<Formik
				validationSchema={reviewSchema}
				initialValues={{
					text: ""
				}}
				onSubmit={(values, { resetForm }) => {
					handleSendReview(values.text, resetForm)
				}}>
				{({ handleChange, values, handleSubmit }) => (
					<View>
						<Text style={styles.title}>أترك مراجعة:</Text>
						<TextInput
							multiline
							maxHeight={100}
							style={styles.input}
							placeholder="اكتب..."
							onChangeText={handleChange("text")}
							value={values.text}
						/>
						<View style={styles.btnContainer}>
							<Button
								loading={loading}
								disabled={values.text === ""}
								title="ارسال"
								onPress={handleSubmit}
							/>
						</View>
					</View>
				)}
			</Formik>
		</View>
	)
}

export default AddReview

const styles = StyleSheet.create({
	title: {
		fontSize: 20,
		fontWeight: "bold",
		paddingVertical: 10
	},
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
	btnContainer: {
		alignItems: "center",
		flexDirection: "row-reverse"
	}
})
