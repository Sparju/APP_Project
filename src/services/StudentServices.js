import http from "../common/Http"
const getAllStudents=()=>{
    return http.get("/students")
}
//node server with mongoDB data fetching
const getAllUsers=()=>{
    return http.get("/api/users")
}

const getStudents = (params) => {
    return http.get('/students', {
        params: { email: params.email }  // Passing email as query parameter
    });
};
const createStudentData = data => {
    return http.post("/students", data);
};
const updateStudents = async (id, data) => {
    try {
      const response = await http.put(`/students/${id}`, data);  // Send PUT request
      return response.data;  // Return the response data (updated student info)
    } catch (error) {
      console.error("Error updating student data", error);
      throw error;  // Propagate the error
    }
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
    removeAllStudents,
    getAllUsers
};
export default StudentServices;

