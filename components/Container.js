import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";

const Container = ({ children }) => {
	return <View style={styles.container}>{children}</View>;
};

export default Container;

const styles = StyleSheet.create({
	container: {
		paddingTop: 40,
	},
});
