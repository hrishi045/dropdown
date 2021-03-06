import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Redirect, useHistory } from "react-router-dom";
import AuthContext from "../helpers/auth";

export const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const auth = useContext(AuthContext);

  const onSubmit = async (data: any) => {
    const { email: username, password } = data;
    await fetch("https://fechallenge.dev.bhyve.io/user/signup", {
      body: JSON.stringify({
        username,
        password,
      }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "*/*",
      },
    })
      .then(async (res) => {
        await fetch("https://fechallenge.dev.bhyve.io/user/signin", {
          body: JSON.stringify({
            username,
            password,
          }),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "*/*",
          },
        })
          .then((res) => res.json())
          .then((res) => {
            auth.setToken(res.accessToken);
            history.push("/signup/profile");
          })
          .catch((err) => {
            console.log("Login error");
            console.log(err.response);
          });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <div className="max-w-screen-sm mx-auto">
      <div className="px-4">
        <h1 className="text-2xl text-bold text-gray-800 my-2">
          Create an account
        </h1>
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <label className="dd-label" htmlFor="email">
            Email
          </label>
          <input
            className="dd-input_text"
            id="email"
            type="email"
            {...register("email", { required: true })}
          />
          {errors.email && <span>This field is required</span>}
          <label className="dd-label" htmlFor="password">
            Password
          </label>
          <input
            className="dd-input_text"
            id="password"
            type="password"
            {...register("password", {
              required: true,
              minLength: 8,
              maxLength: 20,
            })}
          />
          {errors.password && (
            <span>This field is required and must have 8 to 20 characters</span>
          )}
          <input className="dd-button" value="Create Account" type="submit" />
        </form>
      </div>
      {auth.token !== "" && <Redirect to="/dashboard" />}
    </div>
  );
};
