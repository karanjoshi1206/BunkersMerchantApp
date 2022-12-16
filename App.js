//REACT NATIVE/EXPO IMPORTS
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

//App loading
import RootStack from "./navigation/RootStack";
import Loading from "./screens/Loading/Loading";
//Context imports
import { UserContext, UserProvider } from "./context/userContext";

function App() {
	//states
	const { state, dispatch } = useContext(UserContext);
	let isLoggedIn = state.isLoggedIn;

	const [loading, setLoading] = useState(false);

	//method to check if user is already logged in or not
	const checkLoggedIn = async () => {
		try {
			setLoading(true);

			const value = await AsyncStorage.getItem("loggedIn");
			console.log("value is ", value);
			if (value == "true") {
				dispatch({ type: "isLoggedIn", payload: true });

				setLoading(false);
			} else {
				dispatch({ type: "isLoggedIn", payload: false });
				setLoading(false);
			}
		} catch (e) {
			dispatch({ type: "isLoggedIn", payload: false });
			setLoading(false);
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
			{/* <StatusBar style='auto' /> */}

			{/* <NavigationContainer>
				{loggedIn ? (
					<>
						<Stack.Navigator>
							<Stack.Screen
								options={{ headerShown: false }}
								name='Merchant'
								component={TabScreens}
							/>
							<Stack.Screen
								options={{
									headerShown: false,
								}}
								name='Welcome'
								component={Welcome}
							/>
							<Stack.Screen name='Order Details' component={OrderDetails} />
							<Stack.Screen name='Help' component={HelpScreen} />
							<Stack.Screen name='Order Bill' component={OrderBill} />
							<Stack.Screen name='Logout' component={Logout} />
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
						</Stack.Navigator>
					</>
				)}
			</NavigationContainer> */}
			<RootStack isLoggedIn={isLoggedIn} />
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
		<UserProvider>
			<App />
		</UserProvider>
	);
};
