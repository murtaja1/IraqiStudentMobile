import React, { useEffect, useState } from "react"
import { View } from "react-native"
import { ScrollView, StyleSheet } from "react-native"
import { Text } from "react-native-elements"
import { fetchData, fetchUniversity } from "../api/FetchingData"
import Reviews from "../components/Reviews/Reviews"
import UniversityTable from "../components/UniversityTable"

function University({ route }) {
	const [university, setUniversity] = useState()
	const [collages, setCollages] = useState()
	useEffect(() => {
		fetchUniversity(route.params.id, setUniversity)
	}, [])

	useEffect(() => {
		if (university !== undefined) {
			fetchData(setCollages, `collages?university__name=${university.data.name}`)
		}
	}, [university])
	return (
		<ScrollView contentContainerStyle={{ margin: 10 }}>
			{university !== undefined && (
				<>
					<UniversityTable university={university} id={route.params.id} />
					<Text style={styles.title}>كليات {university.data.name}:</Text>
					{collages !== undefined && (
						<>
							{collages.results.map((collage, index) => (
								<Text key={index} style={styles.collagesText}>
									{index + 1}- {collage.name}
								</Text>
							))}
							{collages.count === 0 && (
								<Text style={styles.noCollText}>لم يتم ادراج اي كلية حاليا!</Text>
							)}
						</>
					)}
					<Text style={styles.title}>معلومات أكثر: </Text>
					<Text>{university.data.description}</Text>
					<Reviews
						title={`مراجعات ${university.data.name}`}
						url={`university_reviews?building__id=${route.params.id}`}
						empty={`لا مراجعات حتى الان! ${"\n"} (كون اول المراجعين)`}
					/>
					<View style={{ marginBottom: 50 }}></View>
				</>
			)}
		</ScrollView>
	)
}

export default University

const styles = StyleSheet.create({
	title: {
		fontSize: 20,
		fontWeight: "bold",
		paddingTop: 10
	},
	collagesText: { paddingRight: 10, fontSize: 20 },
	noCollText: { fontSize: 15, paddingRight: 10, paddingTop: 5, color: "red" }
})
