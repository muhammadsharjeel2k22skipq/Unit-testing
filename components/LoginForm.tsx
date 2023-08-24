'use client';
import React,{ useState } from 'react';
import { SubmitHandler,useForm,FieldValues } from 'react-hook-form';
import useFormPersist from 'react-hook-form-persist';
import axios from 'axios';


const LoginForm = ({ onLogin }: { onLogin: (data: any) => void }) => {

    const [data, setData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: ""
    });

    const { register,handleSubmit,watch,setValue } = useForm({
        defaultValues: data
    });

    useFormPersist('FromDataPresist',{
        storage: window.sessionStorage,
        watch,
        setValue
    });
    
    const formHandler:SubmitHandler<FieldValues> = async (data) => {
        // try {
        //     const res = await axios.post('http://localhost:3333/auth/signin',data);
        //     const { access_token } = res.data;
        //     const config = {
        //         headers: { Authorization: `Bearer ${access_token}` }
        //     };
        //     const user = await axios.get('http://localhost:3333/users/me',config);
        //     console.log(user.data);
        // }
        // catch (error) {
        //     console.log("FormHandler_Error",error);
        // }
        await onLogin(data);
      try {
        const res = await axios.post('/api/login', data);
        console.log(res);
        return res.data;
      }
      catch(error) {
        console.log(error);
      }

    };
 
  return (
    <div className='p-10 flex items-center justify-center flex-col gap-2'>
        <h2 className='text-xl font-semibold tracking-tight text-gray-700'>Login Form</h2>
        <form className='flex flex-col gap-4 mt-4 items-center justify-center' onSubmit={handleSubmit(formHandler)}>
            <input type='email' id='email' placeholder='Email...' {...register('email',{ required: true })} 
              className='p-2 w-[300px] outline-none border rounded-xl'
            />
            <input type='password' id='password' placeholder='Password...' {...register('password',{ required: true })} 
              className='p-2 w-[300px] outline-none border rounded-xl'
            />
            <input type='text' id='firstName' placeholder='FirstName...' {...register('firstName',{ required: true })} 
              className='p-2 w-[300px] outline-none border rounded-xl'
            />
            <input type='text' id='lastName' placeholder='LastName...' {...register('lastName',{ required: true })} 
              className='p-2 w-[300px] outline-none border rounded-xl'
            />
            <button type='submit' className='text-xl font-semibold p-2 border rounded-xl text-gray-700 w-[100px]' > 
                Sing In
            </button>
        </form>

    </div>
  )
}

export default LoginForm;
