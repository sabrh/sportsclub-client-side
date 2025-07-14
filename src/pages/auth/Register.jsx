import React from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { NavLink } from 'react-router';

const Register = () => {
    const { register, handleSubmit, formState: {errors} } = useForm()
    
        const onSubmit = data =>{
            console.log(data)
        }


    return (
        <div className="card w-full">
        <h2 className='text-2xl font-bold'>Create an Account</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset">
            
            <label className="label">Name</label>
            <input type="text" {...register('firstName', {
                required: true})} 
                className="input" placeholder="Name" />

            <label className="label">Email</label>
            <input type="email" {...register('email', {
                required: true})} 
                className="input" placeholder="Email" />

            <label className="label">Password</label>
            <input type="password" {...register('password', {
                required: true,
                minLength: 6,
                pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                },
                })} 
                className="input" placeholder="Password" />
                {
                    errors.password?.type === 'required' && <p className='text-red-500'>Password is required!</p>
                }
                {
                    errors.password?.type === 'minLength' && <p className='text-orange-500'>Password must be 6 characters or longer</p>
                }
                {
                    errors.password?.type === 'pattern' && <p className='text-orange-500'>Password must contain uppercase, lowercase, number and special character</p>
                }
                {
                    errors.email?.type === 'required' && <p className='text-red-500'>Email is required!</p>
                }
                {
                    errors.firstName?.type === 'required' && <p className='text-red-500'>First Name is required!</p>
                }


            <button className="btn btn-neutral rounded-full mt-4 w-2/3 mb-4">Register</button>
            </fieldset>
            <p>Already have an account? <NavLink to='/login' className='text-blue-700'>Login</NavLink> here.</p>
            <div className="divider">OR</div>
            <button className='btn btn-soft rounded-full w-2/3 mt-4 text-lg'>Login with <FcGoogle /></button>
        </form>
        </div>
    );
};

export default Register;