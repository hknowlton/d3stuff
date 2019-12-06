import React, { Component } from 'react';
import cx from 'classnames';
import Skeleton from 'react-loading-skeleton';

import { emptyRadarGenerator } from './Radar';
import styles from './RadarChart.scss';

class RadarChartLoading extends Component {
  componentDidMount() {
    emptyRadarGenerator('#radarChartLoading', {
      w: 386,
      h: 353,
      margin: { top: 33, right: 20, bottom: 25, left: 20 },
      levels: 5
    });
  }
  render() {
    return (
      <div className={cx(styles.radarChartContent)}>
        <div className={styles.sharpeLine} />
        <div className={styles.marLine} />
        <div className={styles.sortinoLine} />
        <div className={styles.calmarLine} />
        <div className={styles.treynorLine} />
        <div className={styles.romadLine} />
        <h6>Ratios</h6>
        <div className={styles.radarChartLeftData}>
          <div className={styles.statContainer}>
            <div className={styles.statName}>Sharpe</div>
            <div className={cx(styles.securityData, styles.columnLeft)}>
              <Skeleton height={54} width={80} />
            </div>
            <div className={cx(styles.benchmarkData, styles.columnRight)}>
              <Skeleton height={54} width={80} />
            </div>
          </div>
          <div className={styles.statContainer}>
            <div className={styles.statName}>Sortino</div>
            <div className={cx(styles.securityData, styles.columnLeft)}>
              <Skeleton height={54} width={80} />
            </div>
            <div className={cx(styles.benchmarkData, styles.columnRight)}>
              <Skeleton height={54} width={80} />
            </div>
          </div>
          <div className={styles.statContainer}>
            <div className={styles.statName}>Treynor</div>
            <div className={cx(styles.securityData, styles.columnLeft)}>
              <Skeleton height={54} width={80} />
            </div>
            <div className={cx(styles.benchmarkData, styles.columnRight)}>
              <Skeleton height={54} width={80} />
            </div>
          </div>
        </div>
        <div id="radarChartLoading" className={styles.radarChart} />
        <div className={styles.radarChartRightData}>
          <div className={styles.statContainer}>
            <div className={cx(styles.statName, styles.statNameRight)}>Mar</div>
            <div className={cx(styles.securityData, styles.columnLeft)}>
              <Skeleton height={54} width={80} />
            </div>
            <div className={cx(styles.benchmarkData, styles.columnRight)}>
              <Skeleton height={54} width={80} />
            </div>
          </div>
          <div className={styles.statContainer}>
            <div className={cx(styles.statName, styles.statNameRight)}>
              Calmar
            </div>
            <div className={cx(styles.securityData, styles.columnLeft)}>
              <Skeleton height={54} width={80} />
            </div>
            <div className={cx(styles.benchmarkData, styles.columnRight)}>
              <Skeleton height={54} width={80} />
            </div>
          </div>
          <div className={styles.statContainer}>
            <div className={cx(styles.statName, styles.statNameRight)}>
              Romad
            </div>
            <div className={cx(styles.securityData, styles.columnLeft)}>
              <Skeleton height={54} width={80} />
            </div>
            <div className={cx(styles.benchmarkData, styles.columnRight)}>
              <Skeleton height={54} width={80} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RadarChartLoading;
