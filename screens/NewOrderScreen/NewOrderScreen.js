import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import React, { useState } from "react";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { primaryColor, secondaryColor, width } from "../../utils/CONSTANTS";
import NewOrder from "../../components/OrdersCategoryScreens/NewOrder";

const headerBg = "#282f3f";

// const NewOrder = () => (
// 	<View style={styles.content}>
// 		<Text style={styles.contentText}>First</Text>
// 	</View>
// );
const Pending = () => (
	<View style={styles.content}>
		<Text style={styles.contentText}>Second</Text>
	</View>
);
const Ready = () => (
	<View style={styles.content}>
		<Text style={styles.contentText}>Third</Text>
	</View>
);
const Completed = () => (
	<View style={styles.content}>
		<Text style={styles.contentText}>Fourth</Text>
	</View>
);

const renderScene = SceneMap({
	newOrder: NewOrder,
	pending: Pending,
	ready: Ready,
	completed: Completed,
});

const NewOrderScreen = () => {
	const layout = useWindowDimensions();
	const [activeIndex, setActiveIndex] = useState(0);
	const [index, setIndex] = React.useState(0);
	const [routes] = React.useState([
		{ key: "newOrder", title: "New Order" },
		{ key: "pending", title: "Pending" },
		{ key: "ready", title: "Ready" },
		{ key: "completed", title: "completed" },
	]);

	// const renderTabBar = (props) => {
	// 	const inputRange = props.navigationState.routes.map((x, i) => i);

	// 	return (
	// 		<View style={styles.tabBar}>
	// 			{props.navigationState.routes.map((route, i) => {
	// 				const opacity = props.position.interpolate({
	// 					inputRange,
	// 					outputRange: inputRange.map((inputIndex) =>
	// 						inputIndex === i ? 1 : 0.5
	// 					),
	// 				});
	// 				const borderColor = props.position.interpolate({
	// 					inputRange,
	// 					outputRange: inputRange.map((inputIndex) =>
	// 						inputIndex === i ? "black" : "white"
	// 					),
	// 				});

	// 				return (
	// 					<TouchableOpacity
	// 						style={{ ...styles.tabItem }}
	// 						onPress={() => setIndex(i)}>
	// 						<Animated.Text
	// 							style={{
	// 								opacity,
	// 								fontSize: 16,
	// 								textTransform: "capitalize",
	// 								padding: 10,
	// 								minWidth: width / 4,
	// 								textAlign: "center",

	// 								borderBottomWidth: 3,
	// 								borderColor,
	// 							}}>
	// 							{route.title}
	// 						</Animated.Text>
	// 					</TouchableOpacity>
	// 				);
	// 			})}
	// 		</View>
	// 	);
	// };

	return (
		<SafeAreaView
			style={{
				flex: 1,
				// marginTop: -10,
			}}>
			<TabView
				navigationState={{ index, routes }}
				renderScene={renderScene}
				onIndexChange={setIndex}
				initialLayout={{ width: layout.width }}
				// renderTabBar={renderTabBar}

				renderTabBar={(props) => (
					<TabBar
						{...props}
						indicatorStyle={{ backgroundColor: primaryColor }}
						style={{
							backgroundColor: "white",
							paddingHorizontal: 0,
							marginHorizontal: 0,
							margin: 0,
						}}
						renderLabel={({ route, color, focused }) => (
							<Text
								style={{
									color: focused ? primaryColor : "black",
									margin: 0,
									padding: 0,
									fontSize: 15,
									textTransform: "capitalize",
								}}>
								{route.title}
							</Text>
						)}
					/>
				)} // <-- add this line
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
		alignItems: "center",
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
		backgroundColor: "white",
		flex: 1,
	},
	contentText: {
		color: "black",
	},
});
