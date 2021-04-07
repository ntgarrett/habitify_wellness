import React, { useState } from "react";
import { StyleSheet, Text, View, Switch } from "react-native";
import { useDispatch } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";

import { toggleSetting } from "../state/user_settings/actions";
import theme from "../components/theme";

interface SettingProps {
  settingName: string;
  iconName: string;
  description: string;
  stateName: string;
}

const SettingCell: React.FC<SettingProps> = (props): JSX.Element => {
  const [isEnabled, setIsEnabled] = useState(false);
  const { settingName, iconName, description, stateName } = props;

  const dispatch = useDispatch();

  const toggleSwitch = () => {
    dispatch(toggleSetting(stateName, !isEnabled));
    setIsEnabled((previousState) => !previousState);
  };

  return (
    <View style={styles.cell}>
      <Ionicons
        name={iconName}
        color={theme.colors.card}
        size={40}
        style={{ marginLeft: 20 }}
      />
      <View>
        <Text style={styles.title}>{settingName}</Text>
        <Text style={{ marginLeft: 15 }}>{description}</Text>
      </View>
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
  cell: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginLeft: 15,
  },
  switch: {
    marginLeft: "auto",
    marginRight: 20,
  },
});

export default SettingCell;
