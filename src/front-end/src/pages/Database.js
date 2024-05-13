import React, { useEffect, useMemo, useState } from 'react';
import Header from "../components/Header/Header";
import "../styles/Database.css";
import { useTable, useSortBy, useFilters, useGlobalFilter, usePagination } from 'react-table';
import { Grouped_Columns } from '../components/Table/Column';
import { Popover } from "@material-ui/core";
import ColumnFilter from '../components/Table/ColumnFilter';
import GlobalFilter from '../components/Table/GlobalFilter';
import { TypographyParagraph, } from "../components/Typography/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faSortUp, faSortDown, faTableColumns } from "@fortawesome/free-solid-svg-icons";
import { getAllBooking } from "../api/NewbookingAPI";

function Database() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllBooking();
        setData(response);
        console.log("Data fetch successfully!", response);
      } catch (error) {
        console.error("Data fetch failed:", error);
      }
    }
    fetchData();
  }, []);

  const columns = useMemo(() => Grouped_Columns, [])

  const [selectGroup, setSelectGroup] = useState('All');

  const groupOptions = useMemo(() => {
    const options = columns.filter(column => column.columns && column.Header !== ' ').map(column => ({
      label: column.Header,
      value: column.Header
    }));
    options.unshift({label: 'All', value: 'All'});
    return options;
  }, [columns]);

  const handleSelectGroup = (event) => {
    setSelectGroup(event.target.value);
  };

  const filteredColumns = useMemo(() => {
    const baseColumns = [{
      Header: 'ID',
      accessor: 'id',
      canSort: false,
    }];
    if (selectGroup === 'All') {
      console.log(columns);
      return columns;
    }
    else {
      const cols = columns.find(column => column.Header === selectGroup)?.columns;
      console.log(cols);
      return baseColumns.concat({Header: selectGroup, columns: cols});
    }
  }, [selectGroup, columns]);

  const [anchor, setAnchor] = useState(null);
  
  const openPopover = (event) => {
    setAnchor(event.currentTarget);
  }

  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    }
  }, [])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    prepareRow,
    state,
    setGlobalFilter,
    allColumns,
  } = useTable({
    columns: filteredColumns, 
    data, 
    defaultColumn,
    initialState: { sortBy: [] },
  }, useFilters, useGlobalFilter, useSortBy, usePagination)

  const { globalFilter, pageIndex } = state

  const sortIcon = <FontAwesomeIcon icon={faSort} style={{ fontSize: "15px" }} />
  const sortUp = <FontAwesomeIcon icon={faSortUp} style={{ fontSize: "15px" }} />
  const sortDown = <FontAwesomeIcon icon={faSortDown} style={{ fontSize: "15px" }} />

  return (
  <div>
    <Header> Database </Header>
    <div className='bg'>
      <GlobalFilter filter = {globalFilter} setFilter={setGlobalFilter} /> {' '}
      <select onChange={handleSelectGroup} value={selectGroup}>
        {groupOptions.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select> {' '}
      <button onClick={openPopover} className='Button' > 
        <FontAwesomeIcon icon={faTableColumns} style={{ fontSize: "15px" }} />
      </button>
      <Popover 
        open={Boolean(anchor)} 
        anchorEl={anchor} 
        onClose={() => setAnchor(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
      }}> 
        <div>
          {allColumns.map(column => (
            <div key = {column.id}>
              <label>
                <input type='checkBox' {...column.getToggleHiddenProps()} />
                {column.Header}
              </label>
            </div>
          ))}
        </div>
      </Popover>
    <div className='scrollx'>
      <table {...getTableProps()} className='table'>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              { headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())} className='th'>
                  <div>
                    {column.render('Header')}
                  {' '}
                  {!column.disableSortBy && (
                      <span>
                          {column.isSorted ? (column.isSortedDesc ? sortUp : sortDown) : sortIcon}
                      </span>
                  )}
                  </div>
                  <div>
                    {column.canFilter ? column.render('Filter') : null}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
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
      <div>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage} >Next</button>
      </div>
    </div>
    </div>
  </div>
  );
}
export default Database;
