import axios from "axios";
import { useForm } from "react-hook-form";
import { Redirect } from "react-router-dom";
import { setCookie } from "react-use-cookie";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    const { email, password } = data;
    console.log(typeof email, typeof password);
    console.log(
      JSON.stringify({
        username: email,
        password,
      })
    );
    const res = await axios
      .post("https://fechallenge.dev.bhyve.io/user/login", {
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
      .then((res) => {
        setCookie("dd_token", res.data.accessToken);

        <Redirect to={{ pathname: "/dashboard" }} />;
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <div className="flex-1 px-12">
      <h1 className="text-2xl text-bold text-gray-800 my-2">Login</h1>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label className="dd-label" htmlFor="email">
          Email
        </label>
        <input
          className="dd-input_text"
          id="email"
          type="email"
          defaultValue="test"
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
