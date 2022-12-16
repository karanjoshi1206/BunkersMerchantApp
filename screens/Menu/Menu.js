import {
	Alert,
	StyleSheet,
	Text,
	Pressable,
	FlatList,
	View,
	RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import data from "./menudata";
import MenuCard from "../../components/MenuCard";
import FloatingButton from "../../components/FloatingButton";
import ModalComponent from "../../components/ModalComponent";
import InputField from "../../components/InputField";
import MenuItem from "./MenuItem";
const Menu = () => {
	const [modalVisible, setModalVisible] = useState(false);
	const [menuData, setMenuData] = useState([]);
	const [refresh, setRefresh] = useState(false);
	const wait = (timeout) => {
		return new Promise((resolve) => setTimeout(resolve, timeout));
	};

	const onRefresh = React.useCallback(() => {
		setRefresh(true);
		wait(2000).then(() => setRefresh(false));
	}, []);
	useEffect(() => {
		setMenuData(
			data.sort((a, b) =>
				a.availableOnStock == b.availableOnStock
					? 0
					: a.availableOnStock
					? -1
					: 1
			)
		);
	}, [refresh]);
	return (
		<View
			style={{
				padding: 10,
				paddingBottom: 60,
				position: "relative",
				backgroundColor: "white",
			}}>
			{modalVisible && (
				<MenuItem
					modalVisible={modalVisible}
					setModalVisible={setModalVisible}
				/>
			)}
			<FlatList
				refreshControl={
					<RefreshControl refreshing={refresh} onRefresh={onRefresh} />
				}
				data={menuData}
				keyExtractor={(item) => item.id}
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
			<FloatingButton onPress={() => setModalVisible(true)}>+</FloatingButton>
		</View>
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
