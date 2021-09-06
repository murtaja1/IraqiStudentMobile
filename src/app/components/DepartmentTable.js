import React from "react"
import { TouchableOpacity, StyleSheet, View } from "react-native"
import { DataTable } from "react-native-paper"
import { Text } from "react-native-elements"

const tableTitle = [
	"التأسيس",
	"عدد الطلاب",
	"شهادة التخرج",
	"نظام دراسة",
	"عدد سنوات الدراسة",
	"مكان العمل",
	"العنوان الوضيفي",
	"الفرع المقبول",
	"لغة الدراسة"
]
const tableContent = [
	"establishment",
	"students_num",
	"certi_of_gradu",
	"study_system",
	"years_of_study",
	"place_of_work",
	"job_title",
	"accepted_branch",
	"language_of_study"
]
const years = ["2020", "2019", "2018", "2017", "2016"]

const booleanTitle = ["دراسة عليا", "دراسة مسائية", "دراسة اهلية"]
const booleanContent = ["higher_educ", "evening_study", "private_study"]

function DepartmentTable({ department, university }) {
	return (
		<DataTable style={styles.wrapperBorder}>
			<DataTable.Row style={styles.tableBorder}>
				<DataTable.Cell numeric>{university}</DataTable.Cell>
				<DataTable.Cell numeric>الجامعة</DataTable.Cell>
			</DataTable.Row>
			{tableTitle.map((item, index) => (
				<DataTable.Row key={index} style={styles.tableBorder}>
					<DataTable.Cell numeric>{department[tableContent[index]]}</DataTable.Cell>
					<DataTable.Cell numeric>{item}</DataTable.Cell>
				</DataTable.Row>
			))}
			<DataTable.Row style={styles.tableBorder}>
				<DataTable.Cell numeric style={{ marginTop: 5 }}>
					<View>
						{years.map((year, index) => (
							<Text key={index}>{`${department.sum[year]}  <=  ${year} ${"\n"}`}</Text>
						))}
					</View>
				</DataTable.Cell>
				<DataTable.Cell numeric>الحدود الدنيا</DataTable.Cell>
			</DataTable.Row>
			{booleanTitle.map((title, index) => (
				<DataTable.Row key={index} style={styles.tableBorder}>
					<DataTable.Cell numeric>
						{booleanContent[index] === true ? "لا يوجد" : "موجود"}
					</DataTable.Cell>
					<DataTable.Cell numeric>{title}</DataTable.Cell>
				</DataTable.Row>
			))}
			<DataTable.Row style={styles.tableBorder}>
				<DataTable.Cell numeric>
					{department.central_designation === true ? "ليس مركزي" : "مركزي"}
				</DataTable.Cell>
				<DataTable.Cell numeric>التعيين</DataTable.Cell>
			</DataTable.Row>
			<DataTable.Row style={styles.tableBorder}>
				<DataTable.Cell numeric>{department.salary_pm} الف دينار عراقي</DataTable.Cell>
				<DataTable.Cell numeric>الراتب الشهري </DataTable.Cell>
			</DataTable.Row>
			<DataTable.Row style={styles.tableBorder}>
				<DataTable.Cell numeric>
					<View>
						{department.other_universities.map((uni, index) => (
							<Text key={index}>{uni}</Text>
						))}
					</View>
				</DataTable.Cell>
				<DataTable.Cell numeric>جامعات أخرا تحتوي هذا القسم</DataTable.Cell>
			</DataTable.Row>
			<DataTable.Row style={styles.tableBorder}>
				<DataTable.Cell numeric="center">
					<TouchableOpacity onPress={() => Linking.openURL(department.website)}>
						<Text style={{ color: "blue" }}>اضغط هنا</Text>
					</TouchableOpacity>
				</DataTable.Cell>
				<DataTable.Cell numeric>الموقع</DataTable.Cell>
			</DataTable.Row>
		</DataTable>
	)
}

export default DepartmentTable

const styles = StyleSheet.create({
	title: {
		fontSize: 20,
		fontWeight: "bold",
		paddingTop: 20
	},
	wrapperBorder: { borderWidth: 0.5, borderBottomWidth: 0, marginTop: 10 },
	tableBorder: { borderBottomWidth: 0.5, borderBottomColor: "black" },
	noCollText: { fontSize: 15, paddingRight: 10, paddingTop: 5, color: "red" }
})
