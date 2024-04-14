import React, { useState } from 'react';
import Header from "../components/Header/Header";
import "../styles/NewBooking.css";

const NewBooking = () => {
  const [activeCategory, setActiveCategory] = useState('Delivery');
  const [schoolName, setSchoolName] = useState('');
  const [selectedYears, setSelectedYears] = useState([]);

  const [busReq, setBusReq] = useState('');
  const [status, setStatus] = useState('');
  const [price, setPrice] = useState('');
  const [datePaid, setDatePaid] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [savedReceipt, setSavedReceipt] = useState('N');
  const [enterIntoExpenseMaster, setEnterIntoExpenseMaster] = useState('N');
  const [pinCategoriseEmail, setPinCategoriseEmail] = useState('N');
  const [perStudent, setPerStudent] = useState('');
const [expenses, setExpenses] = useState('');
const [income, setIncome] = useState('');
const [profit, setProfit] = useState('');

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const schoolList = ['GWSC', 'MTC', 'MIT', 'UOM', 'MGC', 'BHC', 'BWC', 'MOC'];

  const handleYearToggle = (year) => {
    if (selectedYears.includes(year)) {
      setSelectedYears(selectedYears.filter(y => y !== year)); 
    } else {
      setSelectedYears([...selectedYears, year]); 
    }
  };
  const years = Array.from({ length: 6 }, (_, i) => `Year ${7 + i}`);

  return (
    <>
      <Header>Create New Booking</Header>
      <div className='newBookingFilterSection'>
        <button className={`newBookingFilterBtn ${activeCategory === 'Delivery' ? 'active' : ''}`} onClick={() => handleCategoryClick('Delivery')}>Delivery</button>
        <button className={`newBookingFilterBtn ${activeCategory === 'School' ? 'active' : ''}`} onClick={() => handleCategoryClick('School')}>School</button>
        <button className={`newBookingFilterBtn ${activeCategory === 'Bus' ? 'active' : ''}`} onClick={() => handleCategoryClick('Bus')}>Bus</button>
        <button className={`newBookingFilterBtn ${activeCategory === 'Others' ? 'active' : ''}`} onClick={() => handleCategoryClick('Others')}>Others</button>
      </div>
      <div>
        {activeCategory === 'Delivery' && (
          <form>
            <label>Program Stream:</label>
            <select>
              <option value="SCoE">SCoE</option>
              <option value="STEAM">STEAM</option>
              <option value="ART">ART</option>
            </select>
            <label>Facilitators:</label>
            <input type="text" />
            <label>Delivery Location:</label>
            <select>
              <option value="Location 1">Location 1</option>
              <option value="Location 2">Location 2</option>
              <option value="Location 3">Location 3</option>
              <option value="Location 4">Location 4</option>
            </select>
            <label>Program Date:</label>
            <input type="date" />
            <label>Term:</label>
            <input type="number" min="1" max="2" />
            <label>Time (Start):</label>
            <input type="time" />
            <label>Time (End):</label>
            <input type="time" />
            <label>Module 1:</label>
            <select>
              <option value="module 1">module 1</option>
              <option value="module 2">module 2</option>
              <option value="module 3">module 3</option>
            </select>
            <label>Module 2:</label>
            <select>
              <option value="module 1">module 1</option>
              <option value="module 2">module 2</option>
              <option value="module 3">module 3</option>
            </select>
            <label>Module 3:</label>
            <select>
              <option value="module 1">module 1</option>
              <option value="module 2">module 2</option>
              <option value="module 3">module 3</option>
            </select>
            <label>Exhibition:</label>
            <input type="text" />
            <label>Amendments/Notes:</label>
            <textarea />
            <button type="submit">Submit</button>
          </form>
        )}
        {activeCategory === 'School' && (
          <form>
            <label>School Name:</label>
            <input list="schools" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} />
            <datalist id="schools">
              {schoolList.map((school, index) => (
                <option key={index} value={school} />
              ))}
            </datalist>
            <div className="form-group">
            <span id="newBookingStudentYear">Student Years:</span>
            {years.map(year => (
              <div key={year} className="checkbox-container">
                <input
                  type="checkbox"
                  id={year}
                  checked={selectedYears.includes(year)}
                  onChange={() => handleYearToggle(year)}
                />
                <label htmlFor={year} className="checkbox-label">{year}</label>
              </div>
            ))}
          </div>



            <label>Student # (registered):</label>
            <input type="number" />

            <label>Low SES:</label>
            <select>
              <option value="Y">Yes</option>
              <option value="N">No</option>
            </select>

            <fieldset>
              <legend>School Contact:</legend>
              <label>First Name:</label>
              <input type="text" />
              <label>Last Name:</label>
              <input type="text" />
              <label>Email Address:</label>
              <input type="email" />
              <label>Phone Number:</label>
              <input type="tel" />
              <label>Teaching Area/Job Title:</label>
              <input type="text" />
            </fieldset>

            <label>Additional Comments:</label>
            <textarea />

            <label>Accessibility Needs Communicated:</label>
            <select>
              <option value="Y">Yes</option>
              <option value="N">No</option>
            </select>

            <label>Allergen and Anaphylaxis Communicated:</label>
            <input type="text" />

            <label>Is Partner School:</label>
            <select>
              <option value="Y">Yes</option>
              <option value="N">No</option>
            </select>

            <button type="submit">Submit</button>
          </form>
        )}


        {activeCategory === 'Bus' && (
          <form>
            <label htmlFor="bus-req">BUS REQ:</label>
            <input id="bus-req" type="text" value={busReq} onChange={(e) => setBusReq(e.target.value)} />

            <label>BUS BOOKED:</label>
            <select>
              <option value="Y">Yes</option>
              <option value="N">No</option>
            </select>

            <label htmlFor="status">Status:</label>
            <select id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="paid">paid</option>
              <option value="processing">processing</option>
            </select>

            <label htmlFor="price">Price:</label>
            <input id="price" type="text" value={price} onChange={(e) => setPrice(e.target.value)} />

            <label htmlFor="date-paid">Date Paid:</label>
            <input id="date-paid" type="date" value={datePaid} onChange={(e) => setDatePaid(e.target.value)} />

            <label htmlFor="invoice-number">Invoice #:</label>
            <input id="invoice-number" type="text" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} />

            <div className="checkbox-container">
              <input
                type="checkbox"
                id="saved-receipt"
                checked={savedReceipt === 'Y'}
                onChange={(e) => setSavedReceipt(e.target.checked ? 'Y' : 'N')}
              />
              <label htmlFor="saved-receipt">Saved Receipt:</label>
            </div>

            <div className="checkbox-container">
              <input
                type="checkbox"
                id="enter-into-expense-master"
                checked={enterIntoExpenseMaster === 'Y'}
                onChange={(e) => setEnterIntoExpenseMaster(e.target.checked ? 'Y' : 'N')}
              />
              <label htmlFor="enter-into-expense-master">Enter into Expense Master:</label>
            </div>

            <div className="checkbox-container">
              <input
                type="checkbox"
                id="pin-categorise-email"
                checked={pinCategoriseEmail === 'Y'}
                onChange={(e) => setPinCategoriseEmail(e.target.checked ? 'Y' : 'N')}
              />
              <label htmlFor="pin-categorise-email">Pin/Categorise Email:</label>
            </div>

            <button type="submit">Submit</button>
          </form>
        )}


        {activeCategory === 'Others' && (
          <form>
            <label htmlFor="per-student">Per Student:</label>
            <input id="per-student" type="number" value={perStudent} onChange={(e) => setPerStudent(e.target.value)} />

            <label htmlFor="expenses">Expenses:</label>
            <input id="expenses" type="number" value={expenses} onChange={(e) => setExpenses(e.target.value)} />

            <label htmlFor="income">Income:</label>
            <input id="income" type="number" value={income} onChange={(e) => setIncome(e.target.value)} />

            <label htmlFor="profit">Profit:</label>
            <input id="profit" type="number" value={profit} onChange={(e) => setProfit(e.target.value)} />

            <button type="submit">Submit</button>
          </form>
        )}
      </div>
    </>
  );
};

export default NewBooking;
