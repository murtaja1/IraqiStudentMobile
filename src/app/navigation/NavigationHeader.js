import React, { useState } from "react"
import { Text, View, StyleSheet } from "react-native"
import { Icon } from "react-native-elements"
import Search from "../components/Search"

function NavigationHeader({ props }) {
	const [searchModal, setSearchModal] = useState(false)
	return (
		<View style={styles.navbar}>
			<Icon
				iconStyle={{ paddingLeft: 10 }}
				onPress={() => setSearchModal(true)}
				name="search"
				size={30}
				color="#fff"
			/>
			<Search
				setSearchModal={setSearchModal}
				searchModal={searchModal}
				navigation={props.navigation}
			/>
			<Text style={styles.headerName}>{props.options.title}</Text>
			<Icon
				iconStyle={styles.headerIcon}
				onPress={() => props.navigation.openDrawer()}
				name="menu"
				size={30}
				color="#fff"
			/>
		</View>
	)
}

export default NavigationHeader

const styles = StyleSheet.create({
	navbar: {
		backgroundColor: "#297F87",
		height: 36,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	headerName: {
		color: "#fff",
		fontSize: 20
	},
	headerIcon: { paddingRight: 10 }
})
