import React from "react"
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer"
import { navigate } from "./RootNavigation"
import { useSelector, useDispatch } from "react-redux"
import { RetrieveTokens } from "../redux/actions/FetchToken"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { StyleSheet } from "react-native"
import { View } from "react-native"
import { Icon } from "react-native-elements/"

export default function CostumDraweTabs(props) {
	const dispatch = useDispatch()
	const state = useSelector((state) => state.username)
	const handleLogout = () => {
		dispatch(RetrieveTokens({ username: "", accessres: "", refresh: "", fail: false }))
		AsyncStorage.clear()
		setTimeout(() => {
			navigate("login")
		}, 0)
	}
	return (
		<DrawerContentScrollView {...props}>
			<DrawerItemList {...props} />
			{state.length != 0 && (
				<DrawerItem
					label="تسجيل الخروج"
					icon={({ size }) => (
						<View style={styles.sideBarIcon}>
							<Icon name="logout" size={size} color="#000" type="material-community" />
						</View>
					)}
					onPress={handleLogout}
				/>
			)}
		</DrawerContentScrollView>
	)
}

const styles = StyleSheet.create({
	sideBarIcon: { position: "absolute", right: 0 }
})
