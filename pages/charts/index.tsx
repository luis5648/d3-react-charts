import React from "react";
import { Typography, Container } from "@mui/material";
import BarChart from "./../../src/components/BarChart.tsx";

type Props = {};

const index = (props: Props) => {
  return (
    <Container>
      <BarChart></BarChart>
    </Container>
  );
};

export default index;
