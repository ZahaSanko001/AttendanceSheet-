import api from "./apiClient";
import qs from "qs";

export const findStudent = async (studentId, code, uuid) => {
    const res = await api.get("/students/find", { 
        params: { studentId, code, uuid },
    });
    return res.data;
};

export const verifyStudents = async (code, uuids) => {
    const res = await api.get("/students/verify", {
        params: { code, uuids },
        paramsSerializer: (params) => {
            return qs.stringify(params, { arrayFormat: "repeat" });
        },
    });
    return res.data;
}

export const courseStudents = async (code) => {
    const res = await api.get("/students", { params: { code }});
    return res.data;
};

export const createStudent = async (student) => {
    const res = await api.post("/students", student);
    return res.data;
};
