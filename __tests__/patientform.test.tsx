import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import PatientForm from '@/components/PatientForm'; 
import '@testing-library/user-event';

test('does not display error messages when all fields are selected', async () => {
    const onFormSubmit = jest.fn();
  render(<PatientForm onFormSubmit={onFormSubmit} />);

  // Select all fields
  fireEvent.change(screen.getByTestId('day-select'), { target: { value: '15' } });
  fireEvent.change(screen.getByTestId('month-select'), { target: { value: '4' } });
  fireEvent.change(screen.getByTestId('year-select'), { target: { value: '2023' } });

  // Submit the form
  fireEvent.submit(screen.getByText('Submit'));
  await waitFor(() => expect(onFormSubmit).toHaveBeenCalledWith({ 
        day: "15",
        month: "4",
        year: "2023"
    }));

});

