function main(){
// set the margins and dimensions of the chart
var margin = {top: 100, right: 30, bottom: 40, left: 160},
    width = 750 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;

// append the svg object to the body
      var svg = d3.select("body")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
         // "translate(" + margin.left + "," + margin.top + ")");
         "translate(" + 80 + ", " + 75 + ")");

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
    .range([ 0, width]);
  

  // set the y axis
  var yAxis = d3.scaleLinear()    
    .range([ height, 0]);
      
// load the data from a csv file
// d3.csv function is called to read the csv file 
// .then(function(data) ensures that the code does not start running until the data has been completely loaded
d3.csv("csv/scatterplot_data.csv").then(function(data) {
  
   yAxis.domain([0, d3.max(data, function(d){
      return +d.BobaPrice;
    })]); 
   svg.append("g")
    .call(d3.axisLeft(yAxis).tickFormat(function(d) {
            return "$" + d ;
        }).ticks(7))
  // add the attributes for text
  	.append("text")
  // the y-axis label is rotated at 90 degress
    .attr("transform", "rotate(-90)")
  	// specify the x position for the y-axis label
    .attr("x", -120)
    // specify the y position for the y-axis label
    .attr("y", -2)
    .attr("dy", "-5em")
    .attr("stroke", "black")
    // set the axis label for y-axis
    .text("Price of a boba drink per city on average");
  
   xAxis.domain([0, d3.max(data, function(d){
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
  	// set the axis label for x-axis
  	.text("Cost of Living Index");
  
  // in_state_total_tuition,out_of_state_total_tuition
  
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
      .attr("r",4)
      // set the color of the dots to steelblue
      .style("fill", "rgb(25, 104, 104)")
  		.style("stroke", "black")
})
}

main();