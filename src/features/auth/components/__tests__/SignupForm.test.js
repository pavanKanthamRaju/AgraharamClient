import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignupForm from '../SignupForm';

describe('SignupForm Component', () => {
  let mockOnSubmit;

  beforeEach(() => {
    mockOnSubmit = jest.fn((e) => e.preventDefault());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Rendering Tests
  describe('Rendering', () => {
    test('renders the signup form with heading', () => {
      render(<SignupForm onSubmit={mockOnSubmit} />);
      
      const heading = screen.getByRole('heading', { name: /sign up/i });
      expect(heading).toBeInTheDocument();
    });

    test('renders all required input fields', () => {
      render(<SignupForm onSubmit={mockOnSubmit} />);
      
      expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/phone/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    });

    test('renders submit button', () => {
      render(<SignupForm onSubmit={mockOnSubmit} />);
      
      const submitButton = screen.getByRole('button', { name: /sign up/i });
      expect(submitButton).toBeInTheDocument();
    });

    test('all inputs have correct types', () => {
      render(<SignupForm onSubmit={mockOnSubmit} />);
      
      expect(screen.getByPlaceholderText(/email/i)).toHaveAttribute('type', 'email');
      expect(screen.getByPlaceholderText(/phone/i)).toHaveAttribute('type', 'tel');
      expect(screen.getByPlaceholderText(/password/i)).toHaveAttribute('type', 'password');
    });

    test('all inputs are required', () => {
      render(<SignupForm onSubmit={mockOnSubmit} />);
      
      expect(screen.getByPlaceholderText(/name/i)).toBeRequired();
      expect(screen.getByPlaceholderText(/email/i)).toBeRequired();
      expect(screen.getByPlaceholderText(/phone/i)).toBeRequired();
      expect(screen.getByPlaceholderText(/password/i)).toBeRequired();
    });
  });

  // User Interaction Tests
  describe('User Interactions', () => {
    test('allows user to type in name field', async () => {
      const user = userEvent.setup();
      render(<SignupForm onSubmit={mockOnSubmit} />);
      
      const nameInput = screen.getByPlaceholderText(/name/i);
      await user.type(nameInput, 'John Doe');
      
      expect(nameInput).toHaveValue('John Doe');
    });

    test('allows user to type in email field', async () => {
      const user = userEvent.setup();
      render(<SignupForm onSubmit={mockOnSubmit} />);
      
      const emailInput = screen.getByPlaceholderText(/email/i);
      await user.type(emailInput, 'john@example.com');
      
      expect(emailInput).toHaveValue('john@example.com');
    });

    test('allows user to type in phone field', async () => {
      const user = userEvent.setup();
      render(<SignupForm onSubmit={mockOnSubmit} />);
      
      const phoneInput = screen.getByPlaceholderText(/phone/i);
      await user.type(phoneInput, '1234567890');
      
      expect(phoneInput).toHaveValue('1234567890');
    });

    test('allows user to type in password field', async () => {
      const user = userEvent.setup();
      render(<SignupForm onSubmit={mockOnSubmit} />);
      
      const passwordInput = screen.getByPlaceholderText(/password/i);
      await user.type(passwordInput, 'securePassword123');
      
      expect(passwordInput).toHaveValue('securePassword123');
    });

    test('password field masks input', () => {
      render(<SignupForm onSubmit={mockOnSubmit} />);
      
      const passwordInput = screen.getByPlaceholderText(/password/i);
      expect(passwordInput).toHaveAttribute('type', 'password');
    });
  });

  // Form Submission Tests
  describe('Form Submission', () => {
    test('calls onSubmit when form is submitted with all fields filled', async () => {
      const user = userEvent.setup();
      render(<SignupForm onSubmit={mockOnSubmit} />);
      
      // Fill in all fields
      await user.type(screen.getByPlaceholderText(/name/i), 'John Doe');
      await user.type(screen.getByPlaceholderText(/email/i), 'john@example.com');
      await user.type(screen.getByPlaceholderText(/phone/i), '1234567890');
      await user.type(screen.getByPlaceholderText(/password/i), 'password123');
      
      // Submit form
      const submitButton = screen.getByRole('button', { name: /sign up/i });
      await user.click(submitButton);
      
      // Verify onSubmit was called
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });

    test('form submission can be triggered by pressing Enter', async () => {
      const user = userEvent.setup();
      render(<SignupForm onSubmit={mockOnSubmit} />);
      
      // Fill in fields
      const nameInput = screen.getByPlaceholderText(/name/i);
      await user.type(nameInput, 'John Doe');
      await user.type(screen.getByPlaceholderText(/email/i), 'john@example.com');
      await user.type(screen.getByPlaceholderText(/phone/i), '1234567890');
      await user.type(screen.getByPlaceholderText(/password/i), 'password123{enter}');
      
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });

    test('submit button is clickable', async () => {
      const user = userEvent.setup();
      render(<SignupForm onSubmit={mockOnSubmit} />);
      
      const submitButton = screen.getByRole('button', { name: /sign up/i });
      await user.click(submitButton);
      
      // Even without filling fields, the button should be clickable
      // (HTML5 validation would prevent actual submission)
      expect(submitButton).toBeEnabled();
    });
  });

  // Accessibility Tests
  describe('Accessibility', () => {
    test('form inputs have proper name attributes', () => {
      render(<SignupForm onSubmit={mockOnSubmit} />);
      
      expect(screen.getByPlaceholderText(/name/i)).toHaveAttribute('name', 'name');
      expect(screen.getByPlaceholderText(/email/i)).toHaveAttribute('name', 'email');
      expect(screen.getByPlaceholderText(/phone/i)).toHaveAttribute('name', 'phone');
      expect(screen.getByPlaceholderText(/password/i)).toHaveAttribute('name', 'password');
    });

    test('submit button has correct type', () => {
      render(<SignupForm onSubmit={mockOnSubmit} />);
      
      const submitButton = screen.getByRole('button', { name: /sign up/i });
      expect(submitButton).toHaveAttribute('type', 'submit');
    });
  });

  // Edge Cases
  describe('Edge Cases', () => {
    test('handles empty form submission attempt', async () => {
      const user = userEvent.setup();
      render(<SignupForm onSubmit={mockOnSubmit} />);
      
      const submitButton = screen.getByRole('button', { name: /sign up/i });
      await user.click(submitButton);
      
      // HTML5 validation prevents submission, but button click still registers
      expect(submitButton).toBeInTheDocument();
    });

    test('handles special characters in name field', async () => {
      const user = userEvent.setup();
      render(<SignupForm onSubmit={mockOnSubmit} />);
      
      const nameInput = screen.getByPlaceholderText(/name/i);
      await user.type(nameInput, "O'Brien-Smith");
      
      expect(nameInput).toHaveValue("O'Brien-Smith");
    });

    test('handles very long input values', async () => {
      const user = userEvent.setup();
      render(<SignupForm onSubmit={mockOnSubmit} />);
      
      const longString = 'a'.repeat(100);
      const nameInput = screen.getByPlaceholderText(/name/i);
      await user.type(nameInput, longString);
      
      expect(nameInput).toHaveValue(longString);
    });
  });
});
