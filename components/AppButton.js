import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const AppButton = ({
	children,
	solid = false,
	disabled = false,
	onPress = () => {},
	danger = false,
	fullWidth = false,
	width = "50%",
}) => {
	return (
		<TouchableOpacity
			onPress={onPress}
			disabled={disabled}
			style={{
				...styles.button,
				width: fullWidth ? "100%" : width,
				backgroundColor: disabled
					? "lightgrey"
					: solid
					? "#256FEF"
					: "transparent",
				borderColor: disabled
					? "lightgrey"
					: solid
					? "transparent"
					: danger
					? "crimson"
					: "#256FEF",
			}}>
			<Text
				style={{
					...styles.buttonText,
					color: disabled
						? "white"
						: solid
						? "white"
						: danger
						? "crimson"
						: "#256FEF",
				}}>
				{children}
			</Text>
		</TouchableOpacity>
	);
};

export default AppButton;

const styles = StyleSheet.create({
	button: {
		backgroundColor: "#256FEF",
		padding: 15,
		borderRadius: 10,
		borderColor: "white",
		borderWidth: 1,
		marginBottom: 10,
		// width:  "100%",
	},
	buttonText: {
		textAlign: "center",
		color: "white",
		fontWeight: "700",
	},
});
