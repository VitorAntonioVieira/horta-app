import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated, ScrollView, Dimensions } from "react-native";
import { useNavigation } from "expo-router";
import { images } from '../../constants';
import Icon from "react-native-vector-icons/FontAwesome";
import { getAuth } from "firebase/auth";

const { width } = Dimensions.get("window");

const Home = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const [activeTab, setActiveTab] = useState('home');
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollX = useRef(new Animated.Value(0)).current;

  const curiosidades = [
    { 
      id: '1', 
      texto: 'O Brasil é um dos maiores produtores de café do mundo, com uma produção anual superior a 60 milhões de sacas.', 
      fonte: 'Fonte: CNN Brasil', 
    },
    { 
      id: '2', 
      texto: 'O agronegócio brasileiro responde por aproximadamente 23% do PIB nacional e gera milhões de empregos no país.', 
      fonte: 'Fonte: Notícias Agrícolas', 
    },
    { 
      id: '3', 
      texto: 'Brasil importa fertilizantes para impulsionar a descarbonização do agronegócio.', 
      fonte: 'Fonte: CNN Brasil', 
    },
    { 
      id: '4', 
      texto: 'Plantio de soja chega a 68,36% da área no Brasil, com bons avanços na safra 2023/24.', 
      fonte: 'Fonte: Notícias Agrícolas', 
    },
  ];

  useEffect(() => {
    const fetchUserName = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const fullName = user.displayName || user.email;
        const firstName = fullName.split(" ")[0];
        setUserName(firstName);
      }
    };
    fetchUserName();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % curiosidades.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  useEffect(() => {
    Animated.timing(scrollX, {
      toValue: currentIndex * (width * 0.8),
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerIcons}>
          <Icon name="bars" size={24} color="#fff" onPress={() => navigation.openDrawer()} />
          <Icon name="question-circle" size={24} color="#fff" />
          <TouchableOpacity>
            <Icon name="comments" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.welcomeText}>Bem-vindo(a), {userName}!</Text>
      </View>

      {/* Cartão de novidades */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Cheque as novidades</Text>
        <View style={styles.cardContent}>
          <Image source={images.plants} style={styles.cardImage} />
          <TouchableOpacity style={styles.cardButton}>
            <Icon name="arrow-right" size={24} color="#FFC107" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Seção Descoberta do dia com rolagem automática */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Descoberta do dia</Text>
        <Animated.ScrollView 
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
          contentOffset={{ x: currentIndex * (width * 0.8) }}
        >
          {curiosidades.map((item, index) => (
            <View
              key={item.id}
              style={[styles.discoveryCard, { opacity: currentIndex === index ? 1 : 0.7 }]}
            >
              <Text style={styles.discoveryText}>{item.texto}</Text>
              <View style={styles.sourceBar}>
                <Text style={styles.sourceText}>{item.fonte}</Text>
              </View>
            </View>
          ))}
        </Animated.ScrollView>
      </View>

      {/* Barra de navegação inferior */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={styles.tab} 
          onPress={() => setActiveTab('home')}>
          <Icon name="home" size={activeTab === 'home' ? 30 : 24} color={activeTab === 'home' ? "#FFD700" : "#B0B0B0"} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.tab} 
          onPress={() => setActiveTab('search')}>
          <Icon name="search" size={activeTab === 'search' ? 30 : 24} color={activeTab === 'search' ? "#FFD700" : "#B0B0B0"} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.tab} 
          onPress={() => setActiveTab('book')}>
          <Icon name="book" size={activeTab === 'book' ? 30 : 24} color={activeTab === 'book' ? "#FFD700" : "#B0B0B0"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff" 
  },
  header: { 
    backgroundColor: "#35992B", 
    padding: 20, 
    height: 120, 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center" 
  },
  headerIcons: { 
    flexDirection: "row", 
    width: 80, 
    justifyContent: "space-between" 
  },
  titleContainer: { 
    marginTop: 40, 
    padding: 16, 
    backgroundColor: "#fff", 
    borderRadius: 20 
  },
  welcomeText: { 
    fontSize: 28, 
    fontWeight: "bold", 
    color: "#000" 
  },
  card: { 
    backgroundColor: "#F0F4F7", 
    borderRadius: 12, 
    padding: 15, 
    marginVertical: 20, 
    marginHorizontal: 16, 
    elevation: 3,
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 6,
  },
  cardTitle: { 
    fontSize: 20, 
    fontWeight: "bold", 
    color: "#35992B" 
  },
  cardContent: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center" 
  },
  cardImage: { 
    width: 150, 
    height: 50, 
    resizeMode: "contain" 
  },
  cardButton: { 
    backgroundColor: "#35992B", 
    padding: 10, 
    borderRadius: 25, 
    width: 50, 
    height: 50, 
    alignItems: "center", 
    justifyContent: "center", 
    elevation: 3 
  },
  section: { 
    marginVertical: 20, 
    marginHorizontal: 16 
  },
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: "bold", 
    color: "#35992B", 
    marginBottom: 10 
  },
  discoveryCard: {
    backgroundColor: "#fff",
    padding: 20,  // Ajustando o padding para dar mais espaço
    borderRadius: 10,
    width: width * 0.8,
    marginRight: 10,
    marginBottom: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    height: 130,
    justifyContent: "space-between",
  },
  
  discoveryText: {
    fontSize: 14,
    color: "#444",
    marginBottom: 5, // Adicionando espaço extra na parte inferior do texto
  },
  
  
  sourceBar: {
    position: "absolute",
    bottom: 0,
    left: 10,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 25,
  },
  sourceText: {
    fontSize: 12,
    color: "#fff",
  },
  scrollView: {
    flexDirection: "row",
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  tab: {
    padding: 10,
  },
});

export default Home;
