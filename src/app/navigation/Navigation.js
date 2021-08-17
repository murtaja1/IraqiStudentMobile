import React from "react"
import { View } from "react-native"
import { NativeRouter, Route } from "react-router-native"
import Home from "../components/Home"
import LogIn from "../components/LogIn"
import { HOME_ROUTE, LOGIN_ROUTE } from "./routeTypes"

function Navigation() {
	return (
		<NativeRouter>
			<Route path={HOME_ROUTE} exact component={Home} />
			<Route path={LOGIN_ROUTE} component={LogIn} />
		</NativeRouter>
	)
}

export default Navigation
