import React, { useEffect, useState } from "react"
import { View, StyleSheet } from "react-native"
import { Text, Button } from "react-native-elements"
import { Icon } from "react-native-elements/dist/icons/Icon"
import { fetchData } from "../../api/FetchingData"

function Reviews({ title, url }) {
	const [reviews, setRewiews] = useState()
	const [pageNum, setPageNum] = useState(3)
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
			{reviews !== undefined && (
				<>
					{reviews.results.map((review, index) => (
						<Child review={review} key={index} />
					))}

					{reviews.next !== null && (
						<Button
							title="تحيمل المزيد"
							loading={loading}
							onPress={() => setPageNum(pageNum + 3)}
						/>
					)}
				</>
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
	}
})

const Child = ({ review }) => {
	return (
		<View style={{ borderWidth: 1, borderColor: "lightgray", borderRadius: 3, marginBottom: 10 }}>
			<View
				style={{
					flex: 1,
					flexDirection: "row-reverse",
					justifyContent: "space-between",
					alignItems: "center"
				}}>
				<Text
					style={{
						fontSize: 15,
						fontWeight: "bold",
						textAlign: "right",
						paddingRight: 5
					}}>
					{review.username}
					<Icon name="user" iconStyle={{ paddingLeft: 5 }} size={10} color="#000" type="entypo" />
				</Text>
				<Icon
					onPress={() => console.log(review.id)}
					name="dots-three-vertical"
					size={15}
					color="#000"
					type="entypo"
				/>
			</View>
			<Text style={{ fontSize: 15, paddingHorizontal: 5 }}>{review.review}</Text>
		</View>
	)
}
