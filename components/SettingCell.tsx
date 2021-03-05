import React, { useState } from "react";
import { StyleSheet, Text, View, Switch } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import theme from "../components/theme";

interface SettingProps {
  settingName: string;
  iconName: string;
}

const SettingCell: React.FC<SettingProps> = (props): JSX.Element => {
  const [isEnabled, setIsEnabled] = useState(false);
  const { settingName, iconName } = props;

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  return (
    <View style={styles.cell}>
      <Ionicons
        name={iconName}
        color={theme.colors.card}
        size={30}
        style={{ marginLeft: 20 }}
      />
      <Text style={styles.text}>{settingName}</Text>
      <Switch
        style={styles.switch}
        trackColor={{
          false: theme.colors.notification,
          true: theme.colors.border,
        }}
        thumbColor={theme.colors.primary}
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    marginLeft: 15,
  },
  cell: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  switch: {
    marginLeft: "auto",
    marginRight: 20,
  },
});

export default SettingCell;
