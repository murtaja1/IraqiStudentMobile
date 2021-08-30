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
