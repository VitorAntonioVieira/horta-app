import React, { useState } from "react";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import { CustomButton, CustomModal } from "../components";
import { images } from "../constants";

export default function Index() {
  const [bool, setBool] = useState(false);
  return (
    <SafeAreaView className={`bg-primary h-full`}>
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View
          className={`w-full flex justify-center items-center h-full px-10`}
        >
          <Image
            source={images.logo}
            className={`w-[90px] h-[90px]`}
            resizeMode="contain"
          />
          <Image
            source={images.card}
            className={`w-full h-[264px] mt-10`}
            resizeMode="contain"
          />
          <View className={`relative mt-5`}>
            <Text className={`text-[24px] text-white font-pmedium text-center`}>
              Plante, Planeje e Venda{"\n"} com
              <Text className={`text-secondary font-pbold`}> HortaConnect</Text>
            </Text>
            <Text
              className={`text-[16px] font-plight text-white-200 text-center mt-[15px]`}
            >
              Transformando sementes {"\n"}de ideias em colheitas de sucesso
            </Text>
          </View>
          <CustomButton
            color={""}
            title="Continuar com Email"
            handlePress={setBool(true)}
            isLoading={false}
            containerStyles={`mt-20 px-2`}
          />
        </View>
        <CustomModal
          type={"bottomSheet"}
          handleVisibility={bool}
          isLoading={false}
        >
          <CustomButton />
        </CustomModal>
      </ScrollView>
    </SafeAreaView>
  );
}
