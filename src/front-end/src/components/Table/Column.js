import { format, parseISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

export const Grouped_Columns = [
    {
        Header: ' ',
        disableSortBy: true,
        columns: [
            {
               Header: 'ID',
               accessor: 'id',
               disableSortBy: true, 
            }
        ]   
    },
    {
        Header: 'Delivery',
        disableSortBy: true,
        columns: [
            {
                Header: 'Name',
                accessor: 'name',
                disableSortBy: false,
            },
            {
                Header: 'Program Stream',
                accessor: 'programStream',
                disableSortBy: true,
            },
            {
                Header: 'Facilitators',
                accessor: 'facilitators',
                disableSortBy: true,
            },
            {
                Header: 'Event',
                accessor: 'event',
                disableSortBy: true,
            },
            {
                Header: 'Status',
                accessor: 'status',
                disableSortBy: true,
            },
            {
                Header: 'Location',
                accessor: 'location',
                disableSortBy: true,
            },
            {
                Header: 'Program Date',
                accessor: 'date',
                disableSortBy: false,
                Cell: ({ value }) => { return format(new Date(value), 'dd/MM/yyyy')}
            },
            {
                Header: 'Term',
                accessor: 'term',
                disableSortBy: true,
            },
            {
                Header: 'Start Time',
                accessor: 'startTime',
                disableSortBy: false,
                Cell: ({ value }) => { 
                    const date = parseISO(value);
                    return formatInTimeZone(date, 'UTC', 'dd/MM/yyyy HH:mm:ss');
                }
            },
            {
                Header: 'End Time',
                accessor: 'endTime',
                disableSortBy: false,
                Cell: ({ value }) => { 
                    const date = parseISO(value);
                    return formatInTimeZone(date, 'UTC', 'dd/MM/yyyy HH:mm:ss');
                }
            },
            {
                Header: 'Module 1',
                accessor: data => data.module_id.module1,
                disableSortBy: true,
            },
            {
                Header: 'Module 2',
                accessor: data => data.module_id.module2,
                disableSortBy: true,
            },
            {
                Header: 'Module 3',
                accessor: data => data.module_id.module3,
                disableSortBy: true,
            },
            {
                Header: 'Exibition',
                accessor: 'exibition',
                disableSortBy: true,
            },
            {
                Header: 'Note',
                accessor: 'note',
                disableSortBy: true,
                disableFilters: true,
            },
        ]
    },
    {
        Header: 'Cohort',
        disableSortBy: true,
        columns: [
            {
                Header: 'School Name',
                accessor: data => data.school.name,
                disableSortBy: false,
            },
            {
                Header: 'Student Year',
                accessor: data => data.school.studentYear,
                disableSortBy: false,
            },
            {
                Header: 'Student (Registered)',
                accessor: data => data.school.numStudentRegistered,
                disableSortBy: false,
            },
            {
                Header: 'Student Hrs (Registered)',
                accessor: data => data.school.hourRegistered,
                disableSortBy: false,
            },
            {
                Header: 'Student (Attended)',
                accessor: data => data.school.numStudentAttended,
                disableSortBy: false,
            },
            {
                Header: 'Student Hrs (Attended)',
                accessor: data => data.school.hourAttended,
                disableSortBy: false,
            },
            {
                Header: 'Low SES',
                accessor: data => data.school.lowSES,
                disableSortBy: true,
                Cell: ({ value }) => value ? "Yes" : "No",
            },
            {
                Header: 'Is Partner School',
                accessor: data => data.school.isPartner,
                disableSortBy: true,
                Cell: ({ value }) => value ? "Yes" : "No",
            },
            {
                Header: 'Accessibility Needs',
                accessor: data => data.school.isAccessibility,
                disableSortBy: true,
                Cell: ({ value }) => value ? "Yes" : "No",
            },
            {
                Header: 'Allergy',
                accessor: data => data.school.isAllergy,
                disableSortBy: true,
                Cell: ({ value }) => value ? "Yes" : "No",
            },
            {
                Header: 'Additional Comments',
                accessor: data => data.school.note,
                disableSortBy: true,
                disableFilters: true,
            },
        ]
    },
    {
        Header: 'Contact',
        disableSortBy: true,
        columns: [
            {
                Header: 'First Name',
                accessor: data => data.school.contactFirstName,
                disableSortBy: false,
            },
            {
                Header: 'Last Name',
                accessor: data => data.school.contactLastName,
                disableSortBy: false,
            },
            {
                Header: 'Email',
                accessor: data => data.school.email,
                disableSortBy: true,
            },
            {
                Header: 'Phone Number',
                accessor: data => data.school.phone,
                disableSortBy: true,
            }
        ]
    },
    {
        Header: 'Bus',
        disableSortBy: true,
        columns: [
            {
                Header: 'Is required',
                accessor: data => data.bus.bus_req,
                disableSortBy: true,
                Cell: ({ value }) => value ? "Yes" : "No",
            },
            {
                Header: 'Is Booked',
                accessor: data => data.bus.isBooked,
                disableSortBy: true,
                Cell: ({ value }) => value ? "Yes" : "No",
            },
            {
                Header: 'Status',
                accessor: data => data.bus.status,
                disableSortBy: true,
            },
            {
                Header: 'Price',
                accessor: data => data.bus.price,
                disableSortBy: false,
            },
            {
                Header: 'Date Paid',
                accessor: data => data.bus.date_paid,
                disableSortBy: false,
                Cell: ({ value }) => { return format(new Date(value), 'dd/MM/yyyy')},
            },
            {
                Header: 'Invoice',
                accessor: data => data.bus.invoice,
                disableSortBy: true,
            },
        ]
    },
    {
        Header: 'Bugdet',
        disableSortBy: true,
        columns: [
            {
                Header: '$ Per Student',
                accessor: 'per_student',
                disableSortBy: false,
            },
            {
                Header: 'Expense',
                accessor: 'expense',
                disableSortBy: false,
            },
            {
                Header: 'Income',
                accessor: 'income',
                disableSortBy: false,
            },
            {
                Header: 'Profit',
                accessor: 'profit',
                disableSortBy: false,
            },
        ]
    }
    
]