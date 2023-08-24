'use client';
import React,{ useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { CForm, CFormLabel, CFormSelect } from '@coreui/react';
import { CCollapse, CFormTextarea, CMultiSelect } from '@coreui/react-pro';

const BvForm = ({ onConfirm }: { onConfirm: (data: any) => void }) => {

  const { handleSubmit, control, formState, formState: { errors }, register } = useForm();
  const clinicOptions = [
    {value: '1', text: 'One'},
    {value: '2', text: 'Two'},
    {value: '3', text: 'Three'}
  ];

  const onSubmit = (data: any) => {
    console.log(data);
    onConfirm(data);
  };

  return (
    <CForm onSubmit={handleSubmit(onSubmit)}>
    <Controller
      name="clinic"
      control={control}
      rules={{ required: 'The clinic field is required' }}
      render={({ field: { onChange } }) => (
          <CFormSelect
              className={` multiselect bg-light-gray form-input-text-custom ${
              errors.clinic ? 'border-danger' : 'border-0'
              }`}
              placeholder='select-clinic'
              data-testid='selectClinic'
              onChange={(e) => {
              onChange(e);
              }}
              multiple={false}
              options={clinicOptions || [{ value: '-1', text: 'Select' }]}
          />
      )}
    /> 

     <Controller
      name="clinic"
      control={control}
      rules={{ required: 'The clinic field is required' }}
      render={({ field }) => (
        <CFormSelect {...field} className="me-2" aria-label="Default select example" data-testid='selectInput'
          options={clinicOptions || [{ value: '-1', text: 'Select' }]} placeholder='select-clinic'
        >
        </CFormSelect>
      )}
    />   
    <button type="submit">Submit</button>
    </CForm>
  );
};

export default BvForm;





/*----------------------------------------------------------Start---------
<CForm onSubmit={handleSubmit(onSubmit)}>
<Controller
  name="day-sharjeel"
  control={control}
  rules={{ required: 'Day is required' }}
  render={({ field }) => (
  <CFormSelect {...field} className="me-2" aria-label="Default select example">
      <option>Open this select menu</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
  </CFormSelect>
  )}
/>
<button type="submit">Submit</button>
</CForm>
*/

/*
const dropDown = screen.getByLabelText('Default select example'); //role is combobox
fireEvent.change(dropDown, { target: { value: '2' } });
fireEvent.submit(screen.getByRole('button', { name: /submit/i }));
await waitFor(() => expect(mockSubmit).toHaveBeenCalledWith({ lazy: true }));
----------------------------------------------------End-------------------------*/

{/* <CForm onSubmit={handleSubmit(onSubmit)}>
<Controller
  name="clinic"
  control={control}
  rules={{ required: 'The clinic field is required' }}
  render={({ field: { onChange } }) => (
      <CMultiSelect
          className={` multiselect bg-light-gray form-input-text-custom ${
              errors.clinic ? 'border-danger' : 'border-0'
          }`}
          id="clinic"
          aria-label='Default select example'
          data-testid='sharjeel'
          onChange={(e) => {
            onChange(e);
          }}
          multiple={false}
          options={clinicOptions || [{ value: '-1', text: 'Select' }]}
      />
  )}
/>
<button className='mt-40' type="submit">Submit</button>
</CForm> */}
