import React from "react";
import { Container, Grid } from "@mui/material";
import StackedArcChart from "@/components/StackedArcChart";
import BarChart from "@/components/BarChart";

type Props = {};

const index = (props: Props) => {
  return (
    <Container>
      <Grid container>
        <Grid xs={6}>
          <BarChart color="#5eb47c" />
        </Grid>

        <Grid xs={6}>
          <BarChart />
        </Grid>
      </Grid>
      {/* <StackedArcChart></StackedArcChart> */}
    </Container>
  );
};

export default index;
