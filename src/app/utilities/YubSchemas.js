import * as yup from "yup"

export const registerSchema = yup.object({
	username: yup
		.string()
		.required("يجب ان تكتب اسم المستخدم")
		.min(6, "يجب ان يكون اسم المستخدم اكثر من 6 احرف")
		.max(64, "يجب ان يكون اسم المستخدم اقل من 64 احرف"),
	email: yup
		.string()
		.required("يجب أن تكتب الايميل الخاص بك!!")
		.email("يجب أن يكون الايميل صالح للاستخدام!"),
	password: yup
		.string()
		.required("يجب ان تكتب رمز المرور")
		.min(6, "يجب ان يكون رمز المرور اكثر من 6 احرف")
		.max(100, "يجب ان يكون رمز المرور اقل من 100 احرف"),
	password2: yup.string().oneOf([yup.ref("password"), null], "رمز المرور غير متطابق!")
})
