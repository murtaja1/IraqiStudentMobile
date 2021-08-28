import axios from "axios"
import Const from "../Const"

export const fetchUniversities = (setUniversities, page) => {
	axios
		.get(Const.mainUrl + `universities?page=1&page_size=${page}`)
		.then((res) => setUniversities(res.data))
}
