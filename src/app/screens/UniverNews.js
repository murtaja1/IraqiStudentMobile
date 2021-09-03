import React, { useEffect, useState } from "react"
import { StyleSheet } from "react-native"
import { FlatList } from "react-native"
import { ActivityIndicator } from "react-native"
import { Card, Text } from "react-native-elements"
import { fetchData } from "../api/FetchingData"
import { getArabDate } from "../utilities/ArabDate"
import { navigate } from "../navigation/RootNavigation"

function UniverNews({ route }) {
	const [data, setData] = useState()
	const [page, setPage] = useState(6)
	const routeName = route.params.name
	const handleNavigate = (item) => navigate(routeName + "Details", { id: item.id })
	useEffect(() => {
		const subUrl = `${routeName}?page=1&page_size=${page}`
		fetchData(setData, subUrl)
	}, [page])

	return data !== undefined ? (
		<FlatList
			data={data.results}
			keyExtractor={(item) => item.card_text}
			renderItem={({ item }) => (
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
			)}
			ListFooterComponent={
				data.next !== null && <ActivityIndicator animating size="large" color="blue" />
			}
			onEndReached={() => data.next !== null && setPage(page + 3)}
			onEndReachedThreshold={1}
			initialNumToRender={3}
		/>
	) : (
		<ActivityIndicator animating size="large" color="blue" />
	)
}

export default UniverNews

const styles = StyleSheet.create({
	container: {
		margin: 10,
		borderWidth: 0
	},
	divider: { width: 140, position: "relative", left: 167, paddingTop: 10 }
})
