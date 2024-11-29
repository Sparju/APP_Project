import { useEffect, useState } from "react";
import ReactPreparation from "../../services/reactServices";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Contact = () => {
    const [topics, setTopics] = useState([]);
    const [expanded, setExpanded] = useState(false); 

    useEffect(() => {
        ReactPreparation.getTopics()
            .then((res) => setTopics(res.data))
            .catch((error) => console.error("Error fetching interview questions:", error));
    }, []);

    const handleAccordionChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false); 
    };

    return (
        <div>
            <h1>React Interview Questions</h1>
            {topics.length === 0 ? (
                <p>No topics available</p>
            ) : (
                topics.map((data, index) => (
                    <Accordion
                        key={index}
                        expanded={expanded === `panel${index}`} 
                        onChange={handleAccordionChange(`panel${index}`)} 
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel${index}-content`}
                            id={`panel${index}-header`}
                        >
                            {data.topic}
                        </AccordionSummary>
                        <AccordionDetails>
                            <p>{data.description}</p>
                        </AccordionDetails>
                    </Accordion>
                ))
            )}
        </div>
    );
};

export default Contact;
