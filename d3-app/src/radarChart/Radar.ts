// import * as d3 from 'd3';
// /////////////////////////////////////////////////////////
// /////////////// RadarChart Code combined from  ////////////////
// // https://blockbuilder.org/alandunning/4c36eb1abdb248de34c64f5672afd857 //////////
// // https://gist.github.com/nbremer/21746a9668ffdf6d8242 /////////
// /////////////////////////////////////////////////////////

// // default config
// const cfg = {
//   w: 600, // Width
//   h: 600, // Height
//   margin: { top: 20, right: 20, bottom: 20, left: 20 }, // The margins of the SVG
//   levels: 3, // How many levels or inner circles should there be drawn
//   maxValue: 0, // What is the value that the biggest circle will represent
//   labelFactor: 1.25, // How much farther than the radius of the outer circle should the labels be placed
//   wrapWidth: 60, // The number of pixels after which a label needs to be given a new line
//   opacityArea: 0.35, // The opacity of the area of the blob
//   dotRadius: 4, // The size of the colored circles of each blog
//   opacityCircles: 0.1, // The opacity of the circles of each blob
//   strokeWidth: 2, // The width of the stroke around each blob
//   roundStrokes: true, // If true the area and stroke will follow a round path (cardinal-closed)
//   factor: 1.05, // space between axes
//   radians: 2 * Math.PI
// };

// interface RadarChartPoint {
//   axis: string;
//   value: number;
//   color: string;
//   benchmark: boolean;
// }

// const readyDOM = (id: any) => {
//   /////////////////////////////////////////////////////////
//   //////////// Create the container SVG and g /////////////
//   /////////////////////////////////////////////////////////

//   // Initiate the radar chart SVG
//   const svg = d3
//     .select(id)
//     .append('svg')
//     .attr('width', cfg.w + cfg.margin.left + cfg.margin.right)
//     .attr('height', cfg.h + cfg.margin.top + cfg.margin.bottom)
//     .attr('class', 'radar' + id)
//     .attr('transform', 'rotate(30)');
//   // Append a g element
//   const g = svg
//     .append('g')
//     .attr(
//       'transform',
//       'translate(' +
//         (cfg.w / 2 + cfg.margin.left) +
//         ',' +
//         (cfg.h / 2 + cfg.margin.top) +
//         ')'
//     );
//   // filter for drop shadow when you hover over a dot, code from https://gist.github.com/cpbotha/5200394
//   const defs = svg.append('defs');
//   const filter = defs
//     .append('filter')
//     .attr('id', 'drop-shadow')
//     .attr('height', '130%');
//   filter
//     .append('feGaussianBlur')
//     .attr('in', 'SourceAlpha')
//     .attr('stdDeviation', 3);
//   filter
//     .append('feOffset')
//     .attr('dx', 2)
//     .attr('dy', 2)
//     .attr('result', 'offsetBlur');
//   const feTransfer = filter.append('feComponentTransfer');
//   feTransfer
//     .append('feFuncA')
//     .attr('type', 'linear')
//     .attr('slope', 0.2);
//   const feMerge = filter.append('feMerge');
//   feMerge.append('feMergeNode');
//   feMerge.append('feMergeNode').attr('in', 'SourceGraphic');
//   return g;
// };

// const drawHeaxagonGrid = (
//   g: any,
//   radius: any,
//   allAxis: any,
//   total: any,
//   rScale: any,
//   maxValue: any,
//   angleSlice: any
// ) => {
//   // ///////////////////////////////////////////////////////
//   /////////////// Draw the hexagon grid //////////////////
//   /////////////////////////////////////////////////////////

