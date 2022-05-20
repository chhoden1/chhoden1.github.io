function main(){
  // References: 1.https://observablehq.com/@d3/color-schemes
  // 2. https://d3-graph-gallery.com/graph/circularpacking_template.html

  // set the dimensions and margins of the graph
  const width = 700
  const height = 560

  // append the svg object to the body of the page
  const svg = d3.select("#bubblechart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
  var color = d3.scaleOrdinal(d3.schemeSet3);
  // Read data from a csv file
  d3.csv("/csv/bubblechart_data.csv").then( function(data) {

    // Size scale for cities
    const size = d3.scaleLinear()
      .domain([0, 100])
      .range([7,150])  // circle will be between 7 and 150 px wide

    // create a tooltip
    const Tooltip = d3.select("#bubblechart")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")

    // Three functions that change the tooltip when user hovers / moves / leaves a cell
    const mouseover = function(event, d) {
      Tooltip
        .style("opacity", 1)
    }
    const mousemove = function(event, d) {
      Tooltip
        .html('<u>' + d.city + '</u>' + "<br>" + d.count + "  Boba Shops")
        .style("left", (event.pageX/2+20) + "px")
        .style("top", (event.pageY/2-30) + "px")
    }
    var mouseleave = function(event, d) {
      Tooltip
        .style("opacity", 0)
    }

    // Initialize the circle: all located at the center of the svg area
    var node = svg.append("g")
      .selectAll("circle")
      .data(data)
      .join("circle")
      .attr("class", "node")
      .attr("r", d => size(d.count))
        .attr("cx", width / 2)
        .attr("cy", height / 2)
        .style("fill", function(d,i) {
              return color(i);
          })
        .style("fill-opacity", 0.8)
        .attr("stroke", "black")
        .style("stroke-width", 1)
        // when user hovers over a circle
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    // Features of the forces applied to the nodes:
    const simulation = d3.forceSimulation()
        .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // Attraction to the center of the svg area
        .force("charge", d3.forceManyBody().strength(.1)) // Nodes are attracted one each other of value is > 0
        .force("collide", d3.forceCollide().strength(.2).radius(function(d){ return (size(d.count)+3) }).iterations(1)) // Force that avoids circle overlapping

    // Apply these forces to the nodes and update their positions.
    // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
    simulation
        .nodes(data)
        .on("tick", function(d){
          node
              .attr("cx", d => d.x)
              .attr("cy", d => d.y)
        });


    function dragstarted(event, d) {
      if (!event.active) simulation.alphaTarget(.03).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }
    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(.03);
      d.fx = null;
      d.fy = null;
    }

  })
  }
main();