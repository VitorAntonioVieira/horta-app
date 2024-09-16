import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { images } from '../../constants'
import Icon from "react-native-vector-icons/FontAwesome";

const Home = () => {
  return (
    <View style={styles.container}>
      {/* Cabeçalho verde */}
      <View style={styles.header}>
        {/* Abas com ícones */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity style={styles.tab}>
            <Icon name="home" size={24} color="#FFC107" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Icon name="search" size={24} color="#FFC107" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Icon name="book" size={24} color="#FFC107" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Saudação */}
      <View style={styles.titleContainer}>
        <Text style={styles.welcomeText}>Bem vindo, X</Text>
      </View>

      {/* Cartão de novidades */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Cheque as novidades</Text>
        <View style={styles.cardContent}>
          <Image
            source={images.plants}
            style={styles.cardImage}
          />
          <TouchableOpacity style={styles.cardButton}>
            <Icon name="arrow-right" size={24} color="#FFC107" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Seção "Saiba Mais" */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Saiba mais</Text>
        <View style={styles.sectionContent}>
          <View style={styles.sectionItem}>
            <Icon name="leaf" size={30} color="#35992B" />
          </View>
          <View style={styles.sectionItem}>
            <Icon name="carrot" size={30} color="#35992B" />
          </View>
          <View style={styles.sectionItem}>
            <View style={styles.gradientItem}></View>
          </View>
        </View>
      </View>

      {/* Seção "Descoberta do Dia" */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Descoberta do dia</Text>
        <View style={styles.discoveryCard}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#35992B",
    height: 120,
    justifyContent: "flex-end",
    paddingBottom: 10,
    alignItems: "center",
    position: "relative",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "70%",
    position: "absolute",
    bottom: -30, // Faz com que as abas flutuem sobre a parte branca
    zIndex: 10,
  },
  tab: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    elevation: 5, // Sombra para dar o efeito de elevação
  },
  titleContainer: {
    marginTop: 40,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 20,
    alignItems: "flex-start",
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
  },
  card: {
    backgroundColor: "#F0F4F7",
    borderRadius: 15,
    padding: 15,
    marginVertical: 20,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#35992B",
    marginBottom: 3, // Ajuste para remover a margem inferior
  },

  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardImage: {
    width: 180,
    height: 60,
    resizeMode: "contain",
    marginBottom: 0, // Garante que não haja margem inferior
    paddingBottom: 0, // Remove qualquer padding inferior, se houver
  },
  cardButton: {
    backgroundColor: "#35992B",
    padding: 10,
    borderRadius: 25, // Bordas arredondadas para combinar com o design da imagem
    elevation: 3,
    justifyContent: "center",
    alignItems: "center",
    width: 50, // Largura ajustada para o botão ficar proporcional
    height: 50, // Altura ajustada
  },
  section: {
    marginVertical: 20,
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
  },
  sectionContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionItem: {
    backgroundColor: "#F0F4F7",
    width: 80,
    height: 80,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  gradientItem: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
    backgroundColor: "#35992B",
    opacity: 0.7,
  },
  discoveryCard: {
    width: "100%",
    height: 150,
    backgroundColor: "#E0E0E0",
    borderRadius: 15,
    overflow: "hidden",
    borderBottomColor: "#35992B",
    borderBottomWidth: 40,
  },
});

export default Home;
