import {
	Alert,
	ScrollView,
	StyleSheet,
	Text,
	ToastAndroid,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useState } from "react";

//COMPONENTS
import ModalComponent from "../../components/ModalComponent";
import InputField from "../../components/InputField";
import AppButton from "../../components/AppButton";

//CONSTANTS
import { primaryColor, red, secondaryColor } from "../../utils/CONSTANTS";

//LIBRARY
import { BottomSheet } from "react-native-btr";

//ICONS
import { MaterialCommunityIcons } from "@expo/vector-icons";

const MenuItem = ({
	modalVisible,
	setModalVisible,
	mode = "add",
	data = {},
}) => {
	//states
	const [itemName, setItemName] = useState(mode == "add" ? "" : data.itemName);
	const [portions, setPortions] = useState(mode == "add" ? [] : data.portions);
	const [selectedPortion, setSelectedPortion] = useState("");
	const [visible, setVisible] = useState(false);
	const [portionEditMode, setPortionEditMode] = useState(false);
	const [selectedPortionPrice, setSelectedPortionPrice] = useState(0);
	const [portionId, setPortionId] = useState();
	const portionType = ["Half", "Full", "Single", "Double", "Masala", "Plain"];

	//function to toggle bottomsheet
	function toggle() {
		setVisible((visible) => !visible);
	}
	return (
		<ModalComponent
			setModalVisible={setModalVisible}
			modalTitle={mode == "add" ? "Add Menu Item" : "Edit Menu Item"}>
			{/* INPUT FIELD FOR ITEM NAME */}
			<InputField
				label='Item Name'
				value={itemName}
				setValue={setItemName}
				placeholder={"Eg. maggie"}
			/>

			{/* *************PORTION SECTION LIST START************* */}
			{portions.length > 0 && (
				<Text style={styles.portionHeadline}>Portions</Text>
			)}
			<ScrollView>
				{portions.map((elem) => {
					return (
						<View style={styles.menuItemCard}>
							<View
								style={{
									...styles.flex,
									borderBottomColor: secondaryColor,
									borderBottomWidth: 1,
									paddingBottom: 5,
								}}>
								<Text style={styles.portionName}>{elem?.portionName}</Text>
								<Text
									style={{
										fontSize: 20,
									}}>
									₹ {elem?.portionPrice}
								</Text>
							</View>
							<View style={{ ...styles.flex, marginBottom: 0, marginTop: 10 }}>
								<TouchableOpacity
									onPress={() => {
										setPortionEditMode(true);
										// setPortionId(elem.id);
										setSelectedPortion(elem.portionName);
										setSelectedPortionPrice(elem.portionPrice);

										toggle();
									}}
									style={{
										borderColor: primaryColor,
										...styles.buttons,
									}}>
									<MaterialCommunityIcons
										name='circle-edit-outline'
										size={16}
										color={primaryColor}
									/>
									<Text
										style={{
											color: primaryColor,
											...styles.buttonText,
										}}>
										Edit
									</Text>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => {
										Alert.alert(
											//title
											"Are You Sure?",
											//body
											"The selected portions will be deleted",
											[
												{
													text: "Yes",
													onPress: () => {
														const newPortion = portions.filter(
															(portion) => portion !== elem
														);
														setPortions(newPortion);

														ToastAndroid.show(
															"Successfully Deleted",
															ToastAndroid.SHORT
														);
													},
												},
												{
													text: "No",
													onPress: () => console.log("No Pressed"),
													style: "cancel",
												},
											],
											{ cancelable: true }
										);
									}}
									style={{
										borderColor: red,
										...styles.buttons,
									}}>
									<MaterialCommunityIcons
										name='delete-outline'
										size={16}
										color={red}
									/>
									<Text
										style={{
											color: red,
											...styles.buttonText,
										}}>
										Delete
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					);
				})}
				<TouchableOpacity
					onPress={() => {
						setPortionEditMode(false);
						toggle();
					}}
					style={styles.addPortionButton}>
					<Text
						style={{
							color: "white",
						}}>
						Add Portions
					</Text>
				</TouchableOpacity>
			</ScrollView>
			{/* *************PORTION SECTION LIST END************* */}

			{/* *************ADD PORTION SECTION START************* */}

			{/* ***********BOTTOM-SHEET FOR PORTION ADD/EDIT********** */}
			<BottomSheet
				visible={visible}
				onBackButtonPress={toggle}
				onBackdropPress={toggle}>
				<View style={styles.card}>
					<View
						style={{
							flexDirection: "row",
							flexWrap: "wrap",
							justifyContent: "center",
						}}>
						{portionType.map((elem) => (
							<TouchableOpacity
								onPress={() => setSelectedPortion(elem)}
								style={{
									...styles.portionType,
									backgroundColor:
										elem == selectedPortion ? primaryColor : "white",
								}}
								key={elem}>
								<Text
									style={{
										textAlign: "center",
										fontWeight: "600",
										color: elem == selectedPortion ? "white" : secondaryColor,
									}}>
									{elem}
								</Text>
							</TouchableOpacity>
						))}
					</View>
					<InputField
						value={selectedPortionPrice}
						setValue={(name) => {
							setSelectedPortionPrice(name);
						}}
						keyboardType='numeric'
						label='Portion Price'
						placeholder={"Eg. 20"}
					/>

					<View
						style={{
							flexDirection: "row",
							justifyContent: "center",
						}}>
						{portionEditMode ? (
							<AppButton
								onPress={() => {
									const newPortion = portions.map((elem) => {
										if (
											elem.portionName == selectedPortion &&
											elem.portionPrice == selectedPortionPrice
										) {
											return {
												...elem,
												portionName: selectedPortion,
												portionPrice: selectedPortionPrice,
											};
										}
										return elem;
									});
									ToastAndroid.show("Successfully Edited", ToastAndroid.SHORT);

									setPortions(newPortion);
									setVisible(false);
								}}
								solid={true}>
								Edit
							</AppButton>
						) : (
							<AppButton
								onPress={() => {
									const newPortion = {
										id: portions.length + 1,

										portionName: selectedPortion,
										portionPrice: selectedPortionPrice,
									};

									setPortions([...portions, newPortion]);
									setVisible(false);
									ToastAndroid.show("Portion Added", ToastAndroid.SHORT);
								}}
								solid={true}>
								Done
							</AppButton>
						)}
						<Text> </Text>
						<AppButton danger={true}>Cancel</AppButton>
					</View>
				</View>
			</BottomSheet>

			<View style={{ ...styles.flex, marginBottom: 0 }}>
				<AppButton onPress={() => setModalVisible(false)}>Done</AppButton>
				<Text> </Text>
				<Text> </Text>

				<AppButton onPress={() => setModalVisible(false)} danger={true}>
					Cancel
				</AppButton>
			</View>
		</ModalComponent>
	);
};

