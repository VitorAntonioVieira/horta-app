import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import app from "../../lib/firebase";

const Perfil = () => {
  const [user, setUser] = useState(null);
  const [showAccountInfo, setShowAccountInfo] = useState(false); // Estado para mostrar/ocultar informações da conta
  const [showHelpModal, setShowHelpModal] = useState(false); // Estado para mostrar/ocultar modal de ajuda
  const navigation = useNavigation();
  const auth = getAuth(app);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

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

  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho verde */}
      <View style={styles.header}>
        <View style={styles.headerIcons}>
          <Icon name="bars" size={24} color="#fff" />
          <Icon name="question-circle" size={24} color="#fff" />
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
            <Text style={styles.userName}>
              {user?.displayName || "Usuário"}
            </Text>
            <Text style={styles.userEmail}>
              {user?.email || "user@gmail.com"}
            </Text>
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
                Nome: {user?.nome || "Não disponível"}
              </Text>
              <Text style={styles.accountInfoText}>
                Email: {user?.email || "Não disponível"}
              </Text>
              {/* Adicione mais informações conforme necessário */}
            </View>
          )}

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
            <Text style={[styles.optionText, styles.logoutText]}>
              Sair da conta
            </Text>
            <Icon name="chevron-right" size={20} color="#000" />
          </TouchableOpacity>
        </View>
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
            <Text style={styles.modalText}>
              Estamos aqui para ajudar! Se você tiver qualquer dúvida, precisar
              de suporte ou desejar fornecer feedback, entre em contato pelo
              email:
            </Text>
            <Text style={[styles.modalText, styles.emailText]}>
              hortaconnect@gmail.com
            </Text>
            <Text style={styles.modalText}>
              Você pode nos seguir em nossas redes sociais para ficar por dentro
              das últimas atualizações e novidades.
              {"\n\n"}
              Sua satisfação é a nossa prioridade, e estamos prontos para ajudar
              no que for necessário!
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#35992B",
    width: "100%",
    height: 150, // Aumenta a altura do cabeçalho verde
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden", // Garante que o borderRadius funcione corretamente
  },
  headerIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  titleContainer: {
    backgroundColor: "#fff", // Parte branca
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20, // Adiciona o mesmo borderRadius da parte verde
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20, // Borda arredondada na parte superior
    borderTopRightRadius: 20, // Borda arredondada na parte superior
    marginTop: -50, // Ajuste para que sobreponha o cabeçalho verde
    zIndex: 1, // Para garantir que a parte branca fique sobre a parte verde
  },
  headerTitle: {
    color: "#000",
    fontSize: 32,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 10,
  },
  scrollViewContent: {
    paddingBottom: 40,
  },
  profileContainer: {
    alignItems: "center", // Alinha verticalmente no centro
    marginTop: 30,
    marginBottom: 40,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "#fff",
    marginBottom: 10, // Espaço entre a imagem e as informações
  },
  userInfoContainer: {
    alignItems: "center", // Alinha verticalmente no centro
  },
  userName: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  userEmail: {
    color: "#000",
    fontSize: 16,
  },
  optionsContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  accountInfoContainer: {
    padding: 16,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    marginBottom: 10,
  },
  accountInfoText: {
    fontSize: 16,
    color: "#000",
    marginBottom: 5,
  },
  optionText: {
    fontSize: 18,
    fontWeight: "500",
  },
  logoutText: {
    color: "red",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparente
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: "#000",
    textAlign: "justify", // Justifica o texto
    marginBottom: 10,
  },
  emailText: {
    fontWeight: "bold", // Destaca o e-mail
    fontSize: 18, // Aumenta o tamanho da fonte do e-mail
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#35992B",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Perfil;
