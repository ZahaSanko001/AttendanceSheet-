import { useEffect, useState } from "react";
import { View, Text, FlatList, Button, TextInput } from "react-native";
import { courseStudents } from "../../src/api/attendanceService";

export default function HistoryScreen() {
  const [students, setStudents] = useState([]);
  const [code, setCode] = useState("");

  const loadStudents = async () => {
    try {
      const res = await courseStudents(code);
      setStudents(res);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Enter Course Code"
        value={code}
        onChangeText={setCode}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <Button title="Load Students" onPress={loadStudents} />
      <FlatList
        data={students}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 16 }}>
              {item.name} (ID: {item.studentId})
            </Text>
            <Text>UUID: {item.uuid || "Not bound"}</Text>
          </View>
        )}
      />
    </View>
  );
}
