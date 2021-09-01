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

// not needed mix it with the above
export const fetchUniversity = async (id, setUniversity) => {
	try {
		const promise = await axios.get(Const.mainUrl + `universities/${id}`)
		const res = await promise.data
		setUniversity({
			data: res,
			tableContent: [
				res.establishment,
				res.province,
				res.president,
				res.collages_num,
				res.students_num
			]
		})
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
