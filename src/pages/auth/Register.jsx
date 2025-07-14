import React from 'react';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { NavLink, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import { updateProfile } from 'firebase/auth';
import { FaEye } from 'react-icons/fa';

const Register = () => {
    const [showPassword, setShowPassword] = React.useState(false)

    const { signInWithGoogle } = useAuth()
    const handleGoogleSignIn = () =>{
        signInWithGoogle()
        .then(result =>{
            console.log(result.user)
        })
        .catch(error =>{
            console.log(error)
        })
    }

    const { register, handleSubmit, formState: {errors} } = useForm()
    const { createUser } =useAuth()

    const navigate = useNavigate();
    
    const onSubmit = data =>{
        console.log(data)

        createUser(data.email, data.password)
        .then(result => {
            const user = result.user;
            console.log("Before update:", user);

            updateProfile(user, {
                displayName: data.firstName
            })
            .then(() => {
                console.log("User profile updated:", user);
                alert("Account created successfully!")
                navigate('/login')


            })
            .catch(err => {
                console.error("Error updating profile:", err);
            })
            })
        .catch(error => {
        console.error("Error creating user:", error);
        });
};


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
            <div className='relative w-full'>
                <input type={showPassword ? "text" : "password"} {...register('password', {
                required: true,
                minLength: 6,
                pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                },
                })} 
                className="input" placeholder="Password" />
                <span onClick={() => setShowPassword(!showPassword)}
                    className='absolute left-55 md:left-70 top-3 text-xl cursor-pointer '>
                    <FaEye />
                </span>
            </div>
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
            <button onClick={handleGoogleSignIn} className='btn btn-soft rounded-full w-2/3 mt-4 text-lg'>Signin with <FcGoogle /></button>
        </form>
        </div>
    );
};

export default Register;