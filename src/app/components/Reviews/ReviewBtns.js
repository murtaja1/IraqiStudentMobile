import React, { useState } from "react"
import { ActivityIndicator } from "react-native"
import { View, StyleSheet } from "react-native"
import { Text } from "react-native-elements"
import { Button } from "react-native-elements/dist/buttons/Button"
import { Icon } from "react-native-elements/dist/icons/Icon"
import Modal from "react-native-modal"
import { useSelector } from "react-redux"
import { handleDeleteReview } from "../../api/SendingData"
import EditReveiw from "./EditReveiw"

function ReviewBtns({ menu, setMenu, subUrl, handleFetching, buildingId, text }) {
	const [confirmDelete, setConfirmDelete] = useState(false)
	const [editModal, setEditModal] = useState(false)
	const [loading, setLoading] = useState(false)
	const state = useSelector((state) => state)

	const toggleMenu = () => setMenu(!menu)
	const toggleConfirmDelete = () => setConfirmDelete(!confirmDelete)
	const handleCancel = () => {
		toggleConfirmDelete(), toggleMenu()
	}
	const hideEditModal = () => {
		setEditModal(false), toggleMenu()
	}
	const handleDelete = () => {
		setLoading(true)
		handleDeleteReview(subUrl, state.refresh).then(() => {
			setLoading(false)
			handleFetching()
			handleCancel()
		})
	}
	return (
		<>
			<Modal style={styles.modal} onBackdropPress={toggleMenu} isVisible={menu}>
				<View style={styles.container}>
					<Button
						iconRight
						icon={<Icon name="edit" size={25} color="#000" type="antdesign" />}
						title="تعديل"
						onPress={() => setEditModal(true)}
						titleStyle={styles.editBtn}
						containerStyle={{
							marginVertical: 5
						}}
					/>
					<Button
						title="حذف"
						onPress={toggleConfirmDelete}
						titleStyle={styles.deleteBtn}
						iconRight
						icon={<Icon name="delete" size={25} color="red" type="antdesign" />}
					/>
				</View>
			</Modal>
			<Modal isVisible={confirmDelete}>
				<View style={styles.deleteModalContainer}>
					<Text h4>هل انت متأكد من الحذف؟</Text>
					{!loading ? (
						<View style={styles.confirmDeleteContainer}>
							<Button title="الغاء" onPress={handleCancel} containerStyle={styles.cancelBtn} />
							<Button
								title="تاكيد"
								onPress={handleDelete}
								containerStyle={styles.confirmDeleteBtn}
							/>
						</View>
					) : (
						<ActivityIndicator color="blue" />
					)}
				</View>
			</Modal>
			<Modal isVisible={editModal}>
				<View style={styles.editModalContainer}>
					<EditReveiw
						handleFetching={handleFetching}
						subUrl={subUrl}
						buildingId={buildingId}
						hideEditModal={hideEditModal}
						text={text}
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
	deleteModalContainer: {
		backgroundColor: "#fff",
		height: 150,
		alignItems: "center",
		paddingTop: 30
	},
	editModalContainer: {
		backgroundColor: "#fff",
		height: 200,
		padding: 10
	},
	editBtn: { color: "black", fontSize: 30, paddingRight: 5, width: "90%", textAlign: "right" },
	deleteBtn: { color: "red", fontSize: 30, paddingRight: 5, width: "90%", textAlign: "right" },
	confirmDeleteContainer: { flexDirection: "row", marginTop: 10 },
	cancelBtn: { backgroundColor: "#4a7dcf", width: 50, marginRight: 5 },
	confirmDeleteBtn: { backgroundColor: "#f05164", width: 50 }
})