export default MenuItem;

const styles = StyleSheet.create({
	card: {
		padding: 10,
		paddingHorizontal: 20,
		backgroundColor: "#fff",
		minHeight: 300,
		justifyContent: "center",
		// alignItems: "center",
	},
	menuItemCard: {
		padding: 20,
		shadowColor: primaryColor,
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
		backgroundColor: "white",
		marginVertical: 5,
		borderRadius: 12,
	},
	flex: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 15,
	},
	buttons: {
		padding: 8,
		borderWidth: 1,
		paddingHorizontal: 15,
		borderRadius: 7,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	buttonText: {
		fontSize: 14,
		fontWeight: "600",

		marginLeft: 5,
	},
	portionHeadline: {
		textAlign: "center",
		fontWeight: "600",
		fontSize: 20,
		marginBottom: 5,
		textDecorationColor: primaryColor,
		textDecorationLine: "underline",
	},
	portionName: {
		fontSize: 20,
		fontWeight: "600",
	},
	addPortionButton: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: primaryColor,
		padding: 10,
		paddingHorizontal: 15,
		borderRadius: 6,
		marginVertical: 10,
	},
	portionType: {
		padding: 10,
		borderWidth: 1,
		borderColor: primaryColor,
		minWidth: 100,
		borderRadius: 10,
		marginHorizontal: 5,
		marginVertical: 5,
	},
});
