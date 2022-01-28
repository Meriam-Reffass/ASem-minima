import { useFormik } from 'formik';
import { useState, forwardRef } from 'react';
// material
import { Container, Stack, Typography, Button } from '@mui/material';
// components
import Page from '../components/Page';
import {
  ProductSort,
  ProductList,
  ProductCartWidget,
  ProductFilterSidebar
} from '../components/_dashboard/products';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';

import Timetables from "../components/timetables"
//
import PRODUCTS from '../_mocks_/products';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const axios = require("axios")
// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const [openFilter, setOpenFilter] = useState(false);
  const navigate = useNavigate();
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
  const formik = useFormik({
    initialValues: {
      gender: '',
      category: '',
      colors: '',
      priceRange: '',
      rating: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });
  if (!localStorage.token)
  navigate('/login', { replace: true });

  const [formData, setFormData] = useState({});
  const dates = {
    monday: {},
    tuesday: {},
    wednesday: {},
    thursday: {},
    friday: {},
    saturday: {},
    sunday: {},
  };

  const handleUpdate = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleChangeCheck = e => {
    const { name, value } = e.target;
    const strings = name.split(".");
    dates[strings[0]][strings[1]] = (value == "true")
    console.log(dates);
  };

  const [open, setOpen] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const values = { ...formData, ...dates }
    axios.post("http://localhost:3000/api/classes", values, { headers: { "auth-token": localStorage.token } })
      .then(resp => {
        setIsError(false);
        setOpenSnackBar(true)
        setMessage("Class added successfully");
        navigate('/dashboard/products', { replace: true });



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

  return (
    <Page title="Dashboard: Products | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Timetables
          </Typography>
          {localStorage.isAdmin=="true" &&

          <Button
            variant="contained"
            onClick={handleOpen}
            startIcon={<Icon icon={plusFill} />}>
            New Class
          </Button>
          }

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
                  <label htmlFor="" className="col-4 col-form-label">class Name</label>
                  <div className="col-8">
                    <input id="" name="className" type="text" onChange={handleUpdate} className="form-control" />
                  </div>
                </div>
                <div className="form-group row mt-2">
                  <label htmlFor="promo" className="col-4 col-form-label">Promo</label>
                  <div className="col-8">
                    <input id="promo" name="promo" onChange={handleUpdate} type="text" className="form-control" />
                  </div>
                </div>
                <div className="form-group row mt-2">
                  <label className="col-4">Monday</label>
                  <div className="col-8">
                    <div className="form-check form-switch form-check-inline">
                      <input name="monday.morning" type="checkbox" onChange={handleChangeCheck} className="form-check-input" value={true} />
                      <label htmlFor="checkbox_0" className="form-check-label">morning</label>
                    </div>
                    <div className="form-check form-switch form-check-inline">
                      <input name="monday.afternoon" type="checkbox" onChange={handleChangeCheck} className="form-check-input" value={false} />
                      <label htmlFor="checkbox_1" className="form-check-label">afternoon</label>
                    </div>
                  </div>
                </div>
                <div className="form-group row mt-2">
                  <label className="col-4">Tuesday</label>
                  <div className="col-8">
                    <div className="form-check form-switch form-check-inline">
                      <input name="tuesday.morning" type="checkbox" onChange={handleChangeCheck} className="form-check-input" value={true} />
                      <label htmlFor="checkbox_0" className="form-check-label">morning</label>
                    </div>
                    <div className="form-check form-switch form-check-inline">
                      <input name="tuesday.afternoon" type="checkbox" onChange={handleChangeCheck} className="form-check-input" value={false} />
                      <label htmlFor="checkbox_1" className="form-check-label">afternoon</label>
                    </div>
                  </div>
                </div>
                <div className="form-group row mt-2">
                  <label className="col-4">Wednesday</label>
                  <div className="col-8">
                    <div className="form-check form-switch form-check-inline">
                      <input name="wednesday.morning" type="checkbox" onChange={handleChangeCheck} className="form-check-input" value={true} />
                      <label htmlFor="checkbox_0" className="form-check-label">morning</label>
                    </div>
                    <div className="form-check form-switch form-check-inline">
                      <input name="wednesday.afternoon" type="checkbox" onChange={handleChangeCheck} className="form-check-input" value={false} />
                      <label htmlFor="checkbox_1" className="form-check-label">afternoon</label>
                    </div>
                  </div>
                </div>
                <div className="form-group row mt-2">
                  <label className="col-4">Thursday</label>
                  <div className="col-8">
                    <div className="form-check form-switch form-check-inline">
                      <input name="thursday.morning" type="checkbox" onChange={handleChangeCheck} className="form-check-input" value={true} />
                      <label htmlFor="checkbox_0" className="form-check-label">morning</label>
                    </div>
                    <div className="form-check form-switch form-check-inline">
                      <input name="thursday.afternoon" type="checkbox" onChange={handleChangeCheck} className="form-check-input" value={false} />
                      <label htmlFor="checkbox_1" className="form-check-label">afternoon</label>
                    </div>
                  </div>
                </div>
                <div className="form-group row mt-2">
                  <label className="col-4">Friday</label>
                  <div className="col-8">
                    <div className="form-check form-switch form-check-inline">
                      <input name="friday.morning" type="checkbox" onChange={handleChangeCheck} className="form-check-input" value={true} />
                      <label htmlFor="checkbox_0" className="form-check-label">morning</label>
                    </div>
                    <div className="form-check form-switch form-check-inline">
                      <input name="friday.afternoon" type="checkbox" onChange={handleChangeCheck} className="form-check-input" value={false} />
                      <label htmlFor="checkbox_1" className="form-check-label">afternoon</label>
                    </div>
                  </div>
                </div>
                <div className="form-group row mt-2">
                  <label className="col-4">Saturday</label>
                  <div className="col-8">
                    <div className="form-check form-switch form-check-inline">
                      <input name="saturday.morning" type="checkbox" onChange={handleChangeCheck} className="form-check-input" value={true} />
                      <label htmlFor="checkbox_0" className="form-check-label">morning</label>
                    </div>
                    <div className="form-check form-switch form-check-inline">
                      <input name="saturday.afternoon" type="checkbox" onChange={handleChangeCheck} className="form-check-input" value={false} />
                      <label htmlFor="checkbox_1" className="form-check-label">afternoon</label>
                    </div>
                  </div>
                </div>
                <div className="form-group row mt-2">
                  <label className="col-4">Sunday</label>
                  <div className="col-8">
                    <div className="form-check form-switch form-check-inline">
                      <input name="sunday.morning" type="checkbox" onChange={handleChangeCheck} className="form-check-input" value={true} />
                      <label htmlFor="checkbox_0" className="form-check-label">morning</label>
                    </div>
                    <div className="form-check form-switch form-check-inline">
                      <input name="sunday.afternoon" type="checkbox" onChange={handleChangeCheck} className="form-check-input" value={false} />
                      <label htmlFor="checkbox_1" className="form-check-label">afternoon</label>
                    </div>
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

        {/* <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack> */}

        {/* <ProductCartWidget /> */}
        <Timetables></Timetables>
        <Snackbar open={openSnackBar} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={isError && "error" || "success"} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
       

      </Container>
    </Page>
  );
}
