import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getCookie } from "react-use-cookie";
import Dropdown, { DropdownOption } from "../components/Dropdown";

const SignupSkills = () => {
  const [skills, setSkills] = useState<DropdownOption[]>([]);
  const [selected, setSelected] = useState<DropdownOption[]>([]);
  const history = useHistory();

  const handleChange = (sel: DropdownOption[]) => {
    setSelected(sel);
  };

  useEffect(() => {
    (async () => {
      await fetch("https://fechallenge.dev.bhyve.io/skills")
        .then((res) => res.json())
        .then(async (res) => {
          console.log(
            res.map((x: any) => {
              return { id: x.id, text: x.skillName };
            })
          );
          setSkills(
            res.map((x: any) => {
              return { id: x.id.toString(), text: x.skillName };
            })
          );
        });
    })();
  }, []);

  const handleSubmit = async () => {
    await fetch("https://fechallenge.dev.bhyve.io/user/skills", {
      body: JSON.stringify({
        skills: selected.map((x) => x.text),
      }),
      method: "POST",
      headers: {
        Authorization: `Bearer ${getCookie("dd_token")}`,
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
    <div className="flex-1 px-12">
      <h1 className="text-2xl text-bold text-gray-800 my-2">Select Skills</h1>
      <Dropdown onChange={handleChange} options={skills} />
      <span>Select at least 3 skills (a maximum of 8)</span>
      <button onClick={handleSubmit} className="dd-button block" type="button">
        Submit skills
      </button>
    </div>
  );
};

export default SignupSkills;
