import { View, Text, Button } from "react-native";
import { useContext } from "react";
import { AuthContext } from "@/src/contexts/AuthContext";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const { logout } = useContext(AuthContext);
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>AttendanceSheet</Text>

      <View style={{ flexDirection: "row", justifyContent: "center", marginBottom: 20 }}>
        <View style={{ marginHorizontal: 10 }}>
          <Button title="Teacher" onPress={() => router.push("/(auth)/TeacherLogin")} />
        </View>
        <View style={{ marginHorizontal: 10 }}>
          <Button title="Student" onPress={() => router.push("/(auth)/StudentLogin")} />
        </View>
      </View>

      <Button title="Logout" onPress={logout} />
    </View>
  );
}