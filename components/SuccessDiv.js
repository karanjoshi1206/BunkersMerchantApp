import { StyleSheet, Text, View } from "react-native";
import React from "react";

const SuccessDiv = ({ children, success = true }) => {
	return (
		<View
			style={{
				...styles.successDiv,
				backgroundColor: success ? "#4BB543" : "crimson",
			}}>
			{children}
		</View>
	);
};

export default SuccessDiv;

const styles = StyleSheet.create({
	successDiv: {
		backgroundColor: "#4BB543",
		width: "100%",
		padding: 10,
		borderRadius: 5,
	},
});
