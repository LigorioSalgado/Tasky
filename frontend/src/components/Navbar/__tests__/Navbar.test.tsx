import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '../';

describe('Navbar Component', () => {
  it('renders the logo', () => {
    render(<Navbar />);
    const logoElement = screen.getByText('Tasky');
    expect(logoElement).toBeInTheDocument();
  });

  it('renders the navigation container', () => {
    render(<Navbar />);
    const navContainer = screen.getByRole('navigation');
    expect(navContainer).toBeInTheDocument();
  });

  it('renders with correct classes', () => {
    render(<Navbar />);
    const navElement = screen.getByRole('navigation');
    expect(navElement).toHaveClass('w-full max-h-20 shadow-md p-4 bg-slate-50');
  });
});
