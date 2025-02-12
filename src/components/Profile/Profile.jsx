import { useState, useEffect } from "react";
import StudentServices from "../../services/StudentServices";
import Token from "../../common/Token";
import { Modal, Box, Button, Typography } from "@mui/material";

const Profile = ({ onProfileUpdate }) => {
  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    phone: "",
    profilePicture: "",
    id: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [updatedImage, setUpdatedImage] = useState(null);
  const email = Token.getUserEmail();
  
  // Set the default profile picture from Token
  const defaultProfilePic = Token.getProfilePic() || "/default-profile.png";

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await StudentServices.getStudents({ email: email });
        const student = response.data[0];
        setStudentData(student);
        setImagePreview(student.profilePicture || defaultProfilePic); // Fallback to default if no picture
      } catch (error) {
        console.error("Error fetching student data", error);
      }
    };

    fetchStudentData();
  }, [email, defaultProfilePic]);

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
        setUpdatedImage(base64Image);
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
      Token.setProfilePic(updatedStudent.profilePicture); // Update in Token
      onProfileUpdate(updatedStudent.profilePicture); // Trigger the update in MainUi
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  const handleImageClick = () => {
    setShowImageModal(true);
  };

  const handleCloseModal = () => {
    setShowImageModal(false);
  };

  return (
    <>
      <h2>Update Profile</h2>
      <form className="form">
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
  <div style={{ display: "flex", alignItems: "center" }}>
    {/* Profile Image */}
    <img
      src={imagePreview}
      alt="Profile Preview"
      style={{
        width: "100px",
        height: "100px",
        objectFit: "cover",
        cursor: "pointer",
        marginRight: "10px", // Space between the image and the input
      }}
      onClick={handleImageClick} // Open modal when clicked
    />
    
    {/* File Input */}
    <input
      type="file"
      accept="image/*"
      onChange={handleImageChange}
      style={{ marginTop: "0", cursor: "pointer" }} // Align input with image
    />
  </div>
</div>
<div style={{textAlign:"center"}}>

        <Button onClick={handleUpdate} color="primary" variant="contained" >update Profile</Button>
</div>

      </form>

      {/* Modal to View and Edit Profile Picture (MUI Modal) */}
      <Modal
        open={showImageModal}
        onClose={handleCloseModal}
        aria-labelledby="profile-picture-modal-title"
        aria-describedby="profile-picture-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            maxWidth: "400px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <Typography id="profile-picture-modal-title" variant="h6" component="h2">
            Profile Picture
          </Typography>
          <Box sx={{ marginTop: "20px" }}>
            <img
              src={updatedImage || imagePreview || defaultProfilePic}
              alt="Profile"
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
            />
          </Box>
          <div style={{ marginTop: "20px" }}>
            <label>Upload New Profile Picture:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <Box sx={{ marginTop: "20px" }}>
            <Button variant="contained" color="primary" onClick={handleCloseModal}>
              Save Changes
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCloseModal} sx={{ marginLeft: "10px" }}>
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Profile;
