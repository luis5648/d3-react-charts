import { ramdomValues } from "@/reusable/data_arrays";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import data from "@/reusable/data.json";

type Props = {
  color?: string;
  height: string;
  width: string;
};

const PieChart = (props: Props) => {
  const { width, height } = props;
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [selection, setSelection] = useState<null | d3.Selection<
    SVGSVGElement | null,
    unknown,
    null,
    undefined
  >>(null);

  // Process data to get total population by age group
  const processedData = d3.rollup(
    data,
    v => d3.sum(v, d => d.population),
    d => d.age
  );

  const pieData = Array.from(processedData, ([key, value]) => ({ age: key, value }));

  // Calculate dimensions
  const margin = { top: 20, right: 200, bottom: 20, left: 20 }; // Increased right margin for legend
  const innerWidth = Number(width) - margin.left - margin.right;
  const innerHeight = Number(height) - margin.top - margin.bottom;
  const radius = Math.min(innerWidth, innerHeight) / 2;

  // Color scale for different age groups
  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

  useEffect(() => {
    if (!selection) {
      setSelection(d3.select(svgRef.current));
    } else {
      selection.selectAll("*").remove();

      // Add tooltip div
      const tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("background-color", "white")
        .style("padding", "8px")
        .style("border", "1px solid #ccc")
        .style("border-radius", "4px")
        .style("pointer-events", "none")
        .style("opacity", 0);

      const g = selection
        .append("g")
        .attr(
          "transform",
          `translate(${innerWidth / 2 + margin.left},${
            innerHeight / 2 + margin.top
          })`
        );

      // Create pie generator
      const pie = d3.pie<any>()
        .value(d => d.value)
        .sort(null);

      // Create arc generator
      const arc = d3
        .arc()
        .innerRadius(0)
        .outerRadius(radius);

      // Generate the pie chart
      // Update pie chart slices with hover interactions
      g.selectAll("path")
        .data(pie(pieData))
        .enter()
        .append("path")
        .attr("d", arc as any)
        .attr("fill", d => colorScale(d.data.age))
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .on("mouseover", (event, d: any) => {
          tooltip
            .style("opacity", 1)
            .html(`${d.data.age}<br/>Population: ${d3.format(",")(d.data.value)}`)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 10) + "px");

          d3.select(event.currentTarget)
            .style("opacity", 0.8)
            .style("cursor", "pointer");
        })
        .on("mousemove", (event) => {
          tooltip
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 10) + "px");
        })
        .on("mouseout", (event) => {
          tooltip.style("opacity", 0);
          d3.select(event.currentTarget)
            .style("opacity", 1);
        })
      .style("stroke-width", "2px");

      // Add legends
      const legend = selection
        .append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 12)
        .attr("text-anchor", "start")
        .selectAll("g")
        .data(pieData)
        .enter()
        .append("g")
        .attr("transform", (d, i) => `translate(${innerWidth + margin.left + 10},${i * 20 + margin.top})`);

      // Add colored rectangles to legend
      legend
        .append("rect")
        .attr("x", 0)
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", d => colorScale(d.age));

      // Add text to legend
      legend
        .append("text")
        .attr("x", 20)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(d => `${d.age} (${d3.format(",")(d.value)})`);
    }

    // Clean up tooltip on unmount
    return () => {
      d3.select("body").selectAll(".tooltip").remove();
    };
  }, [selection, innerWidth, innerHeight, radius, pieData]);

  return (
    <>
      <h1>Population by Age Groups</h1>
      <svg ref={svgRef} width={width} height={height}></svg>
    </>
  );
};

export default PieChart;