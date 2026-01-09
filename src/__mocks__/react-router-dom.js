import React from 'react';

const mockNavigate = jest.fn();
const mockLocation = { pathname: '/' };
const mockParams = {};

module.exports = {
  BrowserRouter: ({ children }) => React.createElement('div', null, children),
  Routes: ({ children }) => React.createElement('div', null, children),
  Route: () => null,
  Navigate: () => null,
  Link: ({ children, to }) => React.createElement('a', { href: to }, children),
  NavLink: ({ children, to }) => React.createElement('a', { href: to }, children),
  useNavigate: () => mockNavigate,
  useLocation: () => mockLocation,
  useParams: () => mockParams,
  useSearchParams: () => [new URLSearchParams(), jest.fn()],
  Outlet: () => React.createElement('div', null),
  useOutletContext: () => ({}),
};
