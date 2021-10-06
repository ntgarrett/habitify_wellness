import React from "react";
import { StyleSheet, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { IDailyData } from "../state/data_tracking/trackingReducer";
import theme from "./theme";

interface IIconProps {
  name: string;
  result?: boolean | null;
}

const CategoryVisualizer: React.FC<{ obj: IDailyData }> = (props) => {  
  const Icon: React.FC<IIconProps> = (props) => {
    const { name, result } = props;
    let iconColor = theme.colors.notification;
    if (result != null) {
      result == true ? iconColor = theme.colors.data3 : iconColor = theme.colors.data1;
    }
    return (
      <>
        <Ionicons 
          name={name}
          color={iconColor}
          style={styles.icon}
        />
      </>
    )
  };

  return (
    <>
      <View style={styles.root}>
        <Icon name="water-outline" result={props.obj.results.hydration} />
        <Icon name="nutrition-outline" result={props.obj.results.eating} />
        <Icon name="bed-outline" result={props.obj.results.sleep} />
        <Icon name="barbell-outline" result={props.obj.results.exercise} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 40,
    paddingHorizontal: 15,
  },
});

export default CategoryVisualizer;
