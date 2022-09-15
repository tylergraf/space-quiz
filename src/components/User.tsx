import React from "react";
import type {User} from '../types'

type Props = User & {
    toggleToTeam: Function
    isOnTeam: boolean
}

export default function UserComponent({ name, picture, login, toggleToTeam, isOnTeam }: Props) {
  return (
    <div className="flex mb-4 items-center justify-between">
      <div className="flex">
        <div className="overflow-hidden rounded-full h-12 w-12">
          <img className="h-100 w-100" src={picture.medium} alt={name.first} />
        </div>
        <div className="flex flex-col ml-2">
          <h2 className="text-xl font-bold">
            {name.first} {name.last}
          </h2>
          <span>{login.username}</span>
        </div>
      </div>
      <div className="justify-self-end">
        <button
          className="bg-red-500 text-white font-bold px-4 py-2"
          onClick={() => toggleToTeam(login.uuid, isOnTeam)}
        >
          {isOnTeam ? "Remove" : "Add"}
        </button>
      </div>
    </div>
  );
}
