// import React, { Component } from 'react';
// import * as d3 from 'd3';
// import cx from 'classnames';

// import styles from './RadarChart.scss';
// import RadarChartLoading from './RadarChartLoading';

// import { radarChartGenerator } from './Radar';

// interface RadarChartComponentState {
//   loading: boolean;
//   hasError: boolean;
//   hoveredPoint: RadarChartPoint | null;
// }

// interface RadarChartPoint {
//   axis: string;
//   value: number;
//   color: string;
//   benchmark: boolean;
// }

// const securityProps = {
//   mar_ratio: 0.16,
//   romad: 0.1564734573,
//   calmar_ratio: 0.83424234,
//   sortino_ratio: 0.08724234,
//   treynor_ratio: 0.077423424,
//   sharpe_ratio: 0.0656436547
// };

// const benchmarkProps = {
//   mar_ratio: 0.1454568458,
//   romad: 0.12342344568,
//   calmar_ratio: 0.797242,
//   sortino_ratio: 0.06823432,
//   treynor_ratio: 0.059,
//   sharpe_ratio: 0.04342342
// };

// class RadarChartComponent extends Component<{}, RadarChartComponentState> {
//   // tslint:disable-next-line:no-any
//   static getDerivedStateFromError(error: any) {
//     return { hasError: true };
//   }

//   state = {
//     loading: true,
//     hasError: false,
//     hoveredPoint: null
//   };

//   drawChart = () => {
//     // Config for the Radar chart
//     /* istanbul ignore next */
//     const config = {
//       w: 386,
//       h: 353,
//       margin: { top: 33, right: 20, bottom: 25, left: 20 },
//       maxValue: 0.5,
//       levels: 5,
//       roundStrokes: true
//     };
//     /* istanbul ignore next */
//     const jsondata = [
//       [
//         { axis: 'Mar', value: 0.13, color: '#a3a3a4', benchmark: true },
//         { axis: 'Calmar', value: 0.2, color: '#a3a3a4', benchmark: true },
//         { axis: 'Romad', value: 0.13, color: '#a3a3a4', benchmark: true },
//         { axis: 'Treynor', value: 0.35, color: '#a3a3a4', benchmark: true },
//         { axis: 'Sortino', value: 0.16, color: '#a3a3a4', benchmark: true },
//         { axis: 'Sharpe', value: 0.27, color: '#a3a3a4', benchmark: true }
//       ],
//       [
//         { axis: 'Mar', value: 0.17, color: '#0E99F7', benchmark: false },
//         { axis: 'Calmar', value: 0.22, color: '#0E99F7', benchmark: false },
//         { axis: 'Romad', value: 0.02, color: '#0E99F7', benchmark: false },
//         { axis: 'Treynor', value: 0.29, color: '#0E99F7', benchmark: false },
//         { axis: 'Sortino', value: 0.28, color: '#0E99F7', benchmark: false },
//         { axis: 'Sharpe', value: 0.22, color: '#0E99F7', benchmark: false }
//       ]
//     ];

//     radarChartGenerator(
//       '#radarChart',
//       jsondata,
//       config,
//       this.updateHoveredPoint
//     );
//   };

//   componentDidMount() {
//     // simulate data fetch
//     setTimeout(() => {
//       /* istanbul ignore next */
//       this.setState({ loading: false }, () => {
//         this.drawChart();
//       });
//     }, 3000);
//   }

//   updateHoveredPoint = (data: RadarChartPoint | null) => {
//     this.setState({ hoveredPoint: data });
//   };

//   render() {
//     if (this.state.loading) {
//       return <RadarChartLoading />;
//     }
//     if (this.state.hasError) {
//       return <h1>error sorry</h1>;
//     }

