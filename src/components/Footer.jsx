import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";

const Footer = () => {
    const loc = useLocation();
    console.log("location Footer ", loc.pathname.replace("/", ""));
    const path = loc.pathname.replace("/", "");

    // Correctly define renderField function
    const renderField = () => {
        switch (path) {
            case "dashboard":
                return (
                    <>
                        <p>hello</p>
                    </>
                );
            case "mainpage":
                return (
                    <>
                        <p>Main Page</p>
                    </>
                );
            case "Contact":
                return (
                    <>
                        <p>Contact Page</p>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <>
            {renderField()} {/* Call the function correctly */}
            {/* <Box>
                <p>footer</p>
            </Box> */}
        </>
    );
};

export default Footer;
