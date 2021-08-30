import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import UniverNews from "../screens/UniverNews"
import University from "../screens/University"

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
				name="universityDetails"
				options={{ title: "الجامعة" }}
				component={University}
			/>
		</Stack.Navigator>
	)
}

export default UniversityStack
