import { useEffect, useState } from "react";
import ReactPreparation from "../../services/reactServices";
import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, styled } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from "react-router-dom";

const GridHolder = styled(Grid)(({ theme }) => ({
    marginTop: '0px !important',
}));

const Topics = () => {
    const [topics, setTopics] = useState([]);
    const [interQues, setInterQues] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate(); 

    useEffect(() => {
        ReactPreparation.getTopics()
            .then((res) => setTopics(res.data))
            .catch((error) => console.error("Error fetching topics:", error));
    }, []);

    useEffect(() => {
        ReactPreparation.getInterviewQuestions()
            .then((res) => setInterQues(res.data))
            .catch((error) => console.error("Error fetching interview questions:", error));
    }, []);

    // Combine topics and interview questions into a single array
    const combinedData = [
        { title: 'Topics', items: topics, type: 'topic' },
        { title: 'Interview Questions', items: interQues, type: 'question' },
    ];

    const handleAccordionChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <GridHolder container >
            <h1 className="subHead">React</h1>
            <Grid item sm={12} textAlign={"end"}>
            <Button color="primary" variant="contained" onClick={()=>navigate("/createTopic")}> create Topics</Button><br/>
            </Grid>
            {console.log(combinedData)}
            {combinedData.map((section, index) => (
                <Grid item sm={6} key={index} p={1}>
                    <h2>{section.title}</h2>
                    {section.items.length === 0 ? (
                        <p>No {section.title} available</p>
                    ) : (
                        section.items.map((data, idx) => (
                            
                            <Accordion
                                key={idx}
                                expanded={expanded === `${section.type}-panel${idx}`}
                                onChange={handleAccordionChange(`${section.type}-panel${idx}`)}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`${section.type}-panel${idx}-content`}
                                    id={`${section.type}-panel${idx}-header`}
                                >
                                    {section.type === 'topic' ? data.topic : data.question}
                                </AccordionSummary>
                                <AccordionDetails>
                                    {section.type === 'topic' ? data.description : data.answer}
                                </AccordionDetails>
                            </Accordion>
                        ))
                    )}
                </Grid>
            ))}
        </GridHolder>
    );
};

export default Topics;