//   // Wrapper for the grid & axes
//   const axisGrid = g.append('g').attr('class', 'axisWrapper');
//   // Circular segments
//   // tslint:disable-next-line no-increment-decrement
//   for (let j = 0; j < cfg.levels; j++) {
//     const levelFactor = cfg.factor * radius * ((j + 1) / cfg.levels);
//     axisGrid
//       .selectAll('.levels')
//       .data(allAxis)
//       .enter()
//       .append('g')
//       .attr('transform', 'translate(-65, -55)')
//       .append('svg:line')
//       .attr('x1', (d: RadarChartPoint, i: number) => {
//         /* istanbul ignore next */
//         return (
//           levelFactor * (1 - cfg.factor * Math.sin((i * cfg.radians) / total))
//         );
//       })
//       .attr('y1', (d: RadarChartPoint, i: number) => {
//         /* istanbul ignore next */
//         return (
//           levelFactor * (1 - cfg.factor * Math.cos((i * cfg.radians) / total))
//         );
//       })
//       .attr('x2', (d: RadarChartPoint, i: number) => {
//         /* istanbul ignore next */
//         return (
//           levelFactor *
//           (1 - cfg.factor * Math.sin(((i + 1) * cfg.radians) / total))
//         );
//       })
//       .attr('y2', (d: RadarChartPoint, i: number) => {
//         /* istanbul ignore next */
//         return (
//           levelFactor *
//           (1 - cfg.factor * Math.cos(((i + 1) * cfg.radians) / total))
//         );
//       })
//       .attr('class', 'line')
//       .style('stroke', '#A3A3A4')
//       .style('stroke-width', '0.3px')
//       .attr(
//         'transform',
//         'translate(' +
//           (cfg.w / 6 - levelFactor) +
//           ', ' +
//           (cfg.h / 6 - levelFactor) +
//           ')'
//       );
//   }

//   /////////////////////////////////////////////////////////
//   //////////////////// Draw the axes //////////////////////
//   /////////////////////////////////////////////////////////

//   // Create the straight lines radiating outward from the center
//   const axis = axisGrid
//     .selectAll('.axis')
//     .data(allAxis)
//     .enter()
//     .append('g')
//     .attr('class', 'axis');
//   // Append the lines
//   axis
//     .append('line')
//     .attr('x1', 0)
//     .attr('y1', 0)
//     .attr('x2', (d: RadarChartPoint, i: number) => {
//       /* istanbul ignore next */
//       return rScale(maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / 2);
//     })
//     .attr('y2', (d: RadarChartPoint, i: number) => {
//       /* istanbul ignore next */
//       return rScale(maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / 2);
//     })
//     .attr('class', 'line')
//     .style('stroke', '#A3A3A4')
//     .attr('transform', 'translate(0,3)')
//     .style('stroke-width', '0.3px');
// };

// export function radarChartGenerator(
//   id: string,
//   data: RadarChartPoint[][],
//   options: { w: number; h: number },
//   updateActivePoint: (d: RadarChartPoint | null) => void
// ) {
//   //  Put all of the options into a variable called cfg, if none were passed in use defaults above
//   /* istanbul ignore next */
//   if ('undefined' !== typeof options) {
//     /* istanbul ignore next */
//     for (const i in options) {
//       // tslint:disable-next-line
//       if ('undefined' !== typeof options[i]) {
//         cfg[i] = options[i];
//       }
//     } // for i
//   } // if

//   // If the supplied maxValue is smaller than the actual one, replace by the max in the data
//   /* istanbul ignore next */
//   const maxValue = Math.max(
//     cfg.maxValue,
//     d3.max(data, i => {
//       /* istanbul ignore next */
//       return d3.max(
//         i.map(o => {
//           /* istanbul ignore next */
//           return o.value;
//         })
//       );
//     })
//   );
//   /* istanbul ignore next */
//   const allAxis = data[0].map((i, j) => {
//     return i.axis;
//   }); // Names of each axis
//   /* istanbul ignore next */
//   const total = allAxis.length; // The number of different axes
//   /* istanbul ignore next */
//   const radius = Math.min(cfg.w / 2, cfg.h / 2); // Radius of the outermost circle
//   /* istanbul ignore next */
//   const angleSlice = (Math.PI * 2) / total; // The width in radians of each "slice"

