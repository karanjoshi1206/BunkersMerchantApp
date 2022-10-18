import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SignUp from "./screens/SignUp/SignUp";
import { SafeAreaView } from "react-native-safe-area-context";

import Welcome from "./screens/Welcome/Welcome";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<>
			<StatusBar style='auto' />
			<NavigationContainer>
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
				</Stack.Navigator>
			</NavigationContainer>
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
