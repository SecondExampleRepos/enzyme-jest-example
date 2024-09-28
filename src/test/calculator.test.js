/**
 * @file Test suite for the Calculator component.
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Calculator, { getSum } from '../components/calculator';

describe('Calculator component', () => {
  it('should render snapshot', () => {
    const { container } = render(<Calculator />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should return the correct sum', () => {
    const sum = getSum(3, 5);
    expect(sum).toEqual(8);
  });

  it('should render required form elements', () => {
    render(<Calculator />);
    expect(screen.getByRole('form')).toBeInTheDocument();
    expect(screen.getAllByRole('spinbutton').length).toBe(2);
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
    expect(screen.getByText(/result/i)).toBeInTheDocument();
  });

  it('should display the result on add', () => {
    render(<Calculator />);
    const input1 = screen.getAllByRole('spinbutton')[0];
    const input2 = screen.getAllByRole('spinbutton')[1];
    const button = screen.getByRole('button', { name: /add/i });

    fireEvent.change(input1, { target: { value: '3' } });
    fireEvent.change(input2, { target: { value: '5' } });
    fireEvent.click(button);

    expect(screen.getByText('8')).toBeInTheDocument();
  });
});
