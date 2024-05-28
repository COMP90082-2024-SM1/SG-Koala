import { format, parseISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';

export const Grouped_Columns = [
    {
        Header: ' ',
        disableSortBy: true,
        columns: [
            {
               Header: 'ID',
               accessor: data => data.id,
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
                accessor: data => data?.name,
                disableSortBy: false,
            },
            {
                Header: 'Program Stream',
                accessor: data => data?.programStream,
                disableSortBy: true,
            },
            {
                Header: 'Facilitators',
                accessor: data => data?.facilitators,
                disableSortBy: true,
            },
            {
                Header: 'Event',
                accessor: data => data?.event,
                disableSortBy: true,
                disableFilters: true,
            },
            {
                Header: 'Status',
                accessor: 'status',
                disableSortBy: true,
                disableFilters: true,
            },
            {
                Header: 'Location',
                accessor: data => data?.location,
                disableSortBy: true,
            },
            {
                Header: 'Program Date',
                accessor: data => data?.date,
                disableSortBy: false,
                Cell: ({ value }) => { return format(new Date(value), 'dd/MM/yyyy')}
            },
            {
                Header: 'Term',
                accessor: data => data?.term,
                disableSortBy: true,
                disableFilters: true,
            },
            {
                Header: 'Start Time',
                accessor: data => data?.startTime,
                disableSortBy: false,
                Cell: ({ value }) => { 
                    const date = parseISO(value);
                    return formatInTimeZone(date, 'UTC', 'dd/MM/yyyy HH:mm:ss');
                }
            },
            {
                Header: 'End Time',
                accessor: data => data?.endTime,
                disableSortBy: false,
                Cell: ({ value }) => { 
                    const date = parseISO(value);
                    return formatInTimeZone(date, 'UTC', 'dd/MM/yyyy HH:mm:ss');
                }
            },
            {
                Header: 'Module 1',
                accessor: data => data.module_id?.module1,
                disableSortBy: true,
            },
            {
                Header: 'Module 2',
                accessor: data => data.module_id?.module2,
                disableSortBy: true,
            },
            {
                Header: 'Module 3',
                accessor: data => data.module_id?.module3,
                disableSortBy: true,
            },
            {
                Header: 'Exibition',
                accessor: data => data?.exibition,
                disableSortBy: true,
                disableFilters: true,
            },
            {
                Header: 'Note',
                accessor: data => data?.note,
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
                accessor: data => data.school?.name,
                disableSortBy: false,
            },
            {
                Header: 'Student Year',
                accessor: data => data.school?.studentYear,
                disableSortBy: false,
            },
            {
                Header: 'Student (Registered)',
                accessor: data => data.school?.numStudentRegistered,
                disableSortBy: false,
                disableFilters: true,
            },
            {
                Header: 'Student Hrs (Registered)',
                accessor: data => data.school?.hourRegistered,
                disableSortBy: false,
                disableFilters: true,
            },
            {
                Header: 'Student (Attended)',
                accessor: data => data.school?.numStudentAttended,
                disableSortBy: false,
                disableFilters: true,
            },
            {
                Header: 'Student Hrs (Attended)',
                accessor: data => data.school?.hourAttended,
                disableSortBy: false,
                disableFilters: true,
            },
            {
                Header: 'Low SES',
                accessor: data => data.school?.lowSES,
                disableSortBy: true,
                Cell: ({ value }) => value ? "Yes" : "No",
                disableFilters: true,
            },
            {
                Header: 'Is Partner School',
                accessor: data => data.school?.isPartner,
                disableSortBy: true,
                Cell: ({ value }) => value ? "Yes" : "No",
                disableFilters: true,
            },
            {
                Header: 'Accessibility Needs',
                accessor: data => data.school?.isAccessibility,
                disableSortBy: true,
                Cell: ({ value }) => value ? "Yes" : "No",
                disableFilters: true,
            },
            {
                Header: 'Allergy',
                accessor: data => data.school?.isAllergy,
                disableSortBy: true,
                Cell: ({ value }) => value ? "Yes" : "No",
                disableFilters: true,
            },
            {
                Header: 'Additional Comments',
                accessor: data => data.school?.note,
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
                accessor: data => data.school?.contactFirstName,
                disableSortBy: false,
            },
            {
                Header: 'Last Name',
                accessor: data => data.school?.contactLastName,
                disableSortBy: false,
            },
            {
                Header: 'Email',
                accessor: data => data.school?.email,
                disableSortBy: true,
                disableFilters: true,
            },
            {
                Header: 'Phone Number',
                accessor: data => data.school?.phone,
                disableSortBy: true,
                disableFilters: true,
            }
        ]
    },
    {
        Header: 'Bus',
        disableSortBy: true,
        columns: [
            {
                Header: 'Is required',
                accessor: data => data.bus?.bus_req,
                disableSortBy: true,
                Cell: ({ value }) => value ? "Yes" : "No",
                disableFilters: true,
            },
            {
                Header: 'Is Booked',
                accessor: data => data.bus?.isBooked,
                disableSortBy: true,
                Cell: ({ value }) => value ? "Yes" : "No",
                disableFilters: true,
            },
            {
                Header: 'Status',
                accessor: data => data.bus?.status,
                disableSortBy: true,
                disableFilters: true,
            },
            {
                Header: 'Price',
                accessor: data => data.bus?.price,
                disableSortBy: false,
                disableFilters: true,
            },
            {
                Header: 'Date Paid',
                accessor: data => data.bus?.date_paid,
                disableSortBy: false,
                Cell: ({ value }) => { return format(new Date(value), 'dd/MM/yyyy')},
                disableFilters: true,
            },
            {
                Header: 'Invoice',
                accessor: data => data.bus?.invoice,
                disableSortBy: true,
                disableFilters: true,
            },
        ]
    },
    {
        Header: 'Bugdet',
        disableSortBy: true,
        columns: [
            {
                Header: '$ Per Student',
                accessor: data => data?.per_student,
                disableSortBy: false,
                disableFilters: true,
            },
            {
                Header: 'Expense',
                accessor: data => data?.expense,
                disableSortBy: false,
                disableFilters: true,
            },
            {
                Header: 'Income',
                accessor: data => data?.income,
                disableSortBy: false,
                disableFilters: true,
            },
            {
                Header: 'Profit',
                accessor: data => data?.profit,
                disableSortBy: false,
                disableFilters: true,
            },
        ]
    }
    
]