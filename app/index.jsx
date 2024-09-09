import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import { images } from '../constants'

export default function Index() {
  return (
    <SafeAreaView className={`bg-primary h-full`} >
      <ScrollView contentContainerStyle={{
         height: '100%',
      }} >
        <View className={`w-full flex justify-center items-center h-full px-2`}>
          <Image
            source={images.headerLogo}
            className={`w-[180px] h-[90px]`}
            resizeMode="contain"
          />
          <Image 
            source={images.card}
            className={`w-full h-[264px]`}
            resizeMode="contain"
          />
          <View className={`relative mt-5`}>
            <Text className={`text-[16px] text-white font-pregular text-center`}>Transformando sementes de ideias em {' '} <Text>
              colheitas de sucesso</Text> </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
