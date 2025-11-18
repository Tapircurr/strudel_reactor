import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
function D3GraphComp({ data }) {

    buildGraph(data);
    
    // 1 Select SVG element
    const svg = d3.select('svg')

    // 2 Determine the size of the SVG element
    let w = svg.node().getBoundingClientRect().width
    let h = svg.node().getBoundingClientRect().height

    console.log('Width: ' + w)
    console.log('Height: ' + h)

    // 12 Chart Margins
    const chartMargins = {
        left: 40,
        right: 25,
        top: 25,
        bottom: 80
    }

    w = w - (chartMargins.left + chartMargins.right);
    h = h - (chartMargins.top + chartMargins.bottom);

    function buildGraph(dataSet) {

        //Extra Clear Graph on change
        svg.selectAll("*").remove();
        console.log(dataSet);

        //let totalItemsRange = d3.extent(dataSet, d => d.totalItems)
        //let maxTotalItems = totalItemsRange[1]

        //console.log(`Total Items Range: ${totalItemsRange}`)

        //// 4. Calculating the bar dimensions
        //const barMargin = 10;
        //const barWidth = w / dataSet.length;

        //// 8. Create a yScale
        //let yScale = d3.scaleLinear()
        //    .domain([0, maxTotalItems])
        //    .range([h, 0]);

        //console.log(`What is a yScale? ${yScale}`);

        //// 10. Create xScale
        //let monthArray = Array.from(dataSet, d => d.monthName);
        //console.log(`Month array: ${monthArray}`)

        //let xScale = d3.scaleBand()
        //    .domain(monthArray)
        //    .range([0, w])
        //    .paddingInner(0.1)

        //console.log(`xScale: ${xScale('January')}`)

        ////12. ChartGroup Stuff
        //const chartGroup = svg.append('g')
        //    .classed('chartGroup', true)
        //    .attr('transform', `translate(${chartMargins.left},${chartMargins.top})`);

        //// 5. Select all 'g' elements and bind the Dataset.
        //// 'g' means the whole group, btw
        //let barGroups = chartGroup
        //    .selectAll('.bar-group')
        //    .data(dataSet)

        ////6. Add the bar groups
        //let newBarGroups = barGroups.enter()
        //    .append('g')
        //    .attr('transform', d => `translate(${xScale(d.monthName)},${yScale(d.totalItems)})`);


        //// 7. Append New Rectangles
        //// 15. Adding Color and Animations
        //newBarGroups
        //    .append('rect')
        //    .attr('x', 0)
        //    //.attr('height', d => h - yScale(d.totalItems))
        //    .attr('height', 0)
        //    .attr('y', d => h - yScale(d.totalItems))
        //    .attr('width', xScale.bandwidth())
        //    .attr('fill', 'transparent')
        //    .transition().duration((_, i) => i * 500)
        //    .delay((_, i) => i + 200)
        //    .attr('y', 0)
        //    .attr('height', d => h - yScale(d.totalItems))
        //    .attr('fill', (_, i) => `rgb(20,20, ${i * 15 + 80})`)

        ////11. Create the y axis and add it to the svg
        //let yAxis = d3.axisLeft(yScale);
        //chartGroup.append('g')
        //    .classed('axis y', true)
        //    .call(yAxis);

        ////13. Add x axis
        //let xAxis = d3.axisBottom(xScale)
        //chartGroup.append('g')
        //    .attr('transform', `translate(0,${h})`)
        //    .classed('axis x', true)
        //    .call(xAxis);

        ////13.4 Rotate labels
        //chartGroup.selectAll('.axis.x text')
        //    .attr('transform', 'rotate(-70)')
        //    .attr('dx', '-0.8em')
        //    .attr('dy', '0.25em')
        //    .style('text-anchor', 'end')
        //    .style('font-size', '0.9em')

        ////14. Create Bar text
        //newBarGroups
        //    .append('text')
        //    .attr('text-anchor', 'middle')
        //    .attr('x', d => xScale.bandwidth() / 2)
        //    .attr('y', 20)
        //    .attr('fill', 'white')
        //    .style('font-size', '1em')
        //    .text(d => d.totalItems.toLocaleString());

    }




    return (
        <div>
            <svg width="100%" height="600px" class="border border-primary rounded p-2"></svg>
        </div>
    );
}

export default D3GraphComp;