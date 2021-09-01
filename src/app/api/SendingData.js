import axios from "axios"
import Const from "../Const"
import { fetchaUserId } from "./FetchingData"

export const UpdateAccessToken = async (refresh) => {
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
		alert("حدث خطأ اثنأ تحميل المحتوى, يرجىء غلق التطبيق و فتحه مرة اخرى!")
	}
}

export const sendRating = async (setValue, subUrl, username, rating, refresh, buildingID) => {
	const access = await UpdateAccessToken(refresh)
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
		alert("حدث خطأ اثنأ تحميل المحتوى, يرجىء غلق التطبيق و فتحه مرة اخرى!")
	}
}
