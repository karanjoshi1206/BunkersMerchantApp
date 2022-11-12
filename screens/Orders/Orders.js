import {
	FlatList,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useState } from "react";
import data from "./orderData";
import OrderCard from "../../components/OrderCard";
import statusData from "./statusData";
import { brown, green, orange } from "../../utils/CONSTANTS";

const Orders = () => {
	const [activeStatus, setActiveStatus] = useState(1);

	const tempData = data.filter((elem) => elem.orderStatus == activeStatus);

	return (
		<View
			style={{
				paddingBottom: 90,
				paddingHorizontal: 10,
			}}>
			<View
				style={{
					flexDirection: "row",
					marginVertical: 10,
				}}>
				{statusData.map((elem) => (
					<TouchableOpacity
						onPress={() => setActiveStatus(elem.statusId)}
						style={{
							...styles.statusTag,
							borderColor:
								activeStatus == elem.statusId
									? elem.statusId == 1
										? brown
										: elem.statusId == 2
										? orange
										: elem.statusId == 3
										? green
										: green
									: "lightgrey",
						}}>
						<Text
							style={{
								fontSize: 15,
								color: brown,
								fontWeight: "500",
								color:
									activeStatus == elem.statusId
										? elem.statusId == 1
											? brown
											: elem.statusId == 2
											? orange
											: elem.statusId == 3
											? green
											: green
										: "darkgrey",
							}}>
							{elem.statusTitle}
						</Text>
					</TouchableOpacity>
				))}
			</View>
			<FlatList
				data={tempData}
				renderItem={({ item }) => <OrderCard order={item} />}
			/>
		</View>
	);
};

export default Orders;

const styles = StyleSheet.create({
	statusTag: {
		marginRight: 10,
		borderWidth: 2,
		padding: 10,
		paddingVertical: 5,
		borderRadius: 5,
		borderColor: brown,
	},
});
