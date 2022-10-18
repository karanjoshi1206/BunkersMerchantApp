import {
	Dimensions,
	Image,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import React, { useState } from "react";
import Logo from "../../assets/logo.png";
import AppButton from "../../components/AppButton";
const windowWidth = Dimensions.get("screen").width;

const SignUp = () => {
	const [number, setNumber] = useState("");
	const [disabled, setDisabled] = useState(true);

	return (
		<View
			style={{
				padding: 15,
				flex: 1,
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
				<AppButton disabled={disabled}>Send OTP</AppButton>
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

						width: windowWidth - 230,
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

						width: windowWidth - 230,
					}}></View>
			</View>
			<View style={{ marginTop: 20 }}>
				<AppButton>Login With Email</AppButton>
			</View>
		</View>
	);
};

export default SignUp;

const styles = StyleSheet.create({});
