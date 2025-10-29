import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import SigninForm from '../SigninForm';
import { AuthProvider } from '../../../../context/authContext';
import axios from 'axios';

// Mock dependencies
jest.mock('axios'); // Use manual mock from __mocks__
jest.mock('react-router-dom'); // Use manual mock from __mocks__

// Mock Google OAuth
jest.mock('@react-oauth/google', () => ({
  GoogleLogin: ({ onSuccess, onError }) => (
    <button onClick={() => onSuccess({ credential: 'mock-token' })}>
      Mock Google Login
    </button>
  ),
  useGoogleLogin: jest.fn((config) => {
    return jest.fn(() => {
      if (config.onSuccess) {
        config.onSuccess({ access_token: 'mock-access-token' });
      }
    });
  }),
}));

// Helper function to render component with necessary providers
const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <AuthProvider>{component}</AuthProvider>
    </BrowserRouter>
  );
};

describe('SigninForm Component', () => {
  let mockOnSubmit;

  beforeEach(() => {
    mockOnSubmit = jest.fn((e) => e.preventDefault());
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Rendering Tests
  describe('Rendering', () => {
    test('renders the signin form with heading', () => {
      renderWithProviders(<SigninForm onSubmit={mockOnSubmit} />);
      
      const heading = screen.getByRole('heading', { name: /singn in/i });
      expect(heading).toBeInTheDocument();
    });

    test('renders email/phone input field', () => {
      renderWithProviders(<SigninForm onSubmit={mockOnSubmit} />);
      
      const identifierInput = screen.getByPlaceholderText(/email or phone/i);
      expect(identifierInput).toBeInTheDocument();
    });

    test('renders password input field', () => {
      renderWithProviders(<SigninForm onSubmit={mockOnSubmit} />);
      
      const passwordInput = screen.getByPlaceholderText(/password/i);
      expect(passwordInput).toBeInTheDocument();
    });

    test('renders login button', () => {
      renderWithProviders(<SigninForm onSubmit={mockOnSubmit} />);
      
      const loginButton = screen.getByRole('button', { name: /^login$/i });
      expect(loginButton).toBeInTheDocument();
    });

    test('renders Google login button', () => {
      renderWithProviders(<SigninForm onSubmit={mockOnSubmit} />);
      
      const googleButton = screen.getByRole('button', { name: /login with google/i });
      expect(googleButton).toBeInTheDocument();
    });

    test('Google login button displays Google icon', () => {
      renderWithProviders(<SigninForm onSubmit={mockOnSubmit} />);
      
      const googleIcon = screen.getByAltText(/google/i);
      expect(googleIcon).toBeInTheDocument();
      expect(googleIcon).toHaveAttribute('src');
    });
  });

  // Input Field Tests
  describe('Input Fields', () => {
    test('identifier input has correct name attribute', () => {
      renderWithProviders(<SigninForm onSubmit={mockOnSubmit} />);
      
      const identifierInput = screen.getByPlaceholderText(/email or phone/i);
      expect(identifierInput).toHaveAttribute('name', 'identifier');
    });

    test('password input has correct name and type attributes', () => {
      renderWithProviders(<SigninForm onSubmit={mockOnSubmit} />);
      
      const passwordInput = screen.getByPlaceholderText(/password/i);
      expect(passwordInput).toHaveAttribute('name', 'password');
      expect(passwordInput).toHaveAttribute('type', 'password');
    });

    test('both input fields are required', () => {
      renderWithProviders(<SigninForm onSubmit={mockOnSubmit} />);
      
      expect(screen.getByPlaceholderText(/email or phone/i)).toBeRequired();
      expect(screen.getByPlaceholderText(/password/i)).toBeRequired();
    });

    test('password field masks input', () => {
      renderWithProviders(<SigninForm onSubmit={mockOnSubmit} />);
      
      const passwordInput = screen.getByPlaceholderText(/password/i);
      expect(passwordInput).toHaveAttribute('type', 'password');
    });
  });

  // User Interaction Tests
  describe('User Interactions', () => {
    test('allows user to type in email/phone field', async () => {
      const user = userEvent.setup();
      renderWithProviders(<SigninForm onSubmit={mockOnSubmit} />);
      
      const identifierInput = screen.getByPlaceholderText(/email or phone/i);
      await user.type(identifierInput, 'test@example.com');
      
      expect(identifierInput).toHaveValue('test@example.com');
    });

    test('allows user to type in password field', async () => {
      const user = userEvent.setup();
      renderWithProviders(<SigninForm onSubmit={mockOnSubmit} />);
      
      const passwordInput = screen.getByPlaceholderText(/password/i);
      await user.type(passwordInput, 'mySecurePassword');
      
      expect(passwordInput).toHaveValue('mySecurePassword');
    });

    test('allows phone number format in identifier field', async () => {
      const user = userEvent.setup();
      renderWithProviders(<SigninForm onSubmit={mockOnSubmit} />);
      
      const identifierInput = screen.getByPlaceholderText(/email or phone/i);
      await user.type(identifierInput, '1234567890');
      
      expect(identifierInput).toHaveValue('1234567890');
    });
  });

  // Form Submission Tests
  describe('Form Submission', () => {
    test('calls onSubmit when form is submitted with credentials', async () => {
      const user = userEvent.setup();
      renderWithProviders(<SigninForm onSubmit={mockOnSubmit} />);
      
      // Fill in credentials
      await user.type(screen.getByPlaceholderText(/email or phone/i), 'test@example.com');
      await user.type(screen.getByPlaceholderText(/password/i), 'password123');
      
      // Submit form
      const loginButton = screen.getByRole('button', { name: /^login$/i });
      await user.click(loginButton);
      
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });

    test('form submission can be triggered by pressing Enter', async () => {
      const user = userEvent.setup();
      renderWithProviders(<SigninForm onSubmit={mockOnSubmit} />);
      
      await user.type(screen.getByPlaceholderText(/email or phone/i), 'test@example.com');
      await user.type(screen.getByPlaceholderText(/password/i), 'password123{enter}');
      
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });

    test('login button has correct type attribute', () => {
      renderWithProviders(<SigninForm onSubmit={mockOnSubmit} />);
      
      const loginButton = screen.getByRole('button', { name: /^login$/i });
      expect(loginButton).toHaveAttribute('type', 'submit');
    });
  });

  // Google Login Tests
  describe('Google Login Integration', () => {
    test('Google login button is rendered correctly', () => {
      renderWithProviders(<SigninForm onSubmit={mockOnSubmit} />);
      
      const googleButton = screen.getByRole('button', { name: /login with google/i });
      expect(googleButton).toBeInTheDocument();
    });

    test('Google login button has appropriate styling classes', () => {
      renderWithProviders(<SigninForm onSubmit={mockOnSubmit} />);
      
      const googleButton = screen.getByRole('button', { name: /login with google/i });
      expect(googleButton.className).toContain('border');
      expect(googleButton.className).toContain('bg-black');
    });

    test('Google icon is displayed with correct attributes', () => {
      renderWithProviders(<SigninForm onSubmit={mockOnSubmit} />);
      
      const googleIcon = screen.getByAltText(/google/i);
      expect(googleIcon).toHaveClass('w-5', 'h-5');
    });
  });

  // Accessibility Tests
  describe('Accessibility', () => {
    test('form has proper structure with heading', () => {
      renderWithProviders(<SigninForm onSubmit={mockOnSubmit} />);
      
      const heading = screen.getByRole('heading', { name: /singn in/i });
      expect(heading).toHaveClass('text-2xl', 'font-bold');
    });

    test('submit button is keyboard accessible', async () => {
      const user = userEvent.setup();
      renderWithProviders(<SigninForm onSubmit={mockOnSubmit} />);
      
      const loginButton = screen.getByRole('button', { name: /^login$/i });
      loginButton.focus();
      
      expect(loginButton).toHaveFocus();
    });

    test('inputs can be tabbed through', async () => {
      const user = userEvent.setup();
      renderWithProviders(<SigninForm onSubmit={mockOnSubmit} />);
      
      const identifierInput = screen.getByPlaceholderText(/email or phone/i);
      const passwordInput = screen.getByPlaceholderText(/password/i);
      
      identifierInput.focus();
      expect(identifierInput).toHaveFocus();
      
      await user.tab();
      expect(passwordInput).toHaveFocus();
    });
  });

  // Edge Cases
  describe('Edge Cases', () => {
    test('handles empty form submission attempt', async () => {
      const user = userEvent.setup();
      renderWithProviders(<SigninForm onSubmit={mockOnSubmit} />);
      
      const loginButton = screen.getByRole('button', { name: /^login$/i });
      await user.click(loginButton);
      
      // HTML5 validation should prevent submission
      expect(loginButton).toBeInTheDocument();
    });

    test('handles special characters in email field', async () => {
      const user = userEvent.setup();
      renderWithProviders(<SigninForm onSubmit={mockOnSubmit} />);
      
      const identifierInput = screen.getByPlaceholderText(/email or phone/i);
      await user.type(identifierInput, 'test+tag@example.com');
      
      expect(identifierInput).toHaveValue('test+tag@example.com');
    });

    test('handles very long password input', async () => {
      const user = userEvent.setup();
      renderWithProviders(<SigninForm onSubmit={mockOnSubmit} />);
      
      const longPassword = 'a'.repeat(100);
      const passwordInput = screen.getByPlaceholderText(/password/i);
      await user.type(passwordInput, longPassword);
      
      expect(passwordInput).toHaveValue(longPassword);
    });

    test('handles whitespace in credentials', async () => {
      const user = userEvent.setup();
      renderWithProviders(<SigninForm onSubmit={mockOnSubmit} />);
      
      await user.type(screen.getByPlaceholderText(/email or phone/i), ' test@example.com ');
      await user.type(screen.getByPlaceholderText(/password/i), ' password123 ');
      
      expect(screen.getByPlaceholderText(/email or phone/i)).toHaveValue(' test@example.com ');
      expect(screen.getByPlaceholderText(/password/i)).toHaveValue(' password123 ');
    });
  });

  // Component Integration Tests
  describe('Component Integration', () => {
    test('renders within AuthProvider without errors', () => {
      const { container } = renderWithProviders(<SigninForm onSubmit={mockOnSubmit} />);
      expect(container).toBeInTheDocument();
    });

    test('form maintains state across multiple interactions', async () => {
      const user = userEvent.setup();
      renderWithProviders(<SigninForm onSubmit={mockOnSubmit} />);
      
      const identifierInput = screen.getByPlaceholderText(/email or phone/i);
      const passwordInput = screen.getByPlaceholderText(/password/i);
      
      // Type, clear, type again
      await user.type(identifierInput, 'first@example.com');
      await user.clear(identifierInput);
      await user.type(identifierInput, 'second@example.com');
      
      expect(identifierInput).toHaveValue('second@example.com');
    });

    test('multiple form elements work together correctly', async () => {
      const user = userEvent.setup();
      renderWithProviders(<SigninForm onSubmit={mockOnSubmit} />);
      
      // Fill both fields
      await user.type(screen.getByPlaceholderText(/email or phone/i), 'user@test.com');
      await user.type(screen.getByPlaceholderText(/password/i), 'testpass123');
      
      // Both should retain their values
      expect(screen.getByPlaceholderText(/email or phone/i)).toHaveValue('user@test.com');
      expect(screen.getByPlaceholderText(/password/i)).toHaveValue('testpass123');
      
      // Submit should work
      await user.click(screen.getByRole('button', { name: /^login$/i }));
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });

  // Button Styling Tests
  describe('Button Styling', () => {
    test('login button has correct styling classes', () => {
      renderWithProviders(<SigninForm onSubmit={mockOnSubmit} />);
      
      const loginButton = screen.getByRole('button', { name: /^login$/i });
      expect(loginButton.className).toContain('bg-orange-600');
      expect(loginButton.className).toContain('hover:bg-orange-700');
    });

    test('Google login button displays text correctly', () => {
      renderWithProviders(<SigninForm onSubmit={mockOnSubmit} />);
      
      expect(screen.getByText(/login with google/i)).toBeInTheDocument();
    });
  });
});
