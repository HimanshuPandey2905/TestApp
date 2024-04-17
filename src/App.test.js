script
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import App from './App';

jest.mock('axios');

describe('App', () => {
  test('fetches todos from an API and displays them', async () => {
    const todos = [
      { id: 1, title: 'First Todo' },
      { id: 2, title: 'Second Todo' },
    ];

    axios.get.mockResolvedValueOnce({ data: todos });

    render(<App />);

    await waitFor(() => screen.getByText('First Todo'));

    expect(screen.getByText('First Todo')).toBeInTheDocument();
    expect(screen.getByText('Second Todo')).toBeInTheDocument();
  });

  test('handles API failure', async () => {
    axios.get.mockRejectedValueOnce(new Error());

    render(<App />);

    await waitFor(() => screen.getByText('Error fetching todos'));

    expect(screen.getByText('Error fetching todos')).toBeInTheDocument();
  });

  test('adds a new todo', async () => {
    const todo = { id: 1, title: 'New Todo' };

    axios.post.mockResolvedValueOnce({ data: todo });

    render(<App />);

    fireEvent.change(screen.getByPlaceholderText('type...'), {
      target: { value: 'New Todo' },
    });

    fireEvent.click(screen.getByText('+'));

    await waitFor(() => screen.getByText('New Todo'));

    expect(screen.getByText('New Todo')).toBeInTheDocument();
  });

  test('deletes a todo', async () => {
    const todos = [
      { id: 1, title: 'First Todo' },
      { id: 2, title: 'Second Todo' },
    ];

    axios.get.mockResolvedValueOnce({ data: todos });
    axios.delete.mockResolvedValueOnce();

    render(<App />);

    await waitFor(() => screen.getByText('First Todo'));

    fireEvent.click(screen.getAllByText('x')[0]);

    await waitFor(() => expect(screen.queryByText('First Todo')).toBeNull());
  });
});
