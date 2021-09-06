import React from "react"
import { TouchableOpacity, ScrollView, StyleSheet } from "react-native"
import { DataTable } from "react-native-paper"
import { Text } from "react-native-elements"
import { navigate } from "../navigation/RootNavigation"
import { years } from "../Const"

function SumTable({ collage, departments, university }) {
	return (
		<>
			<Text style={styles.title}>الحدود الدنيا لاقسام {collage.name}:</Text>
			{departments.count !== 0 ? (
				<ScrollView horizontal={true}>
					<DataTable style={styles.wrapperBorder}>
						<DataTable.Row style={styles.tableBorder}>
							<DataTable.Cell numeric>الحدود الدنيا لسنة</DataTable.Cell>

							<DataTable.Cell numeric>{collage.name}</DataTable.Cell>
						</DataTable.Row>
						<DataTable.Row style={styles.tableBorder}>
							{years.map((year, index) => (
								<DataTable.Cell key={index}>{year}</DataTable.Cell>
							))}
							<DataTable.Cell numeric style={{ flex: 2 }}>
								القسم
							</DataTable.Cell>
						</DataTable.Row>
						{departments.results.map((department, index) => (
							<DataTable.Row style={styles.tableBorder} key={index}>
								{years.map((year) => (
									<DataTable.Cell key={year}>{department.sum[year]}</DataTable.Cell>
								))}
								<DataTable.Cell numeric style={{ flex: 2 }}>
									<TouchableOpacity
										onPress={() =>
											navigate("department", {
												university: university,
												collage: collage.name,
												departmentUrl: department.name
											})
										}>
										<Text style={{ fontWeight: "bold", color: "blue" }}>{department.name}</Text>
									</TouchableOpacity>
								</DataTable.Cell>
							</DataTable.Row>
						))}
					</DataTable>
				</ScrollView>
			) : (
				<Text style={styles.noCollText}>لم يتم ادراج اي قسم حاليا!</Text>
			)}
		</>
	)
}

export default SumTable

const styles = StyleSheet.create({
	title: {
		fontSize: 20,
		fontWeight: "bold",
		paddingTop: 20
	},
	wrapperBorder: { borderWidth: 0.5, borderBottomWidth: 0, marginTop: 10, width: 400 },
	tableBorder: { borderBottomWidth: 0.5, borderBottomColor: "black" },
	noCollText: { fontSize: 15, paddingRight: 10, paddingTop: 5, color: "red" }
})
