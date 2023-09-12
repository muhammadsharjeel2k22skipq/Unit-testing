import React, { useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';

const DynamicForm = () => {

    const { register, control, handleSubmit, reset, trigger, setError } = useForm({
        // defaultValues: {}; you can populate the fields by this attribute 
    });
    const { fields, append, remove } = useFieldArray({ control, name: "test" });

    const onSubmit = (data: any) => {
        console.log(data);
    };

    useEffect(() => {
        if(fields.length === 0) {
            append({ firstName: 'Muhammad', lastName:' Sharjeel' });
        }
    }, [fields]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <ul>
            {fields.map((item, index) => (
                <li key={item.id}>
                    <input {...register(`test.${index}.firstName`)} />
                    <Controller
                        render={({ field }) => <input {...field} />}
                        name={`test.${index}.lastName`}
                        control={control}
                    />
                    <button type="button" onClick={() => remove(index)}>Delete</button>
                </li>
            ))}
        </ul>
        <button type='submit'>Submit</button>
    </form>
  );

}

export default DynamicForm;
