import React, { useState } from "react"
import { View, StyleSheet } from "react-native"
import { Text } from "react-native-elements"
import { Icon } from "react-native-elements/dist/icons/Icon"
import ReviewBtns from "./ReviewBtns"

const ReviewChild = ({ review, url, handleFetching }) => {
	const [menu, setMenu] = useState(false)
	const showBtns = () => setMenu(true)
	return (
		<View style={styles.container}>
			<View style={styles.nameDotsContainer}>
				<Text style={styles.username}>
					{review.username}
					<Icon name="user" iconStyle={{ paddingLeft: 5 }} size={10} color="#000" type="entypo" />
				</Text>
				<Icon
					onPress={showBtns}
					containerStyle={{ paddingLeft: 5 }}
					name="dots-three-vertical"
					size={15}
					color="#000"
					type="entypo"
				/>
			</View>
			<Text style={styles.review}>{review.review}</Text>
			<ReviewBtns
				menu={menu}
				setMenu={setMenu}
				handleFetching={handleFetching}
				subUrl={`${url}/${review.id}/`}
			/>
		</View>
	)
}

export default ReviewChild

const styles = StyleSheet.create({
	container: {
		borderWidth: 1,
		borderColor: "lightgray",
		borderRadius: 3,
		marginBottom: 10,
		paddingBottom: 5
	},
	nameDotsContainer: {
		flex: 1,
		flexDirection: "row-reverse",
		justifyContent: "space-between",
		alignItems: "center",
		paddingBottom: 5
	},
	username: {
		fontSize: 15,
		fontWeight: "bold",
		textAlign: "right",
		paddingRight: 5
	},
	review: { fontSize: 15, paddingHorizontal: 5 }
})
