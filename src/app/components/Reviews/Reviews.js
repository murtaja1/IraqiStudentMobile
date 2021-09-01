import React, { useEffect, useState } from "react"
import { ActivityIndicator } from "react-native"
import { View, StyleSheet } from "react-native"
import { Text, Button } from "react-native-elements"
import { fetchData } from "../../api/FetchingData"
import ReviewChild from "./ReviewChild"

function Reviews({ title, url, empty }) {
	const [reviews, setRewiews] = useState()
	const [pageNum, setPageNum] = useState(6)
	const [loading, setLoading] = useState(false)
	useEffect(() => {
		const subUrl = url + `&page=1&page_size=${pageNum}`
		setLoading(true)
		fetchData(setRewiews, subUrl)
	}, [pageNum])

	useEffect(() => {
		// when you recive new reviews set it to false
		setLoading(false)
	}, [reviews])
	return (
		<View>
			<Text style={styles.title}>{title}: </Text>
			{reviews !== undefined ? (
				<>
					{reviews.results.map((review, index) => (
						<ReviewChild review={review} key={index} />
					))}

					{reviews.next !== null && (
						<Button
							title="تحيمل المزيد"
							loading={loading}
							onPress={() => setPageNum(pageNum + 6)}
						/>
					)}
					{reviews.count === 0 && <Text style={styles.empty}>{empty}</Text>}
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
	}
})
