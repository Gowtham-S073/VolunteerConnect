import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';

export default function AccordionUsage() {
    return (
        
        <div className='SaftyTips_Main_Content' style={{marginLeft:'250px',marginTop:'20px'}}>

            <div style={{fontSize:'40px',fontWeight:'bold',textAlign:'center'}}>          
                <h1>Safety Tips </h1>
            </div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    Learn first aid gestures: How to Prepare a First Aid Kit
                </AccordionSummary>

                <AccordionDetails style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/aK9xrsK7vPg?si=Y8IlT_6P0YWauEWl&autoplay=1&mute=1&amp;start=4"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                    ></iframe>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    Emergency Disaster Kit | Disasters
                </AccordionSummary>

                <AccordionDetails style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/UmiGvOha7As?si=2mKRFqLyT2szaMxJ&autoplay=1&mute=1&amp;start=4"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                    ></iframe>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    Prepare a Family Emergency Plan | Disasters
                </AccordionSummary>

                <AccordionDetails style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/kE3XAwR412I?si=L4zRby3Z0fqcNzSR&autoplay=1&mute=1&amp;start=4"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                    ></iframe>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    Learn first aid gestures: Alerting the Emergency Services
                </AccordionSummary>

                <AccordionDetails style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/3icb_Fci3O8?si=45HK7IBk9AhJgxha&autoplay=1&mute=1&amp;start=4"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                    ></iframe>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    Prepare your Home for a Major Disaster | Disasters

                </AccordionSummary>

                <AccordionDetails style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/qL5Y54o3ny8?si=LFTlULKt_BmL3IgF&autoplay=1&mute=1&amp;start=4"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                    ></iframe>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    How to Prepare in Case of a Terrorist Attack | Disasters
                </AccordionSummary>

                <AccordionDetails style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/hs2prs9xVk8?si=nGKiQuqHQkfwGrkn&autoplay=1&mute=1&amp;start=4"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                    ></iframe>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    How to Prepare for a Hurricane | Disasters
                </AccordionSummary>

                <AccordionDetails style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/xHRbnuB9F1I?si=Iqw3xoVZw8dF7prH&autoplay=1&mute=1&amp;start=4"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                    ></iframe>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    How to Protect Yourself During an Earthquake | Disasters
                </AccordionSummary>

                <AccordionDetails style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/BLEPakj1YTY?si=cOImhAIftYCFcnCJ&autoplay=1&mute=1&amp;start=4"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                    ></iframe>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    How to Prepare for a Flood | Disasters
                </AccordionSummary>

                <AccordionDetails style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/43M5mZuzHF8?si=bKFDfjFZU1GPx9Zy&autoplay=1&mute=1&amp;start=4"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                    ></iframe>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    How to Prepare for a Volcanic Eruption | Disasters
                </AccordionSummary>

                <AccordionDetails style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/Z-w_z9yobpE?si=31txyNMSmSP5hWlx&autoplay=1&mute=1&amp;start=4"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                    ></iframe>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    How to Prepare in Case of a Tsunami | Disasters
                </AccordionSummary>

                <AccordionDetails style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/m7EDddq9ftQ?si=tlJwnWOXumIT0pTX&autoplay=1&mute=1&amp;start=4"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                    ></iframe>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    How to Prepare for a Forest Fire | Disasters

                </AccordionSummary>

                <AccordionDetails style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/_bNLtjHG9dM?si=QgaJ4STF5Fqo-Yyy&autoplay=1&mute=1&amp;start=4"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                    ></iframe>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    How to Prepare for a Heatwave | Disasters
                </AccordionSummary>

                <AccordionDetails style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/kwUMBVO-ar0?si=Ocn6qKHBwwa9gL_M&autoplay=1&mute=1&amp;start=4"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                    ></iframe>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    How to prepare for a cold snap | Disasters
                </AccordionSummary>

                <AccordionDetails style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/OfBCLomnqE0?si=Z10Boi6hAEHsPVjD&autoplay=1&mute=1&amp;start=4"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                    ></iframe>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    How to Prepare in Case of an Avalanche | Disasters
                </AccordionSummary>

                <AccordionDetails style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/8Vq-RkdwArA?si=2eAWkLit03C3ahvm&autoplay=1&mute=1&amp;start=4"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                    ></iframe>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    How to prepare for chemical hazards | Disasters
                </AccordionSummary>

                <AccordionDetails style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/_M8KR2kbXqo?si=op71fvYTrOBdUc-E&autoplay=1&mute=1&amp;start=4"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                    ></iframe>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    What to Do in the Event of a Biohazard | Disasters
                </AccordionSummary>

                <AccordionDetails style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/OPpq46Uw4Ss?si=W_kd-Q5UwkN4T5wL&autoplay=1&mute=1&amp;start=4"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                    ></iframe>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    How to Prepare for a Nuclear Accident | Disasters
                </AccordionSummary>

                <AccordionDetails style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/6i7QbNgzT4A?si=YIF36enYaTJhARet&autoplay=1&mute=1&amp;start=4"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                    ></iframe>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
