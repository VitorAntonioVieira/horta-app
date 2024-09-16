<<<<<<< HEAD
import { useNavigation } from "@react-navigation/native";
import { router, useFocusEffect } from "expo-router";
import { collection, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import React, { useCallback, useEffect, useState } from "react";
=======
import { router } from "expo-router";
import { getAuth, deleteUser } from "firebase/auth"; // Importa a função para deletar o usuário
import React, { useEffect, useState } from "react";
>>>>>>> 70003e77a81c9292619035669e8da1410d524360
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

const Perfil = () => {
  const [user, setUser] = useState(null);
  const [showAccountInfo, setShowAccountInfo] = useState(false); // Estado para mostrar/ocultar informações da conta
  const [showHelpModal, setShowHelpModal] = useState(false); // Estado para mostrar/ocultar modal de ajuda
  const navigation = useNavigation();
  const db = getFirestore(app)
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Estado para mostrar/ocultar modal de confirmação de deletar conta
  const [showChatModal, setShowChatModal] = useState(false); // Estado para mostrar/ocultar modal de chat
  const [chatMessage, setChatMessage] = useState(""); // Estado para armazenar a mensagem do chat
  const [chatHistory, setChatHistory] = useState([]); // Histórico de mensagens do chat

  const auth = getAuth(app);

  const usersRef = collection(db, 'clientes');
  const userInfo = {};

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  useFocusEffect(
    useCallback(async () => {const snapshot = await citiesRef.where('capital', '==', true).get();
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }  
      
      snapshot.forEach(doc => {
        userInfo = doc.id, '=>', doc.data();
      });})
  )

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

  const confirmDeleteAccount = () => {
    const currentUser = auth.currentUser;

    if (currentUser) {
      deleteUser(currentUser)
        .then(() => {
          console.log("Conta deletada com sucesso");
          router.replace("/(auth)/sign-in"); // Redireciona para a página de login após deletar a conta
        })
        .catch((error) => {
          console.log("Erro ao deletar a conta:", error);
        });
    }
  };

  const sendMessage = () => {
    if (chatMessage.trim()) {
      setChatHistory([...chatHistory, { id: Date.now(), message: chatMessage }]);
      setChatMessage(""); // Limpa o campo de mensagem após o envio
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho verde */}
      <View style={styles.header}>
        <View style={styles.headerIcons}>
<<<<<<< HEAD
          <Icon name="bars" size={24} color="#fff" onPress={() => {navigation.openDrawer()
          }} />
          <Icon name="question-circle" size={24} color="#fff" />
=======
          <Icon name="bars" size={24} color="#fff" />
          <TouchableOpacity onPress={() => setShowChatModal(true)}>
            <Icon name="comments" size={24} color="#fff" />
          </TouchableOpacity>
>>>>>>> 70003e77a81c9292619035669e8da1410d524360
        </View>
      </View>

      {/* Título "Perfil" na parte branca */}
      <View style={styles.titleContainer}>
        <Text style={styles.headerTitle}>Perfil</Text>
      </View>

      {/* Conteúdo rolável */}
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Imagem e detalhes do perfil, empilhados verticalmente */}
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
            }} // Substitua pela URL da imagem desejada
            style={styles.profileImage}
          />
          <View style={styles.userInfoContainer}>
<<<<<<< HEAD
            <Text style={styles.userName}>
              {userInfo.nome || "Usuário"}
            </Text>
            <Text style={styles.userEmail}>
              {user?.email || "user@gmail.com"}
            </Text>
=======
            <Text style={styles.userName}>{user?.displayName || "Usuário"}</Text>
            <Text style={styles.userEmail}>{user?.email || "user@gmail.com"}</Text>
