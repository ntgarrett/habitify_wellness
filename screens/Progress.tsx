import React from "react";
import { StyleSheet, Text, View, StatusBar, Dimensions } from "react-native";
import { ProgressChart } from "react-native-chart-kit";

import AppHeader from "../components/AppHeader";
import theme from "../components/theme";

const Progress: React.FC = (props): JSX.Element => {
  const dateFormat: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
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
      <View style={styles.remaining}>
        <ProgressChart
          width={Dimensions.get("screen").width}
          height={250}
          chartConfig={chartConfig}
          data={{
            labels: ["Blah 1", "Blah 2", "Blah 3"],
            data: [0.4, 0.6, 0.8],
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  datecontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  remaining: {
    flex: 7,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Progress;
