import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import GetAllOrders from "../../api/Orders/getAllOrders";
import OrderCard from "../OrderCard";
import Loading from "../../screens/Loading/Loading";

const NewOrder = () => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(false);
	const getOrderData = async () => {
		setLoading(true);
		const data = await GetAllOrders();
		if (data.status == 200) {
			setOrders(data.data);
		} else {
			setOrders([]);
		}
		setLoading(false);
	};
	useEffect(() => {
		getOrderData();
	}, []);
	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<View
					style={{
						backgroundColor: "white",
						flex: 1,
						padding: 10,
					}}>
					{orders.map((order) => (
						<OrderCard order={order} />
					))}
				</View>
			)}
		</>
	);
};

export default NewOrder;

const styles = StyleSheet.create({});
