import React from "react"
import { View, TouchableOpacity, Linking, StyleSheet } from "react-native"
import { DataTable } from "react-native-paper"
import { Text, Image } from "react-native-elements"
import AppRating from "./AppRating"

const tableTitle = ["التأسيس", "المحافظة", "الرئيس", "عدد الكليات", "عدد الطلاب"]

function UniversityTable({ university }) {
	const tableContent = [
		university.establishment,
		university.province,
		university.president,
		university.collages_num,
		university.students_num
	]
	return (
		<>
			<DataTable style={styles.wrapperBorder}>
				<Text style={styles.title} h4>
					{university.name}
				</Text>
				<View style={{ alignItems: "center" }}>
					<Image source={{ uri: university.logo }} style={{ width: 100, height: 100 }} />
				</View>
				<AppRating id={university.id} building="university_ratings" />
				<DataTable.Row style={styles.tableBorder}>
					<DataTable.Cell numeric="center">
						<Text>
							{university.country}
							{"  "}
							<Image
								source={{
									uri: "https://iraqistudent.s3.us-east-2.amazonaws.com/images/03/04/21/iraq-flag-xs.jpg"
								}}
								style={{ width: 30, height: 20 }}
							/>
						</Text>
					</DataTable.Cell>
					<DataTable.Cell numeric>البلد</DataTable.Cell>
				</DataTable.Row>
				{tableTitle.map((title, index) => (
					<DataTable.Row key={index} style={styles.tableBorder}>
						<DataTable.Cell numeric="center">
							<Text>{tableContent[index]}</Text>
						</DataTable.Cell>
						<DataTable.Cell numeric>{title}</DataTable.Cell>
					</DataTable.Row>
				))}

				<DataTable.Row style={styles.tableBorder}>
					<DataTable.Cell numeric="center">
						<TouchableOpacity onPress={() => Linking.openURL(university.website)}>
							<Text style={{ color: "blue" }}>اضغط هنا</Text>
						</TouchableOpacity>
					</DataTable.Cell>
					<DataTable.Cell numeric>الموقع</DataTable.Cell>
				</DataTable.Row>
			</DataTable>
		</>
	)
}

export default UniversityTable

const styles = StyleSheet.create({
	title: {
		paddingTop: 5,
		textAlign: "center"
	},
	wrapperBorder: { borderWidth: 0.5, borderBottomWidth: 0 },
	tableBorder: { borderBottomWidth: 0.5, borderBottomColor: "black" }
})
