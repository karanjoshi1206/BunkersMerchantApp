import { StyleSheet, Text, View } from "react-native";
import React from "react";

const ParagraphText = ({ children }) => {
	return (
		<Text
			style={{
				fontSize: 16,
				color: "black",
				fontWeight: "400",
			}}>
			{children}
		</Text>
	);
};

export default ParagraphText;

const styles = StyleSheet.create({});
