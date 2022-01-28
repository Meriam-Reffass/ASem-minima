
import { alpha, styled } from '@mui/material/styles';
import {
  Card, Typography, CardHeader, Box, Grid, TableContainer,
  TablePagination, TableRow,
  TableBody,
  TableCell, Table
} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from "react"
import MenuItem from '@mui/material/MenuItem';
import Page from '../components/Page';
import Label from '../components/Label';
import { makeStyles } from '@mui/styles';

import {  UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
import  UserListHead from '../components/_dashboard/user/UserListHead copy';
const axios = require("axios")
const TABLE_HEAD = [
  { id: 'morning', label: 'morning', alignRight: false },
  { id: 'afternoon', label: 'afternoon', alignRight: false },
  { id: '' },
];


export default function timetables(props) {
  const [classID, setClassID] = useState('');
  const [selected, setSelected] = useState(false);
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState({});
  const handleChange = (event) => {
    setSelected(true)
    setClassID(event.target.value);
    setSelectedClass(classes.find(element => element._id == event.target.value))
    console.log(classes.find(element => element._id == event.target.value))
  };
  if (classes.length == 0) {
    axios.get("http://localhost:3000/api/classes", { headers: { "auth-token": localStorage.token } })
      .then(resp => {
        setClasses(resp.data)
      }).
      catch(err => {
        console.log(err)
      })
  }
  return (
    <Card>


      <Box sx={{ p: 3, pb: 1, m: 2 }} dir="ltr">
        <FormControl fullWidth>
          <InputLabel variant="standard" id="demo-simple-select-label" >
            CLass
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="uncontrolled-native"
            value={classID}
            label="CLass"

            onChange={handleChange}
          >{
              classes.map((row) => {
                const { _id, className, promo } = row
                return (
                  <MenuItem value={_id}>{className} - {promo} </MenuItem>

                )

              })


            }

          </Select>
        </FormControl>
      </Box>

      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12}>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  headLabel={TABLE_HEAD}
                  rowCount={classes.length}

                />
                <TableBody>

                  {selected &&


                    <TableRow
                      hover
                    >


                      <TableCell align="left"> Monday </TableCell>
                      <TableCell align="left" className={selectedClass.monday.morning ? classes.row : classes.row2}>
                        <Label
                          xs={12}
                          variant="filled"
                          color={(selectedClass.monday.morning && 'success') || 'warning'}>
                          {selectedClass.monday.morning}
                        </Label>


                      </TableCell>
                      <TableCell align="left" >
                        <Label
                          xs={12}
                          variant="filled"
                          color={(selectedClass.monday.afternoon && 'success') || 'warning'}>
                          {selectedClass.monday.afternoon}
                        </Label>


                      </TableCell>

                      <TableCell align="right">
                        <UserMoreMenu />
                      </TableCell>
                    </TableRow>



                  }
                  {selected &&


                    <TableRow
                      hover
                    >


                      <TableCell align="left"> tuesday </TableCell>
                      <TableCell align="left" className={selectedClass.tuesday.morning ? classes.row : classes.row2}>
                        <Label
                          xs={12}
                          variant="filled"
                          color={(selectedClass.tuesday.morning && 'success') || 'warning'}>
                          {selectedClass.tuesday.morning}
                        </Label>


                      </TableCell>
                      <TableCell align="left" >
                        <Label
                          xs={12}
                          variant="filled"
                          color={(selectedClass.tuesday.afternoon && 'success') || 'warning'}>
                          {selectedClass.tuesday.afternoon}
                        </Label>


                      </TableCell>

                      <TableCell align="right">
                        <UserMoreMenu />
                      </TableCell>
                    </TableRow>



                  }
                  {selected &&


                    <TableRow
                      hover
                    >


                      <TableCell align="left"> wednesday </TableCell>
                      <TableCell align="left" className={selectedClass.wednesday.morning ? classes.row : classes.row2}>
                        <Label
                          xs={12}
                          variant="filled"
                          color={(selectedClass.wednesday.morning && 'success') || 'warning'}>
                          {selectedClass.wednesday.morning}
                        </Label>


                      </TableCell>
                      <TableCell align="left" >
                        <Label
                          xs={12}
                          variant="filled"
                          color={(selectedClass.wednesday.afternoon && 'success') || 'warning'}>
                          {selectedClass.wednesday.afternoon}
                        </Label>


                      </TableCell>

                      <TableCell align="right">
                        <UserMoreMenu />
                      </TableCell>
                    </TableRow>



                  }
                  {selected &&


                    <TableRow
                      hover
                    >


                      <TableCell align="left"> thursday </TableCell>
                      <TableCell align="left" className={selectedClass.thursday.morning ? classes.row : classes.row2}>
                        <Label
                          xs={12}
                          variant="filled"
                          color={(selectedClass.thursday.morning && 'success') || 'warning'}>
                          {selectedClass.thursday.morning}
                        </Label>


                      </TableCell>
                      <TableCell align="left" >
                        <Label
                          xs={12}
                          variant="filled"
                          color={(selectedClass.thursday.afternoon && 'success') || 'warning'}>
                          {selectedClass.thursday.afternoon}
                        </Label>


                      </TableCell>

                      <TableCell align="right">
                        <UserMoreMenu />
                      </TableCell>
                    </TableRow>



                  }
                  {selected &&


                    <TableRow
                      hover
                    >


                      <TableCell align="left"> friday </TableCell>
                      <TableCell align="left" className={selectedClass.friday.morning ? classes.row : classes.row2}>
                        <Label
                          xs={12}
                          variant="filled"
                          color={(selectedClass.friday.morning && 'success') || 'warning'}>
                          {selectedClass.friday.morning}
                        </Label>


                      </TableCell>
                      <TableCell align="left" >
                        <Label
                          xs={12}
                          variant="filled"
                          color={(selectedClass.friday.afternoon && 'success') || 'warning'}>
                          {selectedClass.friday.afternoon}
                        </Label>


                      </TableCell>

                      <TableCell align="right">
                        <UserMoreMenu />
                      </TableCell>
                    </TableRow>



                  }
                  {selected &&


                    <TableRow
                      hover
                    >


                      <TableCell align="left"> saturday </TableCell>
                      <TableCell align="left" className={selectedClass.saturday.morning ? classes.row : classes.row2}>
                        <Label
                          xs={12}
                          variant="filled"
                          color={(selectedClass.saturday.morning && 'success') || 'warning'}>
                          {selectedClass.saturday.morning}
                        </Label>


                      </TableCell>
                      <TableCell align="left" >
                        <Label
                          xs={12}
                          variant="filled"
                          color={(selectedClass.saturday.afternoon && 'success') || 'warning'}>
                          {selectedClass.saturday.afternoon}
                        </Label>


                      </TableCell>

                      <TableCell align="right">
                        <UserMoreMenu />
                      </TableCell>
                    </TableRow>



                  }
                  {selected &&


                    <TableRow
                      hover
                    >


                      <TableCell align="left"> Sunday </TableCell>
                      <TableCell align="left" className={selectedClass.sunday.morning ? classes.row : classes.row2}>
                        <Label
                          xs={12}
                          variant="filled"
                          color={(selectedClass.sunday.morning && 'success') || 'warning'}>
                          {selectedClass.sunday.morning}
                        </Label>


                      </TableCell>
                      <TableCell align="left" >
                        <Label
                          xs={12}
                          variant="filled"
                          color={(selectedClass.sunday.afternoon && 'success') || 'warning'}>
                          {selectedClass.sunday.afternoon}
                        </Label>


                      </TableCell>

                      <TableCell align="right">
                        <UserMoreMenu />
                      </TableCell>
                    </TableRow>



                  }

                </TableBody>

              </Table>
            </TableContainer>
          </Grid>

          <Grid item xs={12} sm={6} md={8}>
          </Grid>

        </Grid>


      </Box>
    </Card >
  );


}
