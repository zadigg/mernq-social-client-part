import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { gql, useMutation } from "@apollo/client";

import { AuthContext } from "../context/auth";
import { useForm } from "../util/hooks";
import Loading from "../components/Loading";

const Login = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      // console.log(userData);
      context.login(userData);
      navigate("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: values,
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <div className="relative">
      <form onSubmit={onSubmit} className="">
        <div className="bg-grey-lighter min-h-screen flex flex-col">
          <div className="relative container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            {/* Loading */}
            {loading && <Loading />}
            {/* Loading */}

            <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
              <h1 className="mb-8 text-3xl text-center">Login</h1>
              <input
                type="text"
                className="block border border-grey-light  w-full p-3 rounded mb-4"
                name="username"
                placeholder="User Name"
                value={values.username}
                onChange={onChange}
              />

              <input
                type="password"
                className="block border border-grey-light w-full p-3 rounded mb-4"
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={onChange}
              />

              <button
                type="submit"
                className="w-full text-center py-3 rounded bg-green-700 text-white hover:bg-green-dark focus:outline-none my-1 "
              >
                Login
              </button>
            </div>

            <div className="text-grey-dark mt-6">
              Already have an account?
              <Link to="/login">Log in</Link>.
            </div>
          </div>
        </div>
      </form>
      <div>
        {/*  */}
        <div>
          {Object.keys(errors).length > 0 && (
            <div className="absolute top-5 left-[40%] rounded-md  px-3 py-2 opacity-95 bg-[#FbD5D5] text-[#df1717] text-sm">
              <ul>
                {Object.values(errors).map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {/*  */}
      </div>
    </div>
  );
};

const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;
