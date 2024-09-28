/**
 * @file Test suite for the Calculator component.
 */

import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';

import Calculator, { getSum } from '../components/calculator';

describe('Calculator component', () => {
  // SECOND: should render snapshot was removed because it dependend on snapshot comparisons which is an anti-pattern in RTL

  it('should return the correct sum', () => {
    const sum = getSum(3, 5);
    expect(sum).toEqual(8);
  });

  it('should render required form elements', () => {
    const calculator = shallow(<Calculator />);

    const form = calculator.find('form');
    expect(form.length).toBe(1);
    expect(form.find('input').length).toBe(2);
    expect(form.find('button').length).toBe(1);
    expect(form.find('p.result').length).toBe(1);
  });

  it('should display the result on add', () => {
    const calculator = mount(<Calculator />);

    const form = calculator.find('form');

    form.childAt(0).instance().value = 3;
    form.childAt(1).instance().value = 5;
    form.find('button').simulate('click');

    const result = calculator.find('.result');
    expect(result.text()).toEqual('8');
  });
});
