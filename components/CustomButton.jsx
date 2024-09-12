import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

const CustomButton = ({
  color,
  title,
  handlePress,
  isLoading,
  containerStyles,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      className={`${
        color.trim() != "" || color == null ? "bg-${color}" : "bg-secondary"
      } w-full rounded-[30px] h-[56px] flex flex-row justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text className={`text-[16px] font-psemibold ${textStyle}`}>{title}</Text>
      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color={"#fff"}
          size={"small"}
          className={`ml-2`}
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
