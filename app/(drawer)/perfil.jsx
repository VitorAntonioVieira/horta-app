import { useNavigation } from "@react-navigation/native";
import { router, useFocusEffect } from "expo-router";
import {
  collection,
  getFirestore,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import React, { useCallback, useEffect, useState } from "react";
import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import app from "../../lib/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Perfil = () => {
  const [user, setUser] = useState(null);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [storedName, setStoredName] = useState(null);
  const navigation = useNavigation();
  const db = getFirestore(app);
  const auth = getAuth(app);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }

    const getUserName = async () => {
      const name = await AsyncStorage.getItem("userName");
      setStoredName(name);
    };

    getUserName();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const fetchUserInfo = async () => {
        if (!user) return;
        const usersRef = collection(db, "usuarios");
        const q = query(usersRef, where("email", "==", user.email));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setUserInfo(userData);
        }
      };

      fetchUserInfo();
    }, [user])
  );

  const logout = () => {
    auth
      .signOut()
      .then(() => {
        router.replace("/(auth)/sign-in");
      })
      .catch((error) => {
        console.log("Erro ao sair:", error);
      });
  };

  const maskPassword = (password) => {
    if (!password || password.length < 2) return "Senha inválida";
    const visibleDigits = password.slice(-2);
    const maskedPart = "*".repeat(password.length - 2);
    return maskedPart + visibleDigits;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerIcons}>
          <Icon
            name="bars"
            size={24}
            color="#fff"
            onPress={() => navigation.openDrawer()}
          />
          <Icon name="question-circle" size={24} color="#fff" />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
            }}
            style={styles.profileImage}
          />
          <View style={styles.userInfoContainer}>
            <Text style={styles.userName}>
              {storedName || userInfo.nome || user?.displayName || "Usuário"}
            </Text>
            <Text style={styles.userEmail}>
              {user?.email || "Email não disponível"}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.option}
          onPress={() => setShowHelpModal(true)}
        >
          <Text style={styles.optionText}>Ajuda e suporte</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.option}
          onPress={() => setShowAccountModal(true)}
        >
          <Text style={styles.optionText}>Minha Conta</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={logout} style={styles.option}>
          <Text style={[styles.optionText, styles.logoutText]}>Sair da conta</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={showHelpModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowHelpModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setShowHelpModal(false)}
            >
              <Icon name="times" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Ajuda e Suporte</Text>
            <Text style={styles.modalText2}>
              Precisa de ajuda? Entre em contato pelo email:
            </Text>
            <Text style={[styles.modalText, styles.emailText]}>
              hortaconnect@gmail.com
            </Text>
          </View>
        </View>
      </Modal>

      <Modal
  visible={showAccountModal}
  transparent={true}
  animationType="slide"
  onRequestClose={() => setShowAccountModal(false)}
>
  <View style={styles.modalContainer}>
    <View style={[styles.modalContent, styles.accountModal]}>
      <TouchableOpacity
        style={styles.closeModalButton}
        onPress={() => setShowAccountModal(false)}
      >
        <Icon name="times" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.modalTitle}>Minha Conta</Text>

      {/* Campos editáveis */}
      <Text style={styles.modalText}>Nome:</Text>
      <TextInput
        style={styles.input}
        value={userInfo.nome}
        onChangeText={(text) =>
          setUserInfo((prev) => ({ ...prev, nome: text }))
        }
      />

      <Text style={styles.modalText}>Email:</Text>
      <TextInput
        style={styles.input}
        value={user?.email || ""}
        editable={false} // Email geralmente não pode ser editado
      />

      <Text style={styles.modalText}>CEP:</Text>
      <TextInput
        style={styles.input}
        value={userInfo.cidade || ""}
        onChangeText={(text) =>
          setUserInfo((prev) => ({ ...prev, cidade: text }))
        }
      />

      <Text style={styles.modalText}>Senha:</Text>
      <TextInput
        style={styles.input}
        value={userInfo.senha ? maskPassword(userInfo.senha) : ""}
        secureTextEntry={true}
        onChangeText={(text) =>
          setUserInfo((prev) => ({ ...prev, senha: text }))
        }
      />

      {/* Botão para salvar as alterações */}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => {
          // Lógica para salvar alterações
          console.log("Dados salvos:", userInfo);
          setShowAccountModal(false);
        }}
      >
        <Text style={styles.saveButtonText}>Salvar Alterações</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  header: { backgroundColor: "#35992B", padding: 20, height: 120 },
  headerIcons: { flexDirection: "row", justifyContent: "space-between" },
  profileContainer: { alignItems: "center", marginVertical: 16 },
  profileImage: { width: 100, height: 100, borderRadius: 50 },
  userInfoContainer: { alignItems: "center" },
  userName: { fontSize: 18, fontWeight: "bold" },
  userEmail: { fontSize: 16, color: "#888" },
  option: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  optionText: { fontSize: 16, fontWeight: "bold" },
  logoutText: { color: "red" },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContent: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  accountModal: {
    height: "70%",
    justifyContent: "flex-start",
    paddingBottom: 20,
  },
  modalTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 25,
    color: "#35992B",
    textAlign: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
    marginTop: 10,
    color: "#333",
    textAlign: "left",
  },
  modalText2: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
    color: "#333",
    textAlign: "center",
  },

  emailText:{
    color: "#FFC222",
    fontWeight: "bold",
    textDecorationLine: "underline",
    textAlign: "center",
  },
  modalDivider: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  saveButton: {
    backgroundColor: "#35992B",
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  
  closeModalButton: { position: "absolute", top: 10, right: 10 },
});

export default Perfil;
