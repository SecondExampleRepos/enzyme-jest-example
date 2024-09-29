/**
 * @file Test suite for the Calculator component.
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';

import Calculator, { getSum } from '../components/calculator';

describe('Calculator component', () => {
  // SECOND: "should render snapshot" was removed because it tests snapshot comparisons which is an anti-pattern in RTL

  it('should return the correct sum', () => {
    const sum = getSum(3, 5);
    expect(sum).toEqual(8);
  });

  it('should render required form elements', () => {
    const { getByRole } = render(<Calculator />);

    const form = getByRole('form');
    expect(form).toBeInTheDocument();
    expect(getByRole('spinbutton', { name: /input 1/i })).toBeInTheDocument();
    expect(getByRole('spinbutton', { name: /input 2/i })).toBeInTheDocument();
    expect(getByRole('button', { name: /add/i })).toBeInTheDocument();
    expect(getByRole('status')).toBeInTheDocument();
  });

  it('should display the result on add', () => {
    const { getByRole } = render(<Calculator />);

    const input1 = getByRole('spinbutton', { name: /input 1/i });
    const input2 = getByRole('spinbutton', { name: /input 2/i });
    const button = getByRole('button', { name: /add/i });

    fireEvent.change(input1, { target: { value: 3 } });
    fireEvent.change(input2, { target: { value: 5 } });
    fireEvent.click(button);

    const result = getByRole('status');
    expect(result).toHaveTextContent('8');
  });
});
