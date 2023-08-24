import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useForm } from 'react-hook-form';
import BvForm from '@/components/BvForm'; // Replace with the actual import path
import selectEvent from 'react-select-event'

import userEvent from '@testing-library/user-event';

describe('BVForm', () => {
  const mockSubmit = jest.fn(); 

  it('renders the form and selects a clinic', async () => {
    render(<BvForm onConfirm={mockSubmit} />);

    // const dropDown = screen.getByLabelText('Default select example'); //role is combobox
    // const dropDown = screen.queryByTestId('sharjeel'); //role is combobox
    // console.log(dropDown);
    // const dropDown = screen.getByPlaceholderText(/select-clinic/i);
    
    const dropDown = screen.getByTestId('selectClinic');
    fireEvent.change(dropDown, { target: { value: '1' } });
    // userEvent.selectOptions(dropDown, 'Two');


    
    fireEvent.submit(screen.getByRole('button', { name: /submit/i }));
    await waitFor(() => expect(mockSubmit).toHaveBeenCalledWith({ lazy: true }));

  });

  // Add more test cases as needed
});

