import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SignUp from "./screens/SignUp/SignUp";
import { SafeAreaView } from "react-native-safe-area-context";

import Welcome from "./screens/Welcome/Welcome";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OtpVerification from "./screens/OtpVerification/OtpVerification";
import Orders from "./screens/Orders/Orders";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "./screens/Loading/Loading";
const Stack = createNativeStackNavigator();

function App() {
	const [loading, setLoading] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false);
	const checkLoggedIn = async () => {
		try {
			setLoading(true);

			const value = await AsyncStorage.getItem("loggedIn");
			if (value == "true") {
				setLoggedIn(true);
				setLoading(false);
			}
		} catch (e) {
			setLoading(false);
			setLoggedIn(false);
		}
	};

	useEffect(() => {
		checkLoggedIn();
	}, []);

	if (loading) {
		return <Loading />;
	}

	return (
		<>
			<StatusBar style='auto' />

			<NavigationContainer>
				<Stack.Navigator>
					{loggedIn ? (
						<Stack.Screen
							options={
								{
									// headerShown: false,
								}
							}
							name='Orders'
							component={Orders}
						/>
					) : (
						<>
							<Stack.Screen
								options={{
									headerShown: false,
								}}
								name='Welcome'
								component={Welcome}
							/>
							<Stack.Screen
								options={{
									headerShown: false,
								}}
								name='SignUp'
								component={SignUp}
							/>
							<Stack.Screen
								options={
									{
										// headerShown: false,
									}
								}
								name='OTP Verification'
								component={OtpVerification}
							/>
						</>
					)}
				</Stack.Navigator>
			</NavigationContainer>
			{/* )} */}
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: "#fff",
		// alignItems: "center",
		// justifyContent: "center",
		position: "relative",
		paddingBottom: 20,
	},
});

export default () => {
	return (
		// <RootSiblingParent>
		// <ToastProvider>
		// 	<UserProvider>
		<App />

		// </UserProvider>
		// </ToastProvider>
	);
};
