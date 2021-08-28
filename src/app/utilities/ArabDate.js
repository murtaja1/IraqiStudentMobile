export const getArabDate = (last_updated) => {
	var date = new Date(last_updated)
	var months = [
		"يناير",
		"فبراير",
		"مارس",
		"إبريل",
		"مايو",
		"يونيو",
		"يوليو",
		"أغسطس",
		"سبتمبر",
		"أكتوبر",
		"نوفمبر",
		"ديسمبر"
	]
	var days = ["اﻷحد", "اﻷثنين", "الثلاثاء", "اﻷربعاء", "الخميس", "الجمعة", "السبت"]
	var delDateString =
		days[date.getDay()] +
		", " +
		date.getDate() +
		" " +
		months[date.getMonth()] +
		", " +
		date.getFullYear()
	return delDateString
}
