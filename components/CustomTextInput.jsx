import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TextInput, View } from "react-native";

const CustomTextInput = ({
  placeholder,
  value,
  conatinerStyle,
  onChangeText,
  icon,
  iconStyle,
  secureTextEntry,
}) => {
  const [focused, setFocus] = useState(false);

  return (
    <View
      className={`w-full h-[56px] flex flex-row items-center p-3 ${
        focused ? "border-black-100" : "border-gray-400"
      } border-[1px] rounded-[10px] ${conatinerStyle}`}
    >
      {icon && (
        <Ionicons
          name={icon}
          size={24}
          color={`${focused ? "#333333" : "#9ca3af"}`}
          className={`text-gray-400 mr-4 ${iconStyle}`}
        />
      )}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={"#9ca3af"}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        secureTextEntry={secureTextEntry}
        className={`${icon ? "ml-[10px]" : ""} text-[16px] w-full`}
      />
    </View>
  );
};

export default CustomTextInput;
