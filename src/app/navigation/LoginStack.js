import React from "react"
import LogIn from "../screens/Auth/LogIn"
import ResetPW from "../screens/Auth/ResetPW"
import { createStackNavigator } from "@react-navigation/stack"
import SetNewPW from "../screens/Auth/SetNewPW"

const Stack = createStackNavigator()

function LoginStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="login2" component={LogIn} options={{ headerShown: false }} />
			<Stack.Screen
				name="resetPW"
				component={ResetPW}
				options={{ title: "أعادة ضبط كلمة المرور" }}
			/>
			<Stack.Screen name="setNewPW" component={SetNewPW} options={{ title: "كلمة مرور جديده" }} />
		</Stack.Navigator>
	)
}

export default LoginStack
