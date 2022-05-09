function main(){
    dataset = {
        "children": [{"Name":"San Jose","Count":56},
            {"Name":"San Francisco","Count":53},
            {"Name":"Oakland","Count":26},
            {"Name":"Vallejo","Count":16},
            {"Name":"San Mateo","Count":26},
            {"Name":"Santa Clara","Count":19}]
    };

    var diameter = 600;
  //  var color = d3.scaleOrdinal(d3.schemePastel2);
    var color = d3.scaleOrdinal(d3.schemeSet3);

    var bubble = d3.pack(dataset)
        .size([diameter, diameter])
        .padding(1.5);
    
    var svg = d3.select("body")
        .append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
        .attr("class", "bubble");
    svg.append("text")
    .attr("transform", "translate(100, 0")
    .attr("x", 20)
    .attr("y", -20)
    .attr("font-size", "22px")
    .text("Distribution of ratings for boba shops in the Bay Area")

    var nodes = d3.hierarchy(dataset)
        .sum(function(d) { return d.Count; });

    var node = svg.selectAll(".node")
        .data(bubble(nodes).descendants())
        .enter()
        .filter(function(d){
            return  !d.children
        })
        .append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

    node.append("title")
        .text(function(d) {
            return d.Name + ": " + d.Count;
        });

    node.append("circle")
        .attr("r", function(d) {
            return d.r;
        })
        .style("fill", function(d,i) {
            return color(i);
        });

    node.append("text")
        .attr("dy", ".2em")
        .style("text-anchor", "middle")
        .text(function(d) {
            return d.data.Name.substring(0, d.r / 3);
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", function(d){
            return d.r/5;
        })
        .attr("fill", "black");

    node.append("text")
        .attr("dy", "1.3em")
        .style("text-anchor", "middle")
        .text(function(d) {
            return d.data.Count;
        })
        .attr("font-family",  "Gill Sans", "Gill Sans MT")
        .attr("font-size", function(d){
            return d.r/5;
        })
        .attr("fill", "black");

    d3.select(self.frameElement)
        .style("height", diameter + "px");

}
main();