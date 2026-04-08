"use client";

import {
  EmailOutlined,
  LockOutlined,
  PersonOutline,
} from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react"
import { useEffect, useState } from "react";

const Form = ({ type }) => {
  const [userTogle, setUserToggle] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(()=>{
    if(session?.user){
      localStorage.setItem('userId', session.user._id);
      router.push('home');
    }
  },[session])
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();


  const onSubmit = async (data) => {
    let dubmitData = data;
    dubmitData.isTherapist = userTogle;
    dubmitData.ratings = [];
    if (type === "register") {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dubmitData),
      });

      if (res.ok) {
        router.push("/login");
      }

      if (res.error) {
        toast.error("Something went wrong");
      }
    }

    if (type === "login") {
      const res = await signIn("credentials", {
        ...dubmitData,
        redirect: false,
      })

      if (res.ok) {
        //  router.push("/home");
      }

      if (res.error) {
        toast.error(res.error);
      }
    }
  };





  return (
    <div className="auth">
      <div className="content">
        <div className="flex flex-row items-center form-logo">
          <img src="/assets/logomain.png" alt="logo" className="logo" />
          <h1>Solacenet</h1>
        </div>
        

        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          {type === "register" && (
            <div>
              <div className="w-full flex flex-row ml-2 mb-4">
                <lebel className="font-semibold text-gray-500 ">Register As :</lebel>
                <div className="flex flex-row items-center  ml-4">
                  <div className="flex items-center mr-4">
                    <input checked={!userTogle} onChange={() => setUserToggle(!userTogle)} id="default-radio-1" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">User</label>
                  </div>
                  <div className="flex items-center">
                    <input checked={userTogle} onChange={() => setUserToggle(!userTogle)} id="default-radio-2" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                    <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Therapist</label>
                  </div>
                </div>
              </div>
              <div className="input">
                <input
                  defaultValue=""
                  {...register("username", {
                    required: "Username is required",
                    validate: (value) => {
                      if (value.length < 3) {
                        return "Username must be at least 3 characters";
                      }
                    },
                  })}
                  type="text"
                  placeholder="Username"
                  className="input-field"
                />
                <PersonOutline sx={{ color: "#737373" }} />
              </div>
              {userTogle && <div><div className="input mt-4">
                <input
                  defaultValue=""
                  {...register("fullName", {
                    required: "Full name is required",
                    validate: (value) => {
                      if (value.length < 3) {
                        return "Username must be at least 3 characters";
                      }
                    },
                  })}
                  type="text"
                  placeholder="Full Name"
                  className="input-field"
                />
                <PersonOutline sx={{ color: "#737373" }} />
              </div>
                <div className="input mt-4">
                  <input
                    defaultValue=""
                    {...register("specificity", {
                      required: "Full name is required",
                      validate: (value) => {
                        if (value.length < 3) {
                          return "Username must be at least 3 characters";
                        }
                      },
                    })}
                    type="text"
                    placeholder="Specificity"
                    className="input-field"
                  />
                  <PersonOutline sx={{ color: "#737373" }} />
                </div>
              </div>}
              {errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
              )}
            </div>
          )}

          <div>
            <div className="input ">
              <input
                defaultValue=""
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="Email"
                className="input-field"
              />
              <EmailOutlined sx={{ color: "#737373" }} />
            </div>
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <div className="input">
              <input
                defaultValue=""
                {...register("password", {
                  required: "Password is required",
                  validate: (value) => {
                    if (
                      value.length < 5 ||
                      !value.match(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/)
                    ) {
                      return "Password must be at least 5 characters and contain at least one special character";
                    }
                  },
                })}
                type="password"
                placeholder="Password"
                className="input-field"
              />
              <LockOutlined sx={{ color: "#737373" }} />
            </div>

            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          {type === "login" && <div className="w-full flex flex-row ml-2">
            <lebel className="font-semibold text-gray-500 ">{type === "register" ? "Register" : "Login"} As: </lebel>
            <div className="flex flex-row items-center  ml-4">
              <div className="flex items-center mr-4">
                <input checked={!userTogle} onChange={() => setUserToggle(!userTogle)} id="default-radio-1" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">User</label>
              </div>
              <div className="flex items-center">
                <input checked={userTogle} onChange={() => setUserToggle(!userTogle)} id="default-radio-2" type="radio" value="" name="default-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Therapist</label>
              </div>
            </div>
          </div>}

          <button className="button" type="submit">
            {type === "register" ? "Join Free" : "Let's Chat"}
          </button>
        </form>

        {type === "register" ? (
          <Link href="/login" className="link">
            <p className="text-center">Already have an account? Sign In Here</p>
          </Link>
        ) : (
          <>
            <Link href="/register" className="link">
              <p className="text-center">Don't have an account? Create Account</p>
            </Link>
            {/* <Link href="/" className="link">
              <p className="text-center">Therapist? Therapist Login</p>
            </Link> */}
          </>
        )}
      </div>
    </div>
  );
};

export default Form;
