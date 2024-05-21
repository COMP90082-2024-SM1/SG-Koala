import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";
import Header from "../components/Header/Header";
import Modal from "../components/PopUp/PopUp";

import { useNavigate, useSearchParams } from "react-router-dom";
import { getAllBooking, getAllMiscellaneous } from "../api/DashbaordAPI";
import { getSearchResult } from "../api/SearchAPI";
import { TypographyH3 } from "../components/Typography/Typography";

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatTimeRange(startTimeStr, endTimeStr) {
  const options = { hour: "2-digit", minute: "2-digit", hour12: false };
  const startTime = new Date(startTimeStr);
  const endTime = new Date(endTimeStr);

  const formattedStartTime = startTime.toLocaleTimeString("en-GB", options);
  const formattedEndTime = endTime.toLocaleTimeString("en-GB", options);

  return `${formattedStartTime}-${formattedEndTime}`;
}

const Dashboard = () => {
  const [bookingsData, setBookingsData] = useState({
    all: [],
    upcoming: [],
    completed: [],
    canceled: [],
    pending: [],
  });

  const [activeType, setActiveType] = useState("all");
  const [typeOptions, setTypeOptions] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filterLocation, setFilterLocation] = useState("all");
  const navigate = useNavigate();
  const [locationsList, setLocationsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get("query");

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        let response;
        if (queryParam) {
          response = await getSearchResult(queryParam);
        } else {
          response = await getAllBooking();
        }
        const data = await response.json();

        setBookingsData({
          all: data,
          upcoming: data.filter((booking) => booking.status === "Processing"),
          completed: data.filter((booking) => booking.status === "Delivered"),
          canceled: data.filter((booking) => booking.status === "Canceled"),
          pending: data.filter((booking) => booking.status === "Pending"),
        });
        const uniqueLocations = Array.from(
          new Set(data.map((booking) => booking.location))
        );
        setLocationsList(uniqueLocations);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      }
      setLoading(false);
    };
    const fetchMiscellaneousData = async () => {
      try {
        const response = await getAllMiscellaneous();
        const data = await response;
        const programStreams = data.program_stream.map((stream) => ({
          value: stream,
          label: stream.charAt(0).toUpperCase() + stream.slice(1),
        }));
        setTypeOptions(programStreams);
      } catch (error) {
        console.error("Failed to fetch type options:", error);
      }
    };

    fetchMiscellaneousData();
    fetchBookings();
  }, [searchParams]);

  const getFilteredAndSortedBookings = () => {
    let filteredBookings = bookingsData[activeType];

    if (filterType !== "all") {
      filteredBookings = filteredBookings.filter(
        (booking) => booking.programStream === filterType
      );
    }
    if (filterLocation !== "all") {
      filteredBookings = filteredBookings.filter(
        (booking) => booking.location === filterLocation
      );
    }
    if (startDate) {
      const start = new Date(startDate);
      filteredBookings = filteredBookings.filter((booking) => {
        const bookingStart = new Date(booking.startTime);
        return bookingStart >= start;
      });
    }

    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      filteredBookings = filteredBookings.filter((booking) => {
        const bookingStart = new Date(booking.startTime);
        return bookingStart <= end;
      });
    }

    filteredBookings.sort((a, b) => {
      const dateA = new Date(a.startTime).getTime();
      const dateB = new Date(b.startTime).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    console.log(filteredBookings);
    return filteredBookings;
  };

  function handleNewBooking() {
    navigate("/booking");
  }

  return (
    <>
      <Modal show={loading}>
        <div>Loading...</div>
      </Modal>
      <Header>
        {loading
          ? "Booking Search"
          : queryParam
          ? `Booking - ${queryParam}`
          : "Booking - All"}
      </Header>
      <div className="dashboardFilterSection">
        {["all", "pending", "upcoming", "completed", "canceled"].map(
          (type) => (
            <button
              key={type}
              className={`dashboardFilterBtn ${
                activeType === type ? "dashboard-active" : ""
              }`}
              onClick={() => setActiveType(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          )
        )}
        <button
          className="dashboardNewBookingBtn"
          onClick={() => handleNewBooking()}
        >
          <span className="plus-icon">+</span>
        </button>
      </div>
      <div className="dashboardFilterAndSort">
        <select onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All Types</option>
          {typeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="dashboardDateFilter">
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
        <div className="dashboardLocationFilter">
          <label htmlFor="location">Location: </label>
          <select
            id="location"
            onChange={(e) => setFilterLocation(e.target.value)}
          >
            <option value="all">All Locations</option>
            {locationsList.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          Sort Date {sortOrder === "asc" ? "Ascending" : "Descending"}
        </button>
      </div>
      <div className="dashboardBookingsList">
        <div className="dashboardBookingHeader">
          <div className="dashboardBookingHeader-item">Name</div>
          <div className="dashboardBookingHeader-item">Stream</div>
          <div className="dashboardBookingHeader-item">Date</div>
          <div className="dashboardBookingHeader-item">Location</div>
          <div className="dashboardBookingHeader-item">Status</div>
        </div>
        {getFilteredAndSortedBookings().length > 0 ? (
          getFilteredAndSortedBookings().map((booking, index) => (
            <div
              className="dashboardBookingItem"
              key={index}
              onClick={() => navigate(`/booking/${booking.id}`)}
            >
              <div className="dashboardBookingDetail">{booking.name}</div>
              <div
                className={`dashboard-booking-programStream-${booking.programStream
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
              >
                {booking.programStream}
              </div>
              <div className="dashboardBookingDetail">
                {formatDate(booking.startTime)}
                <span className="dashboardSubTime">
                  {formatTimeRange(booking.startTime, booking.endTime)}
                </span>
              </div>
              <div className="dashboardBookingDetail">{booking.location}</div>
              <div
                className={`dashboardBookingStatus ${booking.status.toLowerCase()}`}
              >
                {booking.status}
              </div>
            </div>
          ))
        ) : (
          <TypographyH3 style={{ textAlign: "center" }}>
            There are no results found.
          </TypographyH3>
        )}
      </div>
    </>
  );
};

export default Dashboard;
