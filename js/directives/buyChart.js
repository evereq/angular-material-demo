/*global angular */

angular.module('buyApp')
    .directive('buyChart', function Products() {
        'use strict';

        return {
            restrict: 'E',
            scope: {
                data: '='
            },
            link: function (scope, element) {

                // Init chart here

                var canvasWidth = 300, //width
                    canvasHeight = 300,   //height
                    outerRadius = 100,   //radius
                    color = d3.scale.category20(); //builtin range of colors

                var vis = d3.select(element[0])
                    .append("svg:svg") //create the SVG element
                    .attr("width", canvasWidth) //set the width of the canvas
                    .attr("height", canvasHeight) //set the height of the canvas
                    .append("svg:g") //make a group to hold our pie chart
                    .attr("transform", "translate(" + 1.5*outerRadius + "," + 1.5*outerRadius + ")"); // relocate center of pie to 'outerRadius,outerRadius'


                //Render graph based on 'data'
                scope.render = function (data) {

                    var notCompleted = _.where(data, { completed: false });

                    var summed_by_type = _(notCompleted).reduce(function(mem, d) {
                        mem[d.type] = (mem[d.type] || 0) + d.qty;
                        return mem;
                    }, {});

                    var dataSet = _(summed_by_type).map(function(v,k) { return {type: k, qty: v} });

                    vis.data([dataSet]); //associate our data with the document

                    // This will create <path> elements for us using arc data...
                    var arc = d3.svg.arc()
                        .outerRadius(outerRadius);

                    var pie = d3.layout.pie() //this will create arc data for us given a list of values
                        .value(function(d) { return d.qty; }) // Binding each value to the pie
                        .sort( function(d) { return null; } );

                    vis.selectAll("g.slice").remove();

                    // Select all <g> elements with class slice (there aren't any yet)
                    var arcs = vis.selectAll("g.slice")
                        // Associate the generated pie data (an array of arcs, each having startAngle,
                        // endAngle and value properties)
                        .data(pie)
                        // This will create <g> elements for every "extra" data element that should be associated
                        // with a selection. The result is creating a <g> for every object in the data array
                        .enter()
                        // Create a group to hold each slice (we will have a <path> and a <text>
                        // element associated with each slice)
                        .append("svg:g")
                        .attr("class", "slice");    //allow us to style things in the slices (like text)

                    arcs.append("svg:path")
                        //set the color for each slice to be chosen from the color function defined above
                        .attr("fill", function(d, i) { return color(i); } )
                        //this creates the actual SVG path using the associated data (pie) with the arc drawing function
                        .attr("d", arc);

                    // Add a type to each arc slice...
                    arcs.append("svg:text")
                        .attr("transform", function(d) { //set the label's origin to the center of the arc
                            //we have to make sure to set these before calling arc.centroid
                            d.outerRadius = outerRadius + 50; // Set Outer Coordinate
                            d.innerRadius = outerRadius + 45; // Set Inner Coordinate
                            return "translate(" + arc.centroid(d) + ")";
                        })
                        .attr("text-anchor", "middle") //center the text on it's origin
                        .style("fill", "White")
                        .style("font", "bold 12px Arial")
                        .text(function(d, i) { return dataSet[i].type; }); //get the label from our original data array

                    // Add a qty value to the larger arcs, translated to the arc centroid and rotated.
                    arcs.filter(function(d) { return d.endAngle - d.startAngle > .2; }).append("svg:text")
                        .attr("dy", ".35em")
                        .attr("text-anchor", "middle")
                        //.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")rotate(" + angle(d) + ")"; })
                        .attr("transform", function(d) { //set the label's origin to the center of the arc
                            //we have to make sure to set these before calling arc.centroid
                            d.outerRadius = outerRadius; // Set Outer Coordinate
                            d.innerRadius = outerRadius/2; // Set Inner Coordinate
                            return "translate(" + arc.centroid(d) + ")rotate(" + angle(d) + ")";
                        })
                        .style("fill", "White")
                        .style("font", "bold 12px Arial")
                        .text(function(d) { return d.data.qty; });


                };

                // Computes the angle of an arc, converting from radians to degrees.
                function angle(d) {
                    var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
                    return a > 90 ? a - 180 : a;
                }

                //Watch 'data' and run scope.render(newVal) whenever it changes
                //Use true for 'objectEquality' property so comparisons are done on equality and not reference
                scope.$watch('data', function () {
                    scope.render(scope.data);
                }, true);
            }
        };

    });
