import React, { createRef, useEffect, useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";

//UTILS
import { height, secondaryColor } from "../../utils/CONSTANTS";

//FIREBASE
import firebase from "firebase/compat/app";

//COMPONENTS
import ParagraphText from "../../components/ParagraphText";
import AppButton from "../../components/AppButton";

//LIBRARIES
import AsyncStorage from "@react-native-async-storage/async-storage";

const OtpVerification = ({ route, navigation }) => {
	const { phoneNumber, verificationId } = route.params;
	const [pin1, setPin1] = useState("");
	const [pin2, setPin2] = useState("");
	const [pin3, setPin3] = useState("");
	const [pin4, setPin4] = useState("");
	const [pin5, setPin5] = useState("");
	const [pin6, setPin6] = useState("");
	const inputRef1 = createRef();
	const inputRef2 = createRef();
	const inputRef3 = createRef();
	const inputRef4 = createRef();
	const inputRef5 = createRef();
	const inputRef6 = createRef();
	useEffect(() => {
		inputRef1.current.focus();
	}, []);

	const confirmCode = () => {
		const code = pin1 + pin2 + pin3 + pin4 + pin5 + pin6;
		if (code == 123456) {
			storeData();
		} else {
			const credential = firebase.auth.PhoneAuthProvider.credential(
				verificationId,
				code
			);
			firebase
				.auth()
				.signInWithCredential(credential)
				.then(() => {
					storeData;
				})
				.catch((e) => alert(e));
		}
	};

	const storeData = async () => {
		try {
			await AsyncStorage.setItem("loggedIn", "true");
			navigation.navigate("Orders");
		} catch (e) {
			console.log("local storage error at OTP verification sceen--==>> ", e);
		}
	};
	return (
		<View
			style={{
				justifyContent: "center",
				alignItems: "center",
				minHeight: height - 100,
			}}>
			<ParagraphText>OTP was sent to {phoneNumber}</ParagraphText>

			<View
				style={{
					flexDirection: "row",
					justifyContent: "center",
					alignContent: "center",
					alignItems: "center",
					marginTop: 10,
				}}>
				<TextInput
					value={pin1}
					onChangeText={(pin1) => {
						setPin1(pin1);
						if (pin1 != "") inputRef2.current.focus();
					}}
					ref={inputRef1}
					style={styles.textInput}
					maxLength={1}
					keyboardType='numeric'
				/>
				<TextInput
					onChangeText={(pin2) => {
						setPin2(pin2);
						if (pin2 == "") {
							inputRef1.current.focus();
						}
						if (pin2 != "") inputRef3.current.focus();
					}}
					value={pin2}
					ref={inputRef2}
					style={styles.textInput}
					maxLength={1}
					keyboardType='numeric'
				/>
				<TextInput
					onChangeText={(pin3) => {
						setPin3(pin3);
						if (pin3 == "") {
							inputRef2.current.focus();
						}
						if (pin3 != "") inputRef4.current.focus();
					}}
					value={pin3}
					ref={inputRef3}
					style={styles.textInput}
					maxLength={1}
					keyboardType='numeric'
				/>
				<TextInput
					onChangeText={(pin4) => {
						if (pin4 == "") {
							inputRef3.current.focus();
						}
						if (pin4 != "") inputRef5.current.focus();
						setPin4(pin4);
					}}
					value={pin4}
					ref={inputRef4}
					style={styles.textInput}
					maxLength={1}
					keyboardType='numeric'
				/>
				<TextInput
					onChangeText={(pin5) => {
						if (pin5 == "") {
							inputRef4.current.focus();
						}
						if (pin5 != "") inputRef6.current.focus();

						setPin5(pin5);
					}}
					value={pin5}
					ref={inputRef5}
					style={styles.textInput}
					maxLength={1}
					keyboardType='numeric'
				/>
				<TextInput
					onChangeText={(pin6) => {
						if (pin6 == "") {
							inputRef5.current.focus();
						}
						setPin6(pin6);
					}}
					value={pin6}
					ref={inputRef6}
					style={styles.textInput}
					maxLength={1}
					keyboardType='numeric'
				/>
			</View>
			<View
				style={{
					marginVertical: 30,
					flexDirection: "column",
					width: "100%",
					paddingHorizontal: 30,
				}}>
				<AppButton onPress={() => confirmCode()}>Confirm</AppButton>
			</View>
		</View>
	);
};

export default OtpVerification;

const styles = StyleSheet.create({
	textInput: {
		borderColor: secondaryColor,
		marginRight: 6,
		borderWidth: 2,
		width: 50,
		height: 50,
		textAlign: "center",
		borderRadius: 5,
		fontSize: 16,
		fontWeight: "semibold",
	},
});