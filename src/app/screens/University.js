import React, { useEffect, useState } from "react"
import { ScrollView } from "react-native"
import { Text } from "react-native-elements"
import { fetchData, fetchUniversity } from "../api/dataFetching"
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
					<UniversityTable university={university} />
					<Text style={{ fontSize: 20, fontWeight: "bold", paddingTop: 10 }}>
						كليات {university.data.name}:
					</Text>
					{collages !== undefined && (
						<>
							{collages.results.map((collage, index) => (
								<Text key={index} style={{ paddingRight: 10, fontSize: 20 }}>
									{index + 1}- {collage.name}
								</Text>
							))}
							{collages.count === 0 && (
								<Text style={{ fontSize: 15, paddingRight: 10, paddingTop: 5, color: "red" }}>
									لم يتم ادراج اي كلية حاليا!
								</Text>
							)}
						</>
					)}
					<Text style={{ fontSize: 20, fontWeight: "bold", paddingTop: 10 }}>معلومات أكثر: </Text>
					<Text style={{ marginBottom: 10 }}>{university.data.description}</Text>
				</>
			)}
		</ScrollView>
	)
}

export default University
