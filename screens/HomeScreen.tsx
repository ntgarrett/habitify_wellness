import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";

import AppHeader from "../components/AppHeader";
import theme from "../components/theme";

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.card} />
      <AppHeader title="Habitify Wellness" />
      <View style={styles.container}>
        <Text>Home Screen</Text>
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

export default HomeScreen;
