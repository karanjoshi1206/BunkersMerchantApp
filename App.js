//REACT NATIVE/EXPO IMPORTS
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

//SCREENS
import SignUp from "./screens/SignUp/SignUp";
import Welcome from "./screens/Welcome/Welcome";
import Orders from "./screens/Orders/Orders";
import Loading from "./screens/Loading/Loading";
import OtpVerification from "./screens/OtpVerification/OtpVerification";

//NAVIGATION IMPORTS
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Logout from "./screens/Logout/Logout";

//stack navigation create
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerScreens = () => {
	return (
		<Drawer.Navigator>
			<Drawer.Screen name='Orders' component={Orders} />
			<Drawer.Screen name='Logout' component={Logout} />
		</Drawer.Navigator>
	);
};

function App() {
	//states
	const [loading, setLoading] = useState(false);
	const [loggedIn, setLoggedIn] = useState(false);

	//method to check if user is already logged in or not
	const checkLoggedIn = async () => {
		try {
			setLoading(true);

			const value = await AsyncStorage.getItem("loggedIn");
			if (value == "true") {
				setLoggedIn(true);
				setLoading(false);
			} else {
				setLoggedIn(false);
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
				{loggedIn ? (
					<>
						<DrawerScreens />
						<Stack.Navigator>
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
								options={{}}
								name='OTP Verification'
								component={OtpVerification}
							/>
						</Stack.Navigator>
					</>
				) : (
					<>
						<Stack.Navigator>
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
								options={{}}
								name='OTP Verification'
								component={OtpVerification}
							/>
							<Stack.Screen
								options={{ headerShown: false }}
								name='Merchant'
								component={DrawerScreens}
							/>
						</Stack.Navigator>
					</>
				)}
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
