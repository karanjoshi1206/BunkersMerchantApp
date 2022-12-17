import { RefreshControl, ScrollView } from "react-native";
import React from "react";
import OrderCard from "../OrderCard";
import Loading from "../../screens/Loading/Loading";
import { useNavigation } from "@react-navigation/native";
import NoData from "../NoData";

const CompletedOrder = ({ orderData = [], refresh, setRefresh, loading }) => {
	const navigation = useNavigation();

	const onRefresh = React.useCallback(() => {
		setRefresh(true);
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
					{orderData.length > 0 ? (
						<>
							{orderData.map((order) => (
								<OrderCard
									key={order._id}
									navigation={navigation}
									order={order}
								/>
							))}
						</>
					) : (
						<NoData />
					)}
				</ScrollView>
			)}
		</>
	);
};

export default CompletedOrder;
