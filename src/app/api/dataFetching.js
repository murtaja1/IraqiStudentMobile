import axios from "axios"
import Const from "../Const"

export const fetchUniversities = (setUniversities) => {
	axios
		.get(Const.mainUrl + "universities?page=1&page_size=6")
		.then((res) => setUniversities(res.data.results))
}
