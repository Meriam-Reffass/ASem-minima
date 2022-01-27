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

// ----------------------------------------------------------------------

export default function DashboardApp() {
   const firstName = localStorage.getItem("firstName");
  return (
    <Page title="Dashboard-ASem">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back {firstName } !</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports />
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
        <ProductCartWidget />
      </Container>
    </Page>
  );
}
