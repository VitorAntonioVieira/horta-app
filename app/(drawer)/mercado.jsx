import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Mercado = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Cabeçalho verde */}
      <View style={styles.header}>
        <View style={styles.headerIcons}>
          <Icon name="bars" size={24} color="#fff" />
          <Icon name="question-circle" size={24} color="#fff" />
        </View>
      </View>

      {/* Título "Mercado" na parte branca */}
      <View style={styles.titleContainer}>
        <Text style={styles.headerTitle}>Mercado</Text>
      </View>
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
    height: 150,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: "hidden",
  },
  headerIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  titleContainer: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -50,
    zIndex: 1,
  },
  headerTitle: {
    color: "#000",
    fontSize: 32,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 10,
  },
});

export default Mercado;
