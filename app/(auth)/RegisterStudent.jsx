import React, {useState} from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStudent } from "../../src/api/attendanceService";

export default function RegisterStudent() {
    const [studentId, setStudentId] = useState("");
    const [name, setName] = useState("");
    const [courseCode, setCourseCode] = useState("");

    const handleRegister = async () => {
        if (!studentId || !name || !courseCode) {
            Alert.alert("Missing Info", "Please fill all fields.");
            return;
        }

        try {
            const newStudent = {
                studentId,
                name,
                course: { code: courseCode },
            };
            
            const saved = await createStudent(newStudent);

            await AsyncStorage.setItem("student_uuid", saved.uuid);
            Alert.alert("Success", `Student registered with UUID: ${saved.uuid}`);

            setStudentId("");
            setName("");
            setCourseCode("");
        } catch (e) {
            console.error("Error registering student:", e);
            Alert.alert("Error", "Failed to register student.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Student Registration</Text>

            <TextInput
                style={styles.input}
                placeholder="Student ID"
                value={studentId}
                onChangeText={setStudentId}
            />

            <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={styles.input}
                placeholder="Course Code"
                value={courseCode}
                onChangeText={setCourseCode}
            />

            <Button title="Register Student" onPress={handleRegister} />
        </View>

    );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 15 },
});