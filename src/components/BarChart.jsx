import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import { useEffect, useRef } from "react";
export default function BarChart({ data, width = 600, height = 300, margin = { top: 20, right: 20, bottom: 30, left: 40 } }) {
    const svgRef = useRef(null);
    console.log("data = " + data)

    useEffect(() => {
        if (!data) return;

        const svg = d3.select(svgRef.current);
        //get rid of ol d elements
        svg.selectAll("*").remove();

        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const g = svg
            .attr("viewBox", `0 0 ${width} ${height}`)
            .attr("preserveAspectRatio", "xMidYMid meet")
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Convert data object -> array of {key, value}
        const parsed = Object.entries(data).map(([k, v]) => ({ key: k, value: +v }));

        const x = d3
            .scaleBand()
            .domain(parsed.map(d => d.key))
            .range([0, innerWidth])
            .padding(0.2);

        const y = d3
            .scaleLinear()
            .domain([0, d3.max(parsed, d => d.value) ?? 0])
            .nice()
            .range([innerHeight, 0]);

        // Axes
        const xAxis = d3.axisBottom(x);
        const yAxis = d3.axisLeft(y).ticks(5).tickFormat(d3.format("~s"));

        g.append("g").attr("transform", `translate(0,${innerHeight})`).call(xAxis);
        g.append("g").call(yAxis);

        // Bars
        const bars = g.selectAll("rect").data(parsed, d => d.key);

        // enter
        bars
            .enter()
            .append("rect")
            .attr("x", d => x(d.key))
            .attr("width", x.bandwidth())
            .attr("y", innerHeight)
            .attr("height", 0)
            .attr("rx", 4)
            .attr("ry", 4)
            .transition()
            .duration(1)
            .attr("y", d => y(d.value))
            .attr("height", d => innerHeight - y(d.value));

        // update
        bars
            .transition()
            .duration(600)
            .attr("x", d => x(d.key))
            .attr("width", x.bandwidth())
            .attr("y", d => y(d.value))
            .attr("height", d => innerHeight - y(d.value));

        // exit
        bars.exit().transition().duration(400).attr("y", innerHeight).attr("height", 0).remove();

        // labels (value above bars)
        const labels = g.selectAll("text.bar-label").data(parsed, d => d.key);
        labels
            .enter()
            .append("text")
            .attr("class", "bar-label")
            .attr("x", d => x(d.key) + x.bandwidth() / 2)
            .attr("y", d => y(d.value) - 6)
            .attr("text-anchor", "middle")
            .text(d => d.value);

        labels
            .transition()
            .duration(600)
            .attr("x", d => x(d.key) + x.bandwidth() / 2)
            .attr("y", d => y(d.value) - 6)
            .text(d => d.value);

        labels.exit().remove();

        // simple tooltip behaviour using title
        g.selectAll("rect").append("title").text(d => `${d.key}: ${d.value}`);
    }, [data, height, margin.bottom, margin.left, margin.right, margin.top, width]);

    return (
        <div className="w-full max-w-3xl mx-auto p-4">
            <svg ref={svgRef} className="w-full" />
        </div>
    );

}