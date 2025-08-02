import React from 'react';
import { useForm } from 'react-hook-form'
import { FaEye } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { NavLink, useLocation, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';

const Login = () => {
    const [showPassword, setShowPassword] = React.useState(false)
    const location = useLocation();
    const axiosInstance = useAxios;
    
    const navigate = useNavigate();
    const from = location.state?.from || '/';

    const { signIn } =useAuth()
    const {signInWithGoogle} = useAuth()

    const handleGoogleSignIn = () =>{
        signInWithGoogle()
        .then(async (result) =>{
            const user = result.user;

            const userInfo ={
                email: user.email,
                role: 'user',
                created_at: new Date().toISOString(),
                last_log_in: new Date().toISOString()
            }

            const res=await axiosInstance.post('/users', userInfo);
            console.log('user update info', res.data);

            navigate(from, { replace: true });

        })
        .catch(error =>{
            console.log(error)
        })
    }

    const { register, handleSubmit, formState: {errors} } = useForm()

     const onSubmit = data =>{
            console.log(data)
    
            signIn(data.email, data.password)
             .then(result =>{
                console.log(result.user)
                navigate(from, { replace: true });
            })
            .catch(error =>{
                console.error(error)
            })
    };


    return (
        <div className="card w-full">
        <h2 className='text-2xl font-bold'>Welcome to our Club!</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset className="fieldset">

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
                    errors.email?.type === 'required' && <p className='text-red-500'>Email is required!</p>
                }

            <div><a className="link link-hover">Forgot password?</a></div>

            <button className="btn btn-neutral rounded-full mt-4 w-2/3 mb-4">Login</button>
            </fieldset>
            <p>Don't have and account? <NavLink to='/register' className='text-blue-700'>Register</NavLink> now!</p>
            <div className="divider">OR</div>
            <button onClick={handleGoogleSignIn} className='btn btn-soft rounded-full w-2/3 mt-4 text-lg'>Signin with <FcGoogle /></button>
        </form>
        </div>
    );
};

export default Login;