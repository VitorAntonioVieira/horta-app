import { useNavigation } from "expo-router";
import { getAuth } from "firebase/auth";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { images } from "../../constants";

const { width } = Dimensions.get("window");

const Home = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const [activeTab, setActiveTab] = useState("home");
  const [currentIndex, setCurrentIndex] = useState(0);

  const flatListRef = useRef(null);

  const curiosidades = [
    {
      id: "1",
      texto:
        "O Brasil é um dos maiores produtores de café, com uma produção de 60 milhões de sacas.",
      fonte: "Fonte: CNN Brasil",
    },
    {
      id: "2",
      texto:
        "O agronegócio brasileiro responde por aproximadamente 23% do PIB nacional.",
      fonte: "Fonte: Notícias Agrícolas",
    },
    {
      id: "3",
      texto:
        "Brasil importa fertilizantes para impulsionar a descarbonização do agronegócio.",
      fonte: "Fonte: CNN Brasil",
    },
    {
      id: "4",
      texto:
        "Plantio de soja chega a 68,36% da área no Brasil, com bons avanços na safra 2023/24.",
      fonte: "Fonte: Notícias Agrícolas",
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

  const renderItem = ({ item, index }) => (
    <View
      style={[
        styles.discoveryCard,
        {
          marginLeft: index === 0 ? 0 : 30,
          marginRight: index === curiosidades.length - 1 ? 30 : 0, // Adiciona margem direita no último card
          opacity: currentIndex === index ? 1 : 0.7,
        },
      ]}
    >
      <Text style={styles.discoveryText}>{item.texto}</Text>
      <View style={styles.sourceBar}>
        <Text style={styles.sourceText}>{item.fonte}</Text>
      </View>
    </View>
  );

  const getItemLayout = (data, index) => ({
    length: width * 0.8,
    offset: width * 0.8 * index,
    index,
  });

  const onScrollToIndexFailed = (error) => {
    const contentOffsetX = error.averageItemLength * error.index;
    flatListRef.current?.scrollToOffset({
      offset: contentOffsetX,
      animated: true,
    });
  };

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / (width * 0.8));
    setCurrentIndex(index);
  };

  const handleViewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerIconsLeft}>
          <Icon
            name="bars"
            size={24}
            color="#fff"
            onPress={() => navigation.openDrawer()}
          />
        </View>
        <View style={styles.headerIconsRight}>
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

      {/* Título Saiba Mais */}
      <Text style={styles.sectionTitle2}>Saiba Mais</Text>

      {/* Botões abaixo do Saiba Mais */}
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          accessible={true}
          accessibilityLabel="Mais sobre plantas"
        >
          <Icon name="leaf" size={24} color="#FFC107" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          accessible={true}
          accessibilityLabel="Mais sobre maçãs"
        >
          <Icon name="apple" size={24} color="#FFC107" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          accessible={true}
          accessibilityLabel="Mais sobre árvores"
        >
          <Icon name="tree" size={24} color="#FFC107" />
        </TouchableOpacity>
      </View>

      {/* Seção Descoberta do dia */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Descoberta do dia</Text>
        <FlatList
          ref={flatListRef}
          data={curiosidades}
          horizontal
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          getItemLayout={getItemLayout}
          onScrollToIndexFailed={onScrollToIndexFailed}
          onScroll={handleScroll}
          onViewableItemsChanged={handleViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          contentContainerStyle={{ paddingLeft: 30 }} // Aumentando margem à esquerda no FlatList
        />
      </View>

      {/* Barra de navegação inferior */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => setActiveTab("home")}
        >
          <Icon
            name="home"
            size={activeTab === "home" ? 30 : 24}
            color={activeTab === "home" ? "#FFD700" : "#B0B0B0"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => setActiveTab("search")}
        >
          <Icon
            name="search"
            size={activeTab === "search" ? 30 : 24}
            color={activeTab === "search" ? "#FFD700" : "#B0B0B0"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => setActiveTab("book")}
        >
          <Icon
            name="book"
            size={activeTab === "book" ? 30 : 24}
            color={activeTab === "book" ? "#FFD700" : "#B0B0B0"}
          />
        </TouchableOpacity>
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
    padding: 20,
    height: 120,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerIconsLeft: {
    width: 40, // Adiciona largura fixa para alinhar corretamente
  },
  headerIconsRight: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 80,
  },
  titleContainer: {
    marginTop: 40,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    textAlign: "left",
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
    color: "#35992B",
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardImage: {
    width: 150,
    height: 50,
    resizeMode: "contain",
  },
  cardButton: {
    backgroundColor: "#35992B",
    padding: 10,
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 15,
    textAlign: "left",
    marginLeft: 15,
    marginTop: 10,
  },
  sectionTitle2: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginTop: 5,
    textAlign: "left",
    marginLeft: 15,
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#35992B",
    padding: 16,
    borderRadius: 10,
  },
  discoveryCard: {
    backgroundColor: "#fff",
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: width * 0.8,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  discoveryText: {
    fontSize: 14,
    textAlign: "center",
    color: "#000",
  },
  sourceBar: {
    marginTop: 15,
    alignSelf: "flex-end",
  },
  sourceText: {
    fontSize: 12,
    color: "#B0B0B0",
  },
  tabsContainer: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Home;
