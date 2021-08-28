import React, { useEffect, useState } from "react"
import { ScrollView, StyleSheet } from "react-native"
import { ActivityIndicator } from "react-native"
import { Card, Text } from "react-native-elements"
import { fetchUniversities } from "../api/dataFetching"
import { getArabDate } from "../utilities/ArabDate"
function card() {
	const [universities, setUniversities] = useState(Array())

	useEffect(() => {
		fetchUniversities(setUniversities)
	}, [])
	return (
		<ScrollView>
			{universities.length > 0 &&
				universities.map((card, index) => (
					<Card containerStyle={styles.container} key={index}>
						<Card.Title h4 onPress={() => console.log("clieck")}>
							{card.name}
						</Card.Title>
						<Card.Image
							source={{
								uri: card.card_image
							}}
							PlaceholderContent={<ActivityIndicator />}
						/>
						<Text style={{ paddingTop: 10 }}>{card.card_text}</Text>
						<Card.Divider style={styles.divider} />
						<Text style={{ fontSize: 10 }}>{getArabDate(card.last_updated)}</Text>
					</Card>
				))}
		</ScrollView>
	)
}

export default card

const styles = StyleSheet.create({
	container: {
		margin: 10,
		borderWidth: 0
	},
	divider: { width: 140, position: "relative", left: 167, paddingTop: 10 }
})
