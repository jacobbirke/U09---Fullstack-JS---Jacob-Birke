import { Dropdown } from "flowbite-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faUser, faSignOutAlt, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

export function UserDropdown({ logoutHandler, isAdmin }) {
  return (
    <Dropdown label={
      <span className="flex items-center text-black">
        <FontAwesomeIcon icon={faUser} className="mr-2" />
        {isAdmin ? 'Admin' : 'User'} 
        <FontAwesomeIcon icon={faChevronDown} className="ml-1" />
      </span>
    } dismissOnClick={false} className="bg-white shadow-lg rounded-lg p-2">
      {isAdmin ? (
        <Dropdown.Item className="flex items-center hover:bg-gray-100 transition-colors">
        <Link to="/admin" className="flex items-center w-full">
          <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />
          Admin Dashboard
        </Link>
      </Dropdown.Item>
      ) : null}
      <Dropdown.Item onClick={logoutHandler} className="flex items-center hover:bg-red-100 transition-colors">
        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 text-red-600" />
        Sign out
      </Dropdown.Item>
    </Dropdown>
  );
}
