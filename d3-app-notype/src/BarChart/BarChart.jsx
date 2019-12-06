import React, { Component } from 'react';
import * as d3 from 'd3';

class BarChart extends Component {
  state = {
    dates: [
      { date: '2013-01', value: 53 },
      { date: '2013-02', value: 165 },
      { date: '2013-03', value: 269 },
      { date: '2013-04', value: 344 },
      { date: '2013-05', value: 376 },
      { date: '2013-06', value: 410 },
      { date: '2013-07', value: 421 },
      { date: '2013-08', value: 405 },
      { date: '2013-09', value: 376 },
      { date: '2013-10', value: 359 },
      { date: '2013-11', value: 392 },
      { date: '2013-12', value: 433 },
      { date: '2014-01', value: 455 },
      { date: '2015-02', value: 478 }
    ]
  };

  componentDidMount() {
    // render example D3
    console.log(this.state.dates);
    const margin = { top: 20, right: 20, bottom: 70, left: 40 };
    const width = 600 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const x = d3
      .scaleBand()
      .rangeRound([0, width])
      .padding([0.05]);

    const y = d3.scaleLinear().range([height, 0]);
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y).ticks(10);

    const svg = d3
      .select(this.refs.anchor)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const data = this.state.dates;

    x.domain(
      data.map(function(d) {
        console.log(d.date);
        return d.date;
      })
    );
    y.domain([
      0,
      d3.max(data, function(d) {
        return d.value;
      })
    ]);

    svg
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '-.55em')
      .attr('transform', 'rotate(-90)');

    svg
      .append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Value ($)');

    svg
      .selectAll('bar')
      .data(data)
      .enter()
      .append('rect')
      .style('fill', 'steelblue')
      .attr('x', function(d) {
        return x(d.date);
      })
      .attr('width', x.bandwidth())
      .attr('y', function(d) {
        return y(d.value);
      })
      .attr('height', function(d) {
        return height - y(d.value);
      });
  }

  render() {
    const { dates } = this.state;

    if (!dates) {
      return null;
    }

    return <div ref="anchor" />;
  }
}

export default BarChart;
