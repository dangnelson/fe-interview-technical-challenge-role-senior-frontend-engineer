import InstructionsBar from './InstructionsBar';
import { fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../utils/test';

describe('InstructionsBar', () => {
  const defaultProps = {
    onClick: jest.fn(),
  };

  it('should render a "View challenges" button', () => {
    const { getByText } = renderWithProviders(
      <InstructionsBar {...defaultProps} />
    );
    expect(getByText('View challenges')).toBeInTheDocument();
  });

  it('should call the onClick prop when the button is clicked', () => {
    const showChallenges = jest.fn();
    const { getByText } = renderWithProviders(
      <InstructionsBar onClick={showChallenges} />
    );
    fireEvent.click(getByText('View challenges'));
    expect(showChallenges).toHaveBeenCalled();
  });
});
