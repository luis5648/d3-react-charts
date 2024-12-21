import React, { useRef, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import jsonData from "../reusable/data.json";
import * as d3 from "d3";

type Props = {};

const StackedArcChart = (props: Props) => {
  const data = jsonData;
  const svgRef = useRef<SVGSVGElement | null>(null);
  const width = 928;
  const height = width;

  const chartDefinition = {
    width: width,
    height: height,
    innerRadius: 180,
    outerRadius: Math.min(width, height) / 2,
  };

  useEffect(() => {
    if (!svgRef.current) return;

    const series = d3
      .stack()
      .keys(d3.union(data.map((d) => d.age)))
      .value((d, key) => d[key] as number)(
      d3.index(data, (d) => d.state) as unknown as Iterable<{
        [key: string]: number;
      }>,
      (d: { age: number }) => d.age
    );

    // An angular x-scale
    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.state))
      .range([0, 2 * Math.PI])
      .align(0);

    // A radial y-scale maintains area proportionality of radial bars
    const y = d3
      .scaleRadial()
      .domain([0, d3.max(series, (d) => d3.max(d, (d) => d[1])) as number])
      .range([chartDefinition.innerRadius, chartDefinition.outerRadius]);

    const arc = d3
      .arc()
      .innerRadius((d) => y(d[0]))
      .outerRadius((d) => y(d[1]))
      .startAngle((d) => x(d.data.state) || 0)
      .endAngle((d) => (x(d.data.state) || 0) + (x.bandwidth() || 0))
      .padAngle(1.5 / chartDefinition.innerRadius)
      .padRadius(chartDefinition.innerRadius);

    //append graph elements to svg
    d3.select(svgRef.current)
      .append("rect")
      .attr("width", 100)
      .attr("height", 100)
      .attr("fill", "green");
  }, []);

  return (
    <>
      <Typography variant="h4">BarChart sample</Typography>

      <Grid container>
        <Grid item mt={5}>
          <svg ref={svgRef}></svg>
        </Grid>
      </Grid>
    </>
  );

};

export default StackedArcChart;