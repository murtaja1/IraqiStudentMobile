import React, { useEffect, useState } from "react"
import { ActivityIndicator } from "react-native"
import { View, StyleSheet } from "react-native"
import { Text, Button } from "react-native-elements"
import { useSelector } from "react-redux"
import { fetchData } from "../../api/FetchingData"
import ReviewChild from "./ReviewChild"
import AddReview from "./AddReview"
import { navigate } from "../../navigation/RootNavigation"

function Reviews({ title, url, empty, id }) {
	const [reviews, setRewiews] = useState()
	const [pageNum, setPageNum] = useState(6)
	const [loading, setLoading] = useState(false)
	const state = useSelector((state) => state.username)

	const handleFetching = () => {
		const subUrl = url + `?building__id=${id}&page=1&page_size=${pageNum}`
		setLoading(true)
		fetchData(setRewiews, subUrl)
	}
	useEffect(() => {
		handleFetching()
	}, [pageNum])

	useEffect(() => {
		// when you receive new reviews set it to false
		setLoading(false)
	}, [reviews])
	return (
		<View>
			<Text style={styles.title}>{title}: </Text>
			{reviews !== undefined ? (
				<>
					{reviews.results.map((review, index) => (
						<ReviewChild
							handleFetching={handleFetching}
							review={review}
							url={url}
							buildingId={id}
							key={index}
						/>
					))}

					{reviews.next !== null && (
						<Button
							title="تحيمل المزيد"
							loading={loading}
							onPress={() => setPageNum(pageNum + 6)}
						/>
					)}
					{reviews.count === 0 && <Text style={styles.empty}>{empty}</Text>}
					{state != "" ? (
						<View style={{ paddingTop: 20 }}>
							<AddReview subUrl={url} id={id} handleFetching={handleFetching} />
						</View>
					) : (
						<Text style={styles.infoText}>
							يرجىء{" "}
							<Text onPress={() => navigate("login")} style={styles.loginText}>
								تسجيل الدخول
							</Text>{" "}
							لكتابت مراجعة
						</Text>
					)}
				</>
			) : (
				<ActivityIndicator color="blue" />
			)}
		</View>
	)
}

export default Reviews
const styles = StyleSheet.create({
	title: {
		fontSize: 20,
		fontWeight: "bold",
		paddingVertical: 10
	},
	empty: {
		fontSize: 15,
		paddingRight: 10,
		paddingTop: 5,
		color: "red",
		textAlign: "center"
	},
	loginText: { color: "blue", fontWeight: "bold", fontSize: 20 },
	infoText: { color: "red", textAlign: "center", fontSize: 20 }
})
