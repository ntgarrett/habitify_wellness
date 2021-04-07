import React from "react";
import { StyleSheet, Text, SafeAreaView } from "react-native";

import theme from "./theme";

interface HeaderProps {
  title: string;
}

const AppHeader: React.FC<HeaderProps> = ({ title }): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.card,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 25,
    color: theme.colors.text,
  },
});

export default AppHeader;
