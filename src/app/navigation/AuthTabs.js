import React from "react"
import { View, StyleSheet } from "react-native"
import Register from "../screens/Auth/Register"
import LoginStack from "./LoginStack"
import { Icon } from "react-native-elements"
import { createDrawerNavigator } from "@react-navigation/drawer"

const Drawer = createDrawerNavigator()

const AuthTabs = (
	<>
		<Drawer.Screen
			name="login"
			options={{
				drawerIcon: ({ size }) => (
					<View style={styles.sideBarIcon}>
						<Icon name="login" size={size} color="#000" type="entypo" />
					</View>
				),
				title: "تسجيل الدخول"
			}}
			component={LoginStack}
		/>
		<Drawer.Screen
			name="register"
			options={{
				drawerIcon: ({ size }) => (
					<View style={styles.sideBarIcon}>
						<Icon name="clipboard" size={size} color="#000" type="entypo" />
					</View>
				),
				title: "انشاء حساب"
			}}
			component={Register}
		/>
	</>
)

export default AuthTabs

const styles = StyleSheet.create({
	sideBarIcon: { position: "absolute", right: 0 }
})
