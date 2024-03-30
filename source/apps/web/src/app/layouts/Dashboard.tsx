import React, { FC } from 'react';
import { props, create } from '@stylexjs/stylex';
import AppRoutes from '../router/main/AppRoutes';
import { Link, useLocation } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

const Dashboard: FC<Props> = ({ children }) => {
  const location = useLocation();
  return (
    <div {...props(styles.base)}>
      <div {...props(styles.sidebar)}>
        <div {...props(styles.sidebarBrand)}>Expert Micro Services</div>
        {AppRoutes.filter((route) => route.visible).map(({ label, path }) => {
          return (
            <Link
              to={path}
              key={path}
              {...props(
                styles.sidebarItem,
                location.pathname === path && styles.activeRoute
              )}
            >
              {label}
            </Link>
          );
        })}
      </div>
      <div {...props(styles.contentContainer)}>
        <div {...props(styles.activeRouteLabel)}>
          {AppRoutes.find((route) => route.path === location.pathname)?.label}
        </div>
        {children}
      </div>
    </div>
  );
};

export default Dashboard;

const styles = create({
  base: {
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
    width: '100vw',
  },
  sidebar: {
    width: '300px',
    backgroundColor: 'rgb(245,245,245)',
    padding: '10pt',
    borderRightWidth: '1px',
    gap: '5pt',
    display: 'flex',
    flexDirection: 'column',
  },
  sidebarBrand: {
    fontSize: '17pt',
    fontWeight: 'bold',
    marginBottom: '10pt',
    color: 'rgba(0,0,255,0.7)',
  },
  sidebarItem: {
    padding: '7pt',
    cursor: 'pointer',
    display: 'block',
    borderRadius: '5pt',
    transitionDuration: '300ms',
    ':hover': {
      backgroundColor: '#e0e0e0',
    },
    ':active': {
      backgroundColor: '#d0d0d0',
    },
  },
  activeRoute: {
    paddingLeft: '15pt',
    backgroundColor: 'rgba(0,0,255,0.7)',
    color: 'white',
    ':hover': {
      backgroundColor: 'rgba(0,0,255,0.7)',
    },
  },
  contentContainer: {
    padding: '10pt',
    flex: 1,
  },
  activeRouteLabel: {
    fontSize: '20pt',
    fontWeight: 'bold',
    marginBottom: '10pt',
    opacity: 0.6,
  },
});
