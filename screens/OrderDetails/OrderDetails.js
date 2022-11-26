import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";

const OrderDetails = ({ route, navigation }) => {
	const { order } = route.params;
	useEffect(() => {
		navigation.setOptions({ headerTitle: `Order Details : ${order.orderId}` });
	}, []);
	console.log(order);

	return (
		<View>
			<Text>{order.id}</Text>
			<Text>{order.orderBy}</Text>
			<Text>{order.orderId}</Text>
		</View>
	);
};

export default OrderDetails;

const styles = StyleSheet.create({});
