function main()
{
    var svgWidth = 600;
	var svgHeight = 500;
	var margin = 100;
					
	// create and empty SVG element and add it to the DOM
	// append the svg element to the body
	var svg = d3.select("#barchart").append("svg")
		.attr("width",  svgWidth)
		.attr("height", svgHeight)
					
	var width = svg.attr("width") - margin;
	var height = svg.attr("height") - margin;
	// append the "text" to display the title of the chart
	svg.append("text")
		.attr("transform", "translate(100, 0")
		.attr("x", 120)
		.attr("y", 30)
        .attr("stroke", "black")
		.attr("font-size", "18px")
		.text("Ranking of the most popular boba chains in the United States")
					
		// scaleBand automatically scale the x axis and gives the right amount of space for the x - axis
		// declare and initialize both x and y scale so they perfectly fit on the canvas
		// the padding function allows for space between the rectangle bars
		var xScale = d3.scaleBand().range([0, width]).padding(0.3);
		var yScale = d3.scaleLinear().range([height, 0]);
					
		var container_g = svg.append("g")
			.attr("transform","translate(" + 80 + ", " + 45 + ")");
					
						
		// d3.csv function is called to read the file from a csv file
		// .then(data=> ensures that the code does not start running until the data has been completely loaded
		d3.csv("/csv/barchart_data.csv").then(data => {
		 // Specify the xScale based on the "company" attribute in the data set
		xScale.domain(data.map(function(d){
			return d.bobachain;
		}));
		// Specify the yScale based on the "sales" attribute in the data set
		yScale.domain([0, d3.max(data, function(d) {
			return +d.numberofestablishments; // convert the string to an integer
			})]);
				
			

			// Add a tooltip div
  // Its opacity is set to 0: we don't see it by default.
  const tooltip = d3.select("#barchart")
  .append("div")
  //.style("position", "absolute")
  .style("opacity", 0)
  .attr("class", "tooltip")
  .style("background-color", "white")
  .style("border", "solid")
  .style("border-width", "1px")
  .style("border-radius", "5px")
  .style("padding", "10px")



// A function that change this tooltip when the user hover a point.
// Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)
const mouseover = function(event, d) {
  tooltip
	.style("opacity", 1)
}

const mousemove = function(event, d) {
  tooltip
	.html(d.numberofestablishments)
	.style("left", (event.x)/2 + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
	.style("top", (event.y)/2 + "px")
}

// A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
const mouseleave = function(event,d) {
  tooltip
	.transition()
	.duration(200)
	.style("opacity", 0)
}

		// Draw the bars
		container_g.selectAll(".bar")
		// binds the data to the elements that we need to create
			.data(data)
			// .enter() returns a placeholder selection for each data point
			.enter()
			// for each of the placeholders, append("rect") inserts a rect into the DOM
			.append("rect")
			// to use the styling properties defined in the bar class
			.attr("class", "bar")
			.attr("x", function(d){
						return xScale(d.bobachain);
			})
			.attr("y",function(d){
				return yScale(d.numberofestablishments);
			})
			.attr("width", xScale.bandwidth())
			.attr("height", function(d){
				return height - yScale(d.numberofestablishments);
			})
			.on("mouseover", mouseover)
			.on("mousemove", mousemove)
			.on("mouseleave", mouseleave)
							
		// append the x - axis to the container group to display the x-axis
		container_g.append("g")
			.attr("transform", "translate(0, " + height + ")")
			.call(d3.axisBottom(xScale))
			.append("text")
			// specify the x position for the x-axis label
			.attr("x", width-300)
			// specify the y position for the x-axis label
			.attr("y", height-350)
			.attr("stroke", "black")
			// specify the label for the  x-axis
			.text("Boba Chains")
					
			// append the y - axis to the container group to display the y-axis
			container_g.append("g")
				.call(d3.axisLeft(yScale).tickFormat(function(d) {
						return d;
				}).ticks(10))
				.append("text")
				// the y-axis lable is rotated by 90 degrees
				.attr("transform", "rotate(-90)")
				// specify the x position for the y-axis label
				.attr("x", -150)
				// specify the y position for the y-axis label
				.attr("y", -5)
				.attr("dy", "-5em")
				.attr("stroke", "black")
				// set the label for the y-axis
				.text("Total number of boba establishments")
			})
}
main();