import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";
import { FcGoogle } from 'react-icons/fc'
import { saveUser } from "../../api/auth";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    watch,
  } = useForm({ mode: "onChange" });

  const { createUser, updateUserProfile , googleSignIn , setLoading} = useAuth();
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const onSubmit = (data) => {
    console.log(data); // Perform sign up logic or submit form data

    createUser(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log("Logged in as", loggedUser);

        updateUserProfile(data.name, data.photoURL)
          .then(() => {
            console.log("User Profile info Updated");
            const saveUser = {
              name: data.name,
              email: data.email,
              photoURL: data.photoURL,
             
            };

            axios
              .post("https://event-management-server.vercel.app/users", saveUser)
              .then((response) => {
                const data = response.data;
                console.log("Axios post submit data", data); // Perform sign up logic or submit form data
                if (data.insertedId) {
                  reset();

                  // Confirmation message or alert
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User created successfully.",
                    showConfirmButton: false,
                    timer: 1500,
                  });

                  // Navigation to desired page
                  navigate("/");
                }
              })
              .catch((error) => {
                console.error("Error occurred while saving user:", error);
              });
          })
          .catch((error) => {
            console.error("Error occurred while updating user profile:", error);
          });
      })
      .catch((error) => {
        console.error("Error occurred while creating user:", error);
      });
  };

  const password = watch("password");
  

// Handle google signin
const handleGoogleSignIn = () => {
  googleSignIn()
    .then(result => {
      console.log(result.user)
      Swal.fire({
        title: "User Login Successful.",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
      // save user to db
      saveUser(result.user)
      navigate(from, { replace: true })
    })
    .catch(err => {
      setLoading(false)
      console.log(err.message)
    })
}

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="text-center">
          <h1 className="text-3xl font-semibold mb-4">Sign Up</h1>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="md:flex md:space-x-4">
            <div className="md:w-full">
              <label className="label">
                <span className="text-base label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                className="w-full input input-bordered"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>
          <div className="md:flex md:space-x-4">
            <div className="md:w-full">
              <label className="label">
                <span className="text-base label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="Email"
                className="w-full input input-bordered"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
          <div className="md:flex md:space-x-4">
            <div className="md:w-full">
              <label className="label">
                <span className="text-base label-text">Photo URL</span>
              </label>
              <input
                type="text"
                placeholder="Photo URL"
                className="w-full input input-bordered"
                {...register("photoURL")}
              />
              {errors.photoURL && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.photoURL.message}
                </p>
              )}
            </div>
          </div>
          <div className="md:flex md:space-x-4">
            <div className="md:w-1/2">
              <label className="label">
                <span className="text-base label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="w-full input input-bordered"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*\W).*$/,
                    message:
                      "Password must contain at least one capital letter and one special character",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="md:w-1/2">
              <label className="label">
                <span className="text-base label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full input input-bordered"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={!isValid}
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Signup with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        <div
          onClick={handleGoogleSignIn}
          className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'
        >
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </div>
        <p className='px-6 text-sm text-center text-gray-400'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='hover:underline hover:text-rose-500 text-gray-600'
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default SignUp;
