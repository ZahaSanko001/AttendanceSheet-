/* import { useState } from "react";
import { View, Text, Button, FlatList, TextInput, Alert } from "react-native";
import { BleManager } from "react-native-ble-plx";
import { verifyStudents } from "../../src/api/attendanceService";

const manager = new BleManager();

export default function ScanScreen() {
    const [devices, setDevices] = useState([]);
    const [validStudents, setValidStudents] = useState([]);
    const [code, setCode] = useState("");
    const [scanning, setScanning] = useState(false);

    const scanDevices = () => {
      if (!code.trim()) {
        Alert.alert("Missing Info", "Please enter the course code first.");
        return;
      }

      setDevices([]);
      setValidStudents([]);
      setScanning(true);

      manager.startDeviceScan(null, null, (error, device) => {
        if (error) {
          console.error("BLE Scan Error:", error);
          Alert.alert("Error", "Could not start scanning for devices.");
          setScanning(false);
          return;
        }

        if (device && !devices.find((d) => d.id === device.id)) {
          setDevices((prev) => [...prev, device]);
        }
      });

      setTimeout(async () => {
        manager.stopDeviceScan();
        setScanning(false);
        console.log("Scan complete. Verifying students...");

        if (devices.length > 0) {
          await filterValidStudents(devices);
        }
      }, 5000);
    };

    const filterValidStudents = async () => {
      try {
        const uuids = devices.map((d) => d.id);
        if (uuids.length === 0) {
          Alert.alert("No Devices", "No devices found during scan.");
          return;
        }

        const result = await verifyStudents(code, uuids);
        setValidStudents(result);

        if (result.length === 0) {
          Alert.alert("No Valid Students", "No valid students found for this course.");
        } else {
          Alert.alert("Scan Complete", `${result.length} valid students found.`);
        }
      } catch (e) {
        console.error("Verification Error:", e);
        Alert.alert("Error", "Failed to verify scanned students.");
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

        <Button title={scanning ? "Scanning..." : "Scan for Devices"} onPress={scanDevices} disabled={scanning} />

        <Text style={{ marginTop: 20, fontWeight: "bold" }}>Detected Devices ({devices.length}):</Text>
        <FlatList
          data={devices}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={{ margin: 10 }}>
              <Text>{item.name || "Unnamed"} ({item.id})</Text>
            </View>
          )}
        />

        <Text style={{ marginTop: 20, fontWeight: "bold" }}>Valid Students ({validStudents.length}):</Text>
        <FlatList
          data={validStudents}
          keyExtractor={(item) => item.uuid}
          renderItem={({ item }) => (
            <View style={{ margin: 10, backgroundColor: "#e0f7fa", padding: 10, borderRadius: 8 }}>
              <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
              <Text>ID: {item.studentId}</Text>
              <Text>UUID: {item.uuid}</Text>
            </View>
          )}
        />
      </View>
  );
}
 */