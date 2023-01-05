import {
	StyleSheet,
	Text,
	View,
	Switch,
	TouchableOpacity,
	Alert,
	Image,
} from "react-native";
import React, { useState } from "react";
import { primaryColor, red, secondaryColor } from "../utils/CONSTANTS";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MenuItem from "../screens/Menu/MenuItem";
// import Constants from "expo-constants";

const MenuCard = ({ menu, refresh, setRefresh }) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [inStock, setInStock] = useState(menu?.availability ? true : false);
	const toggleSwitch = () => {
		setInStock((previousState) => !previousState);
		setRefresh((previousState) => !previousState);
	};
	return (
		<View
			style={{
				...styles.menuCard,
				borderTopColor: inStock ? secondaryColor : "black",
			}}
			key={menu._id}>
			<View
				style={{
					...styles.flex,
					marginBottom: 10,
					borderBottomColor: secondaryColor,
					borderBottomWidth: 2,
				}}>
				<View
					style={{
						flexDirection: "row",
						alignItems: "flex-end",
						// width: 100,
						maxWidth: 150,
					}}>
					<Text style={styles.title}>{menu.name}</Text>
					<Image
						source={{ uri: menu.Image }}
						style={{
							height: 40,
							width: 40,
							borderRadius: 20,
							resizeMode: "contain",
							marginLeft: 5,
						}}
					/>
				</View>
				<View
					style={{
						justifyContent: "space-between",
						alignItems: "center",
						flexDirection: "row",
					}}>
					<Text
						style={{
							fontSize: 14,
							marginRight: 20,
							fontWeight: "bold",
						}}>
						{inStock ? "In Stock" : "Out of stock"}
					</Text>
					<Switch
						trackColor={{ false: "#767577", true: "#81b0ff" }}
						thumbColor={inStock ? primaryColor : "#f4f3f4"}
						ios_backgroundColor={primaryColor}
						onValueChange={toggleSwitch}
						value={inStock}
						style={{
							marginLeft: 0,
							padding: 0,
							height: 30,
							width: 30,
						}}
					/>
				</View>
			</View>
			{menu?.portions?.map((elem, idx) => {
				return (
					<View
						style={{
							...styles.flex,
							marginBottom: 5,
							borderBottomColor: "lightgrey",
							borderBottomWidth: 1,
							paddingVertical: 5,
						}}
						key={idx}>
						<Text style={styles.subTitle}>{elem.portionName}</Text>
						<Text style={styles.subTitle}>₹ {elem.portionPrice}</Text>
					</View>
				);
			})}

			<View
				style={{
					...styles.flex,
					marginBottom: 0,
					marginTop: 10,
				}}>
				<TouchableOpacity
					onPress={() => {
						setModalVisible(true);
						// setPortionEditMode(true);
						// setPortionId(elem.id);
						// toggle();
					}}
					style={{
						borderColor: primaryColor,
						...styles.buttons,
					}}>
					<MaterialCommunityIcons
						name='circle-edit-outline'
						size={16}
						color={primaryColor}
					/>
					<Text
						style={{
							color: primaryColor,
							...styles.buttonText,
						}}>
						Edit
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						Alert.alert(
							//title
							"Are You Sure?",
							//body
							"The selected Menu Item will be deleted forever",
							[
								{
									text: "Yes",
									onPress: () => {
										// const newPortion = portions.filter(
										// 	(portion) => portion !== elem
										// );
										// setPortions(newPortion);
									},
								},
								{
									text: "No",
									onPress: () => console.log("No Pressed"),
									style: "cancel",
								},
							],
							{ cancelable: true }
						);
					}}
					style={{
						borderColor: red,
						...styles.buttons,
					}}>
					<MaterialCommunityIcons name='delete-outline' size={16} color={red} />
					<Text
						style={{
							color: red,
							...styles.buttonText,
						}}>
						Delete
					</Text>
				</TouchableOpacity>
			</View>

			{modalVisible && (
				<MenuItem setModalVisible={setModalVisible} mode='edit' data={menu} />
			)}
		</View>
	);
};

export default MenuCard;

const styles = StyleSheet.create({
	menuCard: {
		padding: 20,
		borderRadius: 10,
		borderWidth: 1,
		borderTopWidth: 5,
		elevation: 5,
		backgroundColor: "white",
		borderColor: "lightgrey",
		marginBottom: 14,
		paddingVertical: 25,
		overflow: "hidden",
	},

	title: {
		fontSize: 16,
		textTransform: "capitalize",
		fontWeight: "600",
		marginBottom: 10,
	},
	subTitle: {
		fontSize: 14,
	},
	flex: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		// alignItems: "center",
	},
	buttons: {
		padding: 8,
		borderWidth: 1,
		paddingHorizontal: 15,
		borderRadius: 7,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	buttonText: {
		fontSize: 14,
		fontWeight: "600",

		marginLeft: 5,
	},
});
