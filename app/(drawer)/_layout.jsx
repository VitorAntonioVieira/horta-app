import { Drawer } from "expo-router/drawer";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const DrawerLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen name="(top-tabs)" />
        {/* <Drawer.Screen name="market" />
        <Drawer.Screen name="analysis" /> */}
        <Drawer.Screen name="./perfil" />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;
