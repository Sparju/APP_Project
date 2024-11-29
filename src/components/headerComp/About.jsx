import { useEffect, useState } from "react";
import ReactPreparation from "../../services/reactServices";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; 
const About = () => {
    const [interQues, setInterQues] = useState([]);
    const [expanded, setExpanded] = useState(false); 

    useEffect(() => {
        ReactPreparation.getInterviewQuestions()
            .then((res) => setInterQues(res.data))
            .catch((error) => console.error("Error fetching interview questions:", error));
    }, []); 
    const handleAccordionChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false); 
    };
    return (
        <div>
            <h1>React Interview Questions</h1>
            {interQues.length === 0 ? (
                <p>No questions available</p>
            ) : (
                interQues.map((data, index) => (
                    <Accordion key={index} 
                    expanded={expanded===`panel${index}`}
                    onChange={handleAccordionChange(`panel${index}`)}
                    >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`panel${index}-content`}
                            id={`panel${index}-header`}
                    >
                     {data.question}
                    </AccordionSummary>
                    <AccordionDetails>
                    {data.answer}
                    </AccordionDetails>
                  </Accordion>
                ))
            )}
        </div>
    );
};

export default About;
    