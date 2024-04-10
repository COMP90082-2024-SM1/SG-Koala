import React, { useState } from "react";
import "../styles/Dashboard.css";
import Header from "../components/Header/Header";


function formatDate(dateStr) {
  const [time, date] = dateStr.split(" ");
  const dateParts = date.split("/");
  const newDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    weekday: "short",
  }).format(newDate);
  return formattedDate;
}

const Dashboard = () => {
  const [activeType, setActiveType] = useState("upcoming");
  const [filterType, setFilterType] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filterLocation, setFilterLocation] = useState("all");

  const bookingsData = {
    upcoming: [
      {
        name: "MGC",
        type: "workshop1",
        time: "8:00-9:00 23/03/2021",
        location: "Room1",
        status: "Pending",
      },
      {
        name: "UBC",
        type: "workshop2",
        time: "8:00-9:00 23/04/2021",
        location: "Room3",
        status: "Pending",
      },
      {
        name: "GWSC",
        type: "workshop4",
        time: "8:00-9:00 23/05/2021",
        location: "Room1",
        status: "Pending",
      },
      {
        name: "MTC",
        type: "workshop3",
        time: "8:00-9:00 23/06/2021",
        location: "Room3",
        status: "Pending",
      },
      {
        name: "MIT",
        type: "workshop1",
        time: "8:00-9:00 23/07/2021",
        location: "Room1",
        status: "Pending",
      },
      {
        name: "RMIT",
        type: "workshop5",
        time: "8:00-9:00 23/08/2021",
        location: "Room3",
        status: "Pending",
      },
    ],
    completed: [
      {
        name: "Meeting with John",
        type: "workshop1",
        time: "8:00-10:00 23/03/2021",
        location: "Room2",
        status: "Confirmed",
      },
      {
        name: "My Hotel",
        type: "workshop2",
        time: "8:00-9:00 23/05/2021",
        location: "Room5",
        status: "Confirmed",
      },
    ],
    cancelled: [
      {
        name: "Meeting with John",
        type: "workshop1",
        time: "8:00-9:00 23/03/2021",
        location: "Room2",
        status: "Cancelled",
      },
      {
        name: "My Hotel",
        type: "workshop2",
        time: "8:00-9:00 23/03/2021",
        location: "Room5",
        status: "Cancelled",
      },
      {
        name: "Meeting with John",
        type: "workshop3",
        time: "8:00-9:00 23/03/2021",
        location: "Room2",
        status: "Cancelled",
      },
      {
        name: "My Hotel",
        type: "workshop1",
        time: "8:00-9:00 23/03/2021",
        location: "Room5",
        status: "Cancelled",
      },
    ],
  };

  const getFilteredAndSortedBookings = () => {
    let filteredBookings = [...bookingsData[activeType]];
    if (filterType !== "all") {
      filteredBookings = filteredBookings.filter(
        (booking) => booking.type === filterType
      );
    }
    if (filterLocation !== "all") {
      filteredBookings = filteredBookings.filter(
        (booking) => booking.location === filterLocation
      );
    }

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      filteredBookings = filteredBookings.filter((booking) => {
        const bookingDate = new Date(
          booking.time.split(" ")[1].split("/").reverse().join("-")
        );
        return bookingDate >= start && bookingDate <= end;
      });
    }

    filteredBookings.sort((a, b) => {
      const dateA = new Date(
        a.time.split(" ")[1].split("/").reverse().join("-")
      );
      const dateB = new Date(
        b.time.split(" ")[1].split("/").reverse().join("-")
      );
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    return filteredBookings;
  };

  return (
    <div className="dashboard-dashboard">
      <div className="dashboard-dashboard-header">
      <Header> Booking </Header>
        
      </div>
      <hr className="dashboard-divider" />
      
      <div className="dashboard-filter-section">
        
        {Object.keys(bookingsData).map(type => (
          <button 
            key={type}
            className={`dashboard-filter-btn ${activeType === type ? 'dashboard-active' : ''}`}
            onClick={() => setActiveType(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
        
      </div>
      <div className="dashboard-filter-and-sort">
        <select onChange={e => setFilterType(e.target.value)}>
          <option value="all">All Types</option>
          <option value="workshop1">Workshop 1</option>
          <option value="workshop2">Workshop 2</option>
          <option value="workshop3">Workshop 3</option>
        </select>
        <div className="dashboard-date-filter">
          <label htmlFor="start-date">From: </label>
          <input
            id="start-date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <label htmlFor="end-date">To: </label>
          <input
            id="end-date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="dashboard-location-filter">
        <label htmlFor="location">Location: </label>
        <select id="location" onChange={(e) => setFilterLocation(e.target.value)}>
          <option value="all">All Locations</option>
          <option value="Room1">Room1</option>
          <option value="Room2">Room2</option>
          <option value="Room3">Room3</option>
        </select>
      </div>
        
        <button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
          Sort Date {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        </button>
      </div>
      <div className="dashboard-bookings-list">
      <div className="dashboard-booking-header">
          <div className="dashboard-booking-header-item">Organisation Name</div>
          <div className="dashboard-booking-header-item">Type</div>
          <div className="dashboard-booking-header-item">Date</div>
          <div className="dashboard-booking-header-item">Location</div>
          <div className="dashboard-booking-header-item">Status</div>
        </div>
        {getFilteredAndSortedBookings().map((booking, index) => (
          <div className="dashboard-booking-item" key={index}>
            <div className="dashboard-booking-detail">{booking.name}</div>
            <div className={`dashboard-booking-type-${booking.type.toLowerCase().replace(/\s+/g, '-')}`}>{booking.type}</div>
            <div className="dashboard-booking-detail">
                <span>{formatDate(booking.time)}</span>
                <span className="dashboard-sub-time">{booking.time.split(' ')[0]}</span>
              </div>
            <div className="dashboard-booking-detail">{booking.location}</div>
            <div className={`dashboard-booking-status ${booking.status.toLowerCase()}`}>
              {booking.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;