import { useEffect, useState } from "react";
import { View, Text, FlatList, Button } from "react-native";
import { courseStudents } from "../../src/api/attendanceService";

export default function HistoryScreen() {
  const [students, setStudents] = useState([]);

  const loadStudents = async () => {
    try {
      const res = await courseStudents();
      setStudents(res);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Button title="Refresh" onPress={loadStudents} />
      <FlatList
        data={students}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontSize: 16 }}>
              {item.name} (ID: {item.id})
            </Text>
            <Text>Status: {item.status}</Text>
          </View>
        )}
      />
    </View>
  );
}
