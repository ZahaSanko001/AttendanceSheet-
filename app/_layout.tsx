import { Stack } from "expo-router";
import { AuthProvider, AuthContext } from "../src/contexts/AuthContext";
import { useContext } from "react";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Navigator />
    </AuthProvider>
  )
}

function Navigator() {
  const { userToken } = useContext(AuthContext);

  return (
    <Stack screenOptions={{ headerShown: false}}>
      {userToken ? (
        <Stack.Screen name="(tabs)" />
      ) : (
        <Stack.Screen name="(auth)" />
      )}
    </Stack>
  )
}