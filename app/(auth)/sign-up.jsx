import React, { useState } from "react";
import { Image, SafeAreaView, ScrollView, Text, View } from "react-native";
import { CustomButton, CustomTextInput } from "../../components";
import { images } from "../../constants";
import app from "../../lib/firebase";
import { router } from "expo-router";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cep, setCEP] = useState("");

  const AdicionarClientes = async () => {
    if (!name || !email || !password || !cep) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }
    
    const auth = getAuth(app);

    try {
      // Crie o usuário no Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Após o usuário ser criado, salve os dados adicionais no Firestore
      const db = getFirestore(app);
      const clientesCollection = collection(db, "clientes");

      await addDoc(clientesCollection, {
        uid: user.uid, // Salve o ID do usuário autenticado
        nome: name,
        email: email,
        cidade: cep,
      });

      Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao adicionar usuário", error);
      Alert.alert("Erro", "Ocorreu um erro ao adicionar o usuário");
    }
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
              secureTextEntry={false}
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
              secureTextEntry={false}
              conatinerStyle={"mt-[16px]"}
              onChangeText={(text) => {
                setCEP(text);
              }}
            />
            <CustomButton
              color={""}
              title={"Cadastrar"}
              textStyle={"text-white"}
              handlePress={() => {
                  AdicionarClientes();
                  router.navigate('./home')
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
