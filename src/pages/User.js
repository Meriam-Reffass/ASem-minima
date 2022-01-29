import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState,forwardRef } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
const axios = require("axios");
//
import USERLIST from '../_mocks_/user';
import { propsToClassKey } from '@mui/styles';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'firstName', label: 'firstName', alignRight: false },
  { id: 'lastName', label: 'Lastname', alignRight: false },
  { id: 'className', label: 'Speciality', alignRight: false },
  { id: 'role', label: 'Abs N.justified ', alignRight: false },
  { id: 'isVerified', label: 'Level', alignRight: false },
  { id: '' },
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "50%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: '25px',
  p: 4,
};
const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// ----------------------------------------------------------------------

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
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.lastName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User(props) {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [users, setUsers] = useState([]);
  const [orderBy, setOrderBy] = useState('firstName');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();


  if (!localStorage.token)
    navigate('/login', { replace: true });
  if (classes.length == 0) {
    axios.get("http://localhost:3000/api/classes", { headers: { "auth-token": localStorage.token } })
      .then(resp => {
        setClasses(resp.data)
      }).
      catch(err => {
        console.log(err)
      })
  }
  if (users.length == 0) {
    axios.get("http://localhost:3000/api/students", { headers: { "auth-token": localStorage.token } }).then(resp => {
      setUsers(resp.data)
    }).
      catch(err => {
        console.log(err)
      })
  }

  const [formData, setFormData] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const handleUpdate = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    console.log(formData);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const values = { ...formData }
    axios.post("http://localhost:3000/api/students", values, { headers: { "auth-token": localStorage.token } })
      .then(resp => {
        setIsError(false);
        setOpenSnackBar(true)
        setMessage("Class added successfully");
        navigate('/dashboard/user', { replace: true });



      }).
      catch(err => {
        console.log(err)
        setMessage(err.response.data.error);
        setOpenSnackBar(true);
        setIsError(true);

      })
    setOpen(false)
    console.log(values);


  }


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const filteredUsers = applySortFilter(users, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Students-ASem">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Student
          </Typography>
          <Button
            variant="contained"
            onClick={handleOpen}

            startIcon={<Icon icon={plusFill} />}>
            New Student
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add className
                <hr />
              </Typography>
              <form >
                <div className="form-group row">
                  <label htmlFor="" className="col-4 col-form-label">first Name</label>
                  <div className="col-8">
                    <input id="firstName" name="firstName" type="text" onChange={handleUpdate} className="form-control" />
                  </div>
                </div>
                <div className="form-group row">
                  <label htmlFor="" className="col-4 col-form-label">last Name</label>
                  <div className="col-8">
                    <input id="lastName" name="lastName" type="text" onChange={handleUpdate} className="form-control" />
                  </div>
                </div>
                <div className="form-group row mt-2">
                  <label htmlFor="email" className="col-4 col-form-label">Email</label>
                  <div className="col-8">
                    <input id="email" name="email" onChange={handleUpdate} type="email" className="form-control" />
                  </div>
                </div>
                <div className="form-group row mt-2">
                  <label htmlFor="password" className="col-4 col-form-label">Password</label>
                  <div className="col-8">
                    <input id="password" name="password" onChange={handleUpdate} type="password" className="form-control" />
                  </div>
                </div>
                <div className="form-group row mt-2">
                  <label htmlFor="promo" className="col-4 col-form-label">Class</label>
                  <div className="col-8">
                    <select id="class" name="studyClass" onChange={handleUpdate} className="form-control" >
                      <option value=""></option>
                      {
                        classes.map(element => <option value={element._id}> {element.className} - {element.promo}</option>)

                      }
                    </select>
                  </div>
                </div>

                <div className="form-group row mt-4">
                  <div className="offset-4 col-8">
                    <button onClick={handleSubmit} name="submit" type="submit" className="btn btn-block btn-success">Submit</button>
                  </div>
                </div>
              </form>
            </Box>
          </Modal>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>

                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { _id, firstName, lastName, studyClass, nonVerifiedHours } = row;
                      const isItemSelected = selected.indexOf(_id) !== -1;

                      return (
                        <TableRow
                          hover
                          key={_id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}>
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, _id)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={name} />
                              <Typography variant="subtitle2" noWrap>

                                {firstName}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left"> {lastName} </TableCell>
                          <TableCell align="left"> {studyClass.className} </TableCell>
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={(nonVerifiedHours > 30 && 'error') || (nonVerifiedHours > 20 && 'warning') || (nonVerifiedHours > 10 && 'info') || 'success'}>
                              {nonVerifiedHours}
                            </Label>
                          </TableCell>
                          <TableCell align="left"> {studyClass.promo} </TableCell>
                          <TableCell align="right">
                            <UserMoreMenu />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
        <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={isError && "error" || "success"} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>

      </Container >
    </Page >
  );
}
