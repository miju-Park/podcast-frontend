import { faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React,  { useCallback }  from "react";
import { useHistory } from "react-router";

import { Link } from "react-router-dom";
import { isLoggedInVar, tokenVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../const";
import { useMe } from "../hooks/useMe";

export const Header: React.FC = () => {
  const history = useHistory()
  const { data } = useMe();
  const handleLogout = useCallback(()=>{
    localStorage.setItem(LOCALSTORAGE_TOKEN, '');
    tokenVar('')
    isLoggedInVar(false)
    history.push('/')
  },[history])
  return (
    <>
      
      <header className="py-4">
        <div className="w-full px-5 xl:px-0 max-w-screen-2xl mx-auto flex justify-between items-center">
          <Link to="/">
            <FontAwesomeIcon icon={faHome} className="text-3xl" />
          </Link>
          {!data && <Link to="/login">Login</Link>}
          <span className="text-xs">
            <Link to="/edit-profile">
              <FontAwesomeIcon icon={faUser} className="text-3xl" />
              {data?.me?.email}
            </Link>
          </span>
          {data && <button onClick={handleLogout}>Logout</button>}
        </div>
      </header>
    </>
  );
};