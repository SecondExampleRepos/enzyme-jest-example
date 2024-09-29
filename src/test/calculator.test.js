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

    // SECOND: Please add a role="textbox" attribute to these elements in the React component so that they can be selected.
    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBe(2);

    // SECOND: Please add a role="button" attribute to this element in the React component so that it can be selected.
    const button = screen.getByRole('button', { name: /add/i });
    expect(button).toBeInTheDocument();

    // SECOND: Please add a role="status" attribute to this element in the React component so that it can be selected.
    const result = screen.getByRole('status');
    expect(result).toBeInTheDocument();
  });

  it('should display the result on add', () => {
    render(<Calculator />);

    // SECOND: Please add a role="textbox" attribute to these elements in the React component so that they can be selected.
    const inputOne = screen.getAllByRole('textbox')[0];
    const inputTwo = screen.getAllByRole('textbox')[1];

    fireEvent.change(inputOne, { target: { value: '3' } });
    fireEvent.change(inputTwo, { target: { value: '5' } });

    // SECOND: Please add a role="button" attribute to this element in the React component so that it can be selected.
    const button = screen.getByRole('button', { name: /add/i });
    fireEvent.click(button);

    // SECOND: Please add a role="status" attribute to this element in the React component so that it can be selected.
    const result = screen.getByRole('status');
    expect(result).toHaveTextContent('8');
  });
});
