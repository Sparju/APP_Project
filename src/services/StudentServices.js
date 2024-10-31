import http from "../common/Http"
const getAllStudents=()=>{
    return http.get("/students")
}

const getStudents = (params) => {
    return http.get('/students', {
        params: { email: params.email }  // Passing email as query parameter
    });
};
const createStudentData = data => {
    return http.post("/students", data);
};
const updateStudents = (id, data) => {
    return http.put(`/students/${id}`, data);
};
const removeStudent = id => {
    return http.delete(`/students/${id}`);
};
const removeAllStudents = () => {
    return http.delete(`/students`);
};


const StudentServices = {
    getAllStudents,
    getStudents,
    createStudentData,
    updateStudents,
    removeStudent,
    removeAllStudents
};
export default StudentServices;

