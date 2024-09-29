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
    // SECOND: Please add a role="form" attribute to this element in the React component so that it can be selected.
    expect(form).toBeInTheDocument();
    expect(screen.getAllByRole('spinbutton').length).toBe(2);
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
    // SECOND: Please add a role="paragraph" attribute to this element in the React component so that it can be selected.
    expect(screen.getByRole('paragraph', { name: /result/i })).toBeInTheDocument();
  });

  it('should display the result on add', () => {
    render(<Calculator />);

    const inputOne = screen.getAllByRole('spinbutton')[0];
    const inputTwo = screen.getAllByRole('spinbutton')[1];
    const button = screen.getByRole('button', { name: /add/i });

    fireEvent.change(inputOne, { target: { value: 3 } });
    fireEvent.change(inputTwo, { target: { value: 5 } });
    fireEvent.click(button);

    // SECOND: Please add a role="paragraph" attribute to this element in the React component so that it can be selected.
    const result = screen.getByRole('paragraph', { name: /result/i });
    expect(result.textContent).toEqual('8');
  });
});
