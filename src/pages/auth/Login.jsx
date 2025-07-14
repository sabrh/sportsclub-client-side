import React from 'react';
import { useForm } from 'react-hook-form'

const Login = () => {
    const { register, handleSubmit, formState: {errors} } = useForm()

    const onSubmit = data =>{
        console.log(data)
    }


    return (
        <div className="card w-full">
        <h2 className='text-2xl font-bold'>Login to our Club!</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset">

            <label className="label">Email</label>
            <input type="email" {...register('email')} className="input" placeholder="Email" />

            <label className="label">Password</label>
            <input type="password" {...register('password', {
                required: true,
                minLength: 6})} 
                className="input" placeholder="Password" />
                {
                    errors.password?.type === 'required' && <p className='text-red-500'>Password is required!</p>
                }
                {
                    errors.password?.type === 'minLength' && <p className='text-orange-500'>Password must be 6 characters or longer</p>
                }

            <div><a className="link link-hover">Forgot password?</a></div>

            <button className="btn btn-primary mt-4 w-2/3">Login</button>
            </fieldset>
        </form>
        </div>
    );
};

export default Login;