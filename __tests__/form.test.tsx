import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import LoginForm  from '@/components/LoginForm';

import { setupServer } from 'msw/node';
import { rest } from 'msw';

const handlers = [
    rest.post('/api/login', async (req,res,ctx) => {
        const body = await req.json();
        return res(
            ctx.json(body),
        );
    }),
];
const server = setupServer(...handlers);


describe('LoginForm', () => {
    beforeAll(() => server.listen());
    afterEach(() => server.restoreHandlers());
    afterAll(() => server.close());

    const mockLogin = jest.fn();

  it('renders a login form correctly', async () => {
    render(<LoginForm onLogin={mockLogin} />)

    const email = screen.getByPlaceholderText(/email\.\.\./i);
    const pass = screen.getByPlaceholderText(/password\.\.\./i);
    const firstName = screen.getByPlaceholderText(/firstname\.\.\./i);
    const lastName = screen.getByPlaceholderText(/lastname\.\.\./i);

    fireEvent.change(email, { target: { value: 'farazahmed819@gmail.com' } });
    fireEvent.change(pass, { target: { value: 'fraz_928@@321' } });
    fireEvent.change(firstName, { target: { value: 'Fraz' } });
    fireEvent.change(lastName, { target: { value: 'Ahmed' } });

    const signIn = screen.getByRole('button', {
        name: /sing in/i
    });
    fireEvent.click(signIn);

    await waitFor(() => expect(mockLogin).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(mockLogin).toHaveBeenCalledWith({ 
        email: "farazahmed819@gmail.com",
        firstName: "Fraz",
        lastName: "Ahmed",
        password: "fraz_928@@321",
    }));

  })
})

// console.log(document.body.innerHTML);
