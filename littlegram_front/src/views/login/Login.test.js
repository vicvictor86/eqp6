import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';
import { MemoryRouter } from 'react-router-dom'; // Import the MemoryRouter

test('Chama a função logar quando o botão "Avançar" é clicado', () => {
  // Mock da função logar
  const mockLogar = jest.fn();

  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  const buttonElement = screen.getByText('Avançar');
  buttonElement.onclick(mockLogar)
  fireEvent.click(buttonElement);

  // Verifica se a função logar foi chamada uma vez
  expect(mockLogar).toHaveBeenCalledTimes(1);
});

test('Exibe mensagem de erro quando o email ou senha é inválido', () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  const buttonElement = screen.getByText('Avançar');
  fireEvent.click(buttonElement);

  // Verifica se a mensagem de erro é exibida
  const errorMessageElement = screen.getByText('email ou senha inválidos');
  expect(errorMessageElement).toBeInTheDocument();
});

test('Chama a função logar corretamente quando os campos de email e senha são preenchidos corretamente', () => {
  // Mock da função logar
  const mockLogar = jest.fn();

  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  const emailInput = screen.getByLabelText('email');
  const senhaInput = screen.getByLabelText('senha');
  const buttonElement = screen.getByText('Avançar');

  fireEvent.change(emailInput, { target: { value: 'teste@teste.com' } });
  fireEvent.change(senhaInput, { target: { value: 'Senha123!' } });
  fireEvent.click(buttonElement);

  // Verifica se a função logar foi chamada corretamente
  expect(mockLogar).toHaveBeenCalled();
});

