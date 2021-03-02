import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";

import AppHeader from "../components/AppHeader";
import theme from "../components/theme";

const Settings: React.FC = (props): JSX.Element => {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.card} />
      <AppHeader title="Settings" />
      <View style={styles.container}>
        <Text>Settings Screen</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 8,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Settings;
