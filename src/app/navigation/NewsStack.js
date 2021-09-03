import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import UniverNews from "../screens/UniverNews"
import News from "../screens/News"

const Stack = createStackNavigator()

function NewsStack() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen
				name="news"
				options={{ title: "الاخبار" }}
				initialParams={{ name: "news" }}
				component={UniverNews}
			/>
			<Stack.Screen name="newsDetails" options={{ title: "الاخبار" }} component={News} />
		</Stack.Navigator>
	)
}

export default NewsStack
