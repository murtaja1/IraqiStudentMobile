import React, { useEffect, useState } from "react"
import { View, StyleSheet, TextInput, Text, ActivityIndicator } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import Modal from "react-native-modal"
import { fetchData } from "../api/FetchingData"

function Search({ setSearchModal, searchModal, navigation }) {
	const [input, setInput] = useState("")
	const [data, setData] = useState()
	const [loading, setLoading] = useState(false)
	const handleSearch = (text) => {
		setLoading(true)
		setInput(text)
		if (text !== "") fetchData(setData, `search?q=${text}&page_size=100`)
		else {
			setData()
		}
	}
	const toggleModal = () => {
		setSearchModal(!searchModal)
		setInput("")
		setData()
	}

	const handleNavigation = (item) => {
		console.log(item)
		const sub = item.name
		if (sub.substr(0, 5) === "جامعة" || sub.substr(0, 7) === "الجامعة") {
			navigation.navigate("universityStack", {
				screen: "universitiesDetails",
				params: { id: item.id }
			})
		} else if (sub.substr(0, 4) === "كلية") {
			navigation.navigate("universityStack", {
				screen: "collage",
				params: { university: item.university, collage: item.name }
			})
		} else {
			const Url = item.collage.split("/")
			navigation.navigate("universityStack", {
				screen: "department",
				params: {
					university: Url[0],
					collage: Url[1],
					departmentUrl: item.name
				}
			})
		}
		setSearchModal(!searchModal)
		setInput("")
		setData()
	}

	useEffect(() => {
		setLoading(false)
	}, [data])
	return (
		<Modal onBackdropPress={toggleModal} isVisible={searchModal}>
			<View style={styles.container}>
				<Text style={styles.title}>اكتب اسم الجامعة او الكلية او القسم:</Text>
				<TextInput
					style={styles.input}
					placeholder="اكتب..."
					value={input}
					onChangeText={(text) => handleSearch(text)}
				/>
				{data !== undefined && (
					<View>
						{data.results.map((item, index) => (
							<TouchableOpacity key={index}>
								<Text onPress={() => handleNavigation(item)} style={styles.results}>
									{index + 1}- {item.name}
								</Text>
							</TouchableOpacity>
						))}
					</View>
				)}
				{loading && <ActivityIndicator color="blue" />}
			</View>
		</Modal>
	)
}

export default Search

const styles = StyleSheet.create({
	title: {
		fontSize: 17,
		fontWeight: "bold",
		paddingVertical: 10
	},
	input: {
		borderColor: "gray",
		borderWidth: 1,
		padding: 5,
		marginTop: 10,
		marginBottom: 10,
		borderRadius: 6,
		textAlign: "right",
		width: "95%"
	},
	container: { backgroundColor: "#fff", alignItems: "flex-end", padding: 10 },
	results: {
		fontSize: 17,
		color: "blue",
		paddingBottom: 5
	}
})
