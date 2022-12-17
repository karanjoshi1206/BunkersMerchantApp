// REACT NATIVE AND REACT IMPORTS
import { Text, useWindowDimensions } from "react-native";
import React, { useEffect, useState } from "react";

//LIBRARIES
import { TabView, TabBar } from "react-native-tab-view";
import { SafeAreaView } from "react-native-safe-area-context";

//CONSTANTS
import { primaryColor } from "../../utils/CONSTANTS";

//API
import getAllOrders from "../../api/Orders/getAllOrders";

//COMPONENTS
import AcceptedOrder from "../../components/OrdersCategoryScreens/AcceptedOrder";
import InProgress from "../../components/OrdersCategoryScreens/InProgress";
import ReadyOrder from "../../components/OrdersCategoryScreens/ReadyOrder";
import CompletedOrder from "../../components/OrdersCategoryScreens/CompletedOrder";

const NewOrderScreen = () => {
	//STATES
	const [orderData, setOrderData] = useState([]);
	const [refresh, setRefresh] = useState(false);
	const [loading, setLoading] = useState(false);
	const [index, setIndex] = useState(0);
	const [routes] = useState([
		{ key: "newOrder", title: "Accepted" },
		{ key: "inProgress", title: "In Progress" },
		{ key: "ready", title: "Ready" },
		{ key: "completed", title: "completed" },
	]);

	//TAB VIEW STUFFS
	const layout = useWindowDimensions();

	//All the order data is called at onced
	const getOrderData = async () => {
		setLoading(true);
		const data = await getAllOrders();
		if (data.status == 200) {
			setOrderData(data.data);

			setRefresh(false);
		} else {
			setOrderData([]);
			setRefresh(false);
		}
		setLoading(false);
	};

	//FILTERING THE DATA ACCORDING TO STATUS
	const acceptedOrderData = orderData.filter(
		(order) => order.status == "accepted"
	);
	const completedOrderData = orderData.filter(
		(order) => order.status == "completed"
	);
	const inProgressOrderData = orderData.filter(
		(order) => order.status == "inProgress"
	);
	const readyOrderData = orderData.filter((order) => order.status == "ready");

	//Function to render tab view screens
	const renderScene = ({ route }) => {
		switch (route.key) {
			case "newOrder":
				return (
					<AcceptedOrder
						orderData={acceptedOrderData}
						refresh={refresh}
						setRefresh={setRefresh}
						loading={loading}
						setLoading={setLoading}
					/>
				);
			case "inProgress":
				return (
					<InProgress
						orderData={inProgressOrderData}
						refresh={refresh}
						setRefresh={setRefresh}
						loading={loading}
						setLoading={setLoading}
					/>
				);
			case "ready":
				return (
					<ReadyOrder
						orderData={readyOrderData}
						refresh={refresh}
						setRefresh={setRefresh}
						loading={loading}
						setLoading={setLoading}
					/>
				);
			case "completed":
				return (
					<CompletedOrder
						orderData={completedOrderData}
						refresh={refresh}
						setRefresh={setRefresh}
						loading={loading}
						setLoading={setLoading}
					/>
				);
			default:
				return null;
		}
	};

	useEffect(() => {
		getOrderData();
	}, [refresh]);

	return (
		<SafeAreaView
			style={{
				flex: 1,
			}}>
			<TabView
				navigationState={{ index, routes }}
				renderScene={renderScene}
				onIndexChange={setIndex}
				initialLayout={{ width: layout.width }}
				// renderTabBar={renderTabBar}

				renderTabBar={(props) => (
					<TabBar
						{...props}
						indicatorStyle={{ backgroundColor: primaryColor }}
						style={{
							backgroundColor: "white",
							paddingHorizontal: 0,
							marginHorizontal: 0,
							margin: 0,
						}}
						renderLabel={({ route, color, focused }) => (
							<Text
								style={{
									color: focused ? primaryColor : "black",
									margin: 0,
									padding: 0,
									fontSize: 15,
									textTransform: "capitalize",
									textAlign: "center",
								}}>
								{route.title}
							</Text>
						)}
					/>
				)}
			/>
		</SafeAreaView>
	);
};

export default NewOrderScreen;
