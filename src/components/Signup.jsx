import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const SignupForm = () => {
  const { loginWithRedirect } = useAuth0();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('applicant');

  const handleSignup = async () => {
    await loginWithRedirect({
      screen_hint: 'signup',
      appState: { email, password, user_metadata: { role } },
    });
  };

  return (
    <div>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="admin">Admin</option>
        <option value="applicant">Applicant</option>
        <option value="recruiter">Recruiter</option>
      </select>
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default SignupForm;











// import React from "react";
// import { useForm } from "react-hook-form";
// import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// // import Modal from "./Modal";
// // import { AuthContext } from "../contexts/AuthProvider";

// const Signup = () => {
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm();

//     // const { createUser, login } = useContext(AuthContext);
//     // redirecting to home page or specifig page
//     const location = useLocation();
//     const navigate = useNavigate();
//     const from = location.state?.from?.pathname || "/";

//     const onSubmit = (data) => {
//         const email = data.email;
//         const password = data.password;
//         createUser(email, password).then((result) => {
//             // Signed up 
//             const user = result.user;
//             alert("Account creation successfully done!")
//             document.getElementById("my_modal_5").close()
//             navigate(from, { replace: true })
//             // ...
//         })
//             .catch((error) => {
//                 const errorCode = error.code;
//                 const errorMessage = error.message;
//                 // ..
//             })
//     }
//     return (
//         <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
//             <div className="modal-action flex flex-col justify-center mt-0">
//                 <form onSubmit={handleSubmit(onSubmit)} className="card-body" method="dialog">
//                     <h3 className="font-bold text-xl text-blue text-center underline">Create A Account!</h3>

//                     {/* email */}
//                     <div className="form-control mt-4">
//                         <label className="label">
//                             <span className="label-text">Email</span>
//                         </label>
//                         <input
//                             type="email"
//                             placeholder="email"
//                             className="input input-bordered px-3 py-2 border w-96 flex rounded mb-2 mt-2"
//                             {...register("email")}
//                         />
//                     </div>

//                     {/* password */}
//                     <div className="form-control">
//                         <label className="label">
//                             <span className="label-text">Password</span>
//                         </label>
//                         <input
//                             type="password"
//                             placeholder="password"
//                             className="input input-bordered px-3 py-2 border w-96 flex rounded mb-2 mt-2"
//                             {...register("password")}
//                         />
//                         {/* <label className="label mt-1">
//                             <a href="#" className="label-text-alt link link-hover hover:underline text-sm ml-60 ">
//                                 Forgot password?
//                             </a>
//                         </label> */}
//                     </div>

//                     {/* error */}

//                     {/* login btn */}
//                     <div className="form-control mt-6 px-40">
//                         <input
//                             type="submit"
//                             value="Signup"
//                             className="btn bg-blue py-2 px-4 text-white font-bold rounded"
//                         />
//                     </div>

//                     <p className="text-center my-2 ">
//                         Have an account?{" "}
//                         <button className="underline text-blue ml-1"
//                             onClick={() => 
    // 
// ("my_modal_5").showModal()}
// //                         >
//                             <span className='underline text-blue ml-1'>Login</span>
//                         </button>{" "}
//                     </p>

//                     <Link
//                         to="/"
//                         className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
//                     >✕</Link>
//                 </form>

//                 {/* social sign in */}
//                 <div className="text-center space-x-3 mb-5">
//                     <button className="btn btn-circle hover:bg-green hover:text-blue">
//                         <FaGoogle />
//                     </button>
//                     <button className="btn btn-circle hover:bg-green hover:text-blue">
//                         <FaFacebookF />
//                     </button>
//                     <button className="btn btn-circle hover:bg-green hover:text-blue">
//                         <FaGithub />
//                     </button>
//                 </div>
//             </div>
//             {/* <Modal /> */}
//         </div>
//     )
// }

// export default 