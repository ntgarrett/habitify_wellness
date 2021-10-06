import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Divider } from "react-native-elements";

import { useAppSelector } from "../state/hooks";
import { DataTrackingState, IDailyData } from "../state/data_tracking/trackingReducer";
import AppHeader from "../components/AppHeader";
import WeekDayPicker from "../components/WeekDayPicker";
import CategoryVisualizer from "../components/CategoryVisualizer";
import theme from "../components/theme";

const dateFormat: Intl.DateTimeFormatOptions = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const Progress: React.FC = (props): JSX.Element => {
  const [displayDate, setDisplayDate] = useState(new Date);

  const currentData: DataTrackingState = useAppSelector((state) => {
    return state.progress;
  });

  useEffect(() => {
    const today = new Date(Date.now());
    setDisplayDate(today);
  },[]);

  const DayWithNoData = () => {
    return (
      <>
        <View style={styles.nullDay}>
          <Text style={{ fontSize: 16 }}>
            There is no submitted data for this day.
          </Text>
        </View>
      </>
    );
  };

  function dayData(state: DataTrackingState, selectedDate: Date) {
    const i = state.trackedDays.findIndex(day => day.date.day == selectedDate.getDate() && day.date.month == selectedDate.getMonth() && day.date.year == selectedDate.getFullYear());
    return state.trackedDays[i] || null;
  };

  const ResultsIcon = (outcome: any) => {
    if (outcome.outcome == null) {
      return (
        <Ionicons 
          name="remove-sharp"
          color={theme.colors.notification}
          style={styles.icon}
        />
      );
    } else if (!!outcome.outcome === true) {
      return (
        <Ionicons 
          name="checkmark-sharp"
          color={theme.colors.data3}
          style={styles.icon}
        />
      );
    } else if (!!outcome.outcome === false) {
      return (
        <Ionicons 
          name="close-sharp"
          color={theme.colors.data1}
          style={styles.icon}
        />
      );
    } else {
      return (
        <Ionicons 
          name="remove-sharp"
          color={theme.colors.notification}
          style={styles.icon}
        />
      );
    }
  };

  const DailyDataDisplay: React.FC<{ obj: IDailyData }> = (props) => {  
    return (
      <>
        <View style={styles.resultsRow}>
          <Text style={styles.resultsText}>
            Hydration goal:
          </Text>
          <ResultsIcon outcome={props.obj.results.hydration}/>
        </View>
        <View style={styles.resultsRow}>
          <Text style={styles.resultsText}>
            Eating goal:
          </Text>
          <ResultsIcon outcome={props.obj.results.eating} />
        </View>
        <View style={styles.resultsRow}>
          <Text style={styles.resultsText}>
            Sleep goal:
          </Text>
          <ResultsIcon outcome={props.obj.results.sleep}/>
        </View>
        <View style={styles.resultsRow}>
          <Text style={styles.resultsText}>
            Exercise goal:
          </Text>
          <ResultsIcon outcome={props.obj.results.exercise}/>
        </View>
      </>
    );
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.card} />
      <AppHeader title="My Progress" />
      <View style={styles.dateContainer}>
        <Text style={{ fontSize: 18 }}>
          {displayDate.toLocaleDateString(undefined, dateFormat)}
        </Text>
      </View>
      <View style={styles.dayPickerContainer}>
        <WeekDayPicker 
          setDisplayDate={setDisplayDate}
        />
      </View>
      <Divider style={{ backgroundColor: theme.colors.card }} />
      <View style={styles.dataDisplayContainer}>
        { dayData(currentData, displayDate) == null ? 
          <DayWithNoData /> 
          :
          <> 
            <CategoryVisualizer obj={dayData(currentData, displayDate)}/>
            <DailyDataDisplay obj={dayData(currentData, displayDate)} /> 
          </> }
      </View>
      <Divider style={{ backgroundColor: theme.colors.card }} />
      <View style={styles.totalTrackedContainer}>
        <Text style={{ fontSize: 18 }}>
          Total days tracked: {currentData.totalDaysTracked}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  dateContainer: {
    flex: 0.75,
    alignItems: "center",
    justifyContent: "center",
  },
  dayPickerContainer: {
    flex: 0.75,
    paddingBottom: 10,
  },
  dataDisplayContainer: { 
    flex: 5,
    justifyContent: "space-evenly",
  },
  nullDay: {
    alignItems: "center",
    justifyContent: "center",
  },
  resultsRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  resultsText: {
    flex: 1,
    fontSize: 18,
    textAlign: "right",
  },
  totalTrackedContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 32,
    flex: 1,
  }
});

export default Progress;