//     return (
//       <div className={cx(styles.radarChartContent)}>
//         <div className={styles.sharpeLine}>
//           {this.state.hoveredPoint &&
//             // @ts-ignore
//             this.state.hoveredPoint.axis === 'Sharpe' && (
//               <div className={styles.lineActiveLTR} />
//             )}
//         </div>
//         <div className={styles.marLine}>
//           {this.state.hoveredPoint &&
//             // @ts-ignore
//             this.state.hoveredPoint.axis === 'Mar' && (
//               <div className={styles.lineActiveRTL} />
//             )}
//         </div>
//         <div className={styles.sortinoLine}>
//           {this.state.hoveredPoint &&
//             // @ts-ignore
//             this.state.hoveredPoint.axis === 'Sortino' && (
//               <div className={styles.lineActiveLTR} />
//             )}
//         </div>
//         <div className={styles.calmarLine}>
//           {this.state.hoveredPoint &&
//             // @ts-ignore
//             this.state.hoveredPoint.axis === 'Calmar' && (
//               <div className={styles.lineActiveRTL} />
//             )}
//         </div>
//         <div className={styles.treynorLine}>
//           {this.state.hoveredPoint &&
//             // @ts-ignore
//             this.state.hoveredPoint.axis === 'Treynor' && (
//               <div className={styles.lineActiveLTR} />
//             )}
//         </div>
//         <div className={styles.romadLine}>
//           {this.state.hoveredPoint &&
//             // @ts-ignore
//             this.state.hoveredPoint.axis === 'Romad' && (
//               <div className={styles.lineActiveRTL} />
//             )}
//         </div>
//         <h6>Ratios</h6>
//         <div className={styles.radarChartLeftData}>
//           <div className={styles.statContainer}>
//             <div className={styles.statName}>Sharpe</div>
//             <div
//               className={
//                 this.state.hoveredPoint &&
//                 // @ts-ignore
//                 !this.state.hoveredPoint.benchmark &&
//                 // @ts-ignore
//                 this.state.hoveredPoint.axis === 'Sharpe'
//                   ? cx(
//                       styles.securityData,
//                       styles.columnLeft,
//                       styles.activeColumn
//                     )
//                   : cx(styles.securityData, styles.columnLeft)
//               }
//             >
//               <div className={styles.securityStat}>
//                 {securityProps.sharpe_ratio}
//               </div>
//               <div className={styles.label}>spy</div>
//             </div>
//             <div
//               className={
//                 this.state.hoveredPoint &&
//                 // @ts-ignore
//                 this.state.hoveredPoint.benchmark &&
//                 // @ts-ignore
//                 this.state.hoveredPoint.axis === 'Sharpe'
//                   ? cx(
//                       styles.benchmarkData,
//                       styles.columnRight,
//                       styles.activeColumn
//                     )
//                   : cx(styles.benchmarkData, styles.columnRight)
//               }
//             >
//               <div className={styles.securityStat}>
//                 {benchmarkProps.sharpe_ratio}
//               </div>
//               <div className={styles.label}>benchmark</div>
//             </div>
//           </div>
//           <div className={styles.statContainer}>
//             <div className={styles.statName}>Sortino</div>
//             <div
//               className={
//                 this.state.hoveredPoint &&
//                 // @ts-ignore
//                 !this.state.hoveredPoint.benchmark &&
//                 // @ts-ignore
//                 this.state.hoveredPoint.axis === 'Sortino'
//                   ? cx(
//                       styles.securityData,
//                       styles.columnLeft,
//                       styles.activeColumn
//                     )
//                   : cx(styles.securityData, styles.columnLeft)
//               }
//             >
//               <div className={styles.securityStat}>
//                 {securityProps.sortino_ratio}
//               </div>
//               <div className={styles.label}>spy</div>
//             </div>
//             <div
//               className={
//                 this.state.hoveredPoint &&
//                 // @ts-ignore
//                 this.state.hoveredPoint.benchmark &&
//                 // @ts-ignore
//                 this.state.hoveredPoint.axis === 'Sortino'
//                   ? cx(
//                       styles.benchmarkData,
//                       styles.columnRight,
//                       styles.activeColumn
//                     )
//                   : cx(styles.benchmarkData, styles.columnRight)
//               }
//             >
//               <div className={styles.securityStat}>
//                 {benchmarkProps.sortino_ratio}
//               </div>
//               <div className={styles.label}>
//                 benchmark data is the greatest data in the etnire word
//               </div>
//             </div>
//           </div>
//           <div className={styles.statContainer}>
//             <div className={styles.statName}>Treynor</div>
//             <div
//               className={
//                 this.state.hoveredPoint &&
//                 // @ts-ignore
//                 !this.state.hoveredPoint.benchmark &&
//                 // @ts-ignore
//                 this.state.hoveredPoint.axis === 'Treynor'
//                   ? cx(
//                       styles.securityData,
//                       styles.columnLeft,
//                       styles.activeColumn
//                     )
//                   : cx(styles.securityData, styles.columnLeft)
//               }
//             >
//               <div className={styles.securityStat}>
//                 {securityProps.treynor_ratio}
//               </div>
//               <div className={styles.label}>spy</div>
//             </div>
//             <div
//               className={
//                 this.state.hoveredPoint &&
//                 // @ts-ignore
//                 this.state.hoveredPoint.benchmark &&
//                 // @ts-ignore
//                 this.state.hoveredPoint.axis === 'Treynor'
//                   ? cx(
//                       styles.benchmarkData,
//                       styles.columnRight,
//                       styles.activeColumn
//                     )
//                   : cx(styles.benchmarkData, styles.columnRight)
//               }
//             >
//               <div className={styles.securityStat}>
//                 {benchmarkProps.treynor_ratio}
//               </div>
//               <div className={styles.label}>benchmark</div>
//             </div>
//           </div>
//         </div>
//         <div className={styles.radarChart} id="radarChart" />
//         <div className={styles.radarChartRightData}>
//           <div className={styles.statContainer}>
//             <div className={cx(styles.statName, styles.statNameRight)}>Mar</div>
//             <div
//               className={
//                 this.state.hoveredPoint &&
//                 // @ts-ignore
//                 !this.state.hoveredPoint.benchmark &&
//                 // @ts-ignore
//                 this.state.hoveredPoint.axis === 'Mar'
//                   ? cx(
//                       styles.securityData,
//                       styles.columnLeft,
//                       styles.activeColumn
//                     )
//                   : cx(styles.securityData, styles.columnLeft)
//               }
//             >
//               <div className={styles.securityStat}>
//                 {securityProps.mar_ratio}
//               </div>
//               <div className={styles.label}>spy</div>
//             </div>
//             <div
//               className={
//                 this.state.hoveredPoint &&
//                 // @ts-ignore
//                 this.state.hoveredPoint.benchmark &&
//                 // @ts-ignore
//                 this.state.hoveredPoint.axis === 'Mar'
//                   ? cx(
//                       styles.benchmarkData,
//                       styles.columnRight,
//                       styles.activeColumn
//                     )
//                   : cx(styles.benchmarkData, styles.columnRight)
//               }
//             >
//               <div className={styles.securityStat}>
//                 {benchmarkProps.mar_ratio}
//               </div>
//               <div className={styles.label}>benchmark</div>
//             </div>
//           </div>
//           <div className={styles.statContainer}>
//             <div className={cx(styles.statName, styles.statNameRight)}>
//               Calmar
//             </div>
//             <div
//               className={
//                 this.state.hoveredPoint &&
//                 // @ts-ignore
//                 !this.state.hoveredPoint.benchmark &&
//                 // @ts-ignore
//                 this.state.hoveredPoint.axis === 'Calmar'
//                   ? cx(
//                       styles.securityData,
//                       styles.columnLeft,
//                       styles.activeColumn
//                     )
//                   : cx(styles.securityData, styles.columnLeft)
//               }
//             >
//               <div className={styles.securityStat}>
//                 {securityProps.calmar_ratio}
//               </div>
//               <div className={styles.label}>spy</div>
//             </div>
//             <div
//               className={
//                 this.state.hoveredPoint &&
//                 // @ts-ignore
//                 this.state.hoveredPoint.benchmark &&
//                 // @ts-ignore
//                 this.state.hoveredPoint.axis === 'Calmar'
//                   ? cx(
//                       styles.benchmarkData,
//                       styles.columnRight,
//                       styles.activeColumn
//                     )
//                   : cx(styles.benchmarkData, styles.columnRight)
//               }
//             >
//               <div className={styles.securityStat}>
//                 {benchmarkProps.calmar_ratio}
//               </div>
//               <div className={styles.label}>
//                 benchmark data is the greatest data in the etnire word
//               </div>
//             </div>
//           </div>
//           <div className={styles.statContainer}>
//             <div className={cx(styles.statName, styles.statNameRight)}>
//               Romad
//             </div>
//             <div
//               className={
//                 this.state.hoveredPoint &&
//                 // @ts-ignore
//                 !this.state.hoveredPoint.benchmark &&
//                 // @ts-ignore
//                 this.state.hoveredPoint.axis === 'Romad'
//                   ? cx(
//                       styles.securityData,
//                       styles.columnLeft,
//                       styles.activeColumn
//                     )
//                   : cx(styles.securityData, styles.columnLeft)
//               }
//             >
//               <div className={styles.securityStat}>{securityProps.romad}</div>
//               <div className={styles.label}>spy</div>
//             </div>
//             <div
//               className={
//                 this.state.hoveredPoint &&
//                 // @ts-ignore
//                 this.state.hoveredPoint.benchmark &&
//                 // @ts-ignore
//                 this.state.hoveredPoint.axis === 'Romad'
//                   ? cx(
//                       styles.benchmarkData,
//                       styles.columnRight,
//                       styles.activeColumn
//                     )
//                   : cx(styles.benchmarkData, styles.columnRight)
//               }
//             >
//               <div className={styles.securityStat}>{benchmarkProps.romad}</div>
//               <div className={styles.label}>benchmark</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default RadarChartComponent;
