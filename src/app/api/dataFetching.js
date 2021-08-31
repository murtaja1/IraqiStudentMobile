import axios from "axios"
import Const from "../Const"

export const fetchData = (setData, subUrl) => {
	axios.get(Const.mainUrl + subUrl).then((res) => {
		setData(res.data)
	})
}

export const fetchUniversity = (id, setUniversity) => {
	axios.get(Const.mainUrl + `universities/${id}`).then(({ data }) => {
		setUniversity({
			data: data,
			tableContent: [
				data.establishment,
				data.province,
				data.president,
				data.collages_num,
				data.students_num
			]
		})
	})
}

export const fetchRating = (setValue, subUrl) => {
	axios.get(Const.mainUrl + subUrl).then((res) => setValue(res.data.results[0].ave_rating))
}

export const fetchaAccessToken = async (refresh) => {
	try {
		const promise = await axios({
			method: "post",
			url: Const.mainUrl + "api/token/refresh/",
			headers: {
				"Content-Type": "application/json"
			},
			data: {
				refresh: refresh
			}
		})
		const res = await promise.data
		return res.access
	} catch (err) {
		console.log(err)
	}
}

export const fetchaUserId = async (username) => {
	try {
		const promise = await axios.get(Const.mainUrl + `users?username=${username}`)
		const res = await promise.data.results[0].id
		return res
	} catch (err) {
		console.log(err)
	}
}

export const sendRating = async (setValue, subUrl, username, rating, refresh, buildingID) => {
	const access = await fetchaAccessToken(refresh)
	const userId = await fetchaUserId(username)

	try {
		const promise = await axios({
			method: "post",
			url: Const.mainUrl + subUrl,
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + access
			},
			data: {
				rating: rating,
				user: userId,
				building: buildingID
			}
		})
		const res = await promise.data
		setValue(res.ave_rating)
	} catch (err) {
		console.log(err.response.data)
	}
}
