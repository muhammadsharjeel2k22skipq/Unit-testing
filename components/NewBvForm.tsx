import { CForm, CFormSelect } from '@coreui/react';
import { CMultiSelect } from '@coreui/react-pro';
import { Controller, useForm } from 'react-hook-form';


const NewBvForm = ({ onConfirm }: { onConfirm: (data: any) => void }) => {

  const { handleSubmit, control, formState, formState: { errors }, register } = useForm();
  const clinicOptions = [
    {value: '1', text: 'One'},
    {value: '2', text: 'Two'},
    {value: '3', text: 'Three'}
  ];

 
  const submit = (data: any) => {
    console.log(data);
    onConfirm(data);
  };

 
  return (

    <CForm onSubmit={handleSubmit(submit)}>

     <Controller
      name="clinic"
      control={control}
      rules={{ required: 'The clinic field is required' }} 
      render={({ field: { onChange } }) => (
          <CMultiSelect
              className={` multiselect bg-light-gray form-input-text-custom ${
              errors.clinic ? 'border-danger' : 'border-0'
              }`}
              aria-label='Food'
              placeholder='Food'
              id='food'
              onChange={(e) => {
              onChange(e);
              }} 
              multiple={false}
              options={clinicOptions || [{ value: '-1', text: 'Select' }]}
          />
      )}

    />
 

     {/* <Controller
      name="clinic"
      control={control}
      rules={{ required: 'The clinic field is required' }}
      render={({ field }) => (
        <CFormSelect {...field} className="me-2"
          options={clinicOptions || [{ value: '-1', text: 'Select' }]} placeholder='select-clinic'
        />
      )}

    />  */}

    <button type="submit">Submit</button>
    </CForm>

  );

};


export default NewBvForm;