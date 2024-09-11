import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Modal, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const CustomModal = ({
  type,
  handleVisibility,
  isLoading,
  modalStyle,
  children,
}) => {
  const [visible, setVisibility] = useState(false);

  useEffect(() => {
    setVisibility(handleVisibility);
  }, [handleVisibility]);

  switch (type) {
    case "bottomSheet":
      return (
        <Modal visible={visible} animationType="slide" transparent={true}>
          <View className={"flex justify-center items-center bg-transparent"}>
            <View
              className={`bg-white p-5 w-full h-[30%] rounded-t-xl ${modalStyle}`}
            >
              <TouchableOpacity className={"flex flex-row self-end"}>
                <Ionicons
                  name="close"
                  size={24}
                  className={"bg-gray-400 rounded-[50%] text-gray-600"}
                />
              </TouchableOpacity>
              <View className={"border-t-gray-500 w-[80%] mt-10"}>
                {children}
              </View>
            </View>
          </View>
          {isLoading && (
            <ActivityIndicator
              animating={isLoading}
              color={"#fff"}
              size={"small"}
              className={`ml-2`}
            />
          )}
        </Modal>
      );

    default:
      break;
  }
};

export default CustomModal;
