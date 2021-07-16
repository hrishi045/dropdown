import classNames from "classnames";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Dropdown, { DropdownOption } from "../components/Dropdown";
import AuthContext from "../helpers/auth";

const SignupSkills = () => {
  const [skills, setSkills] = useState<DropdownOption[]>([]);
  const [selected, setSelected] = useState<DropdownOption[]>([]);
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [notEnough, setNotEnough] = useState(false);

  const handleChange = (sel: DropdownOption[]) => {
    setSelected(sel);
  };

  useEffect(() => {
    (async () => {
      await fetch("https://fechallenge.dev.bhyve.io/skills")
        .then((res) => res.json())
        .then(async (res) => {
          setSkills(
            res.map((x: any) => {
              return { id: x.id.toString(), text: x.skillName };
            })
          );
        });
    })();
  }, []);

  const handleSubmit = async () => {
    if (selected.length < 3 || selected.length > 8) {
      setNotEnough(true);
      return;
    }
    await fetch("https://fechallenge.dev.bhyve.io/user/skills", {
      body: JSON.stringify({
        skills: selected.map((x) => x.text),
      }),
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth.token}`,
        "Content-Type": "application/json",
        accept: "*/*",
      },
    })
      .then((res) => {
        history.push("/dashboard");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <div className="max-w-screen-sm mx-auto px-4">
      <h1 className="text-2xl text-bold text-gray-800 my-2">Select Skills</h1>
      <Dropdown onChange={handleChange} options={skills} max={8} />
      <span className={classNames({ "text-red-700": notEnough })}>
        Select at least 3 skills (a maximum of 8)
      </span>
      <button onClick={handleSubmit} className="dd-button block" type="button">
        Submit skills
      </button>
    </div>
  );
};

export default SignupSkills;
