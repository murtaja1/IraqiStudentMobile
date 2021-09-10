import React from "react"
import { StyleSheet } from "react-native"
import { ActivityIndicator } from "react-native"
import { Card, Text } from "react-native-elements"
import { getArabDate } from "../utilities/ArabDate"
import { navigate } from "../navigation/RootNavigation"

function UniverNewsCard({ item, routeName }) {
	const handleNavigate = (item) => navigate(routeName + "Details", { id: item.id })

	return (
		<Card containerStyle={styles.container}>
			{routeName === "universities" && (
				<Card.Title h4 onPress={() => handleNavigate(item)}>
					{item.name}
				</Card.Title>
			)}
			<Card.Image
				onPress={() => handleNavigate(item)}
				source={{
					uri: item.card_image
				}}
				PlaceholderContent={<ActivityIndicator />}
			/>
			<Text onPress={() => handleNavigate(item)} style={{ paddingTop: 10 }}>
				{item.card_text}
			</Text>
			<Card.Divider style={styles.divider} />
			<Text style={{ fontSize: 10 }}>{getArabDate(item.last_updated)}</Text>
		</Card>
	)
}

export default UniverNewsCard

const styles = StyleSheet.create({
	container: {
		margin: 10,
		borderWidth: 0
	},
	divider: { width: 140, position: "relative", left: 167, paddingTop: 10 }
})
