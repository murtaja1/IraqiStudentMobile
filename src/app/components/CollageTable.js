import React from "react"
import { TouchableOpacity, Linking, StyleSheet } from "react-native"
import { DataTable } from "react-native-paper"
import { Text } from "react-native-elements"
import AppRating from "./AppRating"
import { navigate } from "../navigation/RootNavigation"
import { collageTableTitle } from "../Const"

function CollageTable({ collage, university }) {
	const tableContent = [collage.students_num, collage.departments_num, collage.establishment]

	return (
		<>
			<DataTable style={styles.wrapperBorder}>
				<Text style={styles.title} h4>
					{collage.name}
				</Text>
				<AppRating id={collage.id} building="collage_ratings" />

				{collageTableTitle.map((title, index) => (
					<DataTable.Row key={index} style={styles.tableBorder}>
						<DataTable.Cell numeric="center">
							<Text>{tableContent[index]}</Text>
						</DataTable.Cell>
						<DataTable.Cell numeric>{title}</DataTable.Cell>
					</DataTable.Row>
				))}

				<DataTable.Row style={styles.tableBorder}>
					<DataTable.Cell numeric="center">
						<TouchableOpacity
							onPress={() => navigate("universitiesDetails", { id: collage.university })}>
							<Text style={{ color: "blue" }}>{university}</Text>
						</TouchableOpacity>
					</DataTable.Cell>
					<DataTable.Cell numeric>الجامعة</DataTable.Cell>
				</DataTable.Row>
				<DataTable.Row style={styles.tableBorder}>
					<DataTable.Cell numeric="center">
						<TouchableOpacity onPress={() => Linking.openURL(collage.website)}>
							<Text style={{ color: "blue" }}>اضغط هنا</Text>
						</TouchableOpacity>
					</DataTable.Cell>
					<DataTable.Cell numeric>الموقع</DataTable.Cell>
				</DataTable.Row>
			</DataTable>
		</>
	)
}

export default CollageTable

const styles = StyleSheet.create({
	title: {
		paddingTop: 5,
		textAlign: "center"
	},
	wrapperBorder: { borderWidth: 0.5, borderBottomWidth: 0 },
	tableBorder: { borderBottomWidth: 0.5, borderBottomColor: "black" }
})
