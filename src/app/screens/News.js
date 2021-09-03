import React, { useEffect, useState } from "react"
import { ScrollView, ActivityIndicator, StyleSheet, View } from "react-native"
import { Text, Image } from "react-native-elements"
import { fetchData } from "../api/FetchingData"
import Reviews from "../components/Reviews/Reviews"

function News({ route }) {
	const [news, setNews] = useState()
	const routeId = route.params.id
	useEffect(() => {
		fetchData(setNews, `news/${routeId}`)
	}, [])
	return (
		<ScrollView contentContainerStyle={{ margin: 10 }}>
			{news !== undefined ? (
				<>
					<Text style={styles.title}>{news.card_text}</Text>
					<Image
						onPress={() => handleNavigate(item)}
						source={{
							uri: news.card_image
						}}
						style={styles.image}
						PlaceholderContent={<ActivityIndicator />}
					/>
					<Text style={styles.description}>{news.description}</Text>
					<Reviews
						title={`التعليقات`}
						url="news_reviews"
						id={routeId}
						empty={`لا تعليقات حتى الان! ${"\n"} (كون اول المعلقين)`}
					/>
					<View style={{ marginBottom: 50 }}></View>
				</>
			) : (
				<ActivityIndicator color="blue" />
			)}
		</ScrollView>
	)
}

export default News

const styles = StyleSheet.create({
	title: {
		fontSize: 20
	},
	image: { height: 200, width: "100%", marginVertical: 5 },
	description: {
		paddingTop: 10,
		fontSize: 15,
		marginBottom: 20
	}
})
