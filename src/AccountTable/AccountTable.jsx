import * as React from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";

import Paper from "@mui/material/Paper";

import { visuallyHidden } from "@mui/utils";

import styled from "styled-components";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

function createData(id, name, position, e_no, id_no, inv_code) {
  return {
    id,
    name,
    position,
    e_no,
    id_no,
    inv_code,
  };
}

const rows = [
  createData(1, "Peter Kohl", "Driver", 4560, "A4654213212", "564hsdhfjH2"),
  createData(2, "Franz Neuer", "Driver", 5324, "A1232135131", "7987jbsv238"),
  createData(3, "Anette Meyer", "Driver", 4560, "A5612313125", "HJSHk5423SJ"),
  createData(4, "Mirco Daric", "Warehouse", 1123, "-", "8237r987sd4"),
  createData(5, "Florian Welte", "Warehouse", 8874, "-", "KLHD54612d"),
  createData(6, "Hans Muster", "Warehouse", 2838, "-", "4f15ee0695d"),
  createData(7, "Macro Daric", "Manager", 3572, "A4684211313", "f386fd93ba6"),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "position",
    numeric: false,
    disablePadding: false,
    label: "Position",
  },
  {
    id: "e_no",
    numeric: false,
    disablePadding: false,
    label: "Employee No.",
  },
  {
    id: "id_no",
    numeric: false,
    disablePadding: false,
    label: "ID No.",
  },
  {
    id: "inv_code",
    numeric: false,
    disablePadding: false,
    label: "Invitation Code",
  },
];

function createString(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const InvCode = styled.div`
  color: #707070;
  text-decoration: underline;
`;

const SearchBarContainer = styled.div`
  padding: 1em;
  background-color: white;
`;
function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell key="test" align="left" padding="none" sortDirection={false}>
          <Button
            variant="outlined"
            sx={{ color: "#ED7D31" }}
            onClick={() => {
              console.log("todo: toggle first row visibility");
            }}
          >
            New
          </Button>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function AccountTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [newAccount, setNewAccount] = React.useState({
    id: createString(2),
    name: "",
    position: "",
    e_no: "",
    id_no: "",
    inv_code: createString(11),
  });
  const [searchValue, setSearchValue] = React.useState("");
  let searchHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setSearchValue(lowerCase);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage]
  );

  const searchResults = visibleRows.filter((el) => {
    //if no input the return the original
    if (searchValue === "") {
      return el;
    }
    //return the item which contains the user input
    else {
      return el.name.toLowerCase().includes(searchValue);
    }
  });

  return (
    <Box sx={{ width: "100%" }}>
      <SearchBarContainer>
        <TextField
          id="outlined-basic"
          onChange={searchHandler}
          variant="outlined"
          fullWidth
          label="Search..."
        />
      </SearchBarContainer>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750, marginLeft: "2px" }}
            aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* First row is for adding a new user */}
              <TableRow
                hover
                role="checkbox"
                aria-checked={false}
                tabIndex={-1}
                key="test"
                selected={false}
                sx={{ cursor: "pointer" }}
              >
                <TableCell>
                  <TextField
                    type="text"
                    variant="outlined"
                    placeholder={newAccount.name && "Name"}
                    onChange={(e) => {
                      setNewAccount({ ...newAccount, name: e.target.value });
                    }}
                  />
                  {/* <BootstrapInput defaultValue="Name" id="name" /> */}
                </TableCell>
                <TableCell>
                  <TextField
                    type="text"
                    variant="outlined"
                    placeholder="Position"
                    onChange={(e) => {
                      setNewAccount({
                        ...newAccount,
                        position: e.target.value,
                      });
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="text"
                    variant="outlined"
                    placeholder="Employee No."
                    onChange={(e) => {
                      setNewAccount({ ...newAccount, e_no: e.target.value });
                    }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="text"
                    variant="outlined"
                    placeholder="ID No."
                    onChange={(e) => {
                      setNewAccount({ ...newAccount, id_no: e.target.value });
                    }}
                  />
                </TableCell>
                <TableCell>
                  <InvCode>
                    {newAccount.inv_code}
                    <ContentCopyIcon
                      sx={{ color: "#707070" }}
                      onClick={() => {
                        navigator.clipboard.writeText(newAccount.inv_code);
                      }}
                    />
                  </InvCode>
                </TableCell>

                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      rows.unshift(
                        createData(
                          newAccount.id,
                          newAccount.name,
                          newAccount.position,
                          newAccount.e_no,
                          newAccount.id_no,
                          newAccount.inv_code
                        )
                      );
                      setNewAccount({
                        id: createString(2),
                        name: "",
                        position: "",
                        e_no: "",
                        id_no: "",
                        inv_code: createString(11),
                      });
                    }}
                  >
                    Save
                  </Button>
                </TableCell>
              </TableRow>
              {searchResults.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      style={{ fontWeight: 700 }}
                    >
                      {row.name}
                    </TableCell>
                    <TableCell style={{ fontWeight: 700 }}>
                      {row.position}
                    </TableCell>
                    <TableCell style={{ fontWeight: 700 }}>
                      {row.e_no}
                    </TableCell>
                    <TableCell style={{ fontWeight: 700 }}>
                      {row.id_no}
                    </TableCell>
                    <TableCell>
                      <InvCode>
                        {row.inv_code}
                        <ContentCopyIcon
                          sx={{ color: "#707070" }}
                          onClick={() => {
                            navigator.clipboard.writeText(row.inv_code);
                          }}
                        />
                      </InvCode>
                    </TableCell>
                    <TableCell>
                      <DeleteForeverIcon
                        sx={{ color: "red" }}
                        onClick={() => {
                          rows.splice(
                            rows.findIndex((i) => {
                              return i.id === row.id;
                            }),
                            1
                          );
                        }}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
