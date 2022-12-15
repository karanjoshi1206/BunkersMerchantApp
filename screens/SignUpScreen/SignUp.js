import {
	Image,
	KeyboardAvoidingView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	ToastAndroid,
	View,
} from "react-native";
import React, { useState } from "react";
import Logo from "../../assets/logo.png";
import { primaryColor, secondaryColor } from "../../utils/CONSTANTS";
import AppButton from "../../components/AppButton";
import MerchantSignUp from "../../api/merchantSignUp";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUp = ({ navigation }) => {
	const [password, setPassword] = useState("");
	const [disabled, setDisabled] = useState(false);
	const [loading, setIsLoading] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");

	const signUpMethod = async () => {
		setIsLoading(true);
		const data = await MerchantSignUp(email, password, name, phoneNumber);
		console.log("data is ==>", data.data);
		if (data.status == 201) {
			await storeData();
			setIsLoading(false);
			ToastAndroid.show(`${data.data.message}`, ToastAndroid.SHORT);
		} else {
			setIsLoading(false);
			ToastAndroid.show(`${data.data.message}`, ToastAndroid.SHORT);
		}
	};
	const storeData = async () => {
		try {
			await AsyncStorage.setItem("loggedIn", "true");
			navigation.navigate("Merchant");
		} catch (e) {
			console.log("local storage error at Login with signup screen--==>> ", e);
		}
	};

	return (
		<ScrollView
			behavior='padding'
			style={{
				padding: 20,
				backgroundColor: "white",
			}}>
			<View
				style={{
					alignItems: "center",
				}}>
				<Image
					source={Logo}
					style={{
						height: 200,
						width: 200,
						resizeMode: "cover",
					}}
				/>
			</View>
			<View style={styles.inputViewStyle}>
				<Text style={styles.labelStyle}>Enter your Name</Text>
				<TextInput
					value={name}
					onChangeText={(text) => {
						setName(text);
					}}
					style={{
						borderColor: "lightgrey",
						padding: 10,
						borderWidth: 2,

						borderRadius: 10,

						fontSize: 16,
					}}
					placeholder='Enter your name'
				/>
			</View>
			<View style={styles.inputViewStyle}>
				<Text style={styles.labelStyle}>Enter your Email</Text>

				<TextInput
					value={email}
					onChangeText={(text) => {
						setEmail(text);
						if (email.length > 0 && password.length > 0) {
							setDisabled(false);
						}
					}}
					style={{
						borderColor: "lightgrey",
						padding: 10,
						borderWidth: 2,

						borderRadius: 10,

						fontSize: 16,
					}}
					placeholder='Eg. Karan@gmail.com'
				/>
			</View>
			<View style={styles.inputViewStyle}>
				<Text style={styles.labelStyle}>Enter your Phone Number</Text>

				<TextInput
					keyboardType='number-pad'
					value={phoneNumber}
					onChangeText={(text) => {
						setPhoneNumber(text);
						if (email.length > 0 && password.length > 0) {
							setDisabled(false);
						}
					}}
					style={{
						borderColor: "lightgrey",
						padding: 10,
						borderWidth: 2,

						borderRadius: 10,

						fontSize: 16,
					}}
					placeholder='Eg. 98392839209'
				/>
			</View>
			<View style={styles.inputViewStyle}>
				<Text style={styles.labelStyle}>Enter your P assword</Text>

				<TextInput
					value={password}
					onChangeText={(text) => {
						setPassword(text);
						if (email.length > 0 && password.length > 0) {
							setDisabled(false);
						}
					}}
					style={{
						borderColor: "lightgrey",
						padding: 10,
						borderWidth: 2,

						borderRadius: 10,

						fontSize: 16,
					}}
					placeholder='Set a strong password'
				/>
			</View>
			<AppButton
				loading={loading}
				onPress={() => signUpMethod()}
				fullWidth={true}>
				Sign Up
			</AppButton>
		</ScrollView>
	);
};

export default SignUp;

const styles = StyleSheet.create({
	labelStyle: {
		fontSize: 14,
		fontWeight: "600",
		color: "black",
		marginBottom: 3,
	},
	inputViewStyle: {
		marginBottom: 20,
	},
});
