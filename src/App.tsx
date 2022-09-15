import React, { useCallback, useState } from "react";
import useUsers from "./useUsers";
import Header from "./components/Header";
import UserComponent from "./components/User";
// import type {User} from './types'

function App():JSX.Element {
  const { data } = useUsers();

  const [team, setTeam] = useState<string[]>([]);
  const toggleToTeam = useCallback((id: string, isOnTeam: boolean) => {
    if (isOnTeam) {
      setTeam((oldTeam) => {
        return oldTeam.filter((memberId) => memberId !== id);
      });
    } else {
      setTeam((oldTeam) => {
        return [...oldTeam, id];
      });
    }
  }, []);
  return (
    <>
      <Header team={team} />
      <div className="container m-auto">
        {data?.map((user) => (
          <UserComponent
            key={user.login.uuid}
            {...user}
            toggleToTeam={toggleToTeam}
            isOnTeam={team.includes(user.login.uuid)}
          />
        ))}
      </div>
    </>
  );
}

export default App;
