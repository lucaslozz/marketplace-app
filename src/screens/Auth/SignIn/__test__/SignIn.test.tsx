import { SignIn } from '..';
import { fireEvent, render } from '../../../../test/test-utils';

jest.mock('@expo/vector-icons', () => ({
  MaterialIcons: '',
}));

describe('SignIn screen', () => {
  it('should not subbmit with empty fields', () => {
    const { getAllByRole, getByRole, getByText } = render(<SignIn />);

    const emailInput = getAllByRole('textbox')[0];
    const passwordInput = getAllByRole('textbox')[1];
    const submitButton = getByRole('button');

    fireEvent.changeText(emailInput, '');
    fireEvent.changeText(passwordInput, '');
    fireEvent.press(submitButton);

    expect(getByText('Digite seu e-mail')).toBeTruthy();
    expect(getByText('Digite sua senha')).toBeTruthy();
  });
});
