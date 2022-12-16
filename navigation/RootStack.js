//REACT NATIVE/EXPO IMPORTS
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
//SCREENS
import Login from "../screens/Login/Login";
import Welcome from "../screens/Welcome/Welcome";
import Orders from "../screens/Orders/Orders";
import Loading from "../screens/Loading/Loading";
import OtpVerification from "../screens/OtpVerification/OtpVerification";
import Insights from "../screens/Insights/Insights";
import Menu from "../screens/Menu/Menu";
import OrderDetails from "../screens/OrderDetails/OrderDetails";
import Logout from "../screens/Logout/Logout";
import HelpScreen from "../screens/HelpScreen/HelpScreen";
import OrderBill from "../screens/OrderBill/OrderBill";
import LoginWithEmail from "../screens/LoginWithEmail/LoginWithEmail";
import SignUp from "../screens/SignUpScreen/SignUp";

//NAVIGATION IMPORTS
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//App loading
import Tabs from "./TabNavigation";

//All navigation create
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const TabScreens = () => {
	return <Tabs />;
};

const RootStack = ({ isLoggedIn }) => {
	return (
		<NavigationContainer>
			{isLoggedIn ? (
				<>
					<Stack.Navigator initialRouteName='Merchant'>
						<Stack.Screen
							options={{ headerShown: false }}
							name='Merchant'
							component={TabScreens}
						/>

						<Stack.Screen name='Order Details' component={OrderDetails} />
						<Stack.Screen name='Help' component={HelpScreen} />
						<Stack.Screen name='Order Bill' component={OrderBill} />
						<Stack.Screen name='Logout' component={Logout} />
					</Stack.Navigator>
				</>
			) : (
				<>
					<Stack.Navigator initialRouteName='Welcome'>
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
					</Stack.Navigator>
				</>
			)}
		</NavigationContainer>
	);
};

export default RootStack;

const styles = StyleSheet.create({});
