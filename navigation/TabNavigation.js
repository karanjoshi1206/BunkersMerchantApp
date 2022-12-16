import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

//SCREENS IMPORTS
import Insights from "../screens/Insights/Insights";
import Menu from "../screens/Menu/Menu";

//ICONS IMPORTS
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

//NAVIGATION IMPORTS
import DrawerNavigator, { Drawer } from "./DrawerNavigation";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

//CONSTANTS
import { primaryColor, secondaryColor } from "../utils/CONSTANTS";
import Orders from "../screens/Orders/Orders";
import NewOrderScreen from "../screens/NewOrderScreen/NewOrderScreen";

const Tabs = ({ navigation }) => {
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarShowLabel: false,
				tabBarStyle: {
					position: "absolute",
					// bottom: 25,
					// left: 20,
					// right: 20,
					elevation: 0,
					backgroundColor: "#fff",
					// borderRadius: 15,
					height: 60,
					borderTopColor: "lightgrey",
					borderTopWidth: 1,
					...style.shadow,
				},
			}}>
			<Tab.Screen
				name='Orders'
				component={DrawerNavigator}
				options={{
					tabBarIcon: ({ focused }) => (
						<View
							style={{
								alignItems: "center",
							}}>
							<AntDesign
								name='home'
								size={24}
								color={focused ? primaryColor : "lightgrey"}
							/>
							<Text
								style={{
									color: focused ? primaryColor : "grey",
								}}>
								Home
							</Text>
						</View>
					),
					headerShown: false,
				}}
			/>
			<Tab.Screen
				name='Menu'
				component={Menu}
				options={{
					tabBarIcon: ({ focused }) => (
						<View
							style={{
								alignItems: "center",
							}}>
							<Ionicons
								name='ios-restaurant-outline'
								size={24}
								color={focused ? primaryColor : "lightgrey"}
							/>
							<Text
								style={{
									color: focused ? primaryColor : "grey",
								}}>
								Menu
							</Text>
						</View>
					),
					headerShadowVisible: true,
					headerStyle: { elevation: 4, shadowOpacity: 2, shadowColor: "black" },
				}}
			/>
			<Tab.Screen
				name='Insights'
				component={Insights}
				options={{
					tabBarIcon: ({ focused }) => (
						<View
							// onPress={() => navigation.openDrawer()}
							style={{
								alignItems: "center",
							}}>
							<Ionicons
								name='information-circle-outline'
								size={24}
								color={focused ? primaryColor : "lightgrey"}
							/>
							<Text
								style={{
									color: focused ? primaryColor : "grey",
								}}>
								Insights
							</Text>
						</View>
					),
					// headerShown: false,
				}}
			/>
		</Tab.Navigator>
	);
};

export default Tabs;
const style = StyleSheet.create({
	shadow: {
		shadowColor: primaryColor,
		shadowOffset: {
			width: 0,
			height: 10,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.5,
		elevation: 5,
	},
});
