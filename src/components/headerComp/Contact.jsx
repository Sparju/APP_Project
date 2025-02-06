import { useEffect, useState } from "react";
import Token from "../../common/Token";

const Contact = () => {
    const [background, setBackground] = useState("");

    useEffect(() => {
        setBackground("")
        const profilePic = Token.getProfilePic();
        if (profilePic) {
            setBackground(profilePic);
        }
    }, []);


    return (
        <div 
        style={{
            backgroundImage: background ? `url(${background})` : "none", 
            height: '100vh', // Full viewport height
            backgroundSize: 'contain', // Ensures the full image is visible without cropping
            backgroundPosition: 'center', // Centers the image in the div
            width: '100%', // Full width
            backgroundRepeat: 'no-repeat', // Prevents repeating the image
            display: 'flex', // Centers content vertically and horizontally
            justifyContent: 'center',
            alignItems: 'center',
            }}
        >
            {/* <p>Contact us</p> */}
        </div>
    );
};

export default Contact;
