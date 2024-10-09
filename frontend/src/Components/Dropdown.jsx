"use client";

import { Dropdown } from "flowbite-react";

export function UserDropdown({logoutHandler}) {
  return (
    <Dropdown label={<span className="text-black">User</span>} dismissOnClick={false} className="bg-blue-100 text-white ">
      <Dropdown.Item>Profile</Dropdown.Item>
      <Dropdown.Item onClick={logoutHandler}>Sign out</Dropdown.Item>
    </Dropdown>
  );
}
