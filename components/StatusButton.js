import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { brown, green, orange } from "../utils/CONSTANTS";

const StatusButton = ({ status = 0 }) => {
	return (
		<View
			style={{
				backgroundColor: BACKGROUND_COLOR(status),

				minWidth: 100,
				borderRadius: 5,
				padding: 5,
			}}>
			<Text
				style={{
					color: "white",
					textAlign: "center",
				}}>
				{STATUS_TEXT(status)}
			</Text>
		</View>
	);
};

export default StatusButton;

const styles = StyleSheet.create({});
const BACKGROUND_COLOR = (status) => {
	switch (status) {
		case 0:
			return brown;
		case 1:
			return brown;
		case 2:
			return orange;
		case 3:
			return green;
		case 4:
			return green;
		default:
			return brown;
	}
};
const STATUS_TEXT = (status) => {
	switch (status) {
		case 0:
			return "New Order";
		case 1:
			return "Pending";
		case 2:
			return "Accepted";
		case 3:
			return "Ready";
		case 4:
			return "Completed";
	}
};
