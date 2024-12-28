import React from "react";
import { Container, Grid } from "@mui/material";
import BarChart from "@/components/BarChart";
import ArcChart from "@/components/ArcChart";

type Props = {};

const index = (props: Props) => {
  return (
    <Container>
      <Grid container>
        <Grid xs={6}>
          <BarChart color="#5eb47c" width="300" height="400" />
        </Grid>

        <Grid xs={6}>
          <BarChart width="300" height="400" />
        </Grid>

        <Grid xs={6}>
          <ArcChart width="300" height="400" />
        </Grid>
      </Grid>
      {/* <StackedArcChart></StackedArcChart> */}
    </Container>
  );
};

export default index;
