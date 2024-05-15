import React, { useMemo, useState } from "react";
import Header from "../components/Header/Header";
import "../styles/Database.css";
import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { Grouped_Columns } from "../components/Table/Column";
import { Popover } from "@material-ui/core";
import ColumnFilter from "../components/Table/ColumnFilter";
import GlobalFilter from "../components/Table/GlobalFilter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortUp,
  faSortDown,
  faTableColumns,
} from "@fortawesome/free-solid-svg-icons";

function Database() {
  const data = useMemo(
    () => [
      {
        id: 1,
        ProgramStream: "SCoE: Excursions",
        Status: "Delivered",
        School: "Aireys Inlet Primary School",
        ProgramDate: "Wed, March 06, 2024",
        School_repeated: "Aireys Inlet Primary School",
        StudentYear: "10",
        Student: "15",
        FirstName: "Bob",
        LastName: "Ross",
        PhoneNumber: "040000000",
      },
      {
        id: 2,
        ProgramStream: "SCoE: Excursions",
        Status: "Delivered",
        School: "Antonine College",
        ProgramDate: "Wed, March 06, 2024",
        School_repeated: "Antonine College",
        StudentYear: "9",
        Student: "50",
        FirstName: "Dwayne",
        LastName: "Johnson",
        PhoneNumber: "0412345678",
      },
      {
        id: 3,
        ProgramStream: "SCoE: Excursions",
        Status: "Delivered",
        School: "Beaufort Primary School",
        ProgramDate: "Wed, March 06, 2024",
        School_repeated: "Beaufort Primary School",
        StudentYear: "7,8",
        Student: "48",
        FirstName: "Margot",
        LastName: "Robbie",
        PhoneNumber: "0423584892",
      },
      {
        id: 4,
        ProgramStream: "STEAM: Excursions",
        Status: "Delivered",
        School: "Dorset Primary School",
        ProgramDate: "Wed, March 06, 2024",
        School_repeated: "Dorset Primary School",
        StudentYear: "9",
        Student: "20",
        FirstName: "Elizabeth",
        LastName: "Taylor",
        PhoneNumber: "040000000",
      },
      { id: 5 },
      { id: 6 },
      { id: 7 },
      { id: 8 },
      { id: 9 },
      { id: 10 },
      { id: 11 },
    ],
    []
  );

  const columns = useMemo(() => Grouped_Columns, []);

  const [selectGroup, setSelectGroup] = useState("All");

  const groupOptions = useMemo(() => {
    const options = columns
      .filter((column) => column.columns)
      .map((column) => ({
        label: column.Header,
        value: column.Header,
      }));
    options.unshift({ label: "All", value: "All" });
    return options;
  }, [columns]);

  const handleSelectGroup = (event) => {
    setSelectGroup(event.target.value);
  };

  const filteredColumns = useMemo(() => {
    const baseColumns = [
      {
        Header: "ID",
        accessor: "id",
        canSort: false,
      },
    ];
    if (selectGroup === "All") {
      return columns;
    } else {
      const cols = columns.find(
        (column) => column.Header === selectGroup
      )?.columns;
      return baseColumns.concat({ Header: selectGroup, columns: cols });
    }
  }, [selectGroup, columns]);

  const [anchor, setAnchor] = useState(null);

  const openPopover = (event) => {
    setAnchor(event.currentTarget);
  };

  const defaultColumn = useMemo(() => {
    return {
      Filter: ColumnFilter,
    };
  }, []);

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
  } = useTable(
    {
      columns: filteredColumns,
      data,
      defaultColumn,
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex } = state;

  const sortIcon = (
    <FontAwesomeIcon icon={faSort} style={{ fontSize: "15px" }} />
  );
  const sortUp = (
    <FontAwesomeIcon icon={faSortUp} style={{ fontSize: "15px" }} />
  );
  const sortDown = (
    <FontAwesomeIcon icon={faSortDown} style={{ fontSize: "15px" }} />
  );

  return (
    <div>
      <Header> Database </Header>
      <div className="bg">
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />{" "}
        <select onChange={handleSelectGroup} value={selectGroup}>
          {groupOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>{" "}
        <button onClick={openPopover} className="Button">
          <FontAwesomeIcon icon={faTableColumns} style={{ fontSize: "15px" }} />
        </button>
        <Popover
          open={Boolean(anchor)}
          anchorEl={anchor}
          onClose={() => setAnchor(null)}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <div>
            {allColumns.map((column) => (
              <div key={column.id}>
                <label>
                  <input type="checkBox" {...column.getToggleHiddenProps()} />
                  {column.Header}
                </label>
              </div>
            ))}
          </div>
        </Popover>
        <div className="scrollx">
          <table {...getTableProps()} className="table">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()} className="th">
                      <div>
                        {column.render("Header")}{" "}
                        {column.canSort && (
                          <button
                            {...column.getSortByToggleProps()}
                            className="Button"
                          >
                            <span>
                              {column.isSorted
                                ? column.isSortedDesc
                                  ? sortUp
                                  : sortDown
                                : sortIcon}
                            </span>
                          </button>
                        )}
                      </div>
                      <div>
                        {column.canFilter ? column.render("Filter") : null}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()} className="td">
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div>
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              Previous
            </button>{" "}
            <span>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{" "}
            </span>
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Database;
