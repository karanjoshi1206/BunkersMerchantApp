import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { height, primaryColor, secondaryColor } from "../utils/CONSTANTS";
import LottieView from "lottie-react-native";

const NoData = () => {
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: "white",
				justifyContent: "center",
				alignItems: "center",
				minHeight: height - 100,
			}}>
			<Image
				source={require("../assets/NoData.png")}
				style={{
					height: 200,
					width: 200,
				}}
			/>
		</View>
	);
};

export default NoData;

const styles = StyleSheet.create({
	outerCircle: {
		height: 200,
		width: 200,
		borderColor: primaryColor,
		borderWidth: 2,
		borderRadius: 100,
		backgroundColor: secondaryColor,
		justifyContent: "center",
		alignItems: "center",
	},
	innerText: {
		color: "white",
		fontSize: 27,
	},
	upperDiv: {
		height: height / 2,
		backgroundColor: secondaryColor,
		margin: -10,
		borderRadius: 150,
	},
});
