import React from 'react';
import App from './App';
import { render } from '@testing-library/react-native';

global.React = React;

jest.mock('@expo/vector-icons', () => ({
  MaterialIcons: '',
}));

describe('App component', () => {
  it('should render App', () => {
    render(<App />);
  });
});
