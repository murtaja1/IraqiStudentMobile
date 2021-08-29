import { NavigationContainer } from "@react-navigation/native"
import { createDrawerNavigator } from "@react-navigation/drawer"
import React, { useEffect } from "react"
import Home from "../screens/Home"
import { Text, View, StyleSheet } from "react-native"
import { navigationRef } from "./RootNavigation"
import Register from "../screens/Register"
import { useSelector, useDispatch } from "react-redux"
import { RetrieveTokens } from "../redux/actions/FetchToken"
import AsyncStorage from "@react-native-async-storage/async-storage"
import CostumDraweTabs from "./CostumDraweTabs"
import LoginStack from "./LoginStack"
import { Icon } from "react-native-elements"
import UniverNews from "../screens/UniverNews"

const Drawer = createDrawerNavigator()

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
			<NavigationContainer ref={navigationRef}>
				<Drawer.Navigator
					drawerContent={(props) => <CostumDraweTabs {...props} />}
					screenOptions={{
						drawerPosition: "right",

						header: (props) => (
							<View style={styles.navbar}>
								<View>
									<Text>{"         "}</Text>
								</View>
								<Text style={styles.headerName}>{props.options.title}</Text>
								<Icon
									iconStyle={styles.headerIcon}
									onPress={() => props.navigation.openDrawer()}
									name="menu"
									size={30}
									color="#fff"
								/>
							</View>
						)
					}}>
					{state.length != 0 && (
						<Drawer.Screen
							name="home"
							options={{
								drawerLabel: () => (
									<View>
										<Text style={styles.profile}>الطالب</Text>
									</View>
								),
								title: "الطالب"
							}}
							component={Home}
						/>
					)}

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
						name="university"
						options={{
							drawerIcon: ({ size }) => (
								<View style={styles.sideBarIcon}>
									<Icon name="graduation-cap" size={size} color="#000" type="entypo" />
								</View>
							),
							title: "الجامعة"
						}}
						initialParams={{ name: "universities" }}
						component={UniverNews}
					/>
					<Drawer.Screen
						name="news"
						options={{
							drawerIcon: ({ size }) => (
								<View style={styles.sideBarIcon}>
									<Icon name="graduation-cap" size={size} color="#000" type="entypo" />
								</View>
							),
							title: "الاخبار"
						}}
						initialParams={{ name: "news" }}
						component={UniverNews}
					/>
					{state.length === 0 && (
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
					)}
				</Drawer.Navigator>
			</NavigationContainer>
		</>
	)
}

export default Navigation

const styles = StyleSheet.create({
	navbar: {
		backgroundColor: "#297F87",
		height: 36,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	headerName: {
		color: "#fff",
		fontSize: 20
	},
	headerIcon: { paddingRight: 10 },
	profile: { fontSize: 20, position: "relative", right: "25%" },
	sideBarIcon: { position: "absolute", right: 0 }
})
