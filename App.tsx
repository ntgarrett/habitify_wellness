import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import theme from "./components/theme";
import HomeScreen from "./screens/HomeScreen";
import Settings from "./screens/Settings";
import Progress from "./screens/Progress";

const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer theme={theme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string = "";

            if (route.name === "Home") {
              iconName = focused ? "home-sharp" : "home-outline";
            } else if (route.name === "My Progress") {
              iconName = focused ? "calendar-sharp" : "calendar-outline";
            } else if (route.name === "Settings") {
              iconName = focused ? "settings-sharp" : "settings-outline";
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{}}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="My Progress" component={Progress} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
