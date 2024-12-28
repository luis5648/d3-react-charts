import { ramdomValues } from "@/reusable/data_arrays";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";


type Props = {
  colors?: string[];
  height: string;
  width: string;
};

const ArcChart = (props: Props) => {
  const data = [
    { category: "A", values: [10, 20, 30] },
    { category: "B", values: [15, 25, 35] },
    { category: "C", values: [20, 30, 40] }
  ];

  const { colors = ["#7a4af9", "#4af97a", "#f94a7a"], width, height } = props;
  const svgRef = useRef<SVGSVGElement | null>(null);
  //const data = ramdomValues;
  const [selection, setSelection] = useState<null | d3.Selection<
    SVGSVGElement | null,
    unknown,
    null,
    undefined
  >>(null);

  const margin = { top: 20, right: 20, bottom: 40, left: 40 };
  const innerWidth = Number(width) - margin.left - margin.right;
  const innerHeight = Number(height) - margin.top - margin.bottom;

  useEffect(() => {
    if (!selection) {
      setSelection(d3.select(svgRef.current));
    } else {
      const xScale = d3.scaleBand()
        .domain(data.map(d => d.category))
        .range([0, innerWidth])
        .padding(0.1);

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d3.sum(d.values)) ?? 0])
        .range([innerHeight, 0]);

      const arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(d => yScale(d[1]));

      const stack = d3.stack()
        .keys(d3.range(data[0].values.length))
        .value((d, key) => d.values[key]);

      const stackedData = stack(data);

      // Clear previous content
      selection.selectAll("*").remove();

      const g = selection
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Add arcs
      g.selectAll("g.layer")
        .data(stackedData)
        .enter()
        .append("g")
        .attr("class", "layer")
        .style("fill", (d, i) => colors[i])
        .selectAll("path.arc")
        .data(d => d)
        .enter()
        .append("path")
        .attr("class", "arc")
        .attr("transform", (d, i) => `translate(${xScale(data[i].category)},${innerHeight / 2})`)
        .attr("d", arcGenerator);

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
      <h1>Stacked Arc Bar Chart</h1>
      <svg ref={svgRef}
        width={width}
        height={height}
      ></svg>
    </>
  );
};

export default ArcChart;

