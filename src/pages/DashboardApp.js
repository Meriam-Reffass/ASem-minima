// material
import { Box, Grid, Container, Typography } from '@mui/material';
// components
import Page from '../components/Page';
import {
  AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  AppNewsUpdate,
  AppWeeklySales,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppCurrentSubject,
  AppConversionRates
} from '../components/_dashboard/app';
import {

  ProductCartWidget,

} from '../components/_dashboard/products';
import { useState } from 'react';
const axios = require("axios");

// ----------------------------------------------------------------------

export default function DashboardApp() {


  const [sumNonVerifiedHours, setSumNonVerifiedHours] = useState(0);
  const [sumVerifiedHours, setSumVerifiedHours] = useState(0);
  const [sumExclusions, setsumExclusions] = useState(0);
  const [sumAlerts, setsumAlerts] = useState(0);



  var path = "http://localhost:3000/api/stats" + (localStorage.role == "admin" ? "" : "/" + localStorage._id);
  axios.get(path, { headers: { "auth-token": localStorage.token } }).then(resp => {
    setSumNonVerifiedHours(resp.data.sumNonVerifiedHours)
    setSumVerifiedHours(resp.data.sumVerifiedHours)
    setsumExclusions(resp.data.sumExclusions)
    setsumAlerts(resp.data.sumAlerts)
  }).catch(err => {
    console.log(err);
  })




  const firstName = localStorage.getItem("firstName");
  return (
    <Page title="Dashboard-ASem">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back {firstName} !</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales number={sumVerifiedHours} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers number={sumNonVerifiedHours} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders number={sumAlerts} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports number={sumExclusions} />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <AppWebsiteVisits />
          </Grid>

          {/*<Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
  </Grid>*/}

          <Grid item xs={12} md={12} lg={12}>
            <AppConversionRates />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks />
          </Grid> */}
        </Grid>
        {
          !localStorage.isAdmin &&
          <ProductCartWidget />
        }
      </Container>
    </Page>
  );
}
