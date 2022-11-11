import {
	Dimensions,
	Image,
	ImageBackground,
	StyleSheet,
	Text,
	View,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const windowWidth = Dimensions.get("screen").width;
const windowHeight = Dimensions.get("screen").height;
const WelcomeSlide = ({ elem }) => {
	const imageUri = Image.resolveAssetSource(elem.item.imageLink).uri;

	return (
		<View
			style={{
				position: "relative",
			}}>
			{/* <Image
				style={{
					height: windowHeight,
					width: windowWidth,
					resizeMode: "cover",
				}}
				source={{ uri: imageUri }}
			/> */}

			<ImageBackground
				style={{
					height: windowHeight,
					width: windowWidth,
					resizeMode: "cover",
				}}
				source={{ uri: imageUri }}>
				<LinearGradient
					colors={["#00000000", "#000000"]}
					style={{ height: "100%", width: "100%" }}>
					<Text
						style={{
							color: "white",
							position: "absolute",
							bottom: 200,
							left: 20,
							fontSize: 40,
							textTransform: "capitalize",
						}}>
						{elem.item.content}
					</Text>
				</LinearGradient>
			</ImageBackground>
		</View>
	);
};

export default WelcomeSlide;

const styles = StyleSheet.create({});
