"use client";

import { Dropdown } from "flowbite-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export function UserDropdown({ logoutHandler }) {
  return (
    <Dropdown label={<span className="text-black">User <FontAwesomeIcon icon={faChevronDown} className="ml-1" /></span>} dismissOnClick={false} className="bg-blue-100 text-white">
      <Dropdown.Item>Order History</Dropdown.Item>
      <Dropdown.Item onClick={logoutHandler}>Sign out</Dropdown.Item>
    </Dropdown>
  );
}
