import React, { useEffect, useMemo, useState } from "react";
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
import { TypographyParagraph } from "../components/Typography/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortUp,
  faSortDown,
  faTableColumns,
  faBars,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { getAllBooking } from "../api/BookingAPI";

function Database() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllBooking();
        setData(response);
        setLoading(false);
        console.log("Data fetch successfully!", response);
      } catch (error) {
        console.error("Data fetch failed:", error);
      }
    };
    fetchData();
  }, []);

  const columns = useMemo(() => Grouped_Columns, []);

  const [selectGroup, setSelectGroup] = useState("All");

  const groupOptions = useMemo(() => {
    const options = columns
      .filter((column) => column.columns && column.Header !== " ")
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
      console.log(columns);
      return columns;
    } else {
      const cols = columns.find(
        (column) => column.Header === selectGroup
      )?.columns;
      console.log(cols);
      return baseColumns.concat({ Header: selectGroup, columns: cols });
    }
  }, [selectGroup, columns]);

  const [anchor, setAnchor] = useState(null);
  const [ishide, setIsHide] = useState(false);
  const [columnIsHovered, setColumnIsHovered] = useState(false);
  const [filterIsHovered, setFilterIsHovered] = useState(false);

  const openPopover = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleHide = () => {
    if (ishide) {
      setIsHide(false);
    } else {
      setIsHide(true);
    }
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
      initialState: { sortBy: [] },
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
  const next = (
    <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: "15px" }} />
  );
  const previous = (
    <FontAwesomeIcon icon={faArrowLeft} style={{ fontSize: "15px" }} />
  );

  if (loading) {
    return (
      <div>
        <Header> Database </Header>
        <div>
          <TypographyParagraph style={{ colorP: "black" }}>
            Loading...
          </TypographyParagraph>
        </div>
      </div>
    );
  }
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
        </select>
        <button
          onClick={openPopover}
          onMouseEnter={() => setColumnIsHovered(true)}
          onMouseLeave={() => setColumnIsHovered(false)}
          className="Button1"
        >
          <FontAwesomeIcon icon={faTableColumns} style={{ fontSize: "15px" }} />
          {columnIsHovered && (
            <div className="showMessage">
              <TypographyParagraph style={{ color: "black" }}>
                Show/Hide columns
              </TypographyParagraph>
            </div>
          )}
        </button>
        <button
          onClick={handleHide}
          onMouseEnter={() => setFilterIsHovered(true)}
          onMouseLeave={() => setFilterIsHovered(false)}
          className="Button1"
        >
          <FontAwesomeIcon icon={faBars} style={{ fontSize: "15px" }} />
          {filterIsHovered && (
            <div className="showMessage">
              <TypographyParagraph style={{ color: "black" }}>
                Show/Hide filters
              </TypographyParagraph>
            </div>
          )}
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
                        {!column.disableSortBy && (
                          <button
                            {...column.getSortByToggleProps()}
                            className="Button1"
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
                        {column.canFilter && ishide
                          ? column.render("Filter")
                          : null}
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
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="Button2"
            >
              {previous}
            </button>{" "}
            <span>
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>
            </span>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="Button2"
            >
              {next}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Database;
