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

    // SECOND: Please add a role="form" attribute to this element in the React component so that it can be selected.
    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();

    const inputs = screen.getAllByRole('spinbutton');
    expect(inputs.length).toBe(2);

    const button = screen.getByRole('button', { name: /add/i });
    expect(button).toBeInTheDocument();

    const result = screen.getByText('', { selector: 'p.result' });
    expect(result).toBeInTheDocument();
  });

  it('should display the result on add', () => {
    render(<Calculator />);

    const inputOne = screen.getAllByRole('spinbutton')[0];
    const inputTwo = screen.getAllByRole('spinbutton')[1];
    const button = screen.getByRole('button', { name: /add/i });

    fireEvent.change(inputOne, { target: { value: 3 } });
    fireEvent.change(inputTwo, { target: { value: 5 } });
    fireEvent.click(button);

    const result = screen.getByText('8', { selector: 'p.result' });
    expect(result).toBeInTheDocument();
  });
});