>>>>>>> 70003e77a81c9292619035669e8da1410d524360
          </View>
        </View>

        {/* Seção de opções */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.option}
            onPress={() => setShowAccountInfo(!showAccountInfo)} // Alterna a visibilidade das informações
          >
            <Text style={styles.optionText}>Minha conta</Text>
            <Icon
              name={showAccountInfo ? "chevron-up" : "chevron-down"}
              size={20}
              color="#000"
            />
          </TouchableOpacity>

          {showAccountInfo && (
            <View style={styles.accountInfoContainer}>
              <Text style={styles.accountInfoText}>
<<<<<<< HEAD
                Nome: {userInfo.nome || "Não disponível"}
=======
                Nome: {user?.displayName || "Não disponível"}
>>>>>>> 70003e77a81c9292619035669e8da1410d524360
              </Text>
              <TouchableOpacity onPress={() => setShowHelpModal(true)}>
                <Text
                  style={[
                    styles.accountInfoText,
               
                  ]}
                >
                  Email: {user?.email || "Não disponível"}
                </Text>
              </TouchableOpacity>

              {/* Frase clicável para deletar conta */}
              <TouchableOpacity onPress={() => setShowDeleteModal(true)}>
                <Text
                  style={[
                    styles.accountInfoText,
                    { color: "red", textDecorationLine: "underline", marginTop: 10 },
                  ]}
                >
                  Deseja deletar essa conta?
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={styles.option}
          onPress={() => setShowHelpModal(true)} // Mostra o modal de ajuda
        >
          <Text style={styles.optionText}>Ajuda e suporte</Text>
          <Icon name="chevron-right" size={20} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Text style={styles.optionText}>Termos e condições</Text>
          <Icon name="chevron-right" size={20} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity onPress={logout} style={styles.option}>
          <Text style={[styles.optionText, styles.logoutText]}>Sair da conta</Text>
          <Icon name="chevron-right" size={20} color="#000" />
        </TouchableOpacity>

        {/* Link para deletar conta */}
       
      </ScrollView>

      {/* Modal de Ajuda e Suporte */}
      <Modal
        visible={showHelpModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowHelpModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ajuda e Suporte</Text>
            <Text style={styles.modalText}> Estamos aqui para ajudar! Se você tiver alguma dúvida, solicite suporte ou forneça feedback, entre em contato pelo email: </Text>
            <Text style={[styles.modalText, styles.emailText]}> hortaconnect@gmail.com </Text> 
            < Text style={styles.modalText}> 
             Você pode nos seguir em nossas redes sociais para ficar por dentro das últimas atualizações e novidades.
              {"\n\n"} Sua satisfação é nossa prioridade, e estamos prontos para ajudar no que for necessário!
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowHelpModal(false)}
            >
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de Confirmação para Deletar Conta */}
      <Modal
        visible={showDeleteModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Deletar Conta</Text>
            <Text style={styles.modalText}>
              Tem certeza que deseja deletar sua conta? Essa ação não pode ser desfeita.
            </Text>
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.closeButton, styles.cancelButton]}
                onPress={() => setShowDeleteModal(false)}
              >
                <Text style={styles.closeButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={confirmDeleteAccount} // Chama a função para deletar a conta
              >
                <Text style={styles.deleteButtonText}>Deletar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de Chat */}
      <Modal
        visible={showChatModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowChatModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Chat</Text>
            <ScrollView style={styles.chatContainer}>
              {chatHistory.map((chat) => (
                <Text key={chat.id} style={styles.chatMessage}>
                  {chat.message}
                </Text>
              ))}
            </ScrollView>
            <TextInput
              style={styles.chatInput}
              placeholder="Digite sua mensagem..."
              value={chatMessage}
              onChangeText={setChatMessage}
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.sendButton}
                onPress={sendMessage} // Envia a mensagem ao chat
              >
                <Text style={styles.sendButtonText}>Enviar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowChatModal(false)}
              >
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: "#4CAF50",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 80,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginTop: 16,
  },
  profileContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  userInfoContainer: {
    alignItems: "center",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 16,
    color: "#888",
  },
  optionsContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  option: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutText: {
    color: "red",
  },
  deleteText: {
    color: "red",
  },
  accountInfoContainer: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  accountInfoText: {
    fontSize: 14,
    color: "#888",
    marginBottom: 4,
  },
  scrollViewContent: {
    padding: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  closeButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  cancelButton: {
    backgroundColor: "gray",
    marginRight: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  chatContainer: {
    maxHeight: 200,
    width: "100%",
    marginBottom: 10,
  },
  chatMessage: {
    backgroundColor: "#f1f1f1",
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
    alignSelf: "flex-start",
    maxWidth: "80%",
  },
  chatInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 8,
    width: "100%",
    marginBottom: 10,
  },
  sendButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  sendButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Perfil;
