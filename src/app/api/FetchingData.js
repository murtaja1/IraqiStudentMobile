import axios from "axios"
import Const from "../Const"

export const fetchData = async (setData, subUrl) => {
	try {
		const promise = await axios.get(Const.mainUrl + subUrl)
		const res = await promise.data
		setData(res)
	} catch (err) {
		alert("حدث خطأ اثنأ تحميل المحتوى, يرجىء غلق التطبيق و فتحه مرة اخرى!")
	}
}

export const fetchRating = async (setValue, subUrl) => {
	try {
		const promise = await axios.get(Const.mainUrl + subUrl)
		const res = await promise.data
		setValue(res.results[0].ave_rating)
	} catch (err) {
		alert("حدث خطأ اثنأ تحميل المحتوى, يرجىء غلق التطبيق و فتحه مرة اخرى!")
	}
}

export const fetchaUserId = async (username) => {
	try {
		const promise = await axios.get(Const.mainUrl + `users?username=${username}`)
		const res = await promise.data.results[0].id
		return res
	} catch (err) {
		alert("حدث خطأ ما, يرجىء غلق التطبيق و فتحه مرة اخرى!")
	}
}
