import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
	brown,
	green,
	orange,
	primaryColor,
	red,
	secondaryColor,
} from "../utils/CONSTANTS";

const StatusButton = ({ status = "pending" }) => {
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
		case "pending":
			return "blue";
		case "completed":
			return green;
		case "ready":
			return primaryColor;
		case "cancelled":

		default:
			return secondaryColor;
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
