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
import { height, primaryColor, width } from "../../utils/CONSTANTS";
import AppButton from "../../components/AppButton";
import Loading from "../Loading/Loading";

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
		return <Loading />;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}

	return (
		<>
			{/* <View
				style={{
					justifyContent: "center",
					alignItems: "center",
					height: 350,
					width: 350,
					overflow: "hidden",
					backgroundColor: "red",
					position: "relative",
				}}>
				<BarCodeScanner
					onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
					style={{
						height: 350,
						width: "120%",
						position: "absolute",
						right: 0,
						left: -20,
					}}
				/>
			</View>
			{scanned && (
				<AppButton onPress={() => setScanned(false)} fullWidth={true}>
					Tap to Scan Again
				</AppButton>
			)} */}

			<BarCodeScanner
				onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
				style={[StyleSheet.absoluteFill, styles.container]}>
				<View style={styles.layerTop} />
				<View style={styles.layerCenter}>
					<View style={styles.layerLeft} />
					<View style={styles.focused} />
					<View style={styles.layerRight} />
				</View>
				<View style={styles.layerBottom} />
			</BarCodeScanner>
			<View
				style={{
					position: "absolute",
					bottom: 50,
					right: 0,
					left: 0,
				}}>
				{scanned && (
					<AppButton
						borderRadius={false}
						solid={true}
						onPress={() => setScanned(false)}
						fullWidth={true}>
						Tap to Scan Again
					</AppButton>
				)}
			</View>
		</>
	);
};

export default QrScanner;

const opacity = "rgba(0, 0, 0, .6)";
const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		// position: "absolute",
		marginBottom: 100,
	},
	layerTop: {
		flex: 2,
		backgroundColor: opacity,
	},
	layerCenter: {
		flex: 3,
		flexDirection: "row",
	},
	layerLeft: {
		flex: 1,
		backgroundColor: opacity,
	},
	focused: {
		flex: 10,
	},
	layerRight: {
		flex: 1,
		backgroundColor: opacity,
	},
	layerBottom: {
		flex: 2,
		backgroundColor: opacity,
	},
});
