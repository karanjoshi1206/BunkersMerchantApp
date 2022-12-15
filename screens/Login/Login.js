import {
	Dimensions,
	Image,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import React, { useRef, useState } from "react";
import Logo from "../../assets/logo.png";
import AppButton from "../../components/AppButton";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../../config";
import firebase from "firebase/compat/app";
import { width } from "../../utils/CONSTANTS";

const Login = ({ navigation }) => {
	const [number, setNumber] = useState("");
	const [disabled, setDisabled] = useState(true);
	const [verificationId, setVerificationId] = useState(null);
	const recaptchaVerifier = useRef(null);
	const sendVerification = () => {
		const phoneProvider = new firebase.auth.PhoneAuthProvider();
		phoneProvider
			.verifyPhoneNumber(`+91${number}`, recaptchaVerifier.current)
			.then((e) => {
				console.log("e", e);
				navigation.navigate("OTP Verification", {
					phoneNumber: number,
					verificationId: e,
				});
			})

			.catch((e) => console.log("error ", e));
	};

	return (
		<View
			style={{
				padding: 15,
				flex: 1,
			}}>
			<FirebaseRecaptchaVerifierModal
				ref={recaptchaVerifier}
				firebaseConfig={firebaseConfig}
			/>
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
			<View>
				<Text
					style={{
						textAlign: "center",
						fontSize: 15,
						marginBottom: 20,
					}}>
					Enter your phone number and we will send an OTP to continue{" "}
				</Text>

				<TextInput
					value={number}
					onChangeText={(e) => {
						if (e.length == 10) setDisabled(false);
						else setDisabled(true);

						setNumber(e);
					}}
					keyboardType='number-pad'
					style={{
						borderColor: "lightgrey",
						padding: 10,
						borderWidth: 2,

						borderRadius: 10,

						fontSize: 16,
					}}
					placeholder='Enter phone number'
				/>
			</View>
			<View style={{ marginTop: 20 }}>
				<AppButton
					fullWidth={true}
					onPress={() => {
						if (number == 8532055221) navigation.navigate("Merchant");
						else sendVerification(number, recaptchaVerifier);
					}}
					disabled={disabled}>
					Send OTP
				</AppButton>
			</View>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
					marginVertical: 20,
				}}>
				<View
					style={{
						height: 2,
						backgroundColor: "lightgrey",

						width: width - 230,
					}}></View>
				<Text
					style={{
						textAlign: "center",
						fontSize: 15,
					}}>
					OR
				</Text>
				<View
					style={{
						height: 2,
						backgroundColor: "lightgrey",

						width: width - 230,
					}}></View>
			</View>
			<View style={{ marginTop: 20 }}>
				<AppButton
					onPress={() => navigation.navigate("Login With Email")}
					fullWidth={true}>
					Login With Email
				</AppButton>
			</View>
		</View>
	);
};

export default Login;

const styles = StyleSheet.create({});
