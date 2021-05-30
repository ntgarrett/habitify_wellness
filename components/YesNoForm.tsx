import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Touchable } from "react-native";

import RadioButton from "./RadioButton";

interface YesNoFormProps {
  answer: boolean | null;
  setAnswer: React.Dispatch<React.SetStateAction<any>>;
}

const YesNoForm: React.FC<YesNoFormProps> = (props): JSX.Element => {
  const [yes, setYes] = useState(false);
  const [no, setNo] = useState(false);

  return (
    <>
      <View style={styles.root}>
        <View style={styles.cell}>
          <TouchableOpacity
            onPress={() => {
              setYes(true);
              setNo(false);
              props.setAnswer(true);
            }}
          >
            <RadioButton selected={yes}/>
          </TouchableOpacity>
          <Text style={styles.text}>Yes</Text>
        </View>
        <View style={styles.cell}>
          <TouchableOpacity
            onPress={() => {
              setNo(true);
              setYes(false);
              props.setAnswer(false);
            }}
          >
            <RadioButton selected={no}/>
          </TouchableOpacity>
          <Text style={styles.text}>No</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    justifyContent: "center",
  },
  cell: {
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  text: {},
});

export default YesNoForm;