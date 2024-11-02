import React, { useRef, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import * as d3 from 'd3';

type Props = {};

const BarChart = (props: Props) => {
  const svgRef = useRef<SVGSVGElement | null>(null)
  const width = 928;
  const height = width;

  const chartDefinition = {
    width: width,
    height: height,
    innerRadius: 180,
    outerRadius: Math.min(width, height) / 2,
  }

  useEffect(() => {
    const series = d3.stack().keys()


    //append graph elements to svg
    d3.select(svgRef.current)
      .append("rect")
      .attr("width", 100)
      .attr("height", 100)
      .attr("fill", "green")

  }, [])





  return (
    <>
      <Typography variant="h4">BarChart sample</Typography>

      <Grid container>

        <Grid item mt={5}>
          <svg ref={svgRef}>
          </svg >
        </Grid>
      </Grid>


    </>
  );
};



export default BarChart;
