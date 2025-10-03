import api from "./apiClient";

export const findStudent = async (studentId, code, uuid) => {
    const res = await api.post("/students/find", { 
        param: { studentId, code, uuid },
    });
    return res.data;
};

export const courseStudents = async () => {
    const res = await api.get("/students", { params: { code }});
    return res.data;
};

export const createStudent = async (student) => {
    const res = await api.post("/students", student);
    return res.data;
};
