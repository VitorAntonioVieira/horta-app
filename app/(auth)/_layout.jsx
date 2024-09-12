import { Stack } from "expo-router";
import React from "react";

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false,
            presentation: "card",
            animation: "slide_from_left",
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false,
            presentation: "card",
            animation: "slide_from_left",
          }}
        />
        <Stack.Screen
          name="forgot-password"
          options={{
            headerShown: false,
            presentation: "card",
            animation: "slide_from_left",
          }}
        />
      </Stack>
    </>
  );
};

export default AuthLayout;