//   // Scale for the radius
//   /* istanbul ignore next */
//   const rScale = d3
//     .scaleLinear()
//     .range([0, radius])
//     .domain([0, maxValue]);
//   /* istanbul ignore next */
//   const g = readyDOM(id);
//   /* istanbul ignore next */
//   drawHeaxagonGrid(g, radius, allAxis, total, rScale, maxValue, angleSlice);

//   /////////////////////////////////////////////////////////
//   ///////////// Draw the radar chart blobs ////////////////
//   /////////////////////////////////////////////////////////

//   // The radial line function
//   /* istanbul ignore next */
//   const radarLine = d3
//     .lineRadial()
//     .curve(d3.curveBasisClosed)
//     .radius((d: RadarChartPoint) => {
//       /* istanbul ignore next */
//       return rScale(d.value);
//     })
//     .angle((d: RadarChartPoint, i: number) => {
//       /* istanbul ignore next */
//       return i * angleSlice;
//     });

//   if (cfg.roundStrokes) {
//     radarLine.curve(d3.curveCardinalClosed);
//   }

//   // Create a wrapper for the blobs
//   /* istanbul ignore next */
//   const blobWrapper = g
//     .selectAll('.radarWrapper')
//     .data(data)
//     .enter()
//     .append('g')
//     .attr('class', 'radarWrapper')
//     .attr('transform', 'translate(0,3)');

//   // Append the backgrounds
//   /* istanbul ignore next */
//   blobWrapper
//     .append('path')
//     .attr('class', 'radarArea')
//     .attr('d', (d: RadarChartPoint, i: number) => {
//       /* istanbul ignore next */
//       return radarLine(d);
//     })
//     .style('fill', d => d[0].color)
//     .style('fill-opacity', cfg.opacityArea)
//     // highlight the blob you are hovering over
//     .on('mouseover', function() {
//       // Dim all blobs
//       /* istanbul ignore next */
//       d3.selectAll('.radarArea')
//         .transition()
//         .duration(200)
//         .style('fill-opacity', 0.2);
//       // Bring back the hovered over blob
//       // @ts-ignore
//       d3.select(this)
//         .transition()
//         .duration(200)
//         .style('cursor', 'pointer')
//         .style('fill-opacity', 0.5);
//     })
//     // Bring back all blobs
//     .on('mouseout', () => {
//       d3.selectAll('.radarArea')
//         .transition()
//         .duration(200)
//         .style('fill-opacity', cfg.opacityArea);
//     });

//   // Create the outlines
//   /* istanbul ignore next */
//   blobWrapper
//     .append('path')
//     .attr('class', 'radarStroke')
//     /* istanbul ignore next */
//     .attr('d', (d: RadarChartPoint, i: number) => {
//       /* istanbul ignore next */
//       return radarLine(d);
//     })
//     .style('stroke-width', cfg.strokeWidth + 'px')
//     /* istanbul ignore next */
//     .style('stroke', (d: RadarChartPoint) => d[0].color)
//     .style('fill', 'none')
//     .style('opacity', cfg.opacityCircles);

//   // Append the circles
//   /* istanbul ignore next */
//   blobWrapper
//     .selectAll('.radarCircle')
//     .data((d: RadarChartPoint, i: number) => {
//       /* istanbul ignore next */
//       return d;
//     })
//     .enter()
//     .append('circle')
//     .attr('class', 'radarCircle')
//     .attr('class', 'radarCircle')
//     .attr('r', cfg.dotRadius)
//     .attr('cx', (d: RadarChartPoint, i: number) => {
//       /* istanbul ignore next */
//       return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2);
//     })
//     .attr('cy', (d: RadarChartPoint, i: number) => {
//       /* istanbul ignore next */
//       return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2);
//     })
//     .style('fill', (d: RadarChartPoint) => {
//       /* istanbul ignore next */
//       return d.color;
//     })
//     .style('fill-opacity', 0.8);

