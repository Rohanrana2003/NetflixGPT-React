/* eslint-disable no-unused-vars */
import Header from "./Header";
import { useState, useRef } from "react";
import { checkValidData } from "../utils/ValidateForm";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/Redux/userSlice";
import { BACKGROUND_IMG } from "../utils/Constants/constants";

const Login = () => {
  document.title = "Netflix India - Watch TV Shows Online, Watch Movies Online";

  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const dispatch = useDispatch();

  const handleFormType = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null);
  };

  const handleSubmit = () => {
    let message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;

          updateProfile(user, {
            displayName: name.current.value,
          })
            .then(() => {
              const { uid, displayName, email } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          setErrorMessage("User with this Email already exists");
        });
    }

    if (isSignInForm) {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage("Invalid credentials");
          // ..
        });
    }
  };

  return (
    <div>
      <Header />

      <div className="absolute h-screen object-cover w-[100%]  bg-black opacity-45 z-30"></div>

      <div className="absolute">
        <img
          className="h-screen w-screen object-cover "
          src={BACKGROUND_IMG}
          alt="background-img"
        />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute text-white z-50  bg-black w-[300px] sm:w-[430px] py-3 sm:py-6 
            px-12 sm:px-16 mt-44 sm:mt-36 md:mt-24 mx-auto right-0 left-0 rounded-[5px] bg-opacity-75"
      >
        <h1 className="text-[30px] font-bold my-7">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            ref={name}
            className="  mb-3 bg-[rgb(36,43,54)] p-[14px] w-full  rounded-[5px] bg-opacity-70"
          />
        )}

        <input
          type="text"
          placeholder="Email Address"
          ref={email}
          className="  mb-3 bg-[rgb(36,43,54)] p-[14px] w-full  rounded-[5px] bg-opacity-70"
        />

        <input
          type="password"
          placeholder="Password"
          ref={password}
          className=" mb-5 bg-[rgb(36,43,54)] p-[14px] w-full  rounded-[5px] bg-opacity-70"
        />

        {errorMessage && (
          <p className=" flex items-center gap-1 text-[rgb(229,9,20)] text-sm mb-5 mt-[-15px] ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              role="img"
              viewBox="0 0 16 16"
              width="16"
              height="16"
              data-icon="CircleXSmall"
              aria-hidden="true"
              className="default-ltr-cache-0 e1vkmu651"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5C11.5899 1.5 14.5 4.41015 14.5 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM4.46967 5.53033L6.93934 8L4.46967 10.4697L5.53033 11.5303L8 9.06066L10.4697 11.5303L11.5303 10.4697L9.06066 8L11.5303 5.53033L10.4697 4.46967L8 6.93934L5.53033 4.46967L4.46967 5.53033Z"
                fill="currentColor"
              ></path>
            </svg>
            {errorMessage}
          </p>
        )}

        <button
          onClick={handleSubmit}
          className="mb-6 bg-[] bg-gradient-to-b from-[rgb(255,0,13)] to-[rgb(133,1,8)] px-3 py-2 w-full rounded-[5px]  font-bold hover:bg-[rgb(201,8,18)]"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="text-gray-300 mb-5">
          {isSignInForm ? "New to Netflix? " : "Already a Member? "}

          <span
            onClick={handleFormType}
            className="font-semibold text-white cursor-pointer hover:underline "
          >
            {isSignInForm ? "Sign up now." : "Sign In"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
