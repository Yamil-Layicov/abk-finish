import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import './adminLayout.scss';

const AdminNavbar = lazy(() => import('../components/navbar/AdminNavbar'));
const AdminMenu = lazy(() => import('../components/menu/AdminMenu'));

const AdminLayout = () => {
  return (
    <div className="adminLayoutMain">
      <Suspense fallback={<div>Loading...</div>}>
        <AdminNavbar />
      </Suspense>
      <div className="containera">
        <div className="menuContainer">
          <Suspense fallback={<div>Loading...</div>}>
            <AdminMenu />
          </Suspense>
        </div>
        <div className="contentContainer">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
