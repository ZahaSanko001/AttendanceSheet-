import { useState } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { BleManager, fullUUID } from "react-native-ble-plx";
import { findStudent } from "../../src/api/attendanceService";

const manager = new BleManager();

export default function ScanScreen() {
    const [devices, setDevices] = useState([]);
    const [studentId, setStudentId] = useState("");
    const [code, setCode] = useState("");

    const scanDevices = () => {
        setDevices([]);
        manager.startDeviceScan(null, null, (error, devices) => {
            if (error) {
                console.error(error);
                return;
            }
            if (device && !devices.find((d) => d.id === device.id)) {
                setDevices((prev) => [...prev, device]);
            }
        });

        setTimeout(() => {
            manager.stopDeviceScan();
        }, 5000);
    };

    const handleAttendance = async (uuid) => {
        try {
            const res = await findStudent(studentId, code, uuid);
            alert("Student found: " + JSON.stringify(res));
        } catch (e) {
            console.error(e);
            alert("Failed to find student");
        }
    };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Enter Student ID"
        value={studentId}
        onChangeText={setStudentId}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Enter Attendance Code"
        value={code}
        onChangeText={setCode}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <Button title="Scan for devices" onPress={scanDevices} />

      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ margin: 10 }}>
            <Text>{item.name || "Unnamed"} ({item.id})</Text>
            <Button
              title="Mark Attendance"
              onPress={() => handleAttendance(item.id)}
            />
          </View>
        )}
      />
    </View>
  );
}