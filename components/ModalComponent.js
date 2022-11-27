import {
	Alert,
	Modal,
	StyleSheet,
	Text,
	Pressable,
	FlatList,
	View,
} from "react-native";
import React from "react";
import { height, primaryColor, width } from "../utils/CONSTANTS";

const ModalComponent = ({
	modalVisible = true,
	setModalVisible,
	children,
	modalTitle,
}) => {
	return (
		<View>
			<Modal
				animationType='slide'
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert("Modal has been closed.");
					setModalVisible(!modalVisible);
				}}>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text
							style={{
								fontSize: 20,
								fontWeight: "bold",
								textAlign: "center",
							}}>
							{modalTitle}
						</Text>
						{children}
					</View>
				</View>
			</Modal>
		</View>
	);
};

export default ModalComponent;

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
	},
	modalView: {
		height: "100%",
		width: "100%",
		margin: 20,
		backgroundColor: "white",
		borderRadius: 0,
		padding: 15,
		// justifyContent: "center",
		// alignItems: "center",
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
