import { StyleSheet, Text, View } from "react-native";
import React, { useRef } from "react";
import LottieView from "lottie-react-native";
import { height } from "../../utils/CONSTANTS";

const Loading = () => {
	const animation = useRef(null);

	return (
		<View
			style={{
				justifyContent: "center",
				alignItems: "center",
				minHeight: height,
			}}>
			<LottieView
				autoPlay
				// ref={animation}
				style={{
					width: 200,
					height: 200,
				}}
				source={require("../../assets/loader.json")}
			/>
		</View>
	);
};

export default Loading;

const styles = StyleSheet.create({});
