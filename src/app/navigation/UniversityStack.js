import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import UniverNews from "../screens/UniverNews"
import University from "../screens/University"
import Collage from "../screens/Collage"

const Stack = createStackNavigator()

function UniversityStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name="university"
				options={{ title: "الجامعة" }}
				initialParams={{ name: "universities" }}
				component={UniverNews}
			/>
			<Stack.Screen
				name="universitiesDetails"
				options={{ title: "الجامعة" }}
				component={University}
			/>
			<Stack.Screen name="collage" options={{ title: "الجامعة" }} component={Collage} />
		</Stack.Navigator>
	)
}

export default UniversityStack
