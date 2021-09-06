import React, { useEffect, useState } from "react"
import { ActivityIndicator, ScrollView, View, StyleSheet } from "react-native"
import { Text } from "react-native-elements"
import { Divider } from "react-native-elements/dist/divider/Divider"
import { fetchData } from "../api/FetchingData"
import AppRating from "../components/AppRating"
import Reviews from "../components/Reviews/Reviews"

function Departments({ route }) {
	const [department, setDepartment] = useState()
	const { university, collage, departmentUrl } = route.params
	const subUrl = `department?collage__university__university_name=${university}
  &collage_name=${collage}&name=${departmentUrl}`
	useEffect(() => {
		console.log(university, collage, departmentUrl)
		fetchData(setDepartment, subUrl)
	}, [])
	// useEffect(() => {
	// 	console.log(department)
	// }, [department])
	return (
		<ScrollView contentContainerStyle={{ margin: 10 }}>
			{department !== undefined ? (
				<View style={{ marginBottom: 50 }}>
					<Text style={[styles.title, { textAlign: "center" }]}>{department.results[0].name}</Text>
					<View style={styles.divider}>
						<Divider />
					</View>
					<Text style={styles.description}>{department.results[0].description}</Text>
					<Text style={styles.title}>معلومات اضافية حول القسم:</Text>
					<AppRating id={department.results[0].id} building="department_ratings" />
					<View style={{ marginTop: 20 }}>
						<Reviews
							title={`مراجعات ${department.results[0].name}`}
							url="department_reviews"
							id={department.results[0].id}
							empty={`لا مراجعات حتى الان! ${"\n"} (كون اول المراجعين)`}
						/>
					</View>
				</View>
			) : (
				<ActivityIndicator color="blue" />
			)}
		</ScrollView>
	)
}

export default Departments

const styles = StyleSheet.create({
	title: {
		fontSize: 20,
		fontWeight: "bold",
		paddingTop: 10
	},
	divider: { width: "50%", position: "relative", left: "25%", paddingTop: 10 },
	description: {
		marginTop: 10,
		fontSize: 15
	}
})
