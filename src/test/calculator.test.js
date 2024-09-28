/**
 * @file Test suite for the Calculator component.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Calculator, { getSum } from '../components/calculator';

describe('Calculator component', () => {
  it('should return the correct sum', () => {
    const sum = getSum(3, 5);
    expect(sum).toEqual(8);
  });

  it('should render required form elements', () => {
    render(<Calculator />);

    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();
    expect(screen.getAllByRole('spinbutton').length).toBe(2);
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
    expect(screen.getByText(/result/i)).toBeInTheDocument();
  });

  it('should display the result on add', () => {
    render(<Calculator />);

    const inputOne = screen.getAllByRole('spinbutton')[0];
    const inputTwo = screen.getAllByRole('spinbutton')[1];
    const button = screen.getByRole('button', { name: /add/i });

    fireEvent.change(inputOne, { target: { value: '3' } });
    fireEvent.change(inputTwo, { target: { value: '5' } });
    fireEvent.click(button);

    const result = screen.getByText('8');
    expect(result).toBeInTheDocument();
  });
});
