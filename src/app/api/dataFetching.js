import axios from "axios"
import Const from "../Const"

export const fetchData = (setData, page, subUrl) => {
	axios.get(Const.mainUrl + `${subUrl}?page=1&page_size=${page}`).then((res) => setData(res.data))
}
