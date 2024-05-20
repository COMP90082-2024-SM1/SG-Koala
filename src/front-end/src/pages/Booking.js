import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import CreatableSelect from "react-select/creatable";
import Modal from "../components/PopUp/PopUp";

import "../styles/Booking.css";
import {
  getAllTemplates,
  getAllMiscellaneous,
  getAllSchool,
  createNewBooking,
  createNewSchool,
  createNewChecklist,
  getBookingById,
  updateMiscellaneous,
  updateBooking,
  updateSchoolById,
  DeleteSchoolById,
  DeleteCheckListById,
  deleteBooking,
} from "../api/BookingAPI";
import { Button } from "../components/Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import TemplateDetail from "./TemplateDetail";

const NewBooking = ({ isNew = false }) => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("Delivery");

  const { bookingId } = useParams();
  // const [oneBooking, setOneBooking] = useState();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [autoFillData, setAutoFillData] = useState("");
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    Delivery: {
      streamSelect: "",
      facilitatorsSelect: "",
      locationSelect: "",
      moduleSelects: ["", "Option", "Option"],
      exhibitionSelect: "",
      templateSelect: "",
      term: 1,
      status: "",
      delivery_location: "",
    },
    School: {
      schoolSelect: "",
      studentYears: null,
      lowSES: "",
      contactInfo: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        jobTitle: "",
      },
      additionalComments: "",
      accessibilityNeeds: "",
      allergenInfo: "",
      isPartnerSchool: "",
    },
    Bus: {
      busReq: "",
      busBooked: "",
      status: "",
      price: "",
      datePaid: "",
      invoiceNumber: "",
      savedReceipt: "N",
      expenseMaster: "N",
      pinEmail: "N",
    },
    Others: {
      perStudent: "",
      expenses: "",
      income: "",
      // profit: "",
    },
  });

  const [oneBooking, setOneBooking] = useState({
    Delivery: {
      streamSelect: "",
      facilitatorsSelect: "",
      locationSelect: "",
      moduleSelects: ["", "", "empty"],
      exhibitionSelect: "",
      templateSelect: "",
      term: 1,
      status: "",
      programDate: "",
    },
    School: {
      schoolSelect: { name: "" },
      studentYears: null,
      lowSES: "",
      contactInfo: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        jobTitle: "",
      },
      additionalComments: "",
      accessibilityNeeds: "",
      allergenInfo: "",
      isPartnerSchool: "",
    },
    Bus: {
      busReq: "",
      busBooked: "",
      status: "",
      price: "",
      datePaid: "",
      invoiceNumber: "",
      savedReceipt: "N",
      expenseMaster: "N",
      pinEmail: "N",
    },
    Others: {
      perStudent: "",
      expenses: "",
      income: "",
      // profit: "",
    },
  });

  const handleCategoryClick = (category) => {
    // console.log(data.Delivery.streamSelect)
    console.log(data.School.schoolSelect);
    console.log(data.School);
    // console.log(streamOptions)
    // console.log(locationOptions)
    // console.log(moduleOptions)
    setActiveCategory(category);
    // console.log("得到的数据")
    console.log(oneBooking);
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const cleanYears = (years) => {
    return years.filter((year) => year !== "nah" && year !== "");
  };

  const yearOptions = Array.from({ length: 6 }, (_, i) => ({
    value: 7 + i,
    label: (7 + i).toString(),
  }));

  useEffect(() => {
    if (isNew) {
      setLoading(true);
      Promise.all([getAllMiscellaneous(), getAllSchool(), getAllTemplates()])
        .then(([miscellaneousData, schoolData, templateData]) => {
          setData((prev) => ({
            ...prev,
            Delivery: {
              ...prev.Delivery,
              programStreams: miscellaneousData.program_stream,
              facilitators: miscellaneousData.facilitators,
              location: miscellaneousData.delivery_location,
              module: miscellaneousData.module,
              exhibition: miscellaneousData.exhibition,
              templates: templateData,
            },
            School: {
              ...prev.School,
              schools: schoolData,
            },
          }));
          setOriginalOptions({
            programStreams: miscellaneousData.program_stream,
            facilitators: miscellaneousData.facilitators,
            location: miscellaneousData.delivery_location,
            module: miscellaneousData.module,
            exhibition: miscellaneousData.exhibition,
          });
          setLoading(false);
        })

        .catch((error) => console.error("Error fetching data:", error));
      setLoading(false);
    } else {
      setLoading(true);
      Promise.all([
        getAllMiscellaneous(),
        getAllSchool(),
        getBookingById(bookingId),
      ])
        .then(([miscellaneousData, schoolData, bookingData]) => {
          setOneBooking(bookingData);
          console.log("raw");
          console.log(data);
          setOriginalOptions({
            programStreams: miscellaneousData.program_stream,
            facilitators: miscellaneousData.facilitators,
            location: miscellaneousData.delivery_location,
            module: miscellaneousData.module,
            exhibition: miscellaneousData.exhibition,
          });
          // booking details does not match the database structure
          const studentYears = Array.isArray(bookingData.school.studentYears)
            ? bookingData.school.studentYears
            : [bookingData.school.studentYears];
          getBookingById(bookingId).then((bookingData) => {
            const formattedDate = bookingData.date.split("T")[0];
            const formattedStartTime = bookingData.startTime
              ? bookingData.startTime.split("T")[1].substring(0, 5)
              : "";
            const formattedEndTime = bookingData.endTime
              ? bookingData.endTime.split("T")[1].substring(0, 5)
              : "";
            console.log("newnewnewnewn");
            setData((prev) => ({
              ...prev,
              Delivery: {
                streamSelect: bookingData.programStream,
                facilitatorsSelect: bookingData.facilitators,
                locationSelect: bookingData.location,
                moduleSelects: bookingData.module_id || ["", "", ""],
                exhibitionSelect: bookingData.exibition,
                templateSelect: bookingData.checklist.name,
                term: bookingData.term,
                programStreams: miscellaneousData.program_stream,
                facilitators: miscellaneousData.facilitators,
                location: miscellaneousData.delivery_location,
                module: miscellaneousData.module,
                exhibition: miscellaneousData.exhibition,
                status: bookingData.status,
                programDate: formattedDate,
                startTime: formattedStartTime,
                endTime: formattedEndTime,
                checklistId: bookingData.checklist_id,
                //templates: templateData,
              },
              School: {
                ...prev.School,
                schoolSelect: bookingData.school,
                studentYears: bookingData.school.studentYear,
                lowSES: bookingData.school.lowSES === true ? "Y" : "N",
                registeredStudents: bookingData.school.numStudentRegistered,
                contactInfo: {
                  firstName: bookingData.school.contactFirstName,
                  lastName: bookingData.school.contactLastName,
                  email: bookingData.school.email,
                  phoneNumber: bookingData.school.phone,
                  // no job title in database
                  jobTitle: "",
                },
                additionalComments: bookingData.school.note,
                accessibilityNeeds:
                  bookingData.school.isAccessibility === true ? "Y" : "N",
                allergenInfo: bookingData.school.isAllergy === true ? "Y" : "N",
                isPartnerSchool:
                  bookingData.school.isPartner === true ? "Y" : "N",
                schools: schoolData,
              },
              Bus: {
                ...prev.Bus,
                busReq: bookingData.bus.bus_req === true ? "Y" : "N",
                busBooked: bookingData.bus.isBooked === true ? "Y" : "N",
                // what status 1 and 0
                status: bookingData.bus.status === 0 ? "processing" : "paid",
                price: bookingData.bus.price,
                datePaid: bookingData.bus.date_paid,
                invoiceNumber: bookingData.bus.invoice,
              },
              Others: {
                ...prev.Others,
                perStudent: bookingData.per_student,
                expenses: bookingData.expense,
                income: bookingData.income,
                // profit is not need to be here
              },
            }));
            setLoading(false);
          });
        })

        .catch((error) => console.error("Error fetching data:", error));
    }
  }, []);

  const handleDiscard = () => {
    navigate("/dashboard");
  };

  const formatDateTime = (date, time) => {
    return `${date}T${time}:00`;
  };

  const checkForm = (data) => {
    console.log(data);
    const { moduleSelects } = data.Delivery;
    // check moduel
    const startDate = formatDateTime(
      data.Delivery.programDate,
      data.Delivery.startTime
    );
    const endDate = formatDateTime(
      data.Delivery.programDate,
      data.Delivery.endTime
    );
    let errors = [];
    if (!data.Delivery.streamSelect) {
      errors.push("Program Stream is required.");
    }
    if (!moduleSelects[0]) {
      errors.push("Module 1 is required.");
    }
    if (!data.Delivery.facilitatorsSelect) {
      errors.push("Facilitator is required.");
    }
    if (!data.School.contactInfo.firstName) {
      errors.push("Contact first name is required.");
    }
    if (!data.School.contactInfo.lastName) {
      errors.push("Contact last name is required.");
    }
    if (!data.School.contactInfo.email) {
      errors.push("Email address is required.");
    }
    if (!data.School.contactInfo.phoneNumber) {
      errors.push("Phone number is required.");
    }
    if (!data.Bus.busReq) {
      errors.push("Bus requirement is required.");
    }
    if (!startDate) {
      errors.push("Start Time is required.");
    }
    if (!endDate) {
      errors.push("End Time is required.");
    }
    if (!data.Delivery.exhibitionSelect) {
      errors.push("ExhibitionSelect Time is required.");
    }
    return errors;
  };

  const formatDateString = (dateStr) => {
    const months = {
      January: "01",
      February: "02",
      March: "03",
      April: "04",
      May: "05",
      June: "06",
      July: "07",
      August: "08",
      September: "09",
      October: "10",
      November: "11",
      December: "12",
    };
    if (typeof dateStr !== "undefined") {
      console.log("noway");
      const parts = dateStr.split(" ");
      const day = parts[0].replace(/\D/g, "");
      const month = months[parts[1]];
      const year = new Date().getFullYear();
      return `${year}-${month}-${day}`;
    }
    return;
  };

  const convertTimeFormat = (timeStr) => {
    const times = timeStr.split("-").map((t) => t.trim());
    if (times) {
      let startTime = times[0];
      let endTime = times[1];

      startTime = startTime.includes(":") ? startTime : startTime + ":00";
      endTime = endTime.includes(":") ? endTime : endTime + ":00";

      if (endTime.toLowerCase().includes("pm")) {
        const [hour, minute] = endTime.replace(/pm/i, "").split(":");
        endTime = `${parseInt(hour) + 12}:${minute}`;
      } else {
        endTime = endTime.replace(/am/i, "");
      }

      if (
        !startTime.toLowerCase().includes("pm") &&
        !startTime.toLowerCase().includes("am")
      ) {
        const [hour, minute] = startTime.split(":");
        startTime = `${hour.padStart(2, "0")}:${minute}`;
      }

      return [startTime, endTime];
    }
    return;
  };

  const extractInformation = (text) => {
    const info = {};
    info.program = text.match(/Program: (.+)/)?.[1];
    info.date = text.match(/Date: (.+)/)?.[1];
    info.school = text.match(/School: (.+)/)?.[1];
    info.numberOfStudents = text.match(/Number of students: (.+)/)?.[1];
    info.time = text.match(/Time: (.+)/)?.[1];
    info.studentLevel = text.match(/Student level: (.+)/)?.[1];
    info.cost = text.match(/Cost: (.+)/)?.[1];
    info.teacher = text.match(/Teacher: (.+)/)?.[1];
    info.contactNumber = text.match(/Contact number: (.+)/)?.[1];
    return info;
  };
  const handleGenerate = () => {
    const info = extractInformation(autoFillData);
    const formattedDate = formatDateString(info.date);
    const [formattedStartTime, formattedEndTime] = convertTimeFormat(info.time);
    const studentYear = parseInt(info.studentLevel);
    const [firstName, lastName] = info.teacher
      ? info.teacher.split(" ")
      : [null, null];

    setData((prev) => {
      const newProgramStreams = prev.Delivery.programStreams.includes(
        info.program
      )
        ? prev.Delivery.programStreams
        : [...prev.Delivery.programStreams, info.program];

      let newSchools = prev.School.schools;
      console.log(newSchools);

      let schoolExists = newSchools.find(
        (school) => school.name === info.school
      );
      if (!schoolExists) {
        const newSchoolId = `new_${new Date().getTime()}`;
        newSchools.push({ id: newSchoolId, name: info.school });
        schoolExists = { id: newSchoolId, name: info.school };
      }
      const newState = {
        ...prev,
        Delivery: {
          ...prev.Delivery,
          programDate: formattedDate,
          startTime: formattedStartTime,
          endTime: formattedEndTime,
          streamSelect: info.program,
          programStreams: newProgramStreams,
        },
        School: {
          ...prev.School,
          schools: newSchools,
          schoolSelect: schoolExists,
          registeredStudents: parseInt(info.numberOfStudents),
          studentYears: prev.School.studentYears,
          contactInfo: {
            ...prev.School.contactInfo,
            firstName: firstName || prev.School.contactInfo.firstName,
            lastName: lastName || prev.School.contactInfo.lastName,
            phoneNumber:
              info.contactNumber !== "TBC"
                ? info.contactNumber
                : prev.School.contactInfo.phoneNumber,
          },
        },
        Others: {
          expenses: info.cost,
        },
      };

      console.log("New state:", newState);
      return newState;
    });

    closePopup();
  };

  const handleDateChange = (category, field, value) => {
    setData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };

  const [originalOptions, setOriginalOptions] = useState({
    programStreams: [],
    facilitators: [],
    location: [],
    module: [],
    exhibition: [],
  });

  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      const response = await deleteBooking(oneBooking.id);
      console.log("Booking Delete successfully!", response);
      alert("Delete Successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Creating booking failed:", error);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();

    const startDate = formatDateTime(
      data.Delivery.programDate,
      data.Delivery.startTime
    );
    const endDate = formatDateTime(
      data.Delivery.programDate,
      data.Delivery.endTime
    );
    const schoolData = {
      name: data.School.schoolSelect.name,
      studentYear: data.School.studentYears,
      numStudentRegistered: parseInt(data.School.registeredStudents),
      lowSES: data.School.lowSES === "Y",
      allergy: data.School.allergenInfo || " ",
      contactFirstName: data.School.contactInfo.firstName,
      contactLastName: data.School.contactInfo.lastName,
      email: data.School.contactInfo.email,
      phone: data.School.contactInfo.phoneNumber,
      note: data.School.additionalComments || "",
      isAccessibility: data.School.accessibilityNeeds === "Y",
      isAllergy: true,
      isPartner: data.School.isPartnerSchool === "Y",
    };
    console.log("wocaocaocaoo222");
    console.log(data.Delivery.templateSelect);

    const schoolId = await updateSchoolById(oneBooking.school.id, schoolData);

    // const checklistId = await createNewChecklist(data.Delivery.templateSelect);

    const schoolIdValue = schoolId.id;

    const checklistvalue = oneBooking.checklist_id;

    const bus_test_status = 1;
    const busData = {
      busReq: data.Bus.busReq === "Y",
      isBooked: data.Bus.busReq === "Y" ? data.Bus.busBooked === "Y" : "false",
      status: data.Bus.busReq === "Y" ? bus_test_status : "0",
      price: data.Bus.busReq === "Y" ? parseFloat(data.Bus.price) : "0.0",
      date_paid: data.Bus.busReq === "Y" ? data.Bus.datePaid : null,
      invoice: data.Bus.busReq === "Y" ? data.Bus.invoiceNumber : "false",
    };

    const event_test = "test";
    const bookingData = {
      event: event_test, //
      status: data.Delivery.status, //
      name: data.School.schoolSelect.name, //
      // school_id: data.School.schoolSelect, //
      school_id: schoolIdValue,
      programStream: data.Delivery.streamSelect, //
      checklist_id: checklistvalue, //
      facilitators: data.Delivery.facilitatorsSelect, //
      location: data.Delivery.locationSelect || "", //
      date: data.Delivery.programDate, //
      term: parseInt(data.Delivery.term, 10), // +
      startTime: startDate,
      endTime: endDate,
      module_id: data.Delivery.moduleSelects, //
      exibition: data.Delivery.exhibitionSelect, //
      note: data.Delivery.notes || "", //
      bus: busData, //
      per_student: parseInt(data.Others.perStudent) || 0.0, //
      expense: parseFloat(data.Others.expenses) || 0.0, //
      income: parseFloat(data.Others.income) || 0.0, //
      // profit: parseFloat(data.Others.profit), //
      profit: 0.0,
    };
    // console.log(bookingData);
    const newOptions = {
      module: originalOptions.module.slice(),
      delivery_location: originalOptions.location.slice(),
      facilitators: originalOptions.facilitators.slice(),
      exhibition: originalOptions.exhibition.slice(),
      program_stream: originalOptions.programStreams.slice(),
    };

    console.log(originalOptions.programStreams);
    console.log(data.Delivery.streamSelect);

    if (!originalOptions.programStreams.includes(data.Delivery.streamSelect)) {
      newOptions.program_stream.push(data.Delivery.streamSelect);
    }

    if (
      data.Delivery.moduleSelects.some(
        (module) => !originalOptions.module.includes(module)
      )
    ) {
      newOptions.module.push(
        ...data.Delivery.moduleSelects.filter(
          (module) => !originalOptions.module.includes(module)
        )
      );
    }

    if (
      !originalOptions.facilitators.includes(data.Delivery.facilitatorsSelect)
    ) {
      newOptions.facilitators.push(data.Delivery.facilitatorsSelect);
    }

    if (!originalOptions.location.includes(data.Delivery.locationSelect)) {
      newOptions.delivery_location.push(data.Delivery.locationSelect);
    }

    if (!originalOptions.exhibition.includes(data.Delivery.exhibitionSelect)) {
      newOptions.exhibition.push(data.Delivery.exhibitionSelect);
    }

    console.log("New Options:", newOptions);
    updateMiscellaneous(newOptions);

    try {
      const response = await updateBooking(oneBooking.id, bookingData);
      console.log("Booking created successfully!", response);
      alert("Update Successfull!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Creating booking failed:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const startDate = formatDateTime(
      data.Delivery.programDate,
      data.Delivery.startTime
    );
    const endDate = formatDateTime(
      data.Delivery.programDate,
      data.Delivery.endTime
    );
    console.log(data.School.schoolSelect);
    console.log(data.School.schoolSelect.name);
    const schoolData = {
      name: data.School.schoolSelect.name,
      studentYear: data.School.studentYears,
      numStudentRegistered: parseInt(data.School.registeredStudents),
      lowSES: data.School.lowSES === "Y",
      allergy: data.School.allergenInfo || " ",
      contactFirstName: data.School.contactInfo.firstName,
      contactLastName: data.School.contactInfo.lastName,
      email: data.School.contactInfo.email,
      phone: data.School.contactInfo.phoneNumber,
      note: data.School.additionalComments || "",
      isAccessibility: data.School.accessibilityNeeds === "Y",
      isAllergy: true,
      isPartner: data.School.isPartnerSchool === "Y",
    };
    console.log("wocaocaocaoo");
    console.log(data.Delivery.templateSelect);

    const schoolId = await createNewSchool(schoolData);

    const checklistId = await createNewChecklist(data.Delivery.templateSelect);

    const schoolIdValue = schoolId._id;

    const checklistvalue = checklistId._id;
    console.log(checklistId);
    console.log(checklistvalue);

    const bus_test_status = 1;
    const busData = {
      busReq: data.Bus.busReq === "Y",
      isBooked: data.Bus.busReq === "Y" ? data.Bus.busBooked === "Y" : "false",
      status: data.Bus.busReq === "Y" ? bus_test_status : "0",
      price: data.Bus.busReq === "Y" ? parseFloat(data.Bus.price) : "0.0",
      date_paid: data.Bus.busReq === "Y" ? data.Bus.datePaid : null,
      invoice: data.Bus.busReq === "Y" ? data.Bus.invoiceNumber : "false",
    };

    const event_test = "test";
    const bookingData = {
      event: event_test, //
      status: data.Delivery.status, //
      name: data.School.schoolSelect.name, //
      // school_id: data.School.schoolSelect, //
      school_id: schoolIdValue,
      programStream: data.Delivery.streamSelect, //
      checklist_id: checklistvalue, //
      facilitators: data.Delivery.facilitatorsSelect, //
      location: data.Delivery.locationSelect || "", //
      date: data.Delivery.programDate, //
      term: parseInt(data.Delivery.term, 10), // +
      startTime: startDate,
      endTime: endDate,
      module_id: data.Delivery.moduleSelects, //
      exibition: data.Delivery.exhibitionSelect, //
      note: data.Delivery.notes || "", //
      bus: busData, //
      per_student: parseInt(data.Others.perStudent) || 0.0, //
      expense: parseFloat(data.Others.expenses) || 0.0, //
      income: parseFloat(data.Others.income) || 0.0, //
      // profit: parseFloat(data.Others.profit), //
      profit: 0.0,
    };
    // console.log(bookingData);
    const newOptions = {
      module: originalOptions.module.slice(),
      delivery_location: originalOptions.location.slice(),
      facilitators: originalOptions.facilitators.slice(),
      exhibition: originalOptions.exhibition.slice(),
      program_stream: originalOptions.programStreams.slice(),
    };

    console.log(originalOptions.programStreams);
    console.log(data.Delivery.streamSelect);

    if (!originalOptions.programStreams.includes(data.Delivery.streamSelect)) {
      newOptions.program_stream.push(data.Delivery.streamSelect);
    }

    if (
      data.Delivery.moduleSelects.some(
        (module) => !originalOptions.module.includes(module)
      )
    ) {
      newOptions.module.push(
        ...data.Delivery.moduleSelects.filter(
          (module) => !originalOptions.module.includes(module)
        )
      );
    }

    if (
      !originalOptions.facilitators.includes(data.Delivery.facilitatorsSelect)
    ) {
      newOptions.facilitators.push(data.Delivery.facilitatorsSelect);
    }

    if (!originalOptions.location.includes(data.Delivery.locationSelect)) {
      newOptions.delivery_location.push(data.Delivery.locationSelect);
    }

    if (!originalOptions.exhibition.includes(data.Delivery.exhibitionSelect)) {
      newOptions.exhibition.push(data.Delivery.exhibitionSelect);
    }

    console.log("New Options:", newOptions);
    updateMiscellaneous(newOptions);

    try {
      const response = await createNewBooking(bookingData);
      console.log("Booking created successfully!", response);
      alert("Create Successfull!");
      navigate("/dashboard");
    } catch (error) {
      DeleteSchoolById(schoolIdValue);
      DeleteCheckListById(checklistvalue);
      console.error("Creating booking failed:", error);
    }
  };

  const handleChange = (category, field, value) => {
    setData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value,
      },
    }));
  };

  const handleMultiSelectChange = (category, field, index, value) => {
    setData((prev) => {
      const updatedField = [...prev[category][field]];
      updatedField[index] = value;
      return {
        ...prev,
        [category]: {
          ...prev[category],
          [field]: updatedField,
        },
      };
    });
  };

  const handleCreateOption = (category, field, newOption) => {
    setData((prev) => {
      const updatedField = [...prev[category][field], newOption];
      return {
        ...prev,
        [category]: {
          ...prev[category],
          [field]: updatedField,
        },
      };
    });
  };

  const handleChangeNested = (category, nestedField, subField, value) => {
    setData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [nestedField]: {
          ...prev[category][nestedField],
          [subField]: value,
        },
      },
    }));
  };

  const YNoptions = [
    { value: "Y", label: "Yes" },
    { value: "N", label: "No" },
  ];

  const statusOptions = [
    { value: "delivered", label: "delivered" },
    { value: "processing", label: "processing" },
    { value: "pending", label: "pending" },
    { value: "canceled", label: "canceled" },
  ];

  const uniqueArray = (array) => [...new Set(array)];

  const streamOptions =
    uniqueArray(data.Delivery.programStreams)?.map((stream) => ({
      value: stream,
      label: stream,
    })) || [];

  const facilitatorOptions =
    uniqueArray(data.Delivery.facilitators)?.map((facilitator) => ({
      value: facilitator,
      label: facilitator,
    })) || [];

  const locationOptions =
    uniqueArray(data.Delivery.location)?.map((location) => ({
      value: location,
      label: location,
    })) || [];

  const moduleOptions =
    data.Delivery.module?.map((module_id) => ({
      value: module_id,
      label: module_id,
    })) || [];

  const schoolOptions =
    data.School && data.School.schools
      ? data.School.schools.reduce((unique, school) => {
          if (!unique.some((item) => item.label === school.name)) {
            unique.push({ value: school.name, label: school.name });
          }
          return unique;
        }, [])
      : [];

  const handleSelectChange =
    (category, field, arrayName) => (selectedOption) => {
      setData((prev) => {
        const updatedPrev = { ...prev };

        if (!updatedPrev[category]) {
          updatedPrev[category] = {};
        }

        if (field === "schoolSelect") {
          updatedPrev[category].schools = updatedPrev[category].schools || [];
          if (
            selectedOption &&
            !updatedPrev[category].schools.some(
              (school) => school.name === selectedOption.value
            )
          ) {
            updatedPrev[category].schools.push({ name: selectedOption.value });
          }
          updatedPrev[category][field] = selectedOption
            ? { name: selectedOption.value }
            : null;
        } else {
          console.log(category);
          console.log(arrayName);
          if (selectedOption && selectedOption.__isNew__) {
            updatedPrev[category][arrayName] =
              updatedPrev[category][arrayName] || [];
            if (
              !updatedPrev[category][arrayName].includes(selectedOption.value)
            ) {
              updatedPrev[category][arrayName].push(selectedOption.value);
            }
          }
          updatedPrev[category][field] = selectedOption
            ? selectedOption.value
            : null;
        }

        return updatedPrev;
      });
    };

  const animatedComponents = makeAnimated();

  const templateOptions =
    data.Delivery.templates?.map((template) => ({
      value: template.id,
      label: template.name,
    })) || [];

  const exhibitionOptions =
    data.Delivery.exhibition?.map((exhibition) => ({
      value: exhibition,
      label: exhibition,
    })) || [];

  return (
    <>
      <Modal show={loading}>
        <div>Loading data...</div>
      </Modal>
      {isNew && <Header>Create New Booking</Header>}
      {!isNew && <Header> Booking Details</Header>}
      <div className="newBookingFilterSection">
        {!isNew && (
          <button
            className={`newBookingFilterBtn ${
              activeCategory === "Checklist" ? "active" : ""
            }`}
            onClick={() => handleCategoryClick("Checklist")}
          >
            Checklist
          </button>
        )}
        <button
          className={`newBookingFilterBtn ${
            activeCategory === "Delivery" ? "active" : ""
          }`}
          onClick={() => handleCategoryClick("Delivery")}
        >
          Delivery
        </button>
        <button
          className={`newBookingFilterBtn ${
            activeCategory === "School" ? "active" : ""
          }`}
          onClick={() => handleCategoryClick("School")}
        >
          School
        </button>
        <button
          className={`newBookingFilterBtn ${
            activeCategory === "Bus" ? "active" : ""
          }`}
          onClick={() => handleCategoryClick("Bus")}
        >
          Bus
        </button>
        <button
          className={`newBookingFilterBtn ${
            activeCategory === "Others" ? "active" : ""
          }`}
          onClick={() => handleCategoryClick("Others")}
        >
          Others
        </button>
        <span className="autoFillText" onClick={openPopup}>
          Do you want to autofill the information? Click here!
        </span>
      </div>

      {isPopupOpen && (
        <div className="popup">
          <div className="popupContent">
            <textarea
              placeholder="Enter autofill data"
              value={autoFillData}
              onChange={(e) => setAutoFillData(e.target.value)}
            ></textarea>
            <div className="popupButtons">
              <button onClick={closePopup}>Back</button>
              <button onClick={handleGenerate}>Generate</button>
            </div>
          </div>
        </div>
      )}

      <div>
        {/* bookingChecklist should be a prop to be parse in */}
        {!isNew && activeCategory === "Checklist" && (
          <TemplateDetail checklistId={oneBooking.checklist_id} />
        )}
        {activeCategory === "Delivery" && (
          <form className="newBookingForm">
            <label>Program Stream:</label>
            <CreatableSelect
              value={streamOptions.find(
                (option) => option.value === data.Delivery.streamSelect
              )}
              onChange={handleSelectChange(
                "Delivery",
                "streamSelect",
                "programStreams"
              )}
              onCreateOption={(newOption) => {
                handleCreateOption("Delivery", "programStreams", newOption);
                handleSelectChange(
                  "Delivery",
                  "streamSelect",
                  "programStreams"
                )({ value: newOption, __isNew__: true });
              }}
              options={streamOptions}
              placeholder="Please select a stream"
              isClearable
              isSearchable
              formatCreateLabel={(inputValue) => `Create "${inputValue}"`}
            />

            {isNew && <label>Template:</label>}
            {isNew && (
              <Select
                components={animatedComponents}
                value={templateOptions.find(
                  (option) => option.value === data.Delivery.templateSelect
                )}
                onChange={handleSelectChange("Delivery", "templateSelect")}
                options={templateOptions}
                placeholder="Please select a template"
                isClearable
                isSearchable
              />
            )}
            <label>Facilitators:</label>
            <CreatableSelect
              value={facilitatorOptions.find(
                (option) => option.value === data.Delivery.facilitatorsSelect
              )}
              onChange={handleSelectChange(
                "Delivery",
                "facilitatorsSelect",
                "facilitators"
              )}
              onCreateOption={(newOption) => {
                handleCreateOption("Delivery", "facilitators", newOption);
                handleSelectChange(
                  "Delivery",
                  "facilitatorsSelect",
                  "facilitators"
                )({ value: newOption, __isNew__: true });
              }}
              options={facilitatorOptions}
              placeholder="Please select a facilitator"
              isClearable
              isSearchable
              formatCreateLabel={(inputValue) => `Create "${inputValue}"`}
            />
            <label>Delivery Location:</label>
            <CreatableSelect
              value={locationOptions.find(
                (option) => option.value === data.Delivery.locationSelect
              )}
              onChange={handleSelectChange(
                "Delivery",
                "locationSelect",
                "location"
              )}
              onCreateOption={(newOption) => {
                handleCreateOption("Delivery", "location", newOption);
                handleSelectChange(
                  "Delivery",
                  "locationSelect",
                  "location"
                )({ value: newOption, __isNew__: true });
              }}
              options={locationOptions}
              placeholder="Please select a location"
              isClearable
              isSearchable
              formatCreateLabel={(inputValue) => `Create "${inputValue}"`}
            />
            <label>Program status:</label>
            <Select
              components={animatedComponents}
              value={statusOptions.find(
                (option) => option.value === data.Delivery.status
              )}
              onChange={(e) => handleChange("Delivery", "status", e.value)}
              options={statusOptions}
              placeholder="Please select a status"
              isClearable
              isSearchable
            />
            <label>Program Date:</label>
            <input
              type="date"
              value={data.Delivery.programDate}
              onChange={(e) =>
                handleChange("Delivery", "programDate", e.target.value)
              }
            />

            <label>Term:</label>
            <select
              value={data.Delivery.term}
              onChange={(e) => handleChange("Delivery", "term", e.target.value)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="1">3</option>
              <option value="2">4</option>
            </select>

            <label>Time (Start):</label>
            <input
              type="time"
              value={data.Delivery.startTime}
              onChange={(e) =>
                handleChange("Delivery", "startTime", e.target.value)
              }
            />

            <label>Time (End) *:</label>
            <input
              type="time"
              value={data.Delivery.endTime}
              onChange={(e) =>
                handleChange("Delivery", "endTime", e.target.value)
              }
            />

            {["Module 1", "Module 2", "Module 3"].map((label, index) => (
              <React.Fragment key={label}>
                <label>
                  {label}
                  {index === 0 ? " *" : ""}:
                </label>
                <CreatableSelect
                  value={moduleOptions.find(
                    (option) =>
                      option.value === data.Delivery.moduleSelects[index]
                  )}
                  onChange={(selectedOption) =>
                    handleMultiSelectChange(
                      "Delivery",
                      "moduleSelects",
                      index,
                      selectedOption.value
                    )
                  }
                  onCreateOption={(newOption) => {
                    handleCreateOption("Delivery", "module", newOption);
                    handleMultiSelectChange(
                      "Delivery",
                      "moduleSelects",
                      index,
                      newOption
                    );
                  }}
                  options={moduleOptions}
                  placeholder={
                    index === 0 ? "Please select a module" : "Optional"
                  }
                  isClearable
                  isSearchable
                />
              </React.Fragment>
            ))}

            <label>Exhibition:</label>
            <CreatableSelect
              components={animatedComponents}
              value={exhibitionOptions.find(
                (option) => option.value === data.Delivery.exhibitionSelect
              )}
              onChange={handleSelectChange(
                "Delivery",
                "exhibitionSelect",
                "exhibition"
              )}
              onCreateOption={(newOption) => {
                handleCreateOption("Delivery", "exhibition", newOption);
                handleSelectChange(
                  "Delivery",
                  "exhibitionSelect",
                  "exhibition"
                )({ value: newOption, __isNew__: true });
              }}
              options={exhibitionOptions}
              placeholder="Please select an exhibition"
              isClearable
              isSearchable
              formatCreateLabel={(inputValue) => `Create "${inputValue}"`}
            />

            <label>Notes:</label>
            <textarea
              value={data.Delivery.notes}
              onChange={(e) =>
                handleChange("Delivery", "notes", e.target.value)
              }
            />
          </form>
        )}

        {activeCategory === "School" && (
          <form className="newBookingForm">
            <label htmlFor="school-input">School Name:</label>
            <CreatableSelect
              id="school-input"
              value={schoolOptions.find(
                (option) => option.value === data.School.schoolSelect.name
              )}
              onChange={handleSelectChange("School", "schoolSelect")}
              options={schoolOptions}
              placeholder="Please select a School"
              isClearable
              isSearchable
              formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
            />

            <div className="form-group">
              <label htmlFor="student-year-select">Student Years:</label>
              <Select
                id="student-year-select"
                value={yearOptions.find(
                  (option) => option.value === data.School.studentYears
                )}
                onChange={handleSelectChange("School", "studentYears")}
                options={yearOptions}
                placeholder="Please select a year"
                isClearable
                isSearchable
              />
            </div>

            <label>Student # (registered):</label>
            <input
              type="number"
              value={data.School.registeredStudents}
              onChange={(e) =>
                handleChange("School", "registeredStudents", e.target.value)
              }
            />

            <label>Low SES:</label>
            <Select
              value={YNoptions.find(
                (option) => option.value === data.School.lowSES
              )}
              onChange={(selectedOption) =>
                handleChange("School", "lowSES", selectedOption.value)
              }
              options={YNoptions}
              placeholder="Yes or No"
              isClearable={true}
              isSearchable={false}
            />

            <fieldset>
              <legend>School Contact:</legend>
              <label>First Name:</label>
              <input
                type="text"
                value={data.School.contactInfo.firstName}
                onChange={(e) =>
                  handleChangeNested(
                    "School",
                    "contactInfo",
                    "firstName",
                    e.target.value
                  )
                }
              />

              <label>Last Name:</label>
              <input
                type="text"
                value={data.School.contactInfo.lastName}
                onChange={(e) =>
                  handleChangeNested(
                    "School",
                    "contactInfo",
                    "lastName",
                    e.target.value
                  )
                }
              />
              <label>Email Address:</label>
              <input
                type="email"
                value={data.School.contactInfo.email}
                onChange={(e) =>
                  handleChangeNested(
                    "School",
                    "contactInfo",
                    "email",
                    e.target.value
                  )
                }
              />
              <label>Phone Number:</label>
              <input
                type="tel"
                value={data.School.contactInfo.phoneNumber}
                onChange={(e) =>
                  handleChangeNested(
                    "School",
                    "contactInfo",
                    "phoneNumber",
                    e.target.value
                  )
                }
              />
              <label>Teaching Area/Job Title:</label>
              <input
                type="text"
                value={data.School.contactInfo.jobTitle}
                onChange={(e) =>
                  handleChangeNested(
                    "School",
                    "contactInfo",
                    "jobTitle",
                    e.target.value
                  )
                }
              />
            </fieldset>

            <label>Additional Comments:</label>
            <textarea
              value={data.School.additionalComments}
              onChange={(e) =>
                handleChange("School", "additionalComments", e.target.value)
              }
            />

            <label>Accessibility Needs Communicated:</label>
            <Select
              value={YNoptions.find(
                (option) => option.value === data.School.accessibilityNeeds
              )}
              onChange={(selectedOption) =>
                handleChange(
                  "School",
                  "accessibilityNeeds",
                  selectedOption.value
                )
              }
              options={YNoptions}
              placeholder="Yes or No"
              isClearable={true}
              isSearchable={false}
            />
            <label>Allergen and Anaphylaxis Communicated:</label>
            <textarea
              value={data.Delivery.notes}
              onChange={(e) =>
                handleChange("School", "allergenInfo", e.target.value)
              }
            />

            <label>Is Partner School:</label>
            <Select
              value={YNoptions.find(
                (option) => option.value === data.School.isPartnerSchool
              )}
              onChange={(selectedOption) =>
                handleChange("School", "isPartnerSchool", selectedOption.value)
              }
              options={YNoptions}
              placeholder="Yes or No"
              isClearable={true}
              isSearchable={false}
            />
          </form>
        )}
        {activeCategory === "Bus" && (
          <form className="newBookingForm">
            <label htmlFor="bus-req">BUS REQ:</label>
            <Select
              id="bus-req"
              value={YNoptions.find(
                (option) => option.value === data.Bus.busReq
              )}
              onChange={(selectedOption) =>
                handleChange("Bus", "busReq", selectedOption.value)
              }
              options={YNoptions}
              placeholder="Yes or No"
              isClearable={true}
            />

            {data.Bus.busReq === "Y" && (
              <>
                <label>BUS BOOKED:</label>
                <Select
                  id="bus-booked"
                  value={YNoptions.find(
                    (option) => option.value === data.Bus.busBooked
                  )}
                  onChange={(selectedOption) =>
                    handleChange("Bus", "busBooked", selectedOption.value)
                  }
                  options={YNoptions}
                  placeholder="Yes or No"
                  isClearable={true}
                />

                <label htmlFor="status">Status:</label>
                <Select
                  id="status"
                  value={statusOptions.find(
                    (option) => option.value === data.Bus.status
                  )}
                  onChange={(selectedOption) =>
                    handleChange("Bus", "status", selectedOption.value)
                  }
                  options={statusOptions}
                  placeholder="Select Status"
                  isClearable={true}
                />

                <label htmlFor="price">Price:</label>
                <input
                  id="price"
                  type="text"
                  value={data.Bus.price}
                  onChange={(e) => handleChange("Bus", "price", e.target.value)}
                />

                <label htmlFor="date-paid">Date Paid:</label>
                <input
                  id="date-paid"
                  type="date"
                  value={data.Bus.datePaid}
                  onChange={(e) =>
                    handleDateChange("Bus", "datePaid", e.target.value)
                  }
                />

                <label htmlFor="invoice-number">Invoice #:</label>
                <input
                  id="invoice-number"
                  type="text"
                  value={data.Bus.invoiceNumber}
                  onChange={(e) =>
                    handleChange("Bus", "invoiceNumber", e.target.value)
                  }
                />
              </>
            )}
          </form>
        )}

        {activeCategory === "Others" && (
          <form className="newBookingForm">
            <label htmlFor="per-student">Per Student:</label>
            <input
              id="per-student"
              type="number"
              value={data.Others.perStudent}
              onChange={(e) =>
                handleChange("Others", "perStudent", e.target.value)
              }
            />

            <label htmlFor="expenses">Cost:</label>
            <input
              id="expenses"
              type="number"
              value={data.Others.expenses}
              onChange={(e) =>
                handleChange("Others", "expenses", e.target.value)
              }
            />

            <label htmlFor="income">Income:</label>
            <input
              id="income"
              type="number"
              value={data.Others.income}
              onChange={(e) => handleChange("Others", "income", e.target.value)}
            />
          </form>
        )}
      </div>
      {activeCategory !== "Checklist" && (
        <div className="newBookingButtons">
          <Button type="discard" onClick={handleDiscard}>
            DISCARD
          </Button>
          {isNew && (
            <Button type="submit" onClick={handleSubmit}>
              SAVE
            </Button>
          )}
          {!isNew && (
            <Button type="submit" onClick={handleUpdate}>
              UPDATE
            </Button>
          )}
          {!isNew && (
            <Button type="delete" onClick={handleDelete}>
              Delete
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default NewBooking;
