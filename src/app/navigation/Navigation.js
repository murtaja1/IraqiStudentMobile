import { NavigationContainer, DefaultTheme } from "@react-navigation/native"
import { createDrawerNavigator } from "@react-navigation/drawer"
import React, { useEffect } from "react"
import Home from "../screens/Home"
import { View, StyleSheet } from "react-native"
import { navigationRef } from "./RootNavigation"
import { useSelector, useDispatch } from "react-redux"
import { RetrieveTokens } from "../redux/actions/FetchToken"
import AsyncStorage from "@react-native-async-storage/async-storage"
import CostumDraweTabs from "./CostumDraweTabs"
import { Icon } from "react-native-elements"
import UniversityStack from "./UniversityStack"
import NewsStack from "./NewsStack"
import NavigationHeader from "./NavigationHeader"
import AuthTabs from "./AuthTabs"

const Drawer = createDrawerNavigator()

const MyTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: "white"
	}
}

function Navigation() {
	const state = useSelector((state) => state.username)
	const dispatch = useDispatch()
	useEffect(() => {
		AsyncStorage.multiGet(["username", "access", "refresh"]).then((res) => {
			res[0][1] != null &&
				dispatch(
					RetrieveTokens({
						username: res[0][1],
						accessres: [1][1],
						refresh: res[2][1],
						fail: false
					})
				)
		})
	}, [])

	return (
		<>
			<NavigationContainer theme={MyTheme} ref={navigationRef}>
				<Drawer.Navigator
					drawerContent={(props) => <CostumDraweTabs {...props} />}
					screenOptions={{
						drawerPosition: "right",

						header: (props) => <NavigationHeader props={props} />
					}}>
					<Drawer.Screen
						name="Home"
						options={{
							drawerIcon: ({ size }) => (
								<View style={styles.sideBarIcon}>
									<Icon name="home" size={size} color="#000" type="font-awesome" />
								</View>
							),
							title: "الرئسية"
						}}
						component={Home}
					/>
					<Drawer.Screen
						name="universityStack"
						options={{
							drawerIcon: ({ size }) => (
								<View style={styles.sideBarIcon}>
									<Icon name="graduation-cap" size={size} color="#000" type="entypo" />
								</View>
							),
							title: "الجامعة"
						}}
						component={UniversityStack}
					/>
					<Drawer.Screen
						name="newsStack"
						options={{
							drawerIcon: ({ size }) => (
								<View style={styles.sideBarIcon}>
									<Icon name="news" size={size} color="#000" type="entypo" />
								</View>
							),
							title: "الاخبار"
						}}
						component={NewsStack}
					/>
					{state.length === 0 && AuthTabs}
				</Drawer.Navigator>
			</NavigationContainer>
		</>
	)
}

export default Navigation

const styles = StyleSheet.create({
	sideBarIcon: { position: "absolute", right: 0 }
})
