import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Modal, ShadowPropTypesIOS } from "react-native";
import uuid from "react-native-uuid";

import { useAppDispatch } from "../state/hooks";
import { IDailyData } from "../state/data_tracking/trackingReducer";
import { submitDayData } from "../state/data_tracking/actions";
import { updateToggledSetting } from "../state/user_settings/actions";
import YesNoForm from "./YesNoForm";
import theme from "./theme";

interface DailyInputModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<any>>;
  includeHydration: boolean;
  includeEating: boolean;
  includeSleep: boolean;
  includeExercise: boolean;
}

export const DailyInputModal: React.FC<DailyInputModalProps> = (props): JSX.Element => {
  const [hydration, setHydration] = useState(null);
  const [eating, setEating] = useState(null);
  const [sleep, setSleep] = useState(null);
  const [exercise, setExercise] = useState(null); 
  
  const dispatch = useAppDispatch();

  const onSubmit = () => {
    const id = uuid.v4().toString();
    const today = new Date(Date.now());
    const date = { day: today.getDate(), month: today.getMonth(), year: today.getFullYear() };
    const results = { hydration: null, eating: null, sleep: null, exercise: null }
    if (props.includeHydration) results.hydration = hydration;
    if (props.includeEating) results.eating = eating;
    if (props.includeSleep) results.sleep = sleep;
    if (props.includeExercise) results.exercise = exercise;
    const todaysResults: IDailyData = {
      id: id,
      date: date,
      results: results
    };
    dispatch(submitDayData("ADD_NEW_DAY_PROGRESS", todaysResults));
    dispatch(updateToggledSetting("TOGGLE_UPDATE_READY", false));
    props.setVisible(false);
  }

  function isComplete() {
    let result: number[] = [0,0,0,0];
    if (props.includeHydration) {
      hydration === null ? result[0] = 2 : result[0] = 1;
    }
    if (props.includeEating) {
      eating === null ? result[1] = 2 : result[1] = 1;
    }
    if (props.includeSleep) {
      sleep === null ? result[2] = 2 : result[2] = 1;
    }
    if (props.includeExercise) {
      exercise === null ? result[3] = 2 : result[3] = 1;
    }
    return !result.includes(2);
  }
  
  return (
    <>
      <Modal 
        animationType="none"
        transparent={false}
        visible={props.visible}
        onRequestClose={() => {
          console.warn("Blah");
          setHydration(null);
          setEating(null);
          setSleep(null);
          setExercise(null);
          props.setVisible(false);
        }}
      >
        <View style={styles.root}>
          <Text style={styles.title}>Today's Results:</Text>
          <View style={styles.formarea}>
            {props.includeHydration && (
              <View>
                <Text style={styles.question}>Did I meet my hydration goal?</Text>
                <YesNoForm answer={hydration} setAnswer={setHydration} />
              </View>
            )}
            {props.includeEating && (
              <View>
                <Text style={styles.question}>Did I meet my eating goal?</Text>
                <YesNoForm answer={eating} setAnswer={setEating}/>
              </View>
            )}
            {props.includeSleep && (
              <View>
                <Text style={styles.question}>Did I sleep well last night?</Text>
                <YesNoForm answer={sleep} setAnswer={setSleep}/>
              </View>
            )}
            {props.includeExercise && (
              <View>
                <Text style={styles.question}>Did I exercise today?</Text>
                <YesNoForm answer={exercise} setAnswer={setExercise}/>
              </View>
            )}
          </View>
          <View style={styles.buttoncontainer}>
            <TouchableOpacity
              style={[ styles.button, isComplete() ? styles.buttonenabled : styles.buttondisabled] }
              disabled={!isComplete()}
              onPress={onSubmit}
            >
              <Text style={styles.buttontext}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttoncontainer: {
    flex: 1,
    width: "80%",
  },
  button: {
    borderRadius: 50,
    alignItems: "center",
    elevation: 5,
    padding: 10,
  },
  buttondisabled: {
    backgroundColor: "grey",
  },
  buttonenabled: {
    backgroundColor: theme.colors.border,
  },
  buttontext: {
    fontSize: 15,
    color: "white",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    padding: 15,
  },
  question: {
    textAlign: "center",
    fontSize: 14,
  },
  formarea: {
    flex: 6,
    justifyContent: "center",
  }
});