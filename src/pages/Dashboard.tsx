import { useEffect, useState } from "react";
import { getCookie } from "react-use-cookie";

const Dashboard = () => {
  const [profileInfo, setProfileInfo] = useState<{
    firstName: string;
    lastName: string;
    skills: string[] | null;
  }>();

  useEffect(() => {
    (async () => {
      await fetch("https://fechallenge.dev.bhyve.io/user/profile", {
        method: "GET",

        headers: {
          Authorization: `Bearer ${getCookie("dd_token")}`,
          "Content-Type": "application/json",
          accept: "*/*",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setProfileInfo(res);
        });
    })();
  }, []);

  return (
    <div>
      {profileInfo && (
        <div className="mx-10 my-4">
          <h1 className="text-2xl font-bold text-gray-800 my-2">Dashboard</h1>
          <div>
            <h2 className="text-2xl text-gray-800 my-2">Profile info</h2>
            <span>
              {profileInfo.firstName} {profileInfo.lastName}
            </span>
          </div>
          <div>
            <h2 className="text-2xl text-gray-800 my-2">Skills</h2>
            <ul>
              {profileInfo.skills &&
                profileInfo.skills.map((skill: any) => <li>{skill}</li>)}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
