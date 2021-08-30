import React, { useEffect, useState } from "react"
import { View, TouchableOpacity, Linking } from "react-native"
import { Text, Image } from "react-native-elements"
import { fetchUniversity } from "../api/dataFetching"
import { DataTable } from "react-native-paper"

const sideTableTitle = ["المحافظة", "الرئيس", "عدد الكليات", "عدد الطلاب"]

function University({ route }) {
	const [university, setUniversity] = useState()
	useEffect(() => {
		fetchUniversity(route.params.id, setUniversity)
	}, [])

	return (
		<View style={{ alignItems: "center", margin: 10 }}>
			{university !== undefined && (
				<>
					<DataTable style={{ borderWidth: 0.5, borderBottomWidth: 0 }}>
						<Text style={{ paddingTop: 5, textAlign: "center" }} h4>
							{university.data.name}
						</Text>
						<View style={{ alignItems: "center" }}>
							<Image source={{ uri: university.data.logo }} style={{ width: 100, height: 100 }} />
						</View>
						<DataTable.Row style={{ borderBottomWidth: 0.5, borderBottomColor: "black" }}>
							<DataTable.Cell numeric="center">
								<Text>{university.data.establishment}</Text>
							</DataTable.Cell>
							<DataTable.Cell numeric>التأسيس</DataTable.Cell>
						</DataTable.Row>
						<DataTable.Row style={{ borderBottomWidth: 0.5, borderBottomColor: "black" }}>
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
							<DataTable.Row
								key={index}
								style={{ borderBottomWidth: 0.5, borderBottomColor: "black" }}>
								<DataTable.Cell numeric="center">
									<Text>{university.tableContent[index]}</Text>
								</DataTable.Cell>
								<DataTable.Cell numeric>{title}</DataTable.Cell>
							</DataTable.Row>
						))}

						<DataTable.Row style={{ borderBottomWidth: 0.5, borderBottomColor: "black" }}>
							<DataTable.Cell numeric="center">
								<TouchableOpacity onPress={() => Linking.openURL(university.data.website)}>
									<Text style={{ color: "blue" }}>اضغط هنا!</Text>
								</TouchableOpacity>
							</DataTable.Cell>
							<DataTable.Cell numeric>الموقع</DataTable.Cell>
						</DataTable.Row>
					</DataTable>
					<Text style={{ paddingTop: 10 }}>{university.data.description}</Text>
				</>
			)}
		</View>
	)
}

export default University
