import React, { useState, useRef, useEffect } from 'react';
import { Calendar as RsuiteCalendar, Badge, Whisper, Popover } from 'rsuite';
import { getAllBooking } from "../api/DashbaordAPI";
import Header from "../components/Header/Header";
import "../styles/Calendar.css";
import 'rsuite/Calendar/styles/index.css';


function formatTimeRange(startTimeStr) {
    try {
        const options = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC' };
        const startTime = new Date(startTimeStr);
        //const endTime = new Date(endTimeStr);

        const formattedStartTime = startTime.toLocaleTimeString("en-AU", options);
        //const formattedEndTime = endTime.toLocaleTimeString("en-AU", options);

        return `${formattedStartTime}`;
    } catch (error) {
        console.error("Error formatting time range:", error);
        return "Time formatting error"; 
    }
}

function Calendar() {
    const [popoverStates, setPopoverStates] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [events, setEvents] = useState({});
    const popoverRefs = useRef({});

    useEffect(() => {
        async function fetchEvents() {
            setIsLoading(true);
            try {
                const response = await getAllBooking();
                const data = await response.json();
                //console.log("Fetched data size:", data.length);
                const formattedEvents = data.reduce((acc, item) => {
                    if (!item.date) {
                        console.error("Missing date for item:", item);
                        return acc;
                    }
                    const dateKey = new Date(item.date).toISOString().slice(0, 10);
                    if (!acc[dateKey]) {
                        acc[dateKey] = [];
                    }
                    //console.log("Start:", item.startTime)
                    //console.log("End:", item.endTime)
                    acc[dateKey].push({
                        time: formatTimeRange(item.startTime), 
                        title: item.name || "No Name",
                        id: item.id
                        //title: item.name + ' - ' + item.location 
                    });
                    //console.log(`Date ${dateKey} has ${acc[dateKey].length} events`);
                    return acc;
                }, {});
                setEvents(formattedEvents);
                //console.log("Original data length:", data.length);
                //console.log("Events object:", formattedEvents);
                //console.log("Processed events size:", Object.keys(formattedEvents).length);
            } catch (error) {
                console.error("Failed to fetch bookings:", error);
            }
            setIsLoading(false);
        }

        fetchEvents();

        function handleClickOutside(event) {
            Object.keys(popoverRefs.current).forEach(date => {
                if (popoverRefs.current[date] && !popoverRefs.current[date].contains(event.target)) {
                    handleClosePopover(date);
                }
            });
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleMoreClick = (event, date) => {
        event.stopPropagation();
        const { clientX, clientY } = event;
        setPopoverStates({
            ...popoverStates,
            [date]: {
                visible: true,
                style: {
                    left: `${clientX}px`,
                    top: `${clientY}px`,
                    zIndex: 1050
                }
            }
        });
    };

    const handleClosePopover = () => {
        const newPopoverStates = Object.keys(popoverStates).reduce((acc, date) => {
            acc[date] = { ...popoverStates[date], visible: false };
            return acc;
        }, {});

        setPopoverStates(newPopoverStates);
    };

    const renderCell = (date) => {
        const dateString = date.toISOString().slice(0, 10);
        const list = events[dateString] || [];
        const displayList = list.filter((item, index) => index < 2);

        if (list.length) {
            const moreCount = list.length - displayList.length;
            return (
                <ul className="calendar-todo-list">
                    {displayList.map((item, index) => (
                        <li key={index} style={{ display: 'flex', flexDirection:'row', justifyContent: 'space-between', width: '100%', padding: '0 5px', backgroundColor: '#cbe3ff', margin: '3px 0', borderRadius: '10px' }}>
                            <span style={{ textAlign: 'start' }}><Badge /> <a href={`/booking/${item.id}/`} target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}><b>{item.title}</b></a></span>
                            {item.time}
                        </li>

                    ))}
                    {moreCount > 0 && (
                        <li>
                            <button onClick={(e) => handleMoreClick(e, dateString)} className="btn-showMore">{moreCount} more</button>
                            {popoverStates[dateString]?.visible && (
                                <Popover style={popoverStates[dateString].style} onClose={() => handleClosePopover(dateString)}
                                    ref={el => popoverRefs.current[dateString] = el}>
                                    {list.map((item, index) => (
                                        <p key={index}>
                                            <b><a href={`/booking/${item.id}/`} target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}>{item.title}</a> </b>{item.time}
                                        </p>
                                    ))}
                                </Popover>
                            )}
                        </li>
                    )}
                </ul>
            );
        }
        return null;
    };

    return (
        <>
            <Header>Calendar</Header>
            <div>
                <RsuiteCalendar bordered cellClassName={date => (date.getDay() % 2 ? 'bg-gray' : undefined)} renderCell={renderCell} />
            </div>
        </>
    );
}

export default Calendar;
