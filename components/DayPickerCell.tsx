import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { useAppDispatch, useAppSelector } from "../state/user_settings/hooks";
import { updateDaysExercisePerWeek } from "../state/user_settings/actions";

interface DayPickerProps {
  actionName: string;
}

const DayPickerCell: React.FC<DayPickerProps> = (props): JSX.Element => {
  const { actionName } = props;
  const dispatch = useAppDispatch();

  var currentStateValue: any = useAppSelector((state) => {
    return state.settings.userSettings;
  });

  const updateDaysPerWeek = (itemValue: number) => {
    currentStateValue.targetDaysExercisePerWeek = itemValue;
    dispatch(
      updateDaysExercisePerWeek(
        actionName,
        currentStateValue.targetDaysExercisePerWeek
      )
    );
  };

  return (
    <View style={styles.cell}>
      <Text
        style={
          currentStateValue.isTrackingExercise
            ? styles.description
            : styles.descriptiondisabled
        }
      >
        Days Per Week:
      </Text>
      <Picker
        style={styles.picker}
        selectedValue={currentStateValue.targetDaysExercisePerWeek}
        onValueChange={(itemValue) => updateDaysPerWeek(itemValue)}
        enabled={currentStateValue.isTrackingExercise}
      >
        <Picker.Item
          label="1"
          value={1}
          color={currentStateValue.isTrackingExercise ? "black" : "grey"}
        />
        <Picker.Item
          label="2"
          value={2}
          color={currentStateValue.isTrackingExercise ? "black" : "grey"}
        />
        <Picker.Item
          label="3"
          value={3}
          color={currentStateValue.isTrackingExercise ? "black" : "grey"}
        />
        <Picker.Item
          label="4"
          value={4}
          color={currentStateValue.isTrackingExercise ? "black" : "grey"}
        />
        <Picker.Item
          label="5"
          value={5}
          color={currentStateValue.isTrackingExercise ? "black" : "grey"}
        />
        <Picker.Item
          label="6"
          value={6}
          color={currentStateValue.isTrackingExercise ? "black" : "grey"}
        />
        <Picker.Item
          label="7"
          value={7}
          color={currentStateValue.isTrackingExercise ? "black" : "grey"}
        />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  cell: {
    paddingTop: 5,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  description: {
    marginRight: "auto",
    marginLeft: "30%",
    fontSize: 15,
    color: "black",
  },
  descriptiondisabled: {
    marginRight: "auto",
    marginLeft: "30%",
    fontSize: 15,
    color: "grey",
  },
  picker: {
    height: 50,
    width: 100,
    marginRight: 10,
  },
  disabled: {
    color: "grey",
  },
});

export default DayPickerCell;
