import api from "./apiClient";

export const findStudent = async (studentId, code, uuid) => {
    const res = await api.post("/students/find", { studentId, code, uuid });
    return res.data;
};

export const courseStudents = async () => {
    const res = await api.get("/students");
    return res.data;
};