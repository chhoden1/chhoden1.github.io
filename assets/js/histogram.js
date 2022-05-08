function main(){
// set the dimensions and margins of the graph
const margin = {top: 80, right: 30, bottom: 80, left: 100},
    width = 700 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("body")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          `translate(${margin.left},${margin.top})`)
 svg.append("text")
    .attr("transform", "translate(100, 0")
    .attr("x", 20)
    .attr("y", -20)
    .attr("font-size", "22px")
    .text("Distribution of ratings for boba shops in the Bay Area")


// get the data
d3.csv("https://gist.githubusercontent.com/chhodens/5375b3edc3fd56055ee56899b7937b70/raw/e6abe08d781671fe0863be681c06dee8058d7660/bayarea-bobashop-rating.csv").then( function(data) {

  // X axis: scale and draw:
  const x = d3.scaleLinear()
      .domain([1, 5])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
      .range([0, width]);
  svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
           .append("text")
            // specify the x position for the x-axis label
        .attr("x", width-250)
      	// specify the y position for the x-axis label
        .attr("y", height-300)
        .attr("stroke", "black")
        // specify the label for the  x-axis
        .text("Customer Rating")
      

  // set the parameters for the histogram
  const histogram = d3.histogram()
      .value(function(d) { return d.rating; })   // I need to give the vector of value
      .domain(x.domain())  // then the domain of the graphic
      .thresholds(x.ticks(6)); // then the numbers of bins

  // And apply this function to data to get the bins
  const bins = histogram(data);

  // Y axis: scale and draw:
  const y = d3.scaleLinear()
      .range([height, 0]);
      y.domain([0, d3.max(bins, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
  svg.append("g")
      .call(d3.axisLeft(y))
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
        .text("Count of boba shops")

  // append the bar rectangles to the svg element
  svg.selectAll("rect")
      .data(bins)
      .join("rect")
      .attr("x", 1)
      .attr("transform", function(d) { return `translate(${x(d.x0)} , ${y(d.length)})`})
      .attr("width", function(d) { return x(d.x1) - x(d.x0) -1})
      .attr("height", function(d) { return height - y(d.length); })
      .style("fill", "#daaa77")

});

}

main();