import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Linking,
	Platform,
	TextInput,
	Pressable,
} from "react-native";
import React, { useState } from "react";

//CONSTANTS
import { green, primaryColor, secondaryColor } from "../utils/CONSTANTS";

//ICONS
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

//COMPONENTS
import StatusButton from "./StatusButton";
import SuccessDiv from "./SuccessDiv";
import AppButton from "./AppButton";
// import { TextInput } from "react-native-paper";

//ToastCard
const ToastCard = ({ customerNumber, navigation }) => {
	const openDialScreen = () => {
		let number = "";
		if (Platform.OS === "ios") {
			number = `telprompt:${customerNumber}`;
		} else {
			number = `tel:${customerNumber}`;
		}
		Linking.openURL(number);
	};
	return (
		<View
			style={{
				padding: 10,
				paddingHorizontal: 15,
				minWidth: 180,

				backgroundColor: "white",
				position: "absolute",
				borderRadius: 10,
				borderColor: "lightgrey",
				borderWidth: 1,
				top: 20,
				zIndex: 9,
				// display: "none",
			}}>
			<TouchableOpacity
				onPress={(e) => {
					e.stopPropagation();
					openDialScreen();
				}}
				style={styles.toastCardContent}>
				<Feather name='phone-call' size={20} color='black' />
				<Text
					style={{
						fontWeight: "600",
					}}>
					Call Customer
				</Text>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={(e) => {
					e.stopPropagation();
					navigation.navigate("Help");
				}}
				style={styles.toastCardContent}>
				<Feather name='help-circle' size={20} color='black' />
				<Text
					style={{
						fontWeight: "600",
					}}>
					Help
				</Text>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={(e) => {
					e.stopPropagation();
					navigation.navigate("Order Bill");
				}}
				style={styles.toastCardContent}>
				<AntDesign name='printer' size={20} color='black' />
				<Text
					style={{
						fontWeight: "600",
					}}>
					Print Bill
				</Text>
			</TouchableOpacity>
		</View>
	);
};

const OrderCard = ({ order, navigation }) => {
	console.log("order is ", order);
	const [showToast, setShowToast] = useState(false);
	const [timeTaken, setTimeTaken] = useState(10);
	return (
		<Pressable
			onPress={() => setShowToast(false)}
			style={styles.orderCard}
			key={order._id}>
			<View
				style={{
					...styles.flexDiv,
					marginBottom: 25,
					borderBottomColor: "lightgrey",
					borderBottomWidth: 1,
					paddingBottom: 10,
				}}>
				<View
					style={{
						maxWidth: 200,
					}}>
					<Text
						style={{
							...styles.cardTitle,
							alignItems: "center",
							justifyContent: "center",
						}}>
						ID:
						<Text
							style={{
								fontSize: 12,
								fontWeight: "normal",
							}}>
							{order._id}
						</Text>
					</Text>
					<StatusButton status={order.status} />
				</View>
				<View
					style={{
						justifyContent: "flex-end",
						alignItems: "flex-end",
						position: "relative",
					}}>
					<Entypo
						onPress={(e) => {
							setShowToast((prev) => !prev);
							e.stopPropagation();
						}}
						name='dots-three-vertical'
						size={20}
						color='grey'
					/>

					<Text
						style={{
							fontSize: 14,
							color: green,
							fontWeight: "600",
							marginTop: 5,
						}}>
						Order By {order.orderBy}
					</Text>
					{showToast && (
						<ToastCard
							customerNumber={order.customerNumber}
							navigation={navigation}
						/>
					)}
				</View>
			</View>
			{order?.items?.map((elem) => (
				<View
					style={{
						borderBottomColor: "lightgrey",
						borderBottomWidth: 0.8,
						marginBottom: 10,
						zIndex: -1,
					}}
					key={elem._id}>
					<View style={{ ...styles.flexDiv, marginBottom: 5 }}>
						<View style={styles.flexDiv}>
							<Text style={styles.cardTitle}>{elem.quantity} x </Text>
							<Text style={styles.cardTitle}>
								{elem.name}{" "}
								<Text
									style={{
										fontSize: 13,
										fontWeight: "normal",
									}}>
									({elem.size})
								</Text>
							</Text>
						</View>
						<Text
							style={{
								fontWeight: "500",
							}}>
							<Text style={{ marginLeft: 15 }}> ₹ {elem.price}</Text>
						</Text>
					</View>
				</View>
			))}
			<View
				style={{
					position: "relative",
					marginBottom: 10,
					// bottom: 10,
					// right: 10,
					// left: 10,
				}}>
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
			{order.status == 0 && (
				<>
					<View
						style={{
							flexDirection: "row",
							marginVertical: 10,
						}}>
						<TouchableOpacity
							onPress={() => {
								if (timeTaken == 0) return;
								else setTimeTaken((prev) => prev - 5);
							}}
							style={{
								...styles.center,
								borderTopLeftRadius: 5,
								borderBottomLeftRadius: 5,
							}}>
							<Text
								style={{
									fontSize: 16,
									fontWeight: "bold",
									color: primaryColor,
								}}>
								—
							</Text>
						</TouchableOpacity>
						<TextInput
							editable={false}
							style={{
								flex: 1,
								backgroundColor: "white",
								textAlign: "center",
								borderWidth: 1,
								borderLeftWidth: 0,
								borderRightWidth: 0,
								borderColor: "lightgrey",
								color: "black",
							}}
							value={timeTaken + " mins"}
						/>
						<TouchableOpacity
							onPress={() => {
								setTimeTaken((prev) => prev + 5);
							}}
							style={{
								...styles.center,
								borderTopRightRadius: 5,
								borderBottomRightRadius: 5,
							}}>
							<Text
								style={{
									fontSize: 20,
									fontWeight: "600",
									color: primaryColor,
								}}>
								+
							</Text>
						</TouchableOpacity>
					</View>

					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
						}}>
						<AppButton width='48%' danger={true}>
							Reject
						</AppButton>
						<AppButton width='48%'>Accept</AppButton>
					</View>
				</>
			)}
		</Pressable>
	);
};

export default OrderCard;

const styles = StyleSheet.create({
	orderCard: {
		marginVertical: 4,
		padding: 10,
		paddingVertical: 16,
		// marginHorizontal: 10,
		borderRadius: 10,
		borderWidth: 1,
		borderTopWidth: 10,
		paddingBottom: 8,
		minHeight: 200,
		elevation: 5,
		backgroundColor: "white",
		borderColor: secondaryColor,
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
	toastCardContent: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginVertical: 7,
	},
	center: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 20,
		backgroundColor: "white",
		borderWidth: 1,
		borderColor: "lightgrey",
		paddingVertical: 10,
	},
});
