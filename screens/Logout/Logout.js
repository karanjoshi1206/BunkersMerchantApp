import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../Loading/Loading";

const Logout = ({ navigation }) => {
	const logout = () => {
		AsyncStorage.clear()
			.then(() => navigation.navigate("Welcome"))
			.catch(() => alert("Something went wrong"));
	};

	useEffect(() => {
		logout();
	}, []);
	return (
		<>
			<Loading />
		</>
	);
};

export default Logout;

const styles = StyleSheet.create({});
