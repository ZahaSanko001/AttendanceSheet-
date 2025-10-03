import { useState } from "react";
import { View, Text, Button, FlatList, TextInput, Alert } from "react-native";
import { BleManager } from "react-native-ble-plx";
import { findStudent } from "../../src/api/attendanceService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const manager = new BleManager();

export default function ScanScreen() {
    const [devices, setDevices] = useState([]);
    const [studentId, setStudentId] = useState("");
    const [code, setCode] = useState("");

    const scanDevices = () => {
      setDevices([]);
      manager.startDeviceScan(null, null, (error, device) => {
        if (error) {
          console.error("BLE Scan Error:", error);
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

    const handleAttendance = async () => {
      try {
        const uuid = await AsyncStorage.getItem("student_uuid");
        if (!uuid) {
          Alert.alert("Not Registered", "Please register this student first.");
          return;
        }

        const student = await findStudent(studentId, code, uuid);
        if (student) {
          Alert.alert("Success", `Attendance marked for ${student.name}`);
        } else {
          Alert.alert("Error", "Student not found or UUID mismatch.");
        }
      } catch (e) {
        console.error("Attendance error:", e);
        Alert.alert("Error", "Could not verify student.");
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
          placeholder="Enter Course Code"
          value={code}
          onChangeText={setCode}
          style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
        />

        <Button title="Scan for Devices" onPress={scanDevices} />

        <FlatList
          data={devices}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ margin: 10 }}>
              <Text>{item.name || "Unnamed"} ({item.id})</Text>
            </View>
          )}
        />

        <Button title="Mark Attendance" onPress={handleAttendance} />
      </View>
    );
}
