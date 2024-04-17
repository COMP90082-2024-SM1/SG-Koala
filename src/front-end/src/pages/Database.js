import React, { useMemo, useState } from 'react';
import Header from "../components/Header/Header";
import "../styles/Database.css";
import { useTable, useSortBy, useFilters, useGlobalFilter } from 'react-table';
import { Grouped_Columns } from '../components/Table/Column';
import ColumnFilter from '../components/Table/ColumnFilter';
import GlobalFilter from '../components/Table/GlobalFilter';

function Database() {
  const data = useMemo(() => ([
    { id: 1, ProgramStream: 'SCoE: Excursions', Status: 'Delivered', School: 'Aireys Inlet Primary School' , ProgramDate: 'Wed, March 06, 2024', School_repeated: 'Aireys Inlet Primary School', StudentYear: '10', Student: '15', FirstName: 'Bob', LastName: 'Ross', PhoneNumber: '040000000'},
    { id: 2, ProgramStream: 'SCoE: Excursions', Status: 'Delivered', School: 'Antonine College' , ProgramDate: 'Wed, March 06, 2024', School_repeated: 'Antonine College' , StudentYear: '9', Student: '50', FirstName: 'Dwayne', LastName: 'Johnson', PhoneNumber: '0412345678'},
    { id: 3, ProgramStream: 'SCoE: Excursions', Status: 'Delivered', School: 'Beaufort Primary School' , ProgramDate: 'Wed, March 06, 2024', School_repeated: 'Beaufort Primary School', StudentYear: '7,8', Student: '48', FirstName: 'Margot', LastName: 'Robbie', PhoneNumber: '0423584892'},
    { id: 4, ProgramStream: 'STEAM: Excursions', Status: 'Delivered', School: 'Dorset Primary School' , ProgramDate: 'Wed, March 06, 2024', School_repeated: 'Dorset Primary School' , StudentYear: '9', Student: '20', FirstName: 'Elizabeth', LastName: 'Taylor', PhoneNumber: '040000000'}
  ]), []);
  
  const [selectGroup, setSelectGroup] = useState('All');

  const columns = useMemo(() => Grouped_Columns, [])

  const groupOptions = useMemo(() => {
    const options = columns.filter(column => column.columns).map(column => ({
      label: column.Header,
      value: column.Header
    }));
    options.unshift({label: 'All', value: 'All'});
    return options;
  }, [columns]);

  const handleChange = (event) => {
    setSelectGroup(event.target.value);
  };

  const filteredColumns = useMemo(() => {
    const baseColumns = [{
      Header: 'ID',
      accessor: 'id',
      disableFilters: true,
      canSort: false,
  }];
    if (selectGroup === 'All') {
      return columns;
    }
    else {
      const cols = columns.find(column => column.Header === selectGroup)?.columns;
      return baseColumns.concat(cols);
    }
  }, [selectGroup, columns]);

  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter
    }
  }, [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({
    columns: filteredColumns, 
    data, 
    defaultColumn,
  }, useFilters, useGlobalFilter, useSortBy,)

  const { globalFilter } = state

  return (
  <div>
    <Header> Database </Header>
    <div className='bg'>
      <GlobalFilter filter = {globalFilter} setFilter={setGlobalFilter} />
      <select onChange={handleChange} value={selectGroup}>
        {groupOptions.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    <div className='scrollx'>
      <table {...getTableProps()} className='table'>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              { headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} className='th'>
                  {column.render('Header')}
                  {column.canSort && (
                    <button {...column.getSortByToggleProps()}>
                       sort
                      <span>
                          {column.isSorted ? (column.isSortedDesc ? 'Y' : 'N') : ''}
                      </span>
                    </button>
                  )}
                  <div>
                    {column.canFilter ? column.render('Filter') : null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return(
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()} className='td'>
                    {cell.render('Cell')}
                  </td>
                })}
          </tr>
            )
          })} 
        </tbody>
      </table>
    </div>
    </div>
  </div>
  );
}
export default Database;
