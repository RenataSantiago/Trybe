import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import App from '../App';
import renderWithRouterAndRedux from '../renderWithRouterAndRedux';

test('Teste se o input do email está na tela', () => {
  renderWithRouterAndRedux(<App />);
  const email = screen.getByRole('textbox', { type: /email/i });
  expect(email).toBeInTheDocument();
});

test('Teste se o input da senha está na tela', () => {
  renderWithRouterAndRedux(<Login />);
  const senha = screen.getByRole('textbox', { type: /password/i });
  expect(senha).toBeInTheDocument();
});

test('Teste se o botão Entrar está na tela', () => {
  renderWithRouterAndRedux(<Login />);
  const btnEntrar = screen.getByRole('button', { name: /Entrar/i });
  expect(btnEntrar).toBeInTheDocument();
});

test('Teste se o email está salvo no estado do redux', () => {
  const emailTest = 'teste@teste.com';
  const initialState = {
    user: { email: emailTest },
  };

  const { store, history } = renderWithRouterAndRedux(<Login />, { initialState });
  const email = screen.getByTestId('email-input');
  const senha = screen.getByTestId('password-input');
  const btnEntrar = screen.getByRole('button', { name: /Entrar/i });

  userEvent.type(email, emailTest);
  expect(email.value).toEqual(emailTest);
  userEvent.type(senha, '1234567');
  expect(senha.value).toEqual('1234567');
  expect(btnEntrar.disabled).toEqual(false);
  userEvent.click(btnEntrar);
  expect(history.location.pathname).toBe('/');
  const { user } = store.getState();
  expect(user).toEqual({ email: emailTest });
});
