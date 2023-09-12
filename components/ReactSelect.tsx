import React,{ useState } from 'react';
import Select from 'react-select';
import { Controller, useForm } from 'react-hook-form';


const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
];

const ReactSelect = ({ onConfirm }: { onConfirm: (data: any) => void }) => {
    const [value, setValue] = useState<typeof options[0] | null>(null);
    const { handleSubmit, control, formState, formState: { errors }, register } = useForm();

    const submit = (data: any) => {
        console.log(data);
        onConfirm(data);
    };

  return (
    <form onSubmit={handleSubmit(submit)} role='form' className='w-[300px]'>
        <div>
        <label htmlFor="country">Select a flavour:</label>
        <Controller
          name="flavors"
          control={control}
          defaultValue={null}
          render={({ field }) => (
            <Select
              {...field}
              options={options}
              // value={value}
              isClearable
              aria-label='Food'
              name='food'
              inputId='food'
              isMulti
              // onChange={(e) => {
              //   console.log(e);
              //   setValue(e[0]);
              // }}
            />
          )}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  )
}

export default ReactSelect;
