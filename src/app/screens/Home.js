import React from "react"
import { View, StyleSheet } from "react-native"
import { Text } from "react-native-elements"
import { Divider } from "react-native-elements/dist/divider/Divider"

function Home() {
	return (
		<View style={{ marginHorizontal: 5 }}>
			<Text h4 style={styles.header}>
				مرحبا بك في برنامج الطالب العراقي
			</Text>
			<View style={styles.divider}>
				<Divider width={1} />
			</View>
			<Text style={styles.title}>ما هو البرنامج: </Text>
			<Text style={styles.description}>
				هو برنامج يحتوي على جميع المعلومات الخاصة بالجامعات, الكليات و الاقسام الدراسية التي يجب أن
				يعرفها الطالب قبل التقديم و كذلك يحتوي على اخبار التعليم و الجامعات.
			</Text>
			<Text style={styles.title}>الهدف من البرنامج: </Text>
			<Text style={styles.description}>
				تسهيل وعدم تشتيت الطالب في عملية البحث حين التقديم الى الجامعة و مساعدته في اتخاذ القرار
				الصحيح من خلال توفير المعلومات الصحيحه و الدقيقة.
			</Text>
		</View>
	)
}

export default Home

const styles = StyleSheet.create({
	header: { textAlign: "center", paddingTop: 10 },
	title: { fontSize: 18, fontWeight: "bold", paddingVertical: 10 },
	description: { fontSize: 17 },
	divider: { flex: 1, paddingVertical: 5, paddingHorizontal: 20 }
})
