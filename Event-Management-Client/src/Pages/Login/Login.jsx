import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';
import useAuth from '../../Hooks/useAuth';

const Login = () => {

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onChange' });
    const { signIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const onSubmit = (data) => {
        console.log(data); // Perform login logic or submit form data

        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);

                // logged in alert successfully

                Swal.fire({
                    title: 'User Login Successful.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
                navigate(from, { replace: true });
            })

    };

    return (
        <div>
            <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden">
                <div className="w-full p-6 bg-white border-t-4 border-gray-600 rounded-md shadow-md border-top lg:max-w-lg">
                    <h1 className="text-3xl font-semibold text-center text-gray-700">Login Now!!!</h1>
                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label className="label">
                                <span className="text-base label-text">Email</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Email Address"
                                className="w-full input input-bordered"
                                {...register('email', {
                                    // required: true
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: 'Invalid email address',
                                    },
                                })}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                            )}
                        </div>
                        <div>
                            <label className="label">
                                <span className="text-base label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Enter Password"
                                className="w-full input input-bordered"
                                {...register('password', {
                                    // required: true,
                                    required: 'Password is required',
                                    minLength: 6,
                                    pattern: /^(?=.*[A-Z])(?=.*\W).*$/,
                                })}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-xs mt-1">
                                    Password must be at least 6 characters long and contain at least one capital letter and one special character.
                                </p>
                            )}
                        </div>

                        <div className='flex justify-between items-center'>
                            <Link to="#" className="text-xs text-gray-600 hover:underline hover:text-blue-600">Forget Password?</Link>

                            <p className='text-xs text-gray-600 hover:underline hover:text-blue-600'><small>New Here? <Link to="/signUp">Create an account</Link> </small></p>
                        </div>

                        <div>
                            <button type="submit" className="btn btn-block" disabled={!isValid}>
                                Login
                            </button>
                        </div>
                    </form>
                    <div className='mt-5 text-2xl font-semibold text-center text-gray-700'>
                        Social Login
                    </div>
                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default Login;