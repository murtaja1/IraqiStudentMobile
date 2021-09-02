import { Formik } from "formik"
import React, { useState } from "react"
import { View, StyleSheet, TextInput } from "react-native"
import { Text, Button } from "react-native-elements"
import { useSelector } from "react-redux"
import { handleEditReview } from "../../api/SendingData"
import { reviewSchema } from "../../utilities/YupSchemas"

function EditReveiw({ subUrl, buildingId, handleFetching, hideEditModal, text }) {
	const [loading, setLoading] = useState(false)
	const state = useSelector((state) => state)

	const handleSendReview = (text) => {
		setLoading(true)
		handleEditReview(text, subUrl, state.refresh, state.username, buildingId).then(() => {
			handleFetching()
			setLoading(false)
			hideEditModal()
		})
	}
	return (
		<View>
			<Formik
				validationSchema={reviewSchema}
				initialValues={{
					text: text
				}}
				onSubmit={(values) => {
					handleSendReview(values.text)
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
								disabled={values.text === text}
								title="ارسال"
								onPress={handleSubmit}
								containerStyle={{ width: 50 }}
							/>
							{!loading && (
								<Button title="الغاء" onPress={hideEditModal} buttonStyle={styles.cancelBtn} />
							)}
						</View>
					</View>
				)}
			</Formik>
		</View>
	)
}

export default EditReveiw

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
	},
	cancelBtn: { backgroundColor: "#f05164", width: 50, marginRight: 5 }
})
