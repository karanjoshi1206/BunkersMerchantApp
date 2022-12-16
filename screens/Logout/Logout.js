import { StyleSheet, Text, ToastAndroid, View } from "react-native";
import React, { useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../Loading/Loading";
import { UserContext } from "../../context/userContext";

const Logout = ({ navigation }) => {
	const { dispatch } = useContext(UserContext);

	const logout = () => {
		AsyncStorage.clear()
			.then(() => {
				// navigation.navigate("Welcome")
				dispatch({ type: "isLoggedIn", payload: false });
			})

			.catch((e) => alert("Something went wrong", e));
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
