import { Stack } from "expo-router";

export default function AuthLayout() {
    return (
        <Stack>
            <Stack.Screen name="TeacherLogin" options={{ title: "Login" }} />
            <Stack.Screen name="RegisterTeacher" options={{ title: "Register" }} />
            <Stack.Screen name="StudentLogin" options={{ title: "Login" }} />
            <Stack.Screen name="RegisterStudent" options={{ title: "Register-Student" }} />
        </Stack>
    )
}