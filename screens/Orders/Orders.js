import {
	FlatList,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";

//CONSTANTS
import { brown, green, orange } from "../../utils/CONSTANTS";

//DUMMY DATA
import data from "./orderData";
import statusData from "./statusData";

//COMPONENTS
import OrderCard from "../../components/OrderCard";
import { SafeAreaView } from "react-native-safe-area-context";

const Orders = ({ navigation }) => {
	const [activeStatus, setActiveStatus] = useState(0);
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		setOrders(data);
	}, [activeStatus]);

	const tempData = orders.filter((elem) => elem.orderStatus == activeStatus);

	return (
		<SafeAreaView
			style={{
				paddingBottom: 120,
				paddingHorizontal: 10,
			}}>
			<ScrollView
				showsHorizontalScrollIndicator={false}
				style={{
					paddingVertical: 5,
				}}
				horizontal={true}>
				{statusData.map((elem, idx) => (
					<TouchableOpacity
						key={idx}
						onPress={() => setActiveStatus(elem.statusId)}
						style={{
							...styles.statusTag,
							borderColor:
								activeStatus == elem.statusId
									? elem.backgroundColor
									: "lightgrey",
						}}>
						<Text
							style={{
								fontSize: 15,
								color: brown,
								fontWeight: "500",
								paddingTop: 5,
								height: 35,
								color:
									activeStatus == elem.statusId
										? elem.backgroundColor
										: "darkgrey",
							}}>
							{elem.statusTitle}
						</Text>
					</TouchableOpacity>
				))}
			</ScrollView>
			<FlatList
				data={tempData}
				renderItem={({ item }) => (
					<OrderCard navigation={navigation} order={item} />
				)}
			/>
		</SafeAreaView>
	);
};

export default Orders;

const styles = StyleSheet.create({
	statusTag: {
		marginRight: 10,
		borderWidth: 2,
		padding: 10,
		borderRadius: 5,
		borderColor: brown,
		paddingVertical: 0,
	},
});
