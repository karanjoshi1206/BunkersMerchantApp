import {
	Dimensions,
	FlatList,
	Image,
	StyleSheet,
	Text,
	View,
} from "react-native";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import React, { useRef, useState } from "react";
import { data } from "./data";
import WelcomeSlide from "../../components/WelcomeSlide";
import AppButton from "../../components/AppButton";
const windowHeight = Dimensions.get("screen").height;
const PAGE_WIDTH = Dimensions.get("screen").width;

const Welcome = ({ navigation }) => {
	const [isVertical, setIsVertical] = useState(false);
	const ref = useRef(null);

	const baseOptions = isVertical
		? {
				vertical: true,
				width: PAGE_WIDTH,
				height: PAGE_WIDTH / 2,
		  }
		: {
				vertical: false,
				width: PAGE_WIDTH,
				height: PAGE_WIDTH / 2,
		  };
	return (
		<View
			style={{
				position: "absolute",
				top: 0,
			}}>
			<View
				style={{
					height: windowHeight - 150,
				}}>
				{/* <FlatList
					horizontal={true}
					data={data}
					renderItem={(elem) => <WelcomeSlide elem={elem} />}
					snapToAlignment='start'
					snapToInterval={Dimensions.get("screen").width}
				/> */}

				<Carousel
					{...baseOptions}
					loop={true}
					ref={ref}
					style={{ height: "100%" }}
					autoPlay={true}
					autoPlayInterval={2000}
					data={data}
					pagingEnabled={true}
					scrollAnimationDuration={1000}
					// onSnapToItem={(index) => console.log("current index:", index)}
					renderItem={(elem) => <WelcomeSlide elem={elem} />}
				/>
			</View>
			<View
				style={{
					padding: 10,
				}}>
				<AppButton
					fullWidth={true}
					onPress={() => navigation.navigate("SignUp")}
					solid={true}>
					Login
				</AppButton>
				<AppButton fullWidth={true}>Sign up</AppButton>
			</View>
		</View>
	);
};

export default Welcome;

const styles = StyleSheet.create({});
