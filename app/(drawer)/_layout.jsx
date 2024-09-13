import { Stack } from "expo-router";
import { Drawer } from "expo-router/drawer";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const DrawerLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: false
        }}
      >
        <Drawer.Screen name="(top-tabs)" />
        {/* <Drawer.Screen name="market" />
        <Drawer.Screen name="analysis" /> */}
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;