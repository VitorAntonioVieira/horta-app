import React, { useState } from "react";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import { CustomButton, CustomTextInput } from "../../components";
import { images } from "../../constants";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cep, setCEP] = useState("");

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
              Cadastre-se!
            </Text>
            <Text className="text-black-100 text-[18px] font-pregular self-start">
              Insira suas credenciais
            </Text>
            <CustomTextInput
              placeholder={"Nome completo"}
              icon={"person"}
              conatinerStyle={"mt-[35px]"}
              onChangeText={(text) => {
                setName(text);
              }}
            />
            <CustomTextInput
              placeholder={"Email"}
              icon={"mail"}
              secureTextEntry={true}
              conatinerStyle={"mt-[16px]"}
              onChangeText={(text) => {
                setEmail(text);
              }}
            />
            <CustomTextInput
              placeholder={"Senha"}
              icon={"lock-closed"}
              secureTextEntry={true}
              conatinerStyle={"mt-[16px]"}
              onChangeText={(text) => {
                setPassword(text);
              }}
            />
            <CustomTextInput
              placeholder={"CEP"}
              icon={"location-sharp"}
              secureTextEntry={true}
              conatinerStyle={"mt-[16px]"}
              onChangeText={(text) => {
                setCEP(text);
              }}
            />
            <CustomButton
              color={""}
              title={"Entrar"}
              textStyle={"text-white"}
              handlePress={() => {
                // Implementar a função de login
                console.log("Login");
              }}
              isLoading={false}
              containerStyles={"mt-[16px]"}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
