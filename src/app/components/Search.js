import React, { useEffect, useState } from "react"
import { View, StyleSheet, TextInput, Text, ActivityIndicator, ScrollView } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import Modal from "react-native-modal"
import { fetchData } from "../api/FetchingData"
import { handleSearchNavigation } from "../utilities/Functions"

function Search({ setSearchModal, searchModal, navigation }) {
	const [input, setInput] = useState("")
	const [data, setData] = useState()
	const [loading, setLoading] = useState(false)
	const [noRes, setNoRes] = useState(false)
	const handleSearch = (text) => {
		setNoRes(false)
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
		setNoRes(false)
	}

	const handleNavigation = (item) => {
		handleSearchNavigation(item, navigation, setSearchModal, setInput, setData)
	}

	useEffect(() => {
		setNoRes(false)
		setLoading(false)
		if (data !== undefined) {
			data.count === 0 && setNoRes(true)
		}
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
					<View style={styles.scrollView}>
						<ScrollView>
							{data.results.map((item, index) => (
								<TouchableOpacity key={index}>
									<Text onPress={() => handleNavigation(item)} style={styles.results}>
										{index + 1}- {item.name}
									</Text>
								</TouchableOpacity>
							))}
						</ScrollView>
					</View>
				)}
				{noRes && (
					<Text style={styles.noRes}>
						لا توجد نتائج مطابقة!
						{"\n"} (تأكد من الإملاء)
					</Text>
				)}
				{loading && (
					<View style={styles.spinner}>
						<ActivityIndicator color="blue" />
					</View>
				)}
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
	},
	spinner: { alignItems: "center", width: "100%" },
	scrollView: { paddingBottom: 20, width: "100%" },
	noRes: { textAlign: "center", fontSize: 17, color: "red", width: "100%" }
})
