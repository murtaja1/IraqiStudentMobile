import React, { useState } from "react"
import { View, StyleSheet } from "react-native"
import { Text } from "react-native-elements"
import { Button } from "react-native-elements/dist/buttons/Button"
import { Icon } from "react-native-elements/dist/icons/Icon"
import Modal from "react-native-modal"

function ReviewBtns({ menu, setMenu }) {
	return (
		<>
			<Modal style={styles.modal} onBackdropPress={() => setMenu(!menu)} isVisible={menu}>
				<View style={styles.container}>
					<Button
						iconRight
						icon={<Icon name="edit" size={25} color="#000" type="antdesign" />}
						title="تعديل"
						titleStyle={styles.edit}
						containerStyle={{
							marginVertical: 5
						}}
					/>
					<Button
						title="حذف"
						titleStyle={styles.delete}
						iconRight
						icon={<Icon name="delete" size={25} color="red" type="antdesign" />}
					/>
				</View>
			</Modal>
		</>
	)
}

export default ReviewBtns

const styles = StyleSheet.create({
	modal: { justifyContent: "flex-end", margin: 0 },
	container: { backgroundColor: "#fff", height: 150, alignItems: "flex-end" },
	edit: { color: "black", fontSize: 30, paddingRight: 5 },
	delete: { color: "red", fontSize: 30, paddingRight: 5 }
})
