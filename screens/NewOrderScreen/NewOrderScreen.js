import {
	StyleSheet,
	Text,
	View,
	useWindowDimensions,
	Animated,
	TouchableOpacity,
} from "react-native";
import React from "react";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { primaryColor } from "../../utils/CONSTANTS";

const headerBg = "#282f3f";
const activeBg = "#384153";
const normalBg = "#434e64";
const activeText = "#ffffff";
const normalText = "#222222";

const FirstRoute = () => (
	<View style={styles.content}>
		<Text style={styles.contentText}>First</Text>
	</View>
);
const SecondRoute = () => (
	<View style={styles.content}>
		<Text style={styles.contentText}>Second</Text>
	</View>
);
const ThirdRoute = () => (
	<View style={styles.content}>
		<Text style={styles.contentText}>Third</Text>
	</View>
);
const FourthRoute = () => (
	<View style={styles.content}>
		<Text style={styles.contentText}>Fourth</Text>
	</View>
);

const renderScene = SceneMap({
	newOrder: FirstRoute,
	pending: SecondRoute,
	ready: ThirdRoute,
	completed: FourthRoute,
});

const NewOrderScreen = () => {
	const layout = useWindowDimensions();

	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState([
		{ key: "newOrder", title: "New Order" },
		{ key: "pending", title: "Pending" },
		{ key: "ready", title: "Ready" },
		{ key: "completed", title: "completed" },
	]);

	const renderTabBar = (props) => {
		const inputRange = props.navigationState.routes.map((x, i) => i);

		return (
			<View style={styles.tabBar}>
				{props.navigationState.routes.map((route, i) => {
					const opacity = props.position.interpolate({
						inputRange,
						outputRange: inputRange.map((inputIndex) =>
							inputIndex === i ? 1 : 0.5
						),
					});

					return (
						<TouchableOpacity
							style={styles.tabItem}
							onPress={() => setIndex(i)}>
							<Animated.Text
								style={{
									opacity,
									fontSize: 16,
									textTransform: "capitalize",
									// backgroundColor,
								}}>
								{route.title}
							</Animated.Text>
						</TouchableOpacity>
					);
				})}
			</View>
		);
	};

	return (
		<SafeAreaView
			style={{
				flex: 1,
			}}>
			<TabView
				navigationState={{ index, routes }}
				renderScene={renderScene}
				onIndexChange={setIndex}
				initialLayout={{ width: layout.width }}
				renderTabBar={renderTabBar}
			/>
		</SafeAreaView>
	);
};

export default NewOrderScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	tabBar: {
		flexDirection: "row",
	},
	tabItem: {
		flex: 1,
		alignItems: "center",
		padding: 16,
		paddingHorizontal: 4,
		// backgroundColor: "orange",
		marginHorizontal: 5,
	},

	text: {
		lineHeight: 20,
		paddingTop: 9,
		paddingLeft: 30,
		paddingRight: 30,
		paddingBottom: 9,
		textAlign: "center",
	},
	tabStyle: {
		opacity: 1,
		width: "auto",
		marginRight: 2,
		paddingTop: 0,
		paddingLeft: 0,
		paddingRight: 0,
		paddingBottom: 0,
		backgroundColor: headerBg,
	},
	tab: {
		backgroundColor: headerBg,
		paddingRight: 5,
		paddingLeft: 20,
		paddingTop: 20,
		marginTop: 2,
	},
	indicator: {
		backgroundColor: "none",
	},
	content: {
		padding: 20,
		backgroundColor: activeBg,
	},
	contentText: {
		color: activeText,
	},
});
