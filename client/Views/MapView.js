var MapView = ChartView.extend({

  constructor: function(options) {
    ChartView.apply(this, arguments);
    return this;
  },

  draw: function(animated) {
    var chart = this;

    var width = chart.dimensions.wrapperWidth,
      height = chart.dimensions.wrapperHeight,
      active = d3.select(null);


    var links = [];

    var projection = d3.geo.albers()
      .translate([width / 2, height / 2])
      .scale(width * 1.1);

    var path = d3.geo.path()
      .projection(projection);

    var zoom = d3.behavior.zoom()
      .translate([0, 0])
      .scale(1)
      .scaleExtent([1, 100])
      .on("zoom", zoomed);

    var voronoi = d3.geom.voronoi()
      .x(function(d) {
        return d.x;
      })
      .y(function(d) {
        return d.y;
      })
      .clipExtent([
        [0, 0],
        [0, 0]
      ]);

    var svg = d3.select(chart.el).append("svg")
      .attr("width", width)
      .attr("height", height)
      .on("click", stopped, true);

    svg.append("rect")
      .attr("class", "background")
      .attr("width", width)
      .attr("height", height)
      .on("click", reset);

    var g = svg.append("g");

    svg
      .call(zoom) // delete this line to disable free zooming
      .call(zoom.event);

    var us = US;

    // queue()
    // //   // .defer(d3.json, "us.json")
    // .await(ready);
    ready.call(this);

    function ready(error) {

      if (error) throw error;

      var eventsById = d3.map(),
        positions = [];

      var events = chart.data;

      events.forEach(function(d) {
        eventsById.set(d.iata, d);
      });

      //sort ascending by event date
      events.sort(function(a, b) {
        return a.date > b.date;
      });

      for (var i = 1; i < events.length; i++) {
        link = {
          source: events[i - 1],
          target: events[i]
        };
        links.push(link);
      }

      events = events.filter(function(d,i) {
        d.count = 150;
        d[0] = +d.long;
        d[1] = +d.lat;
        var position = projection(d);
        d.x = position[0];
        d.y = position[1];
        return true;
      });

      voronoi(events)
        .forEach(function(d) {
          d.point.cell = d;
        });

      g.selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
        .attr("d", path)
        .attr("class", "feature")
        .on("click", clicked);

      g.append("path")
        .datum(topojson.mesh(us, us.objects.states, function(a, b) {
          return a !== b;
        }))
        .attr("class", "mesh")
        .attr("d", path);

      var arcs = g.append("g")
        .attr("class", "event-arcsHolder");

      arcs
        .selectAll("path")
        .data(links)
        .enter().append("path")
        .attr("class", "event-arcs")
        .attr("d", function(d) {
          return path({
            type: "LineString",
            coordinates: [d.source, d.target]
          });
        })
        .style('stroke-opacity', 0);

      var eventDots = g.append("g")
        .attr("class", "eventHolder");

      eventDots
        .selectAll("g")
        .data(events)
        .enter().append("g")
        .attr("class", "events");

      eventDots
        .selectAll(".events")
        .append("circle")
        .attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
        })
        .attr("r", function(d, i) {
          return 0;
        })
        .on("mouseenter", mouseenter)
        .on("mouseleave", mouseleave)
        .on("click", mouseclick);



      eventDots
        .selectAll(".events")
        // .style('opacity', 0);

      eventDots
        .selectAll(".events")
        .append("text")
        .attr("font-family", "Verdana")
        .attr("font-size", "16px")
        .text(function(d) {
          return d.name;
        })
        .attr("transform", function(d) {
          var width = this.getBoundingClientRect().width
          var height = this.getBoundingClientRect().height

          var radius = Math.sqrt(d.count);
          var padding = 20;

          return "translate(" + (d.x - width / 2.0) + "," + (d.y + height / 2.0 + radius + padding) + ")";
        })


      if (animated) {
        zoomToEvents.call(this,true);
        animateEvent(eventDots, arcs, 0);
      } else {
        eventDots
          .selectAll(".events")
          // .style('opacity', 1)
          .selectAll("circle")
          .attr("r", function(d, i) {
            return Math.sqrt(d.count);
          })

        arcs
          .selectAll(".event-arcs")
          // .attr("stroke-dashoffset", 0)
          // .style('stroke-opacity', 1);

        zoomToEvents.call(this,false);

      }
    }

    function animateEvent(events, arcs, index) {

      events
        .selectAll(".events")
        .filter(function(d, i) {
          return i === index;
        })
        .selectAll("circle")
        .transition()
        .duration(150)
        .ease('bounce')
        // .style('opacity', 1)
        .attr("r", function(d, i) {
          return Math.sqrt(d.count);
        })
        .each('end', function(event) {
          animateEvent(events, arcs, index + 1);
        })

        // events
        //   .selectAll(".events")
        //   .filter(function(d, i) {
        //     return i === index;
        //   })
        //   .selectAll("circle")
        //   .transition()
        //   .duration(150)
        //   .attr("r", function(d, i) {
        //     console.log('d: ',d.count)
        //     return Math.sqrt(d.count);
        //   })

          // var totalLength;
          // var thisArc = arcs
          //   .selectAll(".event-arcs")
          //   .filter(function(d, i) {
          //     return i === index;
          //   });

          // if (thisArc.node()) {
          //   var totalLength = thisArc.node().getTotalLength();
          // }

          // thisArc
          //   .attr("stroke-dasharray", totalLength + " " + totalLength)
          //   .attr("stroke-dashoffset", totalLength)
          //   .style('stroke-opacity', 1)
          //   .transition()
          //   .duration(1.25 * totalLength)
          //   .ease("linear")
          //   .attr("stroke-dashoffset", 0)
          //   .each('end', function(event) {
          //     animateEvent(events, arcs, index + 1);
          //   });
        // });
    }

    function zoomToEvents(animated) {

      var chart = this;
      var events = chart.data;

      var minX, maxX, minY, maxY;

      events.forEach(function(d) {
        var x = d.x;
        var y = d.y;

        if (!minX || x < minX) {
          minX = x
        }
        if (!maxX || x > maxX) {
          maxX = x
        }
        if (!minY || y < minY) {
          minY = y
        }
        if (!maxY || y > maxY) {
          maxY = y
        }

      });

      if (maxX && maxY && minX && minY) {

        dx = Math.max(maxX - minX,5), //min in case there is only 1 event
          dy = Math.max(maxY - minY,5),
          x = (maxX + minX) / 2,
          y = (maxY + minY) / 2,
          scale = .9 / Math.max(dx / width, dy / height),
          translate = [width / 2 - scale * x, height / 2 - scale * y];

          if (animated) {
        svg.transition()
          .duration(1000)
          .call(zoom.translate(translate).scale(scale).event);
        } else {
          svg
            .call(zoom.translate(translate).scale(scale).event);
        }

      }
    }

    function clicked(d) {
      if (active.node() === this) return reset();
      active.classed("active", false);
      active = d3.select(this).classed("active", true);

      var bounds = path.bounds(d),
        dx = bounds[1][0] - bounds[0][0],
        dy = bounds[1][1] - bounds[0][1],
        x = (bounds[0][0] + bounds[1][0]) / 2,
        y = (bounds[0][1] + bounds[1][1]) / 2,
        scale = .9 / Math.max(dx / width, dy / height),
        translate = [width / 2 - scale * x, height / 2 - scale * y];

      svg.transition()
        .duration(1000)
        .call(zoom.translate(translate).scale(scale).event);
    }

    function mouseenter(d) {
      var event = this.parentNode;
      d3.select(event).classed("active", true);

      var eventText = d3.select(event).select("text").classed("active", true);

    }

    function mouseleave(d) {
      var event = this.parentNode;
      d3.select(event).classed("active", false);

      var eventText = d3.select(event).select("text").classed("active", false);
    }

    function mouseclick(d) {
      var event = this.parentNode;
      d3.select(event).each(function(d) {
        app.sideEvent = new app.dayView({model: app.events.findWhere({id: d.id})});
        app.sidepage.render('sideEvent');
        if ($('.sideView').hasClass('hidden')) {
          // resize the tour map here?
          app.filter.toggleSideView();
        }
      });

    }

    function reset() {
      console.log('resetting')
      active.classed("active", false);
      active = d3.select(null);

      svg.transition()
        .duration(750)
        .call(zoom.translate([0, 0]).scale(1).event);
    }

    function zoomed() {
      g.style("stroke-width", 1.5 / d3.event.scale + "px");
      g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
      g.selectAll("circle").attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")scale(" + 1 / d3.event.scale + ")";
      });
      g.selectAll("text").attr("transform", function(d) {
        var width = this.getBoundingClientRect().width / d3.event.scale
        var height = this.getBoundingClientRect().height / d3.event.scale

        var radius = Math.sqrt(d.count) / d3.event.scale;
        var padding = 20 / d3.event.scale;

        return "translate(" + (d.x - width / 2.0) + "," + (d.y + height / 2.0 + radius + padding) + ")scale(" + 1 / d3.event.scale + ")";
      });
    }

    // If the drag behavior prevents the default click,
    // also stop propagation so we don’t click-to-zoom.
    function stopped() {
      if (d3.event.defaultPrevented) d3.event.stopPropagation();
    }

    return this;
  }

});
