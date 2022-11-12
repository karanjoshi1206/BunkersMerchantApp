import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import data from "./orderData";
import OrderCard from "../../components/OrderCard";

const Orders = () => {
	return (
		<View
			style={{
				paddingBottom: 20,
			}}>
			<FlatList
				data={data}
				renderItem={({ item }) => <OrderCard order={item} />}
			/>
		</View>
	);
};

export default Orders;

const styles = StyleSheet.create({});
