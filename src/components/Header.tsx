import React from "react";

type Props = {
  team: string[]
}

export default function Header({ team }: Props):JSX.Element {
  return (
    <header className="sticky top-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-5">
      <div className="container m-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-5 text-white py-4">
          All The People
        </h1>
        <div className="text-white">Team Count: {team.length}</div>
      </div>
    </header>
  );
}
