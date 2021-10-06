import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import theme from "./theme";

interface IStateProps {
  setDisplayDate: Dispatch<SetStateAction<Date>>;
};

type IButtonProps = {
  dayID: number;
  selectedDay: number;
  setSelectedDay: Dispatch<SetStateAction<number>>;
  setDisplayDate: Dispatch<SetStateAction<Date>>;
}

const WeekDayButton: React.FC<IButtonProps> = (props): JSX.Element => {
  const { dayID, selectedDay, setSelectedDay, setDisplayDate } = props;
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <>
      <TouchableOpacity
        style={[styles.buttonBase, selectedDay == dayID ? styles.selectedButtonBase : styles.unselectedButton]}
        onPress={() => {
          setSelectedDay(dayID);
          
          const dayOfWeek = new Date().getDay();
          if (dayID < dayOfWeek) {
            const diff = dayOfWeek - dayID;
            const newDisplayDate = new Date();
            newDisplayDate.setDate(newDisplayDate.getDate() - diff);
            setDisplayDate(newDisplayDate);
          } else if (dayID > dayOfWeek) {
            const diff = dayID - dayOfWeek;
            const newDisplayDate = new Date();
            newDisplayDate.setDate(newDisplayDate.getDate() + diff);
            setDisplayDate(newDisplayDate);
          } else {
            setDisplayDate(new Date());
          }
        }}
      >
        <Text style={[styles.buttonText, selectedDay == dayID ? styles.selectedButtonText : styles.unselectedText]}>
          {days[dayID]}
        </Text>
      </TouchableOpacity>
    </>
  );
};

const WeekDayPicker: React.FC<IStateProps> = (props): JSX.Element => {
  const { setDisplayDate } = props;
  const [selectedDay, setSelectedDay] = useState(0);

  useEffect(() => {
    const today: Date = new Date();
    setSelectedDay(today.getDay());
  }, []);

  return (
    <>
      <View style={styles.root}>
        <WeekDayButton dayID={0} selectedDay={selectedDay} setSelectedDay={setSelectedDay} setDisplayDate={setDisplayDate} />
        <WeekDayButton dayID={1} selectedDay={selectedDay} setSelectedDay={setSelectedDay} setDisplayDate={setDisplayDate} />
        <WeekDayButton dayID={2} selectedDay={selectedDay} setSelectedDay={setSelectedDay} setDisplayDate={setDisplayDate} />
        <WeekDayButton dayID={3} selectedDay={selectedDay} setSelectedDay={setSelectedDay} setDisplayDate={setDisplayDate} />
        <WeekDayButton dayID={4} selectedDay={selectedDay} setSelectedDay={setSelectedDay} setDisplayDate={setDisplayDate} />
        <WeekDayButton dayID={5} selectedDay={selectedDay} setSelectedDay={setSelectedDay} setDisplayDate={setDisplayDate} />
        <WeekDayButton dayID={6} selectedDay={selectedDay} setSelectedDay={setSelectedDay} setDisplayDate={setDisplayDate} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonBase: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    height: 40,
    width: 40,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
  },
  selectedButtonBase: {
    backgroundColor: theme.colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedButtonText: {
    color: '#fff',
  },
  unselectedButton: {
    backgroundColor: '#dddddd',
  },
  unselectedText: {
    color: '#353535',
  },
});

export default WeekDayPicker;