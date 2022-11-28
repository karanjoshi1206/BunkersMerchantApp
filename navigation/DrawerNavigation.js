//SCREENS IMPORTS
import Orders from "../screens/Orders/Orders";
import Logout from "../screens/Logout/Logout";

//NAVIGATION IMPORTS
import {
	createDrawerNavigator,
	DrawerContentScrollView,
	DrawerItem,
	DrawerItemList,
} from "@react-navigation/drawer";
import QrScanner from "../screens/QrScanner/QrScanner";
import {
	Text,
	View,
	Image,
	TouchableOpacity,
	Switch,
	Pressable,
	ToastAndroid,
} from "react-native";
import { primaryColor, secondaryColor } from "../utils/CONSTANTS";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { DrawerActions } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

const CustomDrawer = ({ props, navigation }) => {
	const [isEnabled, setIsEnabled] = useState(false);
	const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
	return (
		<View
			style={{
				flex: 1,
				paddingBottom: 70,
			}}>
			<DrawerContentScrollView
				contentContainerStyle={{
					backgroundColor: primaryColor,
					justifyContent: "center",
				}}>
				<Image
					source={require("../assets/logo.png")}
					style={{
						height: 200,
						width: 200,
						resizeMode: "contain",
						justifyContent: "center",
						alignSelf: "center",
					}}
				/>
				<View
					style={{
						flex: 1,
						backgroundColor: "#fff",
						paddingTop: 10,
					}}>
					<DrawerItemList {...props} />
				</View>
			</DrawerContentScrollView>
			<Pressable
				onPress={() => {
					toggleSwitch();

					ToastAndroid.show(
						`Canteen ${!isEnabled ? "Closed" : "Opened"} `,
						ToastAndroid.SHORT
					);
				}}
				style={{
					padding: 20,
					borderTopColor: "lightgrey",
					borderTopWidth: 1,
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
				}}>
				<Switch
					trackColor={{ false: "#767577", true: "#81b0ff" }}
					thumbColor={isEnabled ? primaryColor : "#f4f3f4"}
					ios_backgroundColor='#3e3e3e'
					onValueChange={toggleSwitch}
					value={isEnabled}
					style={{
						// backgroundColor: "red",
						marginLeft: 10,
						padding: 0,
						height: 30,
						width: 30,
					}}
				/>
				<Text
					style={{
						marginLeft: 0,
						fontWeight: "bold",
						color: "grey",
					}}>
					Close Canteen
				</Text>
			</Pressable>
			<TouchableOpacity
				onPress={() => {
					navigation.navigate("Logout");
				}}
				style={{
					padding: 20,
					borderTopColor: "lightgrey",
					borderTopWidth: 1,
					display: "flex",
					flexDirection: "row",
				}}>
				<AntDesign name='logout' size={22} color={"black"} />

				<Text
					style={{
						marginLeft: 20,
						fontWeight: "bold",
						color: "grey",
					}}>
					Logout
				</Text>
			</TouchableOpacity>
		</View>
	);
};
const DrawerNavigator = ({ navigation }) => (
	<Drawer.Navigator
		screenOptions={{
			drawerLabelStyle: { marginLeft: -10, marginVertical: 5 },
			// drawerActiveBackgroundColor: secondaryColor,
			// drawerActiveTintColor: "white",
		}}
		drawerContent={(props) => (
			<CustomDrawer props={props} navigation={navigation} />
		)}>
		<Drawer.Screen
			name='Orders'
			component={Orders}
			options={{
				drawerIcon: ({ color }) => (
					<Ionicons name='fast-food-outline' size={22} color={color} />
				),
			}}
		/>
		{/* <Drawer.Screen
			name='Logout'
			component={Logout}
			options={{
				drawerIcon: ({ color }) => (
					<AntDesign name='logout' size={22} color={color} />
				),
			}}
		/> */}
		<Drawer.Screen
			name='Scan Orders'
			component={QrScanner}
			options={{
				drawerIcon: ({ color }) => (
					<AntDesign name='qrcode' size={22} color={color} />
				),
			}}
		/>
	</Drawer.Navigator>
);

export default DrawerNavigator;
