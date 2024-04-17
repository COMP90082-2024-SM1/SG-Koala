
export const Grouped_Columns = [
    {
        Header: 'ID',
        accessor: 'id',
        disableFilters: true,
        canSort: false,
    },
    {
        Header: 'Delivery',
        canSort: false,
        disableFilters: true,
        columns: [
            {
                Header: 'Program Stream',
                accessor: 'ProgramStream',
                canSort: true,
            },
            {
                Header: 'Status',
                accessor: 'Status',
                canSort: true,
            },
            {
                Header: 'School',
                accessor: 'School',
                canSort: true,
            },
            {
                Header: 'Program Date',
                accessor: 'ProgramDate',
                canSort: true,
            },
        ]
    },
    {
        Header: 'Cohort',
        canSort: false,
        disableFilters: true,
        columns: [
            {
                Header: 'School',
                accessor: 'School_repeated',
                canSort: true,
            },
            {
                Header: 'Student Year',
                accessor: 'StudentYear',
                canSort: true,
            },
            {
                Header: 'Student',
                accessor: 'Student',
                canSort: true,
            },
        ]
    },
    {
        Header: 'Contact',
        canSort: false,
        disableFilters: true,
        columns: [
            {
                Header: 'First Name',
                accessor: 'FirstName',
                canSort: true,
            },
            {
                Header: 'Last Name',
                accessor: 'LastName',
                canSort: true,
            },
            {
                Header: 'Phone Number',
                accessor: 'PhoneNumber',
                canSort: true,
            }
        ]
    }
    
]