import {
	StyleSheet,
	Text,
	View,
	Image,
	ToastAndroid,
	TextInput,
} from "react-native";
// import { TextInput } from "react-native-paper";
import React, { useEffect, useState } from "react";
import { height, primaryColor, secondaryColor } from "../../utils/CONSTANTS";
import Logo from "../../assets/logo.png";
import AppButton from "../../components/AppButton";
import MerchantLogin from "../../api/merchantLogin";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginWithEmail = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [disabled, setDisabled] = useState(true);
	const [loading, setIsLoading] = useState(false);
	useEffect(() => {
		if (email.length > 0 && password.length > 0) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [email, password]);

	const loginMerchant = async () => {
		setIsLoading(true);
		const data = await MerchantLogin(email.trim(), password.trim());

		if (data.status == 200) {
			await storeData();
			setIsLoading(false);
			ToastAndroid.show("Login Successful !!", ToastAndroid.SHORT);
		} else {
			setIsLoading(false);
			ToastAndroid.show("Something went wrong !!", ToastAndroid.SHORT);
		}
	};
	const storeData = async () => {
		try {
			await AsyncStorage.setItem("loggedIn", "true");
			navigation.navigate("Merchant");
		} catch (e) {
			console.log("local storage error at Login with email screen--==>> ", e);
		}
	};

	return (
		<View
			style={{
				flex: 1,

				padding: 15,
				backgroundColor: "white",
			}}>
			<View
				style={{
					marginTop: 100,
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
			<View
				style={{
					marginTop: 50,
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

			<TextInput
				value={email}
				onChangeText={(text) => {
					setEmail(text);
					if (email.length > 0 && password.length > 0) {
						setDisabled(false);
					}
				}}
				keyboardType='number-pad'
				style={{
					borderColor: "lightgrey",
					padding: 10,
					borderWidth: 2,

					borderRadius: 10,

					fontSize: 16,
					marginBottom: 10,
				}}
				placeholder='Eg. karan@gmail.com'
			/>

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
					marginBottom: 10,

					fontSize: 16,
				}}
				placeholder='Enter your password'
			/>

			<View style={{ marginTop: 20 }}>
				<AppButton
					loading={loading}
					fullWidth={true}
					onPress={() => {
						loginMerchant();
					}}
					disabled={disabled}>
					Login
				</AppButton>
			</View>
		</View>
	);
};

export default LoginWithEmail;

const styles = StyleSheet.create({});
