'use client';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { CForm, CFormLabel, CFormSelect } from '@coreui/react';

const PatientForm = ({ onFormSubmit }: { onFormSubmit: (data: any) => void }) => {
  const { handleSubmit, control, formState, formState: { errors }, register } = useForm();

  const onSubmit = (data: any) => {
    // Handle form submission logic here
    onFormSubmit(data);
  };

  return (
    <CForm onSubmit={handleSubmit(onSubmit)}>
      <div>
        <CFormLabel>Select Date</CFormLabel>         
        <div className="d-flex">
          <Controller
            name="day"
            control={control}
            rules={{ required: 'Day is required' }}
            render={({ field }) => (
              <CFormSelect {...field} className="me-2" data-testid="day-select">
                <option value="" hidden>Day</option>
                {[...Array(31)].map((_, index) => (
                  <option key={index + 1} value={index + 1}>{index + 1}</option>
                ))}
              </CFormSelect>
            )}
          />
          <Controller
            name="month"
            control={control}
            rules={{ required: 'Month is required' }}
            render={({ field }) => (
              <CFormSelect {...field} className="me-2" data-testid="month-select">
                <option value="" hidden>Month</option>
                {[
                  'January', 'February', 'March', 'April', 'May', 'June',
                  'July', 'August', 'September', 'October', 'November', 'December'
                ].map((month, index) => (
                  <option key={index + 1} value={index + 1}>{month}</option>
                ))}
              </CFormSelect>
            )}
          />
          <Controller
            name="year"
            control={control}
            rules={{ required: 'Year is required' }}
            render={({ field }) => (
              <CFormSelect {...field} data-testid="year-select">
                <option value="" hidden>Year</option>
                {[...Array(10)].map((_, index) => (
                  <option key={index + 2021} value={index + 2021}>{index + 2021}</option>
                ))}
              </CFormSelect>
            )}
          />
        </div>
        {errors.day && <span className="text-danger">{errors?.day?.message as string}</span>}
        {errors.month && <span className="text-danger">{errors?.month?.message as string}</span>}
        {errors.year && <span className="text-danger">{errors?.year?.message as string}</span>}
      </div>
      <button type="submit">Submit</button>
    </CForm>
  );
};

export default PatientForm;

