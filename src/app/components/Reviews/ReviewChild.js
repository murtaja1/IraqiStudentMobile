import React from "react"
import { View, StyleSheet } from "react-native"
import { Text } from "react-native-elements"
import { Icon } from "react-native-elements/dist/icons/Icon"

const ReviewChild = ({ review }) => {
	return (
		<View style={styles.container}>
			<View style={styles.nameDotsContainer}>
				<Text style={styles.username}>
					{review.username}
					<Icon name="user" iconStyle={{ paddingLeft: 5 }} size={10} color="#000" type="entypo" />
				</Text>
				<Icon
					onPress={() => console.log(review.id)}
					name="dots-three-vertical"
					size={15}
					color="#000"
					type="entypo"
				/>
			</View>
			<Text style={styles.review}>{review.review}</Text>
		</View>
	)
}

export default ReviewChild

const styles = StyleSheet.create({
	container: { borderWidth: 1, borderColor: "lightgray", borderRadius: 3, marginBottom: 10 },
	nameDotsContainer: {
		flex: 1,
		flexDirection: "row-reverse",
		justifyContent: "space-between",
		alignItems: "center"
	},
	username: {
		fontSize: 15,
		fontWeight: "bold",
		textAlign: "right",
		paddingRight: 5
	},
	review: { fontSize: 15, paddingHorizontal: 5 }
})
