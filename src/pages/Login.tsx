import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import AuthContext from "../helpers/auth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const auth = useContext(AuthContext);
  const history = useHistory();

  const onSubmit = async (data: any) => {
    const { email, password } = data;

    await fetch("https://fechallenge.dev.bhyve.io/user/signin", {
      body: JSON.stringify({
        username: email,
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
        history.push("/dashboard");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <div className="max-w-screen-sm mx-auto px-4">
      <h1 className="text-2xl text-bold text-gray-800 my-2">Login</h1>
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
          {...register("password", { required: true })}
        />
        {errors.password && <span>This field is required</span>}
        <input className="dd-button" value="Login" type="submit" />
      </form>
    </div>
  );
};

export default Login;
