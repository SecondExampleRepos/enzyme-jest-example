/**
 * @file Test suite for the Calculator component.
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import Calculator, { getSum } from '../components/calculator';

describe('Calculator component', () => {
  // SECOND: "should render snapshot" was removed because it tests snapshot comparisons which is an anti-pattern in RTL

  it('should return the correct sum', () => {
    const sum = getSum(3, 5);
    expect(sum).toEqual(8);
  });

  it('should render required form elements', () => {
    render(<Calculator />);

    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();

    const inputs = screen.getAllByRole('spinbutton');
    expect(inputs.length).toBe(2);

    const button = screen.getByRole('button', { name: /add/i });
    expect(button).toBeInTheDocument();

    // SECOND: Unable to determine the best way to select this element using .getByRole().  I made my best guess.
    const result = screen.getByText('', { selector: 'p.result' });
    expect(result).toBeInTheDocument();
  });

  it('should display the result on add', () => {
    render(<Calculator />);

    const inputs = screen.getAllByRole('spinbutton');
    fireEvent.change(inputs[0], { target: { value: 3 } });
    fireEvent.change(inputs[1], { target: { value: 5 } });

    const button = screen.getByRole('button', { name: /add/i });
    fireEvent.click(button);

    const result = screen.getByText('8');
    expect(result).toBeInTheDocument();
  });
});
