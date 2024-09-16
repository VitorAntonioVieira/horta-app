import { router } from "expo-router";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { CustomButton, CustomTextInput } from "../../components";
import { images } from "../../constants";
import app from "../../lib/firebase";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = () => {
    const auth = getAuth(app);
    console.log("entrei");
    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert(
          "Email de redefinição de senha enviado! Verifique sua caixa de email."
        );
        router.navigate("./sign-in");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <Image
          source={images.logo}
          className="self-center relative top-[11%] w-[200px] h-[180px]"
        />
        <View className="flex items-center justify-end h-full">
          <View className="flex items-center h-[82%] w-full p-8 bg-white rounded-t-[20px]">
            <Text className="text-black-100 text-[26px] font-pbold self-start">
              Redefina sua senha!
            </Text>
            <Text className="text-black-100 text-[18px] font-pregular self-start">
              Insira seu email
            </Text>
            <CustomTextInput
              placeholder={"Email"}
              icon={"mail"}
              conatinerStyle={"mt-[35px]"}
              onChangeText={(text) => {
                setEmail(text);
                console.log(email);
              }}
            />
            <CustomButton
              color={""}
              title={"Enviar"}
              textStyle={"text-white"}
              handlePress={() => handleForgotPassword()}
              isLoading={false}
              containerStyles={"mt-[16px]"}
            />
            <Text className="text-gray-400 text-sm mt-5">
              Você receberá para redefinir sua senha. Verifique a caixa
              Principal.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
