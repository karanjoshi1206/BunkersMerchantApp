import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { height, primaryColor } from "../../utils/CONSTANTS";
import SuccessDiv from "../../components/SuccessDiv";
import AppButton from "../../components/AppButton";
import { printToFileAsync } from "expo-print";
import * as MediaLibrary from "expo-media-library";
import { shareAsync } from "expo-sharing";

const OrderBill = () => {
	const sampleBill = {
		billId: 1234,
		customerName: "Karan Joshi",
		billItems: [
			{
				itemID: 8732,
				itemName: "Maggie",
				itemPortion: {
					portionName: "Half",
					poritonPrice: 20,
				},
			},
			{
				itemID: 8733442,
				itemName: "Bread Omellete",
				itemPortion: {
					portionName: "Double",
					poritonPrice: 30,
				},
			},
		],
		totalAmount: 50,
		paymentReceived: true,
		paymentMethod: "gPay",
		paymentId: "4231839",
		paymentTime: "24 oct 2022",
	};

	const htmlContent = `<!DOCTYPE html>
	<html lang="en">
		<head>
			<meta charset="UTF-8" />
			<meta http-equiv="X-UA-Compatible" content="IE=edge" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title>Bill Details</title>
			<style>
				* {
					margin: 0;
					padding: 0;
				}
				body {
					display: flex;
					justify-content: center;
					align-items: center;
					flex-direction: column;
					width: 100%;
					min-height: 60vh;
					font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
					margin:20px
				}
				.bill {
					padding: 30px;
					min-width: 500px;
					border: 2px solid green;
					border-radius: 4px;
					/* background-color: red; */
				}
				.billTitle {
					display: flex;
					justify-content: space-between;
				}
				.items {
					margin: 10px 0;
					padding: 10px;
					box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
				}
				.item {
					display: flex;
					justify-content: space-between;
					margin: 15px 0;
					align-items: center;
				}
				.billButton {
					padding: 20px;
					text-align: center;
					background-color: #3ab757;
					color: white;
					border-radius: 4px;
				}
			</style>
		</head>
		<body>
			<div class="bill">
				<div class="billTitle">
					<div class="billTitle_left">
						<p>Order Id:</p>
						<h3>#12345</h3>
					</div>
					<div class="billTitle_right">
						<p>Order By:</p>
						<h3>Karan Joshi</h3>
					</div>
				</div>
				<div class="billBody">
					<div class="items">
						<div class="item">
							<div class="itemName">
								<h4>Maggie</h4>
								<p>Half</p>
							</div>
							<div class="itemPrice">₹ 20</div>
						</div>
						<div class="item">
							<div class="itemName">
								<h4>Maggie</h4>
								<p>Half</p>
							</div>
							<div class="itemPrice">₹ 20</div>
						</div>
					</div>
					<div class="items">
						<div class="item">
							<h4>Total Amount:</h4>
							<h2>₹ 50</h2>
						</div>
					</div>
	
					<div class="billButton">
						<h5>Payment received</h5>
						<h2>Do not accept cash</h2>
					</div>
					<div class="item">
						<h4>Payment Method</h4>
						<p>gPay</p>
					</div>
					<div class="item">
						<h4>Payment ID</h4>
						<p>2726182</p>
					</div>
					<div class="item">
						<h4>Payment Time</h4>
						<p>24 oct 2022</p>
					</div>
				</div>
			</div>
		</body>
	</html>
	`;

	const generatePdf = async () => {
		const file = await printToFileAsync({
			html: htmlContent,
			base64: false,
		});
		await shareAsync(file.uri);
	};
	// const createAndSavePDF = async () => {
	// 	try {
	// 		const { uri } = await Print.printToFileAsync({ htmlContent });
	// 		if (Platform.OS === "ios") {
	// 			await Sharing.shareAsync(uri);
	// 		} else {
	// 			const permission = await MediaLibrary.requestPermissionsAsync();
	// 			if (permission.granted) {
	// 				await MediaLibrary.createAssetAsync(uri);
	// 			}
	// 		}
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };
	return (
		<View style={styles.OrderBill}>
			<View
				style={{
					...styles.bill,
					borderColor: sampleBill?.paymentReceived ? "#4BB543" : "crimson",
				}}>
				<View style={styles.billHeader}>
					<View>
						<Text>Order Id: </Text>
						<Text style={{ ...styles.title, textAlign: "auto" }}>
							#{sampleBill.billId}
						</Text>
					</View>
					<View>
						<Text>Order By: </Text>
						<Text style={{ ...styles.title, textAlign: "auto" }}>
							{sampleBill.customerName}
						</Text>
					</View>
				</View>
				<View style={styles.billBody}>
					<View style={styles.billItemPortions}>
						{sampleBill.billItems.map((elem) => (
							<View
								style={{
									marginVertical: 10,
									borderBottomColor: "lightgrey",
									borderBottomWidth: 1,
								}}
								key={elem.itemID}>
								<Text style={{ ...styles.title, textAlign: "auto" }}>
									{elem.itemName}
								</Text>
								<View style={{ ...styles.flex, marginVertical: 5 }}>
									<Text>{elem.itemPortion.portionName}</Text>
									<Text> ₹ {elem.itemPortion.poritonPrice}</Text>
								</View>
							</View>
						))}
					</View>

					<View
						style={{
							marginVertical: 10,
							...styles.flex,
							...styles.billItemPortions,
						}}>
						<Text style={{ ...styles.title, textAlign: "auto" }}>
							Total Amount:
						</Text>
						<Text
							style={{
								fontSize: 30,
							}}>
							₹ {sampleBill.totalAmount}
						</Text>
					</View>
					{sampleBill.paymentReceived ? (
						<>
							<SuccessDiv>
								<Text
									style={{
										color: "white",
										textAlign: "center",
									}}>
									PAYMENT RECEIVED{" "}
								</Text>
								<Text
									style={{
										color: "white",
										textAlign: "center",
										fontSize: 18,
										textTransform: "uppercase",
									}}>
									Do not accept cash{" "}
								</Text>
							</SuccessDiv>
							<View style={{ ...styles.flex, marginTop: 10 }}>
								<Text style={styles.title}>Payment Method</Text>
								<Text>{sampleBill.paymentMethod}</Text>
							</View>
							<View style={{ ...styles.flex, marginTop: 10 }}>
								<Text style={styles.title}>Payment Id</Text>
								<Text>{sampleBill.paymentId}</Text>
							</View>
							<View style={{ ...styles.flex, marginTop: 10 }}>
								<Text style={styles.title}>Payment Time</Text>
								<Text>{sampleBill.paymentTime}</Text>
							</View>
						</>
					) : (
						<SuccessDiv success={false}>
							<Text
								style={{
									color: "white",
									textAlign: "center",
								}}>
								PAYMENT NOT RECEIVED !!!{" "}
							</Text>
							<Text
								style={{
									color: "white",
									textAlign: "center",
									fontSize: 18,
									textTransform: "uppercase",
								}}>
								Please COLLECT cash{" "}
							</Text>
						</SuccessDiv>
					)}
				</View>
			</View>
			<AppButton onPress={() => generatePdf()} fullWidth={true}>
				Download Bill
			</AppButton>
		</View>
	);
};

export default OrderBill;

const styles = StyleSheet.create({
	flex: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	OrderBill: {
		paddingVertical: 20,
		paddingHorizontal: 10,

		backgroundColor: "white",
		height: "100%",
	},
	title: {
		textAlign: "center",
		fontWeight: "600",
		fontSize: 18,
	},
	bill: {
		borderColor: primaryColor,
		borderWidth: 2,
		// height: height - 100,
		marginVertical: 10,
		borderRadius: 5,
		padding: 15,
		paddingVertical: 20,
	},
	billHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	billBody: {
		marginTop: 20,
	},
	billItemPortions: {
		padding: 10,

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
		backgroundColor: "white",
		marginVertical: 10,
		borderRadius: 4,
	},
});
