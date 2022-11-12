import { StyleSheet, Text, View } from "react-native";
import React from "react";
import StatusButton from "./StatusButton";
import { green, primaryColor, secondaryColor } from "../utils/CONSTANTS";
import SuccessDiv from "./SuccessDiv";

const OrderCard = ({ order }) => {
	console.log("order is ", order);
	return (
		<View style={styles.orderCard} key={order.id}>
			<View
				style={{
					...styles.flexDiv,
					marginBottom: 25,
					borderBottomColor: "lightgrey",
					borderBottomWidth: 1,
					paddingBottom: 10,
				}}>
				<View>
					<Text style={styles.cardTitle}>ID:{order.orderId} </Text>
					<StatusButton status={order.orderStatus} />
				</View>
				<View>
					<Text
						style={{
							fontSize: 14,
							color: green,
							fontWeight: "600",
						}}>
						Order By {order.orderBy}
					</Text>
				</View>
			</View>
			{order?.orderItems?.map((elem) => (
				<View
					style={{
						borderBottomColor: "lightgrey",
						borderBottomWidth: 0.8,
						marginBottom: 10,
					}}
					key={elem.name}>
					<View style={{ ...styles.flexDiv, marginBottom: 5 }}>
						<View style={styles.flexDiv}>
							<Text style={styles.cardTitle}>{elem.Qty} x </Text>
							<Text style={styles.cardTitle}>{elem.name}</Text>
						</View>
						<Text
							style={{
								fontWeight: "500",
							}}>
							{elem.size}
						</Text>
					</View>
				</View>
			))}

			{order?.paymentReceived ? (
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
			) : (
				<View>
					<Text
						style={{
							color: "white",
							textAlign: "center",
							fontSize: 18,
							textTransform: "uppercase",
						}}>
						Payment not RECEIVED
					</Text>
					<Text
						style={{
							color: "white",
							textAlign: "center",
							fontSize: 18,
							textTransform: "uppercase",
						}}>
						Please accept cash{" "}
					</Text>
				</View>
			)}
		</View>
	);
};

export default OrderCard;

const styles = StyleSheet.create({
	orderCard: {
		marginVertical: 4,
		padding: 10,
		paddingVertical: 16,
		marginHorizontal: 10,
		borderRadius: 10,
		borderWidth: 2,
		borderTopWidth: 10,
		paddingBottom: 8,
		borderColor: primaryColor,
		minHeight: 250,
	},
	cardTitle: {
		fontWeight: "500",
		fontSize: 16,
	},
	flexDiv: {
		flexDirection: "row",
		alignItems: "flex-start",
		justifyContent: "space-between",
	},
	cardSubtitle: {},
});
