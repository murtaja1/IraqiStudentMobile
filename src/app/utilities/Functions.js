export const handleSearchNavigation = (item, navigation, setSearchModal, setInput, setData) => {
	const sub = item.name
	if (sub.substr(0, 5) === "جامعة" || sub.substr(0, 7) === "الجامعة") {
		navigation.navigate("universityStack", {
			screen: "universitiesDetails",
			params: { id: item.id }
		})
	} else if (sub.substr(0, 4) === "كلية") {
		navigation.navigate("universityStack", {
			screen: "collage",
			params: { university: item.university, collage: item.name }
		})
	} else {
		const Url = item.collage.split("/")
		navigation.navigate("universityStack", {
			screen: "department",
			params: {
				university: Url[0],
				collage: Url[1],
				departmentUrl: item.name
			}
		})
	}
	setSearchModal(false)
	setInput("")
	setData()
}
