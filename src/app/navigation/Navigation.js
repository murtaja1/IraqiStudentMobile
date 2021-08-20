import { NavigationContainer } from "@react-navigation/native"
import { createDrawerNavigator } from "@react-navigation/drawer"
import React from "react"
import Home from "../components/Home"
import { Text, View, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import LogIn from "../components/LogIn"

const Drawer = createDrawerNavigator()

function Navigation() {
	return (
		<NavigationContainer>
			<Drawer.Navigator
				screenOptions={{
					drawerPosition: "right",

					header: (props) => (
						<View
							style={{
								height: 40,
								backgroundColor: "#297F87"
							}}>
							<View>
								<View
									style={{
										position: "relative",
										left: "44%",
										top: 5
									}}>
									<Text style={{ color: "#fff", fontSize: 20 }}>{props.route.name}</Text>
								</View>
								<View style={{ position: "absolute", right: 10, top: 5 }}>
									<Ionicons
										onPress={() => props.navigation.openDrawer()}
										name="menu"
										size={30}
										color="#fff"></Ionicons>
								</View>
							</View>
						</View>
					),
					style: { direction: "rtl", position: "absolute", right: 0 }
				}}>
				<Drawer.Screen
					name="jjjj"
					options={{
						drawerLabel: ({ focused }) => (
							<View>
								<Text style={{ fontSize: 20, position: "relative", right: "25%" }}>الطالب</Text>
							</View>
						),
						title: "الرئسية"
					}}
					component={Home}
				/>
				<Drawer.Screen
					name="Home"
					options={{
						drawerIcon: ({ size }) => (
							<Ionicons
								style={{ position: "absolute", right: 0 }}
								name="md-home"
								size={size}
								color="#000"></Ionicons>
						),
						title: "الرئسية"
					}}
					component={Home}
				/>
				<Drawer.Screen
					name="login"
					options={{
						drawerIcon: ({ size }) => (
							<Ionicons
								style={{ position: "absolute", right: 0 }}
								name="log-in"
								size={size}
								color="#000"></Ionicons>
						),
						title: "تسجيل الدخول"
					}}
					component={LogIn}
				/>
			</Drawer.Navigator>
		</NavigationContainer>
	)
}

export default Navigation
