import React, { useEffect, useState } from "react"
import { ActivityIndicator, ScrollView, View, StyleSheet } from "react-native"
import { fetchData } from "../api/FetchingData"
import CollageTable from "../components/CollageTable"
import { Text } from "react-native-elements"
import Reviews from "../components/Reviews/Reviews"

function Collage({ route }) {
	const [collage, setCollage] = useState()
	useEffect(() => {
		const { university, collage } = route.params
		fetchData(setCollage, `collagesdetail?university__name=${university}&name=${collage}`)
	}, [])

	return (
		<ScrollView contentContainerStyle={{ margin: 10 }}>
			{collage !== undefined ? (
				<View style={{ marginBottom: 40 }}>
					<CollageTable collage={collage.results[0]} university={route.params.university} />
					<Text style={styles.title}>معلومات أكثر: </Text>
					<Text>{collage.results[0].description}</Text>
					<Reviews
						title={`مراجعات ${collage.results[0].name}`}
						url="collage_reviews"
						id={collage.results[0].id}
						empty={`لا مراجعات حتى الان! ${"\n"} (كون اول المراجعين)`}
					/>
				</View>
			) : (
				<ActivityIndicator color="blue" />
			)}
		</ScrollView>
	)
}

export default Collage

const styles = StyleSheet.create({
	title: {
		fontSize: 20,
		fontWeight: "bold",
		paddingTop: 10
	}
})
