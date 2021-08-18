import { NavigationContainer } from "@react-navigation/native"
import { createDrawerNavigator } from "@react-navigation/drawer"
import React from "react"
import Home from "../components/Home"
import { Text } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import LogIn from "../components/LogIn"

const Drawer = createDrawerNavigator()

function Navigation() {
	return (
		<NavigationContainer>
			<Drawer.Navigator>
				<Drawer.Screen
					name="home"
					options={{
						drawerIcon: ({ size }) => <Ionicons name="md-home" size={size} color="#000"></Ionicons>,
						title: "Home"
					}}
					component={Home}
				/>
				<Drawer.Screen
					name="login"
					options={{
						drawerIcon: ({ size }) => <Ionicons name="log-in" size={size} color="#000"></Ionicons>,
						title: "LogIn"
					}}
					component={LogIn}
				/>
			</Drawer.Navigator>
		</NavigationContainer>
	)
}

export default Navigation
