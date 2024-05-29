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
  const [currentStep, setCurrentStep] = useState(0);

  const categories = ["Delivery", "School", "Bus", "Others"];


  const { bookingId } = useParams();
  // const [oneBooking, setOneBooking] = useState();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [autoFillData, setAutoFillData] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [creating, setCreating] = useState(false);
  const [streamOptions, setStreamOptions] = useState([]);
  const [facilitatorOptions, setFacilitatorOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [moduleOptions, setModuleOptions] = useState([]);
  const [exhibitionOptions, setExhibitionOptions] = useState([]);

  const [data, setData] = useState({
    Delivery: {
      streamSelect: "",
      facilitatorsSelect: "",
      locationSelect: "",
      moduleSelects: ["", "", ""],
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
      moduleSelects: ["", "option", "option"],
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

  useEffect(() => {
    const initialOptions =
      uniqueArray(data.Delivery.programStreams)?.map((stream) => ({
        value: stream,
        label: stream,
      })) || [];

    const selectedStream = data.Delivery.streamSelect;
    if (
      selectedStream &&
      !initialOptions.find((option) => option.value === selectedStream)
    ) {
      initialOptions.push({ value: selectedStream, label: selectedStream });
    }

    setStreamOptions(initialOptions);
  }, [data.Delivery.programStreams, data.Delivery.streamSelect]);

  useEffect(() => {
    const initialStreamOptions =
      uniqueArray(data.Delivery.programStreams)?.map((stream) => ({
        value: stream,
        label: stream,
      })) || [];

    const selectedStream = data.Delivery.streamSelect;
    if (
      selectedStream &&
      !initialStreamOptions.find((option) => option.value === selectedStream)
    ) {
      initialStreamOptions.push({
        value: selectedStream,
        label: selectedStream,
      });
    }

    setStreamOptions(initialStreamOptions);

    const initialFacilitatorOptions =
      uniqueArray(data.Delivery.facilitators)?.map((facilitator) => ({
        value: facilitator,
        label: facilitator,
      })) || [];

    const selectedFacilitator = data.Delivery.facilitatorsSelect;
    if (
      selectedFacilitator &&
      !initialFacilitatorOptions.find(
        (option) => option.value === selectedFacilitator
      )
    ) {
      initialFacilitatorOptions.push({
        value: selectedFacilitator,
        label: selectedFacilitator,
      });
    }

    setFacilitatorOptions(initialFacilitatorOptions);

    const initialLocationOptions =
      uniqueArray(data.Delivery.location)?.map((location) => ({
        value: location,
        label: location,
      })) || [];

    const selectedLocation = data.Delivery.locationSelect;
    if (
      selectedLocation &&
      !initialLocationOptions.find(
        (option) => option.value === selectedLocation
      )
    ) {
      initialLocationOptions.push({
        value: selectedLocation,
        label: selectedLocation,
      });
    }

    setLocationOptions(initialLocationOptions);
  }, [
    data.Delivery.programStreams,
    data.Delivery.streamSelect,
    data.Delivery.facilitators,
    data.Delivery.facilitatorsSelect,
    data.Delivery.location,
    data.Delivery.locationSelect,
  ]);

  useEffect(() => {
    const initialModuleOptions =
      uniqueArray(data.Delivery.module)?.map((module_id) => ({
        value: module_id,
        label: module_id,
      })) || [];

    const validModuleSelects = data.Delivery.moduleSelects.filter(
      (select) => select !== ""
    );

    validModuleSelects.forEach((selectedModule) => {
      if (
        selectedModule &&
        !initialModuleOptions.find((option) => option.value === selectedModule)
      ) {
        initialModuleOptions.push({
          value: selectedModule,
          label: selectedModule,
        });
      }
    });

    setModuleOptions(initialModuleOptions);

    const initialExhibitionOptions =
      uniqueArray(data.Delivery.exhibition)?.map((exhibition) => ({
        value: exhibition,
        label: exhibition,
      })) || [];

    const selectedExhibition = data.Delivery.exhibitionSelect;
    if (
      selectedExhibition &&
      !initialExhibitionOptions.find(
        (option) => option.value === selectedExhibition
      )
    ) {
      initialExhibitionOptions.push({
        value: selectedExhibition,
        label: selectedExhibition,
      });
    }

    setExhibitionOptions(initialExhibitionOptions);
  }, [
    data.Delivery.module,
    data.Delivery.moduleSelects,
    data.Delivery.exhibition,
    data.Delivery.exhibitionSelect,
  ]);

  const handleCategoryClick = (category, step) => {
    setActiveCategory(category);
    setCurrentStep(step);
  };

  const handleNextStep = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, categories.length - 1));
    setActiveCategory(categories[Math.min(currentStep + 1, categories.length - 1)]);
  };
  
  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 0));
    setActiveCategory(categories[Math.max(currentStep - 1, 0)]);
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
    setLoading(true);
    if (isNew) {
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
        .catch((error) => {
          console.error("Error fetching data:", error);
          alert("Error! Please try again later");
          navigate("/dashboard",{replace:true});
        });
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
          getBookingById(bookingId)
            .then((bookingData) => {
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
                  moduleSelects: bookingData.module_id || [
                    "",
                    "option",
                    "option",
                  ],
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
                },
                School: {
                  ...prev.School,
                  schoolSelect: bookingData.school,
                  studentYears: bookingData.school.studentYear,
                  lowSES: bookingData.school.lowSES === true ? "Y" : "N",
                  registeredStudents: bookingData.school.numStudentRegistered,
                  attendedStudents: bookingData.school.numStudentAttended,
                  contactInfo: {
                    firstName: bookingData.school.contactFirstName,
                    lastName: bookingData.school.contactLastName,
                    email: bookingData.school.email,
                    phoneNumber: bookingData.school.phone,
                    jobTitle: "",
                  },
                  additionalComments: bookingData.school.note,
                  accessibilityNeeds:
                    bookingData.school.isAccessibility === true ? "Y" : "N",
                  allergenInfo:
                    bookingData.school.isAllergy === true ? "Y" : "N",
                  isPartnerSchool:
                    bookingData.school.isPartner === true ? "Y" : "N",
                  schools: schoolData,
                },
                Bus: {
                  ...prev.Bus,
                  busReq: bookingData.bus.bus_req === true ? "Y" : "N",
                  busBooked: bookingData.bus.isBooked === true ? "Y" : "N",
                  // what status 1 and 0
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
            })
            .then(() => setLoading(false));
        })

        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
          alert("Error! Please try again later");
          navigate("/dashboard",{replace:true});
        });
    }
  }, []);

  const handleDiscard = () => {
    navigate("/dashboard",{replace:true});
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
    if (!data.School.contactInfo.firstName) {
      errors.push("Contact first name is required.");
    }
    if (!data.Delivery.term) {
      errors.push("Term is required.");
    }
    if (!data.School.registeredStudents || data.School.registeredStudents < 0) {
      console.log(data.School.numStudentRegistered)
      errors.push("Number of student registered is required and cannot be less than zero.");
    }
    if (!data.School.contactInfo.lastName) {
      errors.push("Contact last name is required.");
    }
    if (!data.School.contactInfo.email) {
      errors.push("Email address is required.");
    } else if (!/^[^@]+@[^@]+\.[^@]+/.test(data.School.contactInfo.email)) {
      errors.push("Invalid email format.");
    }
    if (!data.School.contactInfo.phoneNumber) {
      errors.push("Phone number is required.");
    } else if (!/^\+?(\d[\d- ]{7,}\d$)/.test(data.School.contactInfo.phoneNumber)) {
      errors.push("Phone number is invalid.");
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
    if (!data.School.attendedStudents || data.School.attendedStudents < 0) {
      console.log(data.School.attendedStudents)
      errors.push("Number of Student Attended is required and cannot be less than zero.");
    }
    if (!data.School.accessibilityNeeds) {
      errors.push("Accessibilityis required.");
    }
    if (errors.length > 0) {
      alert(errors.join("\n"));
    }
    console.log(errors)
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
          attendedStudents: parseInt(info.numberOfStudents),
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
    setDeleting(true);
    try {
      const response = deleteBooking(oneBooking.id);
      navigate("/dashboard",{replace:true});
    } catch (error) {
      console.error("delete booking failed:", error);
      alert("Error! Please try again later");
      navigate("/dashboard",{replace:true});
    } finally {
      setDeleting(false);
    }
  };

  const handleUpdate = async (event) => {
    const errors = checkForm(data);
    console.log("??????")
    console.log(errors)
    if (errors.length !== 0) {
    } else {
      setUpdating(true);
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
        numStudentAttended: parseInt(data.School.attendedStudents),
        lowSES: data.School.lowSES === "Y",
        allergy: data.School.allergenInfo || " ",
        teachingArea: data.School.contactInfo.jobTitle,
        contactFirstName: data.School.contactInfo.firstName,
        contactLastName: data.School.contactInfo.lastName,
        email: data.School.contactInfo.email,
        phone: data.School.contactInfo.phoneNumber,
        note: data.School.additionalComments || "",
        isAccessibility: data.School.accessibilityNeeds === "Y",
        isAllergy: true,
        isPartner: data.School.isPartnerSchool === "Y",
      };

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

      const newOptions = {
        module: originalOptions.module.slice(),
        delivery_location: originalOptions.location.slice(),
        facilitators: originalOptions.facilitators.slice(),
        exhibition: originalOptions.exhibition.slice(),
        program_stream: originalOptions.programStreams.slice(),
      };

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
        !originalOptions.facilitators.includes(
          data.Delivery.facilitatorsSelect
        ) &&
        data.Delivery.facilitatorsSelect !== ""
      ) {
        newOptions.facilitators.push(data.Delivery.facilitatorsSelect);
      }

      if (
        !originalOptions.location.includes(data.Delivery.locationSelect) &&
        data.Delivery.locationSelect !== ""
      ) {
        newOptions.delivery_location.push(data.Delivery.locationSelect);
      }

      if (
        !originalOptions.exhibition.includes(data.Delivery.exhibitionSelect) &&
        data.Delivery.exhibitionSelect !== ""
      ) {
        newOptions.exhibition.push(data.Delivery.exhibitionSelect);
      }
      for (let moduleSelect of data.Delivery.moduleSelects) {
        if (
          !originalOptions.module.includes(moduleSelect) &&
          moduleSelect !== ""
        ) {
          newOptions.module.push(moduleSelect);
        }
      }
      


      updateMiscellaneous(newOptions);

      try {
        const response = await updateBooking(oneBooking.id, bookingData);
        console.log("Booking created successfully!", response);
        alert("Update Successfull!");
        // navigate("/dashboard",{replace:true});
      } catch (error) {
        console.error("update booking failed:", error);
        alert("Error! Please try again later");
        navigate("/dashboard",{replace:true});
      } finally {
        setUpdating(false);
      }
    }
  };

  const handleSubmit = async (event) => {
    const errors = checkForm(data);
    if (errors.length !== 0) {
    } else {
      setCreating(true);
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
        numStudentAttended: parseInt(data.School.attendedStudents),
        lowSES: data.School.lowSES === "Y",
        allergy: data.School.allergenInfo || " ",
        teachingArea: data.School.contactInfo.jobTitle,
        contactFirstName: data.School.contactInfo.firstName,
        contactLastName: data.School.contactInfo.lastName,
        email: data.School.contactInfo.email,
        phone: data.School.contactInfo.phoneNumber,
        note: data.School.additionalComments || "",
        isAccessibility: data.School.accessibilityNeeds === "Y",
        isAllergy: true,
        isPartner: data.School.isPartnerSchool === "Y",
      };

      const schoolId = await createNewSchool(schoolData);

      const checklistId = await createNewChecklist(
        data.Delivery.templateSelect
      );

      const schoolIdValue = schoolId._id;

      const checklistvalue = checklistId._id;

      const bus_test_status = 1;
      const busData = {
        busReq: data.Bus.busReq === "Y",
        isBooked:
          data.Bus.busReq === "Y" ? data.Bus.busBooked === "Y" : "false",
        status: data.Bus.busReq === "Y" ? bus_test_status : "0",
        price: data.Bus.busReq === "Y" ? parseFloat(data.Bus.price) : "0.0",
        date_paid: data.Bus.busReq === "Y" ? data.Bus.datePaid : null,
        invoice: data.Bus.busReq === "Y" ? data.Bus.invoiceNumber : "false",
      };

      const validModuleSelects = data.Delivery.moduleSelects.filter(
        (select) => select !== ""
      );

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
        module_id: validModuleSelects, //
        exibition: data.Delivery.exhibitionSelect, //
        note: data.Delivery.notes || "", //
        bus: busData, //
        per_student: parseInt(data.Others.perStudent) || 0.0, //
        expense: parseFloat(data.Others.expenses) || 0.0, //
        income: parseFloat(data.Others.income) || 0.0, //
        // profit: parseFloat(data.Others.profit), //
        profit: 0.0,
      };

      const newOptions = {
        module: originalOptions.module.slice(),
        delivery_location: originalOptions.location.slice(),
        facilitators: originalOptions.facilitators.slice(),
        exhibition: originalOptions.exhibition.slice(),
        program_stream: originalOptions.programStreams.slice(),
      };
      console.log("modile id");
      console.log(data.Delivery.moduleSelects);

      console.log(originalOptions.programStreams);
      console.log(data.Delivery.streamSelect);

      if (
        !originalOptions.programStreams.includes(data.Delivery.streamSelect)
      ) {
        newOptions.program_stream.push(data.Delivery.streamSelect);
      }

      if (
        data.Delivery.moduleSelects.some(
          (module) => module !== "" && !originalOptions.module.includes(module)
        )
      ) {
        newOptions.module.push(
          ...data.Delivery.moduleSelects.filter(
            (module) =>
              module !== "" && !originalOptions.module.includes(module)
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

      if (
        !originalOptions.exhibition.includes(data.Delivery.exhibitionSelect)
      ) {
        newOptions.exhibition.push(data.Delivery.exhibitionSelect);
      }
      console.log("????");
      console.log(newOptions);

      updateMiscellaneous(newOptions);

      try {
        const response = createNewBooking(bookingData);
        //setCreating(false);
        // navigate("/dashboard" ,{replace:true});
      } catch (error) {
        DeleteSchoolById(schoolIdValue);
        DeleteCheckListById(checklistvalue);
        console.error("Creating booking failed:", error);
      } finally {
        setCreating(false);
      }
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
    setData((prevData) => {
      const newData = { ...prevData };

      if (!newData[category]) {
        newData[category] = {};
      }

      if (!newData[category][field]) {
        newData[category][field] = [];
      }

      if (value === null) {
        newData[category][field][index] = "";
        newData[category][field] = newData[category][field].filter(
          (item, idx) => idx !== index
        );
      } else {
        newData[category][field][index] = value;
      }

      return newData;
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
    { value: "Delivered", label: "Delivered" },
    { value: "Processing", label: "Processing" },
    { value: "Pending", label: "Pending" },
    { value: "Canceled", label: "Canceled" },
  ];

  const uniqueArray = (array) => [...new Set(array)];

  // const streamOptions =
  //   uniqueArray(data.Delivery.programStreams)?.map((stream) => ({
  //     value: stream,
  //     label: stream,
  //   })) || [];

  // const facilitatorOptions =
  //   uniqueArray(data.Delivery.facilitators)?.map((facilitator) => ({
  //     value: facilitator,
  //     label: facilitator,
  //   })) || [];

  // const locationOptions =
  //   uniqueArray(data.Delivery.location)?.map((location) => ({
  //     value: location,
  //     label: location,
  //   })) || [];

  // const moduleOptions =
  //   data.Delivery.module?.map((module_id) => ({
  //     value: module_id,
  //     label: module_id,
  //   })) || [];

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
          if (selectedOption) {
            if (
              !updatedPrev[category].schools.some(
                (school) => school.name === selectedOption.value
              )
            ) {
              updatedPrev[category].schools.push({
                name: selectedOption.value,
              });
            }
            updatedPrev[category][field] = { name: selectedOption.value };
          } else {
            updatedPrev[category].schools = updatedPrev[
              category
            ].schools.filter(
              (school) => school.name !== updatedPrev[category][field].name
            );
            updatedPrev[category][field] = null;
          }
        } else {
          if (selectedOption && selectedOption.__isNew__) {
            updatedPrev[category][arrayName] =
              updatedPrev[category][arrayName] || [];
            if (
              !updatedPrev[category][arrayName].includes(selectedOption.value)
            ) {
              updatedPrev[category][arrayName].push(selectedOption.value);
            }
          } else if (!selectedOption) {
            updatedPrev[category][arrayName] = updatedPrev[category][
              arrayName
            ].filter((item) => item !== updatedPrev[category][field]);
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

  // const exhibitionOptions =
  //   data.Delivery.exhibition?.map((exhibition) => ({
  //     value: exhibition,
  //     label: exhibition,
  //   })) || [];

  return (
    <>
      <Modal show={loading}>
        <div>Loading data...</div>
      </Modal>
      <Modal show={updating}>
        <div>Updating data...</div>
      </Modal>
      <Modal show={deleting}>
        <div>Deleting data...</div>
      </Modal>
      <Modal show={creating}>
        <div>Creating new booking...</div>
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
        onClick={() => handleCategoryClick("Delivery", 0)}
      >
        Delivery
      </button>
      <button
        className={`newBookingFilterBtn ${
          activeCategory === "School" ? "active" : ""
        }`}
        onClick={() => handleCategoryClick("School", 1)}
      >
        School
      </button>
      <button
        className={`newBookingFilterBtn ${
          activeCategory === "Bus" ? "active" : ""
        }`}
        onClick={() => handleCategoryClick("Bus", 2)}
      >
        Bus
      </button>
      <button
        className={`newBookingFilterBtn ${
          activeCategory === "Others" ? "active" : ""
        }`}
        onClick={() => handleCategoryClick("Others", 3)}
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
            <label>
              Program Stream <span style={{ color: "red" }}>*</span>:
            </label>
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

                setStreamOptions((prevOptions) => [
                  ...prevOptions,
                  { value: newOption, label: newOption },
                ]);
              }}
              options={streamOptions}
              placeholder="Please select a stream"
              isClearable
              isSearchable
              formatCreateLabel={(inputValue) => `Create "${inputValue}"`}
            />
            {isNew && (
              <label>
                Template<span style={{ color: "red" }}>*</span>:
              </label>
            )}
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
            <label>
              Facilitators<span style={{ color: "red" }}>*</span>:
            </label>
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

                setFacilitatorOptions((prevOptions) => [
                  ...prevOptions,
                  { value: newOption, label: newOption },
                ]);
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

                setLocationOptions((prevOptions) => [
                  ...prevOptions,
                  { value: newOption, label: newOption },
                ]);
              }}
              options={locationOptions}
              placeholder="Please select a location"
              isClearable
              isSearchable
              formatCreateLabel={(inputValue) => `Create "${inputValue}"`}
            />
            <label>
              Program status<span style={{ color: "red" }}>*</span>:
            </label>
            <Select
              components={animatedComponents}
              value={statusOptions.find(
                (option) => option.value === data.Delivery.status
              )}
              onChange={(e) => handleChange("Delivery", "status", e.value)}
              options={statusOptions}
              placeholder="Please select a status"
              isSearchable
            />
            <label>
              Program Date<span style={{ color: "red" }}>*</span>:
            </label>
            <input
              type="date"
              value={data.Delivery.programDate}
              onChange={(e) =>
                handleChange("Delivery", "programDate", e.target.value)
              }
            />

            <label>
              Term<span style={{ color: "red" }}>*</span>:
            </label>
            <select
              value={data.Delivery.term}
              onChange={(e) => handleChange("Delivery", "term", e.target.value)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>

            <label>
              Time (Start)<span style={{ color: "red" }}>*</span>:
            </label>
            <input
              type="time"
              value={data.Delivery.startTime}
              onChange={(e) =>
                handleChange("Delivery", "startTime", e.target.value)
              }
            />

            <label>
              Time (End)<span style={{ color: "red" }}>*</span>:
            </label>
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
                      selectedOption ? selectedOption.value : null
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

                    setModuleOptions((prevOptions) => [
                      ...prevOptions,
                      { value: newOption, label: newOption },
                    ]);
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

            <label>
              Exhibition<span style={{ color: "red" }}>*</span>:
            </label>
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

                setExhibitionOptions((prevOptions) => [
                  ...prevOptions,
                  { value: newOption, label: newOption },
                ]);
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
            <label htmlFor="school-input">
              School Name<span style={{ color: "red" }}>*</span>:
            </label>
            <CreatableSelect
              id="school-input"
              value={
                data.School && data.School.schoolSelect
                  ? schoolOptions.find(
                      (option) => option.value === data.School.schoolSelect.name
                    )
                  : null
              }
              onChange={handleSelectChange("School", "schoolSelect")}
              options={schoolOptions}
              placeholder="Please select a School"
              isClearable
              isSearchable
              formatCreateLabel={(inputValue) => `Add "${inputValue}"`}
            />

            <div className="form-group">
              <label htmlFor="student-year-select">
                Student Years<span style={{ color: "red" }}>*</span>:
              </label>
              <Select
                id="student-year-select"
                value={yearOptions.find(
                  (option) => option.value === data.School.studentYears
                )}
                onChange={handleSelectChange("School", "studentYears")}
                options={yearOptions}
                placeholder="Please select a year"
                isSearchable
              />
            </div>

            <label>
              Student Registered<span style={{ color: "red" }}>*</span>:
            </label>
            <input
              type="number"
              value={data.School.registeredStudents}
              onChange={(e) =>
                handleChange("School", "registeredStudents", e.target.value)
              }
            />

            <label>Student Attended:</label>
            <input
              type="number"
              value={data.School.attendedStudents}
              onChange={(e) =>
                handleChange("School", "attendedStudents", e.target.value)
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
              isSearchable={false}
            />

            <fieldset>
              <legend>School Contact:</legend>
              <label>
                First Name<span style={{ color: "red" }}>*</span>:
              </label>
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

              <label>
                Last Name<span style={{ color: "red" }}>*</span>:
              </label>
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
              <label>
                Email Address<span style={{ color: "red" }}>*</span>:
              </label>
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
              <label>
                Phone Number<span style={{ color: "red" }}>*</span>:
              </label>
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

            <label>
              Accessibility Needs Communicate
              <span style={{ color: "red" }}>*</span>:
            </label>
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
              isSearchable={false}
            />
            <label>Allergen and Anaphylaxis Communicated:</label>
            <textarea
              value={data.Delivery.notes}
              onChange={(e) =>
                handleChange("School", "allergenInfo", e.target.value)
              }
            />

            <label>
              Is Partner School<span style={{ color: "red" }}>*</span>:
            </label>
            <Select
              value={YNoptions.find(
                (option) => option.value === data.School.isPartnerSchool
              )}
              onChange={(selectedOption) =>
                handleChange("School", "isPartnerSchool", selectedOption.value)
              }
              options={YNoptions}
              placeholder="Yes or No"
              isSearchable={false}
            />
          </form>
        )}
        {activeCategory === "Bus" && (
          <form className="newBookingForm">
            <label htmlFor="bus-req">
              BUS REQ<span style={{ color: "red" }}>*</span>:
            </label>
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
        {currentStep < categories.length - 1 && (
          <Button type="next" onClick={handleNextStep}>
            NEXT
          </Button>
        )}
        {currentStep === categories.length - 1 && (
          <>
            {isNew ? (
              <Button type="submit" onClick={handleSubmit}>
                SAVE
              </Button>
            ) : (
              <Button type="submit" onClick={handleUpdate}>
                UPDATE
              </Button>
            )}
            {!isNew && (
              <Button type="delete" onClick={handleDelete}>
                DELETE
              </Button>
            )}
          </>
        )}
      </div>
      )}
    </>
  );
};

export default NewBooking;
