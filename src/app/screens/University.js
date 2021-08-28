import React, { useEffect, useState } from "react"
import { StyleSheet } from "react-native"
import { FlatList } from "react-native"
import { ActivityIndicator } from "react-native"
import { Card, Text } from "react-native-elements"
import { fetchUniversities } from "../api/dataFetching"
import { getArabDate } from "../utilities/ArabDate"
function card() {
	const [universities, setUniversities] = useState()
	const [page, setPage] = useState(6)

	useEffect(() => {
		fetchUniversities(setUniversities, page)
	}, [page])

	return universities !== undefined ? (
		<FlatList
			data={universities.results}
			keyExtractor={(item) => item.name}
			renderItem={({ item }) => (
				<Card containerStyle={styles.container}>
					<Card.Title h4 onPress={() => console.log("clieck")}>
						{item.name}
					</Card.Title>
					<Card.Image
						source={{
							uri: item.card_image
						}}
						PlaceholderContent={<ActivityIndicator />}
					/>
					<Text style={{ paddingTop: 10 }}>{item.card_text}</Text>
					<Card.Divider style={styles.divider} />
					<Text style={{ fontSize: 10 }}>{getArabDate(item.last_updated)}</Text>
				</Card>
			)}
			ListFooterComponent={
				universities.next !== null && <ActivityIndicator animating size="large" color="blue" />
			}
			onEndReached={() => setPage(page + 3)}
			onEndReachedThreshold={1}
			initialNumToRender={3}
		/>
	) : (
		<ActivityIndicator animating size="large" color="blue" />
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
