import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';

import ReactSelect from '@/components/ReactSelect';
import selectEvent from 'react-select-event';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
];

describe('Select Component', () => {
    const mockSubmit = jest.fn(); 

  it('renders with default value', async () => {
    render(
        <ReactSelect onConfirm={mockSubmit} />
    );

    const input = screen.getByLabelText('Food'); console.log(input.outerHTML);
    // await selectEvent.select(input, ["Strawberry","Vanilla"]); //Multi Select
    await selectEvent.select(input, "Strawberry"); // Single select


    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));
    await waitFor(() => expect(mockSubmit).toHaveBeenCalledWith({ lazy: true }));

  });

});

