/* eslint-disable no-tabs */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import selectEvent from 'react-select-event';
import NewBVForm from '@/components/NewBvForm'; 

describe('BVForm', () => {

  const mockSubmit = jest.fn();

  it('renders the form and selects a clinic', async () => {

    render(<NewBVForm onConfirm={mockSubmit} />);

    const input = screen.getByPlaceholderText('Food'); console.log(input.outerHTML);
    // await selectEvent.select(input, ["Three","One"]); // Multiple select
    await selectEvent.select(input, "Two"); // Select

    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));
    await waitFor(() => expect(mockSubmit).toHaveBeenCalledWith({ lazy: true }));


  });

});
