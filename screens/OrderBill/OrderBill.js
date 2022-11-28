import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { height, primaryColor } from "../../utils/CONSTANTS";
import SuccessDiv from "../../components/SuccessDiv";
import AppButton from "../../components/AppButton";

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
			<AppButton fullWidth={true}>Download Bill</AppButton>
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
