import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import Stack from "@mui/material/Stack";
import { ramdomValues } from "@/reusable/data_arrays";

type Props = {
  color?: string;
};

const BarChart = (props: Props) => {
  const { color = "#7a4af9" } = props;
  const svgRef = useRef<SVGSVGElement | null>(null);
  const data = ramdomValues;
  const [selection, setSelection] = useState<null | d3.Selection<
    SVGSVGElement | null,
    unknown,
    null,
    undefined
  >>(null);

  const margin = { top: 20, right: 20, bottom: 40, left: 40 };
  const width = 600 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const maxValue = d3.max(data);

  // const yScale = d3.scaleLinear().domain

  useEffect(() => {
    if (!selection) {
      setSelection(d3.select(svgRef.current));
    } else {
      const xScale = d3.scaleBand()
        .domain(data.map((_, i) => i.toString()))
        .range([0, width])
        .padding(0.1);

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(data) ?? 0])
        .range([height, 0]);

      // Clear previous content
      selection.selectAll("*").remove();
      
      const g = selection
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Add bars
      g.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => xScale(i.toString()) ?? 0)
        .attr("y", d => yScale(d))
        .attr("width", xScale.bandwidth())
        .attr("height", d => height - yScale(d))
        .attr("fill", color);

      // Add x axis
      g.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale));

      // Add y axis
      g.append("g")
        .call(d3.axisLeft(yScale));


      // const svg = selection
      //   .selectAll("rect")
      //   .data(data)
      //   .enter()
      //   .append("rect")
      //   .attr("height", function (d, i) {
      //     return d * 15;
      //   })
      //   .attr("width", "50")
      //   .attr("x", function (d, i) {
      //     return 60*i;
      //   })
      //   .attr("y", function (d, i) {
      //     return 300 - (d * 15);
      //   })
      //   .attr("fill", "blue");
    }
  }, [selection]);


  return (
    <>
        <h1>Bar Chart</h1>
        <svg ref={svgRef} 
         width={width + margin.left + margin.right} 
         height={height + margin.top + margin.bottom}
        ></svg>
    </>
  );
};

export default BarChart;
