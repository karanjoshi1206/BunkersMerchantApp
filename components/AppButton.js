import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";

const AppButton = ({
	children,
	solid = false,
	disabled = false,
	onPress = () => {},
	danger = false,
	fullWidth = false,
	width = "50%",
	borderRadius = true,
	loading = false,
}) => {
	return (
		<>
			{loading ? (
				<View
					style={{
						justifyContent: "center",
						alignItems: "center",
						marginVertical: 5,
					}}>
					<LottieView
						autoPlay
						style={{
							width: 50,
							height: 50,
						}}
						source={require("../assets/loader.json")}
					/>
				</View>
			) : (
				<TouchableOpacity
					onPress={onPress}
					disabled={disabled}
					style={{
						...styles.button,
						borderRadius: borderRadius ? 10 : 0,
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
			)}
		</>
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
		justifyContent: "center",
		alignItems: "center",
		// width:  "100%",
	},
	buttonText: {
		textAlign: "center",
		color: "white",
		fontWeight: "700",
	},
});
