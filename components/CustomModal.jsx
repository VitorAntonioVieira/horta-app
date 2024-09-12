import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Modal,
  StatusBar,
  TouchableOpacity,
  View,
} from "react-native";

const CustomModal = ({
  type,
  handleVisibility,
  setVisibility,
  isLoading,
  modalStyle,
  children,
}) => {
  // const [visible, setVisibility] = useState(handleVisibility);

  useEffect(() => {
    setVisibility(handleVisibility);
    console.log(handleVisibility);
  }, [handleVisibility]);

  switch (type) {
    case "bottomSheet":
      return (
        <Modal
          visible={handleVisibility}
          animationType="slide"
          transparent={true}
        >
          <StatusBar backgroundColor="rgba(0, 0, 0, 0.5)" />
          <View
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            className={`flex justify-end items-center h-full`}
          >
            <View
              className={`flex justify-center items-center bg-white p-5 w-full max-h-[50%] rounded-[20px] ${modalStyle}`}
            >
              <TouchableOpacity
                onPress={() => setVisibility(false)}
                className={
                  "mt-5 w-8 h-8 rounded-full bg-gray-200 flex flex-row self-end items-center justify-center"
                }
              >
                <Ionicons name="close" size={24} className={"text-gray-600"} />
              </TouchableOpacity>
              <View className={"w-full mt-3"}>{children}</View>
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
      return null;
  }
};

export default CustomModal;
