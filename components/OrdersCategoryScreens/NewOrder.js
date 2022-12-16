import {
	StyleSheet,
	Text,
	View,
	RefreshControl,
	ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import GetAllOrders from "../../api/Orders/getAllOrders";
import OrderCard from "../OrderCard";
import Loading from "../../screens/Loading/Loading";

const NewOrder = () => {
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const getOrderData = async () => {
		setLoading(true);
		const data = await GetAllOrders();
		if (data.status == 200) {
			setOrders(data.data);
			setRefresh(false);
		} else {
			setOrders([]);
			setRefresh(false);
		}
		setLoading(false);
	};

	const onRefresh = React.useCallback(() => {
		setRefresh(true);
		getOrderData();
	}, []);

	useEffect(() => {
		getOrderData();
	}, []);
	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<ScrollView
					refreshControl={
						<RefreshControl refreshing={refresh} onRefresh={onRefresh} />
					}
					style={{
						backgroundColor: "white",
						flex: 1,
						padding: 10,
					}}>
					{orders.map((order) => (
						<OrderCard order={order} />
					))}
				</ScrollView>
			)}
		</>
	);
};

export default NewOrder;

const styles = StyleSheet.create({});
