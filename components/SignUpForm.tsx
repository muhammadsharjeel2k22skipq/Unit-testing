'use client';
import React, { useState } from 'react';
import { SubmitHandler,useForm,FieldValues } from 'react-hook-form';
import useFormPresist from 'react-hook-form-persist';

const SignUpForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: ""
  });

  const { handleSubmit,register,watch,setValue } = useForm({
    defaultValues: data
  });

  useFormPresist("formDataStorage",{
    storage: window.sessionStorage,
    watch,
    setValue,
  });

  const handleForm: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <div className='flex flex-col p-10 items-center justify-center'>
      <h2 className='text-lg font-semibold tracking-tight' >Register Form</h2>

      <form className='flex flex-col gap-4 mt-4 items-center justify-center' onSubmit={handleSubmit(handleForm)}>
        <input type='email' id='email' placeholder='Email...' {...register('email',{required: true}) } 
          className='outline-none p-2 w-[300px] border rounded-xl'
        />
        <input type='password' id='password' placeholder='Enter your password...' {...register('password', { required: true })}  
          className='outline-none p-2 w-[300px] border rounded-xl'
        />
        <input type='text' id='firstName' placeholder='FirstName....' {...register('firstName', {required: true})} 
          className='outline-none p-2 w-[300px] rounded-xl border'
        />
        <input type='text' id='firstName' placeholder='LastName....' {...register('lastName', {required: true})} 
          className='outline-none p-2 w-[300px] rounded-xl border'
        />
        <button type='submit' 
           className='flex text-lg font-semibold items-center justify-center border w-[100px] p-2 rounded-lg hover:text-gray-700'
        >
          SignUp
        </button>
      </form>

    </div>
  )
}

export default SignUpForm;

