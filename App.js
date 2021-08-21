import React from "react"
import { StyleSheet, Text, View, StatusBar } from "react-native"
import Navigation from "./src/app/navigation/Navigation"
import { Provider } from "react-redux"
import store from "./src/app/redux/store"

export default function App() {
	return (
		<View style={styles.container}>
			<Provider store={store}>
				<Navigation />
			</Provider>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
		direction: "rtl"
	}
})
