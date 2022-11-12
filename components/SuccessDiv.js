import { StyleSheet, Text, View } from "react-native";
import React from "react";

const SuccessDiv = ({ children }) => {
	return <View style={styles.successDiv}>{children}</View>;
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
