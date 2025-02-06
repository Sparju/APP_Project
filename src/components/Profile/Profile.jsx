import { useState, useEffect } from "react";
import StudentServices from "../../services/StudentServices";
import Token from "../../common/Token";

const Profile = ({ onProfileUpdate }) => {
  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    phone: "",
    profilePicture: "",
    id: "", 
  });

  const [imagePreview, setImagePreview] = useState(null);
  const email = Token.getUserEmail();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await StudentServices.getStudents({ email: email });
        const student = response.data[0];
        setStudentData(student);
        setImagePreview(student.profilePicture);
      } catch (error) {
        console.error("Error fetching student data", error);
      }
    };

    fetchStudentData();
  }, [email]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        setStudentData((prevData) => ({
          ...prevData,
          profilePicture: base64Image,
        }));
        setImagePreview(base64Image);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    const { id, ...updatedData } = studentData;

    if (!id) {
      console.error("Student ID is missing");
      return;
    }

    try {
      const updatedStudent = await StudentServices.updateStudents(id, updatedData);
      console.log("Profile updated successfully", updatedStudent);
      // Notify parent component to re-fetch the updated profile picture
      Token.setProfilePic(updatedStudent.profilePicture); // Update in Token
      onProfileUpdate(updatedStudent.profilePicture); // Trigger the update in MainUi
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  return (
    <>
      <h2>Update Profile</h2>
      <form>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={studentData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={studentData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={studentData.phone}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Profile Picture:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <div>
              <img
                src={imagePreview}
                alt="Profile Preview"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            </div>
          )}
        </div>

        <button type="button" onClick={handleUpdate}>
          Update Profile
        </button>
      </form>
    </>
  );
};

export default Profile;
