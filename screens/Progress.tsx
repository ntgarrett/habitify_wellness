import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";

import AppHeader from "../components/AppHeader";
import theme from "../components/theme";

const Progress: React.FC = (props): JSX.Element => {
  const dateFormat: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.card} />
      <AppHeader title="My Progress" />
      <View style={styles.datecontainer}>
        <Text style={{ fontSize: 19 }}>
          {new Date().toLocaleDateString(undefined, dateFormat)}
        </Text>
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
  datecontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Progress;
