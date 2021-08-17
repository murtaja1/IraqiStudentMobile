import React from "react"
import { Text, View } from "react-native"
import { Link } from "react-router-native"

function Home() {
	return (
		<View>
			<Text>Hello Iraqi Student!</Text>
			<Link to={"/login"}>
				<Text>login</Text>
			</Link>
		</View>
	)
}

export default Home
