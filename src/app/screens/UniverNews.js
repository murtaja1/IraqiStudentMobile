import React, { useEffect, useState } from "react"
import { FlatList } from "react-native"
import { ActivityIndicator } from "react-native"
import { fetchData } from "../api/FetchingData"
import UniverNewsCard from "../components/UniverNewsCard"

function UniverNews({ route }) {
	const [data, setData] = useState()
	const [page, setPage] = useState(6)
	const routeName = route.params.name
	useEffect(() => {
		const subUrl = `${routeName}?page=1&page_size=${page}`
		fetchData(setData, subUrl)
	}, [page])

	return data !== undefined ? (
		<FlatList
			data={data.results}
			keyExtractor={(item) => item.card_text}
			renderItem={({ item }) => <UniverNewsCard item={item} routeName={routeName} />}
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
