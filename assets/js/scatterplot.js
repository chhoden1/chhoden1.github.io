function main(){
// set the margins and dimensions of the chart
var margin = {top: 100, right: 30, bottom: 40, left: 160},
    width = 750 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// append the svg object to the body
      var svg = d3.select("#scatterplot")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

		// append the "text" to set the title for the scatter plot
    svg.append("text")
    .attr("transform", "translate(100, 0")
    // specify the x position for the title label
    .attr("x", -5)
    // specify the y position label for the title label
    .attr("y", -30)
    .attr("font-size", "18px")
    .attr("stroke", "black")
    .text("Correlation between price of a boba drink and cost of living index per city")
      
    
  // The x and y scales are built using scaleLinear   
  // set the x axis
  var xAxis = d3.scaleLinear()    
    .range([0, width]);
  

  // set the y axis
  var yAxis = d3.scaleLinear()    
    .range([ height, 0]);
      
// load the data from a csv file
// d3.csv function is called to read the csv file 
// .then(function(data) ensures that the code does not start running until the data has been completely loaded
d3.csv("/csv/scatterplot_data.csv").then(function(data) {
  
   yAxis.domain([3, d3.max(data, function(d){
      return +d.BobaPrice;
    })]); 
   svg.append("g")
    .call(d3.axisLeft(yAxis).tickFormat(function(d) {
            return "$" + d ;
        }).ticks(3))
  // add the attributes for text
  	.append("text")
  // the y-axis label is rotated at 90 degress
    .attr("transform", "rotate(-90)")
  	// specify the x position for the y-axis label
    .attr("x", -120)
    // specify the y position for the y-axis label
    .attr("y", 7)
    .attr("dy", "-5em")
    .attr("stroke", "black")
    .attr("font-size", "12px")
    // set the axis label for y-axis
    .text("Price of a boba drink per city on average");
  
   xAxis.domain([50, d3.max(data, function(d){
    // console.log(d.CostOfLivingIndex); 
      return +d.CostofLivingIndex;
    })]);   
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xAxis).tickFormat(function(d){
    		return d; }).ticks(5))
     // add the attributes for text
  	.append("text")
    // specify the x position for the x-axis label
  	.attr("x", width - 250)
    // specify the y position for the y-axis label
  	.attr("y", height - 425)
  	.attr("stroke", "black")
    .attr("font-size", "12px")
  	// set the axis label for x-axis
  	.text("Cost of Living Index");
  
  // Add a tooltip div
  // the opacity is set to 0 by default
  const tooltip = d3.select("#scatterplot")
    .append("div")
    //.style("position", "absolute")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "1px")
    .style("border-radius", "5px")
    .style("padding", "10px")



  // A function that changes this tooltip when the user hovers over a point.
  const mouseover = function(event, d) {
    tooltip
      .style("opacity", 1)
  }

  const mousemove = function(event, d) {
    tooltip
      .html('<u>' +d.City+  '</u>' + "<br>"+"$"+ d.BobaPrice +"<br>"+d.CostofLivingIndex)
      .style("left", (event.pageX)/1.5 + "px") 
      .style("top", (event.pageY)/1 + "px")
  }

  // A function that changes the tooltip when the user leaves the point: reset opacity to 0 
  const mouseleave = function(event,d) {
    tooltip
      .transition()
      .duration(200)
      .style("opacity", 0)
  }

  
  // create the dots for the scatterplot
  svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d){
          // returns scaled value
    			return xAxis(d.CostofLivingIndex);
      })
      .attr("cy", function (d){
          // returns scaled value
    			return yAxis(d.BobaPrice);
  		})
  		// set the radius to 4
      .attr("r",5)
      .style("fill", "#daaa77")
  		.style("stroke", "black")
      .on("mouseover", mouseover )
      .on("mousemove", mousemove )
      .on("mouseleave", mouseleave )
})
}
main();