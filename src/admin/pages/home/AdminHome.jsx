import{ lazy, Suspense } from 'react';
import './AdminHome.scss';

const TopBox = lazy(() => import('../../components/topBox/TopBox'));
const ChartBox = lazy(() => import('../../components/charts/chartBox/ChartBox'));
const PieChartBox = lazy(() => import('../../components/charts/pieChartBox/PieChartBox'));
const BigChartBox = lazy(() => import('../../components/charts/bigChartBox/BigChartBox'));
const BarChartBox = lazy(() => import('../../components/charts/barChartBox/BarChartBox'));

import {  
  barChartBoxRevenue,
  barChartBoxVisit,
  chartBoxConversion,
  chartBoxProduct,
  chartBoxRevenue,
  chartBoxUser
} from '../../data';

const AdminHome = () => {
  return (
    <div className="adminHome">
      <div className="box box1">
        <Suspense fallback={<div>Loading...</div>}>
          <TopBox />
        </Suspense>
      </div>
      <div className="box box2">
        <Suspense fallback={<div>Loading...</div>}>
          <ChartBox {...chartBoxUser} />
        </Suspense>
      </div>
      <div className="box box3">
        <Suspense fallback={<div>Loading...</div>}>
          <ChartBox {...chartBoxProduct} />
        </Suspense>
      </div>
      <div className="box box4">
        <Suspense fallback={<div>Loading...</div>}>
          <PieChartBox />
        </Suspense>
      </div>
      <div className="box box5">
        <Suspense fallback={<div>Loading...</div>}>
          <ChartBox {...chartBoxConversion} />
        </Suspense>
      </div>
      <div className="box box6">
        <Suspense fallback={<div>Loading...</div>}>
          <ChartBox {...chartBoxRevenue} />
        </Suspense>
      </div>
      <div className="box box7">
        <Suspense fallback={<div>Loading...</div>}>
          <BigChartBox />
        </Suspense>
      </div>
      <div className="box box8">
        <Suspense fallback={<div>Loading...</div>}>
          <BarChartBox {...barChartBoxVisit} />
        </Suspense>
      </div>
      <div className="box box9">
        <Suspense fallback={<div>Loading...</div>}>
          <BarChartBox {...barChartBoxRevenue} />
        </Suspense>
      </div>
    </div>
  );
};

export default AdminHome;
