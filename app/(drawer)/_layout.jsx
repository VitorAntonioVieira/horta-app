import { Drawer } from "expo-router/drawer";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const DrawerLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#35992B'
      }}
      >
        <Drawer.Screen name="(top-tabs)" options={{
          drawerItemStyle: {
            display: 'none'
          }
        }}/>
        <Drawer.Screen name="mercado" options={{
          drawerItemStyle: {
            display: 'none'
          }
        }}/>
        <Drawer.Screen name="perfil" options={{
          title: 'Perfil',
        }}/>
        <Drawer.Screen name="index" options={{
          title: 'Principal',
        }}/>
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;
