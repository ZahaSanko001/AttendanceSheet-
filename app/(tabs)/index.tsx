import { View, Text, Button } from "react-native";
import { useContext } from "react";
import { AuthContext } from "@/src/contexts/AuthContext";

export default function HomeScreen() {
  const { logout } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20 }}>AttendanceSheet</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  )
}