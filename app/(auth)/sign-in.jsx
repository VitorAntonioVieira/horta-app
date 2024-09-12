import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import { CustomButton, CustomTextInput } from "../../components";
import { images } from "../../constants";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
              Olá!
            </Text>
            <Text className="text-black-100 text-[18px] font-pregular self-start">
              Entre com suas credenciais
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
            <CustomTextInput
              placeholder={"Senha"}
              icon={"lock-closed"}
              secureTextEntry={true}
              conatinerStyle={"mt-[16px]"}
              onChangeText={(text) => {
                setPassword(text);
                console.log(password);
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
            <Link
              href={"/(auth)/forgot-password"}
              className="text-primary text-sm mt-[10px]"
            >
              Esqueceu sua senha?
            </Link>
            <CustomButton
              color={"white"}
              title={"Criar nova conta"}
              textStyle={"text-primary"}
              handlePress={() => router.navigate("./sign-up")}
              isLoading={false}
              containerStyles={"mt-[40px] border-primary border-[2px]"}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
