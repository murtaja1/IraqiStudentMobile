import React, { useEffect, useState } from "react"
import { View, StyleSheet } from "react-native"
import { Rating, Text } from "react-native-elements"
import { useSelector } from "react-redux"
import { fetchData } from "../api/FetchingData"
import { sendRating } from "../api/SendingData"
import { navigate } from "../navigation/RootNavigation"

function AppRating({ id }) {
	const [value, setValue] = useState()
	const state = useSelector((state) => state)
	const subUrl = `university_ratings?building__id=${id}`
	const handleSendRating = (rating) => {
		sendRating(setValue, subUrl, state.username, rating, state.refresh, id)
	}
	useEffect(() => {
		fetchData(setValue, subUrl)
	}, [])
	return (
		<View>
			{value !== undefined && (
				<>
					<Text h4 style={styles.value}>
						{value.results[0].ave_rating}
					</Text>
					<Rating
						readonly={state.username === "" ? true : false}
						type="custom"
						startingValue={value.results[0].ave_rating}
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
				</>
			)}
		</View>
	)
}

export default AppRating

const styles = StyleSheet.create({
	infoText: { textAlign: "center", fontSize: 10 },
	value: { textAlign: "center", color: "gold" },
	loginText: { color: "blue", fontWeight: "bold", fontSize: 12 }
})
