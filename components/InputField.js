import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TextInput } from "react-native-paper";
import { primaryColor } from "../utils/CONSTANTS";

const InputField = ({
	value,
	setValue,
	placeholder,
	label,
	keyboardType = "default",
}) => {
	return (
		<TextInput
			label={label}
			outlineColor={primaryColor}
			underlineColor={primaryColor}
			underlineColorAndroid={primaryColor}
			activeUnderlineColor={primaryColor}
			style={styles.textInput}
			value={value}
			onChangeText={(text) => setValue(text)}
			placeholder={placeholder}
			keyboardType={keyboardType}
		/>
	);
};

export default InputField;

const styles = StyleSheet.create({
	textInput: {
		backgroundColor: "white",
		marginBottom: 10,

		// width: "100%",

		// padding: 5,
		// paddingHorizontal: 10,
	},
});
