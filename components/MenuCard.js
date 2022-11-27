import { StyleSheet, Text, View, Switch } from "react-native";
import React, { useState } from "react";
import { primaryColor, secondaryColor } from "../utils/CONSTANTS";

const MenuCard = ({ menu, refresh, setRefresh }) => {
	const [inStock, setInStock] = useState(menu?.availableOnStock ? true : false);
	const toggleSwitch = () => {
		setInStock((previousState) => !previousState);
		setRefresh((previousState) => !previousState);
	};
	return (
		<View
			style={{
				...styles.menuCard,
				borderBottomColor: inStock ? primaryColor : "red",
				borderBottomWidth: 10,
			}}
			key={menu.id}>
			<View
				style={{
					...styles.flex,
					marginBottom: 20,
					borderBottomColor: secondaryColor,
					borderBottomWidth: 3,
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
							fontSize: 16,
							marginRight: 25,
						}}>
						In Stock
					</Text>
					<Switch
						trackColor={{ false: "#767577", true: "#81b0ff" }}
						thumbColor={inStock ? primaryColor : "#f4f3f4"}
						ios_backgroundColor='#3e3e3e'
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
			<Text></Text>
		</View>
	);
};

export default MenuCard;

const styles = StyleSheet.create({
	menuCard: {
		backgroundColor: "white",
		marginVertical: 20,
		padding: 20,
		borderRadius: 10,
	},
	title: {
		fontSize: 20,
		textTransform: "capitalize",
		fontWeight: "600",
		marginBottom: 10,
	},
	subTitle: {
		fontSize: 18,
	},
	flex: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		// alignItems: "center",
	},
});
