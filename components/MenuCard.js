import {
	StyleSheet,
	Text,
	View,
	Switch,
	TouchableOpacity,
	Alert,
} from "react-native";
import React, { useState } from "react";
import { primaryColor, red, secondaryColor } from "../utils/CONSTANTS";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MenuItem from "../screens/Menu/MenuItem";
// import Constants from "expo-constants";

const MenuCard = ({ menu, refresh, setRefresh }) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [inStock, setInStock] = useState(menu?.availableOnStock ? true : false);
	const toggleSwitch = () => {
		setInStock((previousState) => !previousState);
		setRefresh((previousState) => !previousState);
	};
	return (
		// <NeuMorphismView
		// 	borderless={true}
		// 	style={{
		// 		marginBottom: 10,
		// 	}}>
		<View
			style={{
				...styles.menuCard,
				borderTopColor: inStock ? secondaryColor : "black",
			}}
			key={menu.id}>
			<View
				style={{
					...styles.flex,
					marginBottom: 10,
					borderBottomColor: secondaryColor,
					borderBottomWidth: 2,
				}}>
				<Text style={styles.title}>{menu.itemName}</Text>
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
			{menu?.portions?.map((elem) => {
				return (
					<View
						style={{
							...styles.flex,
							marginBottom: 5,
							borderBottomColor: "lightgrey",
							borderBottomWidth: 1,
							paddingVertical: 5,
						}}
						key={elem.portionName}>
						<Text style={styles.subTitle}>{elem.portionName}</Text>
						<Text style={styles.subTitle}>₹ {elem.portionPrice}</Text>
					</View>
				);
			})}

			<View style={{ ...styles.flex, marginBottom: 0, marginTop: 10 }}>
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
		// </NeuMorphismView>
	);
};

export default MenuCard;

const styles = StyleSheet.create({
	menuCard: {
		// backgroundColor: "white",
		// marginVertical: 20,
		padding: 20,
		// marginTop: 5,
		borderRadius: 10,
		borderWidth: 1,
		borderTopWidth: 10,
		minHeight: 200,
		elevation: 5,
		backgroundColor: "white",
		borderColor: secondaryColor,
		marginBottom: 14,
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
