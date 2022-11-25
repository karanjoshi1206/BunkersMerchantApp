//SCREENS IMPORTS
import Orders from "../screens/Orders/Orders";
import Logout from "../screens/Logout/Logout";

//NAVIGATION IMPORTS
import { createDrawerNavigator } from "@react-navigation/drawer";
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
	<Drawer.Navigator>
		<Drawer.Screen name='Orders' component={Orders} />
		<Drawer.Screen name='Logout' component={Logout} />
	</Drawer.Navigator>
);

export default DrawerNavigator;
