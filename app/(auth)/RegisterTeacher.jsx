import React, { use, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { register } from "../../src/api/authService";

export default function RegisterTeacher() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [passphrase, setPassphrase] = useState("");

    const handleRegister = async () => {
        if (!name || !email || !passphrase) {
            Alert.alert("Missing Info", "Please fill all fields.");
            return;
        }

        try {
            const newTeacher = { name, email, passphrase };
            const saved = await register(newTeacher);
            Alert.alert("Success", `Teacher registered with ID: ${saved.id}`);

            setName("");
            setEmail("");
            setPassphrase("");
        } catch (e) {
            console.error("Error registering teacher:", e);
            Alert.alert("Error", "Failed to register teacher.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Teacher Registration</Text>

            <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <TextInput
                style={styles.input}
                placeholder="Passphrase"
                value={passphrase}
                onChangeText={setPassphrase}
                secureTextEntry
            />

            <Button title="Register Teacher" onPress={handleRegister} />
        </View>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 15 },
});