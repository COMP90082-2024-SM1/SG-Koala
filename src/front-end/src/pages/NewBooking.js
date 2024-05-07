import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import "../styles/NewBooking.css";
import {
  getAllTemplates,
  getAllMiscellaneous,
  getAllSchool,
  createNewBooking,
  createNewSchool,
  createNewChecklist,
  getBookingById,
  getSchoolById,
  getChecklistById,
} from "../api/NewbookingAPI";
import { Button } from "../components/Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import TemplateDetail from "./TemplateDetail";

const NewBooking = ({ isNew = false }) => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("Delivery");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [autoFillData, setAutoFillData] = useState("");
  // this should be parse as props
  //const [isNew, setIsNew] = useState(false);
  const { bookingId } = useParams();
  const [oneBooking, setOneBooking] = useState();

  const [data, setData] = useState({
    Delivery: {
      streamSelect: "",
      facilitatorsSelect: "",
      locationSelect: "",
      moduleSelects: ["", "", ""],
      exhibitionSelect: "",
      templateSelect: "",
      term: 1,
    },
    School: {
      schoolSelect: "",
      studentYears: [],
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
      profit: "",
    },
  });

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleGenerate = () => {
    console.log(autoFillData);
    closePopup();
  };

  const handleToggleYear = (year) => {
    setData((prev) => {
      const yearNumber = parseInt(year);

      const newYears = prev.School.studentYears.includes(yearNumber)
        ? prev.School.studentYears.filter((y) => y !== yearNumber)
        : [...prev.School.studentYears, yearNumber];

      return {
        ...prev,
        School: {
          ...prev.School,
          studentYears: newYears,
        },
      };
    });
  };

  const years = Array.from({ length: 6 }, (_, i) => 7 + i);

  useEffect(() => {
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
        })
        .catch((error) => console.error("Error fetching data:", error));
    } else {
      Promise.all([
        getAllMiscellaneous(),
        getAllSchool(),
        getBookingById(bookingId),
      ])
        .then(([miscellaneousData, schoolData, bookingData]) => {
          setOneBooking(bookingData);
          // booking details does not match the database structure
          setData((prev) => ({
            ...prev,
            Delivery: {
              streamSelect: bookingData.programStream,
              facilitatorsSelect: bookingData.facilitators,
              locationSelect: bookingData.location,
              moduleSelects: bookingData.module_id,
              exhibitionSelect: bookingData.exibition,
              templateSelect: bookingData.checklist.name,
              term: bookingData.term,

              programStreams: miscellaneousData.program_stream,
              facilitators: miscellaneousData.facilitators,
              location: miscellaneousData.delivery_location,
              module: miscellaneousData.module,
              exhibition: miscellaneousData.exhibition,
              //templates: templateData,
            },
            School: {
              ...prev.School,
              schoolSelect: bookingData.school.name,
              studentYears: [bookingData.school.studentYear],
              lowSES: bookingData.school.lowSES,
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const test = "1111";

    const startDate = formatDateTime(
      data.Delivery.programDate,
      data.Delivery.startTime
    );
    const endDate = formatDateTime(
      data.Delivery.programDate,
      data.Delivery.endTime
    );

    const schoolData = {
      name: data.School.schools.find(
        (school) => school.id === data.School.schoolSelect
      )?.name,
      studentYear: data.School.studentYears[0],
      numStudentRegistered: parseInt(data.School.registeredStudents),
      lowSES: data.School.lowSES === "Y",
      // allergy: data.School.allergy === 'Y',
      contactFirstName: data.School.contactInfo.firstName,
      contactLastName: data.School.contactInfo.lastName,
      email: data.School.contactInfo.email,
      phone: data.School.contactInfo.phoneNumber,
      note: data.School.additionalComments,
      isAccessibility: data.School.accessibilityNeeds === "Y",
      isAllergy: data.School.allergenInfo === "Y",
      isPartner: data.School.isPartnerSchool === "Y",
      allergy: test,
    };

    const schoolId = await createNewSchool(schoolData);

    const checklistId = await createNewChecklist(data.Delivery.templateSelect);
    const schoolIdValue = schoolId._id;

    const checklistvalue = checklistId._id;
    console.log(checklistId);
    console.log(checklistvalue);

    const bus_test_status = 1;
    const busData = {
      busReq: data.Bus.busReq === "Y", //
      isBooked: data.Bus.busBooked === "Y", //
      status: bus_test_status, //
      price: parseFloat(data.Bus.price), //
      date_paid: data.Bus.datePaid, //
      invoice: data.Bus.invoiceNumber, //
      // savedReceipt: data.Bus.savedReceipt === 'Y',
      // expenseMaster: data.Bus.expenseMaster === 'Y',
      // pinEmail: data.Bus.pinEmail === 'Y'
    };

    //   {
    //     "name": "LLC",
    //     "programStream": "SCOE",
    //     "facilitators": "MATT",
    //     "event": "indeed",
    //     "status": "Delivered",
    //     "term": 2,
    //     "location": "D ROOM1",
    //     "date": "2024-07-10T04:23:49",
    //     "checklist_id": "6628aca124b776b1cf539550",
    //     "startTime": "2024-01-08T07:42:47",
    //     "endTime": "2024-01-08T08:43:48",
    //     "module_id": [
    //         "module1"
    //     ],
    //     "school_id": "6628aa7124b776b1cf539541",
    //     "exibition": "exibition",
    //     "note": "Stay us raise hard. Seem should report. Shoulder issue challenge home drive than.\nPart order build can too. By history grow yard. Suggest hope him military leader example.",
    //     "bus": {
    //         "bus_req": false,
    //         "isBooked": false,
    //         "status": 1,
    //         "price": 166.43,
    //         "date_paid": "2024-02-12T08:00:30",
    //         "invoice": "INV-FkRKB-298"
    //     },
    //     "per_student": 29,
    //     "expense": 4864,
    //     "income": 2002,
    //     "profit": 453
    // }

    const event_test = "test";
    const status = "Processing";
    const module_test = ["module1"];
    const sid = "6628aa7124b776b1cf539541";
    const st = "2024-01-08T07:42:47";
    const et = "2024-01-08T08:43:48";
    const bookingData = {
      event: event_test, //
      status: status, //
      name: data.School.schools.find(
        (school) => school.id === data.School.schoolSelect
      )?.name, //
      // school_id: data.School.schoolSelect, //
      school_id: schoolIdValue,
      programStream: data.Delivery.streamSelect, //
      checklist_id: checklistvalue, //
      facilitators: data.Delivery.facilitatorsSelect, //
      location: data.Delivery.locationSelect, //
      date: data.Delivery.programDate, //
      term: parseInt(data.Delivery.term, 10), // +
      // startTime: data.Delivery.startTime,
      // endTime: data.Delivery.endTime,
      startTime: startDate,
      endTime: endDate,
      module_id: module_test, //
      exibition: data.Delivery.exhibitionSelect, //
      note: data.Delivery.notes, //
      bus: busData, //
      per_student: parseInt(data.Others.perStudent), //
      expense: parseFloat(data.Others.expenses), //
      income: parseFloat(data.Others.income), //
      profit: parseFloat(data.Others.profit), //
    };
    console.log(bookingData);

    try {
      const response = await createNewBooking(bookingData);
      console.log("Booking created successfully!", response);
      navigate("/dashboard");
    } catch (error) {
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
    setData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: [
          ...prev[category][field].slice(0, index),
          value,
          ...prev[category][field].slice(index + 1),
        ],
      },
    }));
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

  return (
    <>
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
            <select
              value={data.Delivery.streamSelect}
              onChange={(e) =>
                handleChange("Delivery", "streamSelect", e.target.value)
              }
            >
              <option value="">Please select a stream</option>
              {data.Delivery.programStreams &&
                data.Delivery.programStreams.map((stream, index) => (
                  <option key={index} value={stream}>
                    {stream}
                  </option>
                ))}
            </select>

            <label>Template:</label>
            <select
              value={data.Delivery.templateSelect}
              onChange={(e) =>
                handleChange("Delivery", "templateSelect", e.target.value)
              }
            >
              <option value="" disabled>
                Please select a template
              </option>
              {!bookingId &&
                data.Delivery.templates &&
                data.Delivery.templates.map((template, index) => (
                  <option key={index} value={template.id}>
                    {template.name}
                  </option>
                ))}
            </select>

            <label>Facilitators:</label>
            <select
              value={data.Delivery.facilitatorsSelect}
              onChange={(e) =>
                handleChange("Delivery", "facilitatorsSelect", e.target.value)
              }
            >
              <option value="">Please select facilitators</option>
              {data.Delivery.facilitators &&
                data.Delivery.facilitators.map((facilitator, index) => (
                  <option key={index} value={facilitator}>
                    {facilitator}
                  </option>
                ))}
            </select>

            <label>Delivery Location:</label>
            <select
              value={data.Delivery.locationSelect}
              onChange={(e) =>
                handleChange("Delivery", "locationSelect", e.target.value)
              }
            >
              <option value="">Please select a location</option>
              {data.Delivery.location &&
                data.Delivery.location.map((location, index) => (
                  <option key={index} value={location}>
                    {location}
                  </option>
                ))}
            </select>

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
            </select>

            <label>Time (Start):</label>
            <input
              type="time"
              value={data.Delivery.startTime}
              onChange={(e) =>
                handleChange("Delivery", "startTime", e.target.value)
              }
            />

            <label>Time (End):</label>
            <input
              type="time"
              value={data.Delivery.endTime}
              onChange={(e) =>
                handleChange("Delivery", "endTime", e.target.value)
              }
            />

            {["Module 1", "Module 2", "Module 3"].map((label, index) => (
              <React.Fragment key={label}>
                <label>{label}:</label>
                <select
                  value={data.Delivery.moduleSelects[index]}
                  onChange={(e) =>
                    handleMultiSelectChange(
                      "Delivery",
                      "moduleSelects",
                      index,
                      e.target.value
                    )
                  }
                >
                  <option value="">Please select a module</option>
                  {data.Delivery.module &&
                    data.Delivery.module.map((module, modIndex) => (
                      <option key={modIndex} value={module}>
                        {module}
                      </option>
                    ))}
                </select>
              </React.Fragment>
            ))}

            <label>Exhibition:</label>
            <select
              value={data.Delivery.exhibitionSelect}
              onChange={(e) =>
                handleChange("Delivery", "exhibitionSelect", e.target.value)
              }
            >
              <option value="">Please select an exhibition</option>
              {data.Delivery.exhibition &&
                data.Delivery.exhibition.map((exhibition, index) => (
                  <option key={index} value={exhibition}>
                    {exhibition}
                  </option>
                ))}
            </select>

            <label>Amendments/Notes:</label>
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
            <select
              value={data.School.schoolSelect}
              onChange={(e) => {
                const selectedSchoolId = e.target.value;
                const selectedSchool = data.School.schools.find(
                  (school) => school.id === selectedSchoolId
                );
                handleChange("School", "schoolSelect", selectedSchoolId);
                handleChangeNested("School", "school", "id", selectedSchoolId);
                handleChangeNested(
                  "School",
                  "school",
                  "name",
                  selectedSchool?.name
                );
              }}
            >
              <option value="" disabled>
                Please select a school
              </option>
              {data.School.schools.map((school, index) => (
                <option key={index} value={school.id}>
                  {school.name}
                </option>
              ))}
            </select>

            <div className="form-group">
              <span id="newBookingStudentYear">Student Years:</span>
              {years.map((year) => (
                <div key={year} className="checkbox-container">
                  <input
                    type="checkbox"
                    id={year}
                    checked={data.School.studentYears.includes(year)}
                    onChange={() => handleToggleYear(year)}
                  />
                  <label htmlFor={year} className="checkbox-label">
                    {year}
                  </label>
                </div>
              ))}
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
            <select
              value={data.School.lowSES}
              onChange={(e) => handleChange("School", "lowSES", e.target.value)}
            >
              <option value="" disabled>
                Yes or No
              </option>
              <option value="Y">Yes</option>
              <option value="N">No</option>
            </select>

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
            <select
              value={data.School.accessibilityNeeds}
              onChange={(e) =>
                handleChange("School", "accessibilityNeeds", e.target.value)
              }
            >
              <option value="" disabled>
                Yes or No
              </option>
              <option value="Y">Yes</option>
              <option value="N">No</option>
            </select>

            <label>Allergen and Anaphylaxis Communicated:</label>
            <select
              value={data.School.allergenInfo}
              onChange={(e) =>
                handleChange("School", "allergenInfo", e.target.value)
              }
            >
              <option value="" disabled>
                Yes or No
              </option>
              <option value="Y">Yes</option>
              <option value="N">No</option>
            </select>

            <label>Is Partner School:</label>
            <select
              value={data.School.isPartnerSchool}
              onChange={(e) =>
                handleChange("School", "isPartnerSchool", e.target.value)
              }
            >
              <option value="" disabled>
                Yes or No
              </option>
              <option value="Y">Yes</option>
              <option value="N">No</option>
            </select>
          </form>
        )}

        {activeCategory === "Bus" && (
          <form className="newBookingForm">
            <label htmlFor="bus-req">BUS REQ:</label>
            <select
              id="bus-req"
              value={data.Bus.busReq}
              onChange={(e) => handleChange("Bus", "busReq", e.target.value)}
            >
              <option value="">Yes or No</option>
              <option value="Y">Yes</option>
              <option value="N">No</option>
            </select>

            <label>BUS BOOKED:</label>
            <select
              id="bus-booked"
              value={data.Bus.busBooked}
              onChange={(e) => handleChange("Bus", "busBooked", e.target.value)}
            >
              <option value="">Yes or No</option>
              <option value="Y">Yes</option>
              <option value="N">No</option>
            </select>

            <label htmlFor="status">Status:</label>
            <select
              id="status"
              value={data.Bus.status}
              onChange={(e) => handleChange("Bus", "status", e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="paid">Paid</option>
              <option value="processing">Processing</option>
            </select>

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
              onChange={(e) => handleChange("Bus", "datePaid", e.target.value)}
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

            <div className="checkbox-container">
              <input
                type="checkbox"
                id="saved-receipt"
                checked={data.Bus.savedReceipt === "Y"}
                onChange={(e) =>
                  handleChange(
                    "Bus",
                    "savedReceipt",
                    e.target.checked ? "Y" : "N"
                  )
                }
              />
              <label htmlFor="saved-receipt">Saved Receipt:</label>
            </div>

            <div className="checkbox-container">
              <input
                type="checkbox"
                id="enter-into-expense-master"
                checked={data.Bus.enterIntoExpenseMaster === "Y"}
                onChange={(e) =>
                  handleChange(
                    "Bus",
                    "enterIntoExpenseMaster",
                    e.target.checked ? "Y" : "N"
                  )
                }
              />
              <label htmlFor="enter-into-expense-master">
                Enter into Expense Master:
              </label>
            </div>

            <div className="checkbox-container">
              <input
                type="checkbox"
                id="pin-categorise-email"
                checked={data.Bus.pinCategoriseEmail === "Y"}
                onChange={(e) =>
                  handleChange(
                    "Bus",
                    "pinCategoriseEmail",
                    e.target.checked ? "Y" : "N"
                  )
                }
              />
              <label htmlFor="pin-categorise-email">
                Pin/Categorise Email:
              </label>
            </div>
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

            <label htmlFor="profit">Profit:</label>
            <input
              id="profit"
              type="number"
              value={data.Others.profit}
              onChange={(e) => handleChange("Others", "profit", e.target.value)}
            />
          </form>
        )}
      </div>
      {activeCategory !== "Checklist" && (
        <div className="newBookingButtons">
          <Button type="discard" onClick={handleDiscard}>
            DISCARD
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            SAVE
          </Button>
        </div>
      )}
    </>
  );
};

export default NewBooking;
