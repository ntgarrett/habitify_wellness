import React from "react";
import { View } from "react-native";

import theme from "./theme";

interface RadioButtonProps {
  selected: boolean;
}

const RadioButton: React.FC<RadioButtonProps> = ({ selected }): JSX.Element => {
  return (
    <>
      <View style={{
        height: 24,
        width: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
      }}
      >
        { 
          selected ?
            <View style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: '#000',
            }}/>
          : null
          }
      </View>
    </>
  );
};

export default RadioButton;