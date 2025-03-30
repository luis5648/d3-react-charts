import { ramdomValues } from "@/reusable/data_arrays";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

type Props = {
  color?: string;
  height: string
  width: string
};

const BarChart = (props: Props) => {
  const { color = "#7a4af9", width, height } = props;
  const svgRef = useRef<SVGSVGElement | null>(null);
  const data = ramdomValues;
  const [selection, setSelection] = useState<null | d3.Selection<
    SVGSVGElement | null,
    unknown,
    null,
    undefined
  >>(null);

  const margin = { top: 20, right: 20, bottom: 40, left: 40 };
  const innerWidth = Number(width) - margin.left - margin.right;
  const innerHeight = Number(height) - margin.top - margin.bottom;

  const maxValue = d3.max(data);

  // const yScale = d3.scaleLinear().domain

  useEffect(() => {
    if (!selection) {
      setSelection(d3.select(svgRef.current));
    } else {
      const xScale = d3.scaleBand()
        .domain(data.map((_, i) => i.toString()))
        .range([0, innerWidth])
        .padding(0.1);

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(data) ?? 0])
        .range([innerHeight, 0]);

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
        .attr("height", d => innerHeight - yScale(d))
        .attr("fill", color);

      // Add x axis
      g.append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(xScale));

      // Add y axis
      g.append("g")
        .call(d3.axisLeft(yScale));

    }
  }, [selection]);


  return (
    <>
      <h1>Bar Chart</h1>
      <svg ref={svgRef}
        width={width}
        height={height}
      ></svg>
    </>
  );
};

export default BarChart;
