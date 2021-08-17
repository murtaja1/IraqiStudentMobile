import React from "react"
import { StyleSheet, Text, View, StatusBar } from "react-native"
import Navigation from "./src/app/navigation/Navigation"

export default function App() {
	return (
		<View style={styles.container}>
			<Navigation />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight
	}
})
