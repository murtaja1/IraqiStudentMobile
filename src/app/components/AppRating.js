import React, { useEffect, useState } from "react"
import { View, StyleSheet } from "react-native"
import { Rating, Text } from "react-native-elements"
import { useSelector } from "react-redux"
import { fetchRating } from "../api/FetchingData"
import { sendRating } from "../api/SendingData"
import { navigate } from "../navigation/RootNavigation"

function AppRating({ id }) {
	const [value, setValue] = useState(0)
	const state = useSelector((state) => state)
	const subUrl = `university_ratings?building__id=${id}`
	const handleSendRating = (rating) => {
		sendRating(setValue, subUrl, state.username, rating, state.refresh, id)
	}
	useEffect(() => {
		fetchRating(setValue, subUrl)
	}, [])
	return (
		<View>
			<Text h4 style={styles.value}>
				{value !== undefined && value}
			</Text>
			<Rating
				readonly={state.username === "" ? true : false}
				type="custom"
				startingValue={value}
				ratingCount={5}
				imageSize={30}
				tintColor="white"
				ratingBackgroundColor="lightgray"
				onFinishRating={handleSendRating}
			/>
			<Text style={styles.infoText}>
				{state.username === "" ? (
					<Text>
						يرجىء{" "}
						<Text onPress={() => navigate("login")} style={styles.loginText}>
							تسجيل الدخول
						</Text>{" "}
						للتقيم
					</Text>
				) : (
					"للتقييم اضغط على أحدى النجوم"
				)}
			</Text>
		</View>
	)
}

export default AppRating

const styles = StyleSheet.create({
	container: {
		backgroundColor: "red",
		padding: 10
	},
	infoText: { textAlign: "center", fontSize: 10 },
	value: { textAlign: "center", color: "gold" },
	loginText: { color: "blue", fontWeight: "bold", fontSize: 12 }
})
