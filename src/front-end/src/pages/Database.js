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
import {
  TypographyParagraph,
  TypographyH3,
} from "../components/Typography/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortUp,
  faSortDown,
  faTableColumns,
  faBars,
  faArrowRight,
  faArrowLeft,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  getAllBooking,
  getAllMiscellaneous,
  updateMiscellaneous,
} from "../api/BookingAPI";
import Modal from "../components/PopUp/PopUp";
import { Button } from "../components/Button/Button";
import { useNavigate } from "react-router-dom";

function Database() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [miscData, setMiscData] = useState({
    program_stream: [],
    facilitators: [],
    delivery_location: [],
    module: [],
    exhibition: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllBooking();
        setData(response);
        setLoading(false);
        console.log("Data fetch successfully!", response);
      } catch (error) {
        alert(`[ERROR] ${error}`);
        navigate("/login");
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
    ];
    if (selectGroup === "All") {
      console.log(columns);
      return columns;
    } else {
      const cols = columns.find(
        (column) => column.Header === selectGroup
      )?.columns;
      console.log(cols);
      return baseColumns.concat({ Header: selectGroup, disableSortBy: true, columns: cols });
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

  const openPopup = async () => {
    setLoading(true);
    setIsPopupOpen(true);
    try {
      const miscellaneousData = await getAllMiscellaneous();
      setMiscData({
        program_stream: miscellaneousData.program_stream,
        facilitators: miscellaneousData.facilitators,
        delivery_location: miscellaneousData.delivery_location,
        module: miscellaneousData.module,
        exhibition: miscellaneousData.exhibition,
      });
    } catch (error) {
      alert("Error! Please try again later");
      navigate("/database");
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleChange = (arrayName, index, event) => {
    const updatedArray = [...miscData[arrayName]];
    updatedArray[index] = event.target.value;
    setMiscData({
      ...miscData,
      [arrayName]: updatedArray,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setUpdating(true);
    try {
      updateMiscellaneous(miscData);
      alert("Update Successfull!");
    } catch (error) {
      alert("Error! Please try again later");
    } finally {
      setUpdating(false);
    }
  };

  const handleMiscRemove = (arrayName, index) => {
    setMiscData((prevDetails) => ({
      ...prevDetails,
      [arrayName]: prevDetails[arrayName].filter((_, i) => i !== index),
    }));
  };

  const convertName = (arrayName) => {
    return arrayName.replace("_", " ").toUpperCase();
  };

  if (loading) {
    return (
      <div>
        <Header> Database </Header>
        <Modal show={loading}>
          <div>Loading...</div>
        </Modal>
      </div>
    );
  }
  return (
    <div>
      <Header> Database </Header>
      <div className="editMisc">
        <button className="miscEditButton" onClick={openPopup}>
          <span>Edit Selectable Options</span>
        </button>
      </div>

      {isPopupOpen && (
        <div className="miscPopup">
          <Modal show={loading}>
            <div>Loading...</div>
          </Modal>
          <Modal show={updating}>
            <div>Saving...</div>
          </Modal>
          {!loading && (
            <div className="miscContent">
              <form className="miscDataForm">
                {Object.keys(miscData)?.map((arrayName) => (
                  <div key={arrayName} className="miscSection">
                    <TypographyH3>{convertName(arrayName)}</TypographyH3>
                    {miscData[arrayName] &&
                      miscData[arrayName].map((item, index) => (
                        <div key={`${arrayName}-${index}`}>
                          <label className="eachMisc">
                            {index + 1}:
                            <input
                              type="text"
                              value={item}
                              onChange={(event) =>
                                handleChange(arrayName, index, event)
                              }
                            />
                            <button
                              onClick={(event) => {
                                event.preventDefault();
                                handleMiscRemove(arrayName, index);
                              }}
                              className="miscButtons miscDelete eachMisc"
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                style={{ fontSize: "15px" }}
                              />
                            </button>
                          </label>
                        </div>
                      ))}
                  </div>
                ))}
              </form>
              <div className="miscButtons">
                <Button type="discard" onClick={closePopup}>
                  Back
                </Button>
                <Button type="submit" onClick={handleSubmit}>
                  SAVE
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

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
