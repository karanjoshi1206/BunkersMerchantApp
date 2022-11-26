import {
	StyleSheet,
	Text,
	View,
	Button,
	Pressable,
	TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { height, width } from "../../utils/CONSTANTS";
import AppButton from "../../components/AppButton";

const QrScanner = ({ navigation }) => {
	const [hasPermission, setHasPermission] = useState(null);
	const [scanned, setScanned] = useState(false);
	useEffect(() => {
		const getBarCodeScannerPermissions = async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync();
			setHasPermission(status === "granted");
		};

		getBarCodeScannerPermissions();
	}, []);

	const handleBarCodeScanned = ({ type, data }) => {
		setScanned(true);
		navigation.navigate("Order Details", { order: {} });
		alert(`Bar code with type ${type} and data ${data} has been scanned!`);
	};

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<View
			style={{
				padding: 20,
			}}>
			<Text
				style={{
					textAlign: "center",
					fontSize: 18,
					marginVertical: 10,
					fontWeight: "400",
				}}>
				Scan QR to get ORDER details
			</Text>

			<View
				style={{
					marginTop: -180,
					borderRadius: 10,
					marginBottom: 20,
				}}>
				<BarCodeScanner
					onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
					style={{
						height: 400,
						marginTop: 200,
						borderRadius: 10,
					}}
				/>
			</View>
			{scanned && (
				<AppButton onPress={() => setScanned(false)} fullWidth={true}>
					Tap to Scan Again
				</AppButton>
			)}
		</View>
	);
};

export default QrScanner;

const styles = StyleSheet.create({});
