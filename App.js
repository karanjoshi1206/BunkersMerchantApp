//REACT NATIVE/EXPO IMPORTS
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

//SCREENS
import Login from "./screens/Login/Login";
import Welcome from "./screens/Welcome/Welcome";
import Orders from "./screens/Orders/Orders";
import Loading from "./screens/Loading/Loading";
import OtpVerification from "./screens/OtpVerification/OtpVerification";
import Insights from "./screens/Insights/Insights";
import Menu from "./screens/Menu/Menu";
import OrderDetails from "./screens/OrderDetails/OrderDetails";
import Logout from "./screens/Logout/Logout";
import HelpScreen from "./screens/HelpScreen/HelpScreen";
import OrderBill from "./screens/OrderBill/OrderBill";
import LoginWithEmail from "./screens/LoginWithEmail/LoginWithEmail";

//NAVIGATION IMPORTS
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Tabs from "./navigation/TabNavigation";
import SignUp from "./screens/SignUpScreen/SignUp";

//All navigation create
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const TabScreens = () => {
	return (
		// <Drawer.Navigator>
		// 	<Drawer.Screen name='Orders' component={Orders} />
		// 	<Drawer.Screen name='Logout' component={Logout} />
		// </Drawer.Navigator>

		<Tabs />
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
		<SafeAreaView style={styles.container}>
			<StatusBar style='auto' />

			<NavigationContainer>
				{loggedIn ? (
					<>
						{/* <DrawerScreens /> */}
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
								name='Login'
								component={Login}
							/>
							<Stack.Screen
								options={
									{
										// headerShown: false,
									}
								}
								name='Login With Email'
								component={LoginWithEmail}
							/>
							<Stack.Screen
								options={{
									// headerShown: false,
									headerTitle: "Sign Up",
								}}
								name='SignUp'
								component={SignUp}
							/>
							<Stack.Screen
								options={{}}
								name='OTP Verification'
								component={OtpVerification}
							/>
							{/* <Stack.Group> */}
							<Stack.Screen
								options={{ headerShown: false }}
								name='Merchant'
								component={TabScreens}
							/>
							<Stack.Screen
								// options={{ headerShown: false }}
								name='Order Details'
								component={OrderDetails}
							/>
							{/* </Stack.Group> */}
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
								name='Login'
								component={Login}
							/>
							<Stack.Screen
								options={{
									headerTitle: "Sign Up",
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
								name='Login With Email'
								component={LoginWithEmail}
							/>
							<Stack.Screen
								options={{}}
								name='OTP Verification'
								component={OtpVerification}
							/>
							<Stack.Screen
								options={{ headerShown: false }}
								name='Merchant'
								component={TabScreens}
							/>
							<Stack.Screen
								// options={{ headerShown: false }}
								name='Order Details'
								component={OrderDetails}
							/>
							<Stack.Screen
								// options={{ headerShown: false }}
								name='Help'
								component={HelpScreen}
							/>
							<Stack.Screen
								// options={{ headerShown: false }}
								name='Order Bill'
								component={OrderBill}
							/>
							<Stack.Screen name='Logout' component={Logout} />
							{/* <DrawerScreens /> */}
						</Stack.Navigator>
					</>
				)}
			</NavigationContainer>
			{/* )} */}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: "#fff",
		// alignItems: "center",
		// justifyContent: "center",
		// position: "relative",
		// paddingBottom: 20,
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
