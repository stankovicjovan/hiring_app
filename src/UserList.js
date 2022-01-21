import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const UserList = ({ data, title, hiredData }) => {
  return (
    <div className="data-list">
      <h2 className="data-title">{title}</h2>
      {data.map((data) => (
        <Link to={`/users/${data.id}`} key={data.id}>
          <div className="data-preview">
            <h2>{data.name}</h2>
            <p>
              Technology : <b>{data.technology}</b>
            </p>
            <p>
              Experience : <b>{data.experience} </b>
              {Number(data.experience) === 1 ? "year" : "years"}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default UserList;
