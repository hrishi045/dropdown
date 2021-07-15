import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { getCookie, setCookie } from "react-use-cookie";

const SignupProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const onSubmit = async (data: any) => {
    const { firstName, lastName } = data;
    console.log(
      JSON.stringify({
        firstName,
        lastName,
      })
    );
    await fetch("https://fechallenge.dev.bhyve.io/user/basic/profile", {
      body: JSON.stringify({
        firstName,
        lastName,
      }),
      method: "POST",
      headers: {
        Authorization: `Bearer ${getCookie("dd_token")}`,
        "Content-Type": "application/json",
        accept: "*/*",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        // setCookie("dd_token", res.accessToken);
        history.push("/signup/skills");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <div className="flex-1 px-12">
      <h1 className="text-2xl text-bold text-gray-800 my-2">
        Basic Profile Information
      </h1>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <label className="dd-label" htmlFor="firstName">
          First Name
        </label>
        <input
          className="dd-input_text"
          id="firstName"
          type="text"
          defaultValue="test"
          {...register("firstName", { required: true })}
        />
        {errors.firstName && <span>This field is required</span>}
        <label className="dd-label" htmlFor="lastName">
          Last Name
        </label>
        <input
          className="dd-input_text"
          id="lastName"
          type="text"
          {...register("lastName", { required: true })}
        />
        {errors.lastName && <span>This field is required</span>}
        <input className="dd-button" value="Submit" type="submit" />
      </form>
    </div>
  );
};

export default SignupProfile;
