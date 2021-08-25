import { NavigationContainer } from "@react-navigation/native"
import { createDrawerNavigator } from "@react-navigation/drawer"
import React, { useEffect } from "react"
import Home from "../components/Home"
import { Text, View, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import LogIn from "../components/LogIn"
import { navigationRef } from "./RootNavigation"
import Register from "../components/Register"
import { useSelector, useDispatch } from "react-redux"
import { RetrieveTokens } from "../redux/actions/FetchToken"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Logout from "./Logout"
import ResetPW from "../components/ResetPW"
import { createStackNavigator } from "@react-navigation/stack"
import SetNewPW from "../components/SetNewPW"

const Stack = createStackNavigator()
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
					drawerContent={(props) => <Logout {...props} />}
					screenOptions={{
						drawerPosition: "right",

						header: (props) => (
							<View style={styles.navbar}>
								<View>
									<Text>{"         "}</Text>
								</View>
								<Text style={styles.headerName}>{props.options.title}</Text>
								<Ionicons
									style={styles.headerIcon}
									onPress={() => props.navigation.openDrawer()}
									name="menu"
									size={30}
									color="#fff"></Ionicons>
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
								<Ionicons
									style={styles.sideBarIcon}
									name="md-home"
									size={size}
									color="#000"></Ionicons>
							),
							title: "الرئسية"
						}}
						component={Home}
					/>
					{state.length === 0 && (
						<>
							<Drawer.Screen
								name="login"
								options={{
									drawerIcon: ({ size }) => (
										<Ionicons
											style={styles.sideBarIcon}
											name="log-in"
											size={size}
											color="#000"></Ionicons>
									),
									title: "تسجيل الدخول"
								}}
								component={LoginStack}
							/>
							<Drawer.Screen
								name="register"
								options={{
									drawerIcon: ({ size }) => (
										<Ionicons
											style={styles.sideBarIcon}
											name="clipboard-sharp"
											size={size}
											color="#000"></Ionicons>
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

function LoginStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="login2" component={LogIn} options={{ headerShown: false }} />
			<Stack.Screen
				name="resetPW"
				component={ResetPW}
				options={{ title: "أعادة ضبط كلمة المرور" }}
			/>
			<Stack.Screen name="setNewPW" component={SetNewPW} options={{ title: "كلمة مرور جديده" }} />
		</Stack.Navigator>
	)
}
