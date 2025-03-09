import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import StepCounter from '../src/screens/StepCounter';

// Mock the useStepCounter hook
jest.mock('../src/services/StepCounterService', () => ({
  useStepCounter: () => ({
    steps: 0,
    isTracking: false,
    hasPermission: true,
    startTracking: jest.fn(),
    stopTracking: jest.fn(),
    resetSteps: jest.fn(),
    requestPermissions: jest.fn().mockResolvedValue(true),
  }),
}));

// Mock the Vibration API
jest.mock('react-native/Libraries/Vibration/Vibration', () => ({
  vibrate: jest.fn(),
}));

describe('StepCounter Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<StepCounter />);
    
    // Check if the component renders the title
    expect(getByText('Step Counter')).toBeTruthy();
    
    // Check if the component renders the steps count
    expect(getByText('0')).toBeTruthy();
    
    // Check if the component renders the stats
    expect(getByText('Kilometers')).toBeTruthy();
    expect(getByText('Calories')).toBeTruthy();
    
    // Check if the component renders the buttons
    expect(getByText('Start Tracking')).toBeTruthy();
    expect(getByText('Reset')).toBeTruthy();
  });

  it('handles button presses', () => {
    const { getByText } = render(<StepCounter />);
    
    // Press the Start Tracking button
    fireEvent.press(getByText('Start Tracking'));
    
    // Press the Reset button
    fireEvent.press(getByText('Reset'));
  });
}); 