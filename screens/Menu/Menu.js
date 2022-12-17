import { StyleSheet, FlatList, View, RefreshControl } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import MenuCard from "../../components/MenuCard";
import FloatingButton from "../../components/FloatingButton";
import Loading from "../Loading/Loading";
import MenuItem from "./MenuItem";
import getAllMenuItems from "../../api/Menu/getAllMenuItems";
import NoData from "../../components/NoData";
const Menu = () => {
	const [menu, setMenu] = useState([]);
	const [loading, setLoading] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [refresh, setRefresh] = useState(false);

	const getMenuItems = async () => {
		console.log("runs");
		setLoading(true);
		const data = await getAllMenuItems();
		if (data.status == 200) {
			setMenu(data.data);
			setRefresh(false);
		} else {
			setMenu([]);
			setRefresh(false);
		}
		setLoading(false);
	};
	const onRefresh = React.useCallback(() => {
		setRefresh(true);
	}, []);

	useMemo(() => {
		getMenuItems();
	}, [refresh]);

	// useEffect(() => {
	// 	if (refresh == false) return;
	// 	getMenuItems();
	// setMenuData(
	// 	data.sort((a, b) =>
	// 		a.availableOnStock == b.availableOnStock
	// 			? 0
	// 			: a.availableOnStock
	// 			? -1
	// 			: 1
	// 	)
	// );
	// }, [refresh]);
	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<View
					style={{
						padding: 10,
						paddingBottom: 60,
						position: "relative",
						backgroundColor: "white",
						flex: 1,
					}}>
					{modalVisible && (
						<MenuItem
							modalVisible={modalVisible}
							setModalVisible={setModalVisible}
						/>
					)}

					{menu.length > 0 ? (
						<FlatList
							refreshControl={
								<RefreshControl refreshing={refresh} onRefresh={onRefresh} />
							}
							data={menu}
							keyExtractor={(item) => item.name}
							renderItem={({ item }) => (
								<MenuCard
									menu={item}
									refresh={refresh}
									setRefresh={setRefresh}
									modalVisible={modalVisible}
									setModalVisible={setModalVisible}
								/>
							)}
						/>
					) : (
						<NoData />
					)}
					<FloatingButton onPress={() => setModalVisible(true)}>
						+
					</FloatingButton>
				</View>
			)}
		</>
	);
};

export default Menu;
const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: "#F194FF",
	},
	buttonClose: {
		backgroundColor: "#2196F3",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
	},
});
