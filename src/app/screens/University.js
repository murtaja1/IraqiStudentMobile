import React, { useEffect, useState } from "react"
import { ScrollView } from "react-native"
import { Text } from "react-native-elements"
import { fetchUniversity } from "../api/dataFetching"
import UniversityTable from "../components/UniversityTable"

function University({ route }) {
	const [university, setUniversity] = useState()
	useEffect(() => {
		fetchUniversity(route.params.id, setUniversity)
	}, [])

	return (
		<ScrollView contentContainerStyle={{ alignItems: "center", margin: 10 }}>
			{university !== undefined && (
				<>
					<UniversityTable university={university} />
					<Text style={{ paddingTop: 10, marginBottom: 10 }}>{university.data.description}</Text>
				</>
			)}
		</ScrollView>
	)
}

export default University
