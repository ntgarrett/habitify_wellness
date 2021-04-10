import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";

import AppHeader from "../components/AppHeader";
import theme from "../components/theme";

const HomeScreen: React.FC = (props): JSX.Element => {
  const dateFormat = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.card} />
      <AppHeader title="Habitify Wellness" />
      <View style={styles.datecontainer}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          {new Date().toLocaleDateString(undefined, dateFormat)}
        </Text>
      </View>
      <Text style={styles.statusmessage}>
        This will be motivational text displaying the status of the progress for
        the week.
      </Text>
      <View style={styles.remaining}>
        <Text>Remaining Space</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: "stretch",
  },
  datecontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "tomato",
  },
  statusmessage: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 20,
    fontSize: 16,
    backgroundColor: "aquamarine",
  },
  remaining: {
    flex: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "yellow",
  },
});

export default HomeScreen;
