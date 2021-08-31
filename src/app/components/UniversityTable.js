import React from "react"
import { View, TouchableOpacity, Linking, StyleSheet } from "react-native"
import { DataTable } from "react-native-paper"
import { Text, Image } from "react-native-elements"
import AppRating from "./AppRating"

const sideTableTitle = ["التأسيس", "المحافظة", "الرئيس", "عدد الكليات", "عدد الطلاب"]

function UniversityTable({ university, id }) {
	return (
		<>
			<DataTable style={styles.wrapperBorder}>
				<Text style={styles.title} h4>
					{university.data.name}
				</Text>
				<View style={{ alignItems: "center" }}>
					<Image source={{ uri: university.data.logo }} style={{ width: 100, height: 100 }} />
				</View>
				<AppRating id={id} />
				<DataTable.Row style={styles.tableBorder}>
					<DataTable.Cell numeric="center">
						<Text>
							{university.data.country}
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
				{sideTableTitle.map((title, index) => (
					<DataTable.Row key={index} style={styles.tableBorder}>
						<DataTable.Cell numeric="center">
							<Text>{university.tableContent[index]}</Text>
						</DataTable.Cell>
						<DataTable.Cell numeric>{title}</DataTable.Cell>
					</DataTable.Row>
				))}

				<DataTable.Row style={styles.tableBorder}>
					<DataTable.Cell numeric="center">
						<TouchableOpacity onPress={() => Linking.openURL(university.data.website)}>
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
