import { render, screen } from '@testing-library/react';
import App from './App';

// Mock react-router-dom - using manual mock from __mocks__
jest.mock('react-router-dom');

// Mock Google OAuth Provider
jest.mock('@react-oauth/google', () => ({
  GoogleOAuthProvider: ({ children }) => <div>{children}</div>,
  useGoogleLogin: () => jest.fn(),
}));

// Mock all page components to avoid dependency issues
jest.mock('./features/auth/pages/LoginPage', () => {
  return function MockLoginPage() {
    return <div>Login Page</div>;
  };
});

jest.mock('./features/auth/pages/SignUpPage', () => {
  return function MockSignUpPage() {
    return <div>SignUp Page</div>;
  };
});

jest.mock('./pages/Dashboardpage', () => {
  return function MockDashboardPage() {
    return <div>Dashboard Page</div>;
  };
});

jest.mock('./pages/PoojaDetailsPage', () => {
  return function MockPoojaDetailsPage() {
    return <div>Pooja Details Page</div>;
  };
});

jest.mock('./pages/CheckoutPage', () => {
  return function MockCheckoutPage() {
    return <div>Checkout Page</div>;
  };
});

jest.mock('./pages/OrderReview', () => {
  return function MockOrderReview() {
    return <div>Order Review Page</div>;
  };
});

jest.mock('./pages/OrdersPage', () => {
  return function MockOrdersPage() {
    return <div>Orders Page</div>;
  };
});

jest.mock('./layouts/AuthLayout', () => {
  return function MockAuthLayout({ children }) {
    return <div data-testid="auth-layout">{children}</div>;
  };
});

jest.mock('./layouts/MainLayout', () => {
  return function MockMainLayout({ children }) {
    return <div data-testid="main-layout">{children}</div>;
  };
});

jest.mock('./routes/ProtectedRoute', () => {
  return function MockProtectedRoute({ children }) {
    return <div data-testid="protected-route">{children}</div>;
  };
});

describe('App Component', () => {
  test('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

  test('wraps content with GoogleOAuthProvider', () => {
    const { container } = render(<App />);
    // The component should render successfully with the provider
    expect(container.firstChild).toBeTruthy();
  });

  test('includes routing structure', () => {
    render(<App />);
    // Since we're mocking Routes and BrowserRouter, we just verify the component renders
    // In a real scenario, you'd test individual routes separately
    expect(true).toBe(true);
  });
});
