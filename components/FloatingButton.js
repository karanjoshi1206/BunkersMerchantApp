import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { primaryColor } from "../utils/CONSTANTS";

const FloatingButton = ({ children, onPress = () => {} }) => {
	return (
		<TouchableOpacity onPress={onPress} style={styles.FloatingButton}>
			<Text
				style={{
					color: "white",
					fontSize: 26,
					fontWeight: "400",
				}}>
				{children}
			</Text>
		</TouchableOpacity>
	);
};

export default FloatingButton;

const styles = StyleSheet.create({
	FloatingButton: {
		position: "absolute",
		bottom: 60,
		right: 0,
		backgroundColor: primaryColor,
		textAlign: "center",
		height: 60,
		width: 60,
		borderRadius: 30,
		justifyContent: "center",
		alignItems: "center",
	},
});