//   /////////////////////////////////////////////////////////
//   //////// Append invisible circles for hover effect to get around layer issue ///////////
//   /////////////////////////////////////////////////////////

//   // Wrapper for the invisible circles on top
//   const blobCircleWrapper = g
//     .selectAll('.radarCircleWrapper')
//     .data(data)
//     .enter()
//     .append('g')
//     .attr('class', 'radarCircleWrapper');

//   // Append a set of invisible circles on top for the mouseover pop-up
//   blobCircleWrapper
//     .selectAll('.radarInvisibleCircle')
//     .data((d: RadarChartPoint, i: number) => {
//       /* istanbul ignore next */
//       return d;
//     })
//     .enter()
//     .append('circle')
//     .attr('class', 'radarInvisibleCircle')
//     .attr('r', cfg.dotRadius)
//     .attr('cx', (d: RadarChartPoint, i: number) => {
//       /* istanbul ignore next */
//       return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2);
//     })
//     .attr('cy', (d: RadarChartPoint, i: number) => {
//       /* istanbul ignore next */
//       return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2);
//     })
//     .style('fill', 'none')
//     .attr('transform', 'translate(0,3)')
//     .style('pointer-events', 'all')
//     .on('mouseover', function(d: RadarChartPoint, i: number) {
//       updateActivePoint(d);
//       // @ts-ignore
//       d3.select(this)
//         .transition()
//         .duration(200)
//         .attr('r', 8)
//         .style('fill', d.color)
//         .style('filter', 'url(#drop-shadow)')
//         .style('cursor', 'pointer');
//     })
//     .on('mouseout', function() {
//       updateActivePoint(null);
//       // @ts-ignore
//       d3.select(this)
//         .transition()
//         .duration(200)
//         .attr('r', cfg.dotRadius);
//       setTimeout(() => {
//         // @ts-ignore
//         d3.select(this).style('fill', 'none');
//       }, 200);
//     });
// }

// export function emptyRadarGenerator(
//   id: string,
//   options: {
//     w: number;
//     h: number;
//     margin: {};
//     levels: number;
//   }
// ) {
//   const data = [
//     { axis: 'Mar' },
//     { axis: 'Calmar' },
//     { axis: 'Romad' },
//     { axis: 'Treynor' },
//     { axis: 'Sortino' },
//     { axis: 'Sharpe' }
//   ];
//   //  Put all of the options into a letiable called cfg, if none were passed in use defaults above
//   /* istanbul ignore next */
//   if ('undefined' !== typeof options) {
//     /* istanbul ignore next */
//     for (const i in options) {
//       /* istanbul ignore next */
//       if ('undefined' !== typeof options[i]) {
//         cfg[i] = options[i];
//       }
//     } // for i
//   } // if

//   // Dummy data for empty chart
//   const maxValue = 100;
//   /* istanbul ignore next */
//   const allAxis = data.map(i => {
//     /* istanbul ignore next */
//     return i.axis;
//   }); // Names of each axis
//   /* istanbul ignore next */
//   const total = allAxis.length; // The number of different axes
//   /* istanbul ignore next */
//   const radius = Math.min(cfg.w / 2, cfg.h / 2); // Radius of the outermost circle
//   /* istanbul ignore next */
//   const angleSlice = (Math.PI * 2) / total; // The width in radians of each "slice"
//   /* istanbul ignore next */
//   const g = readyDOM(id);
//   // Scale for the radius
//   /* istanbul ignore next */
//   const rScale = d3
//     .scaleLinear()
//     .range([0, radius])
//     .domain([0, maxValue]);
//   /* istanbul ignore next */
//   drawHeaxagonGrid(g, radius, allAxis, total, rScale, maxValue, angleSlice);
// }
