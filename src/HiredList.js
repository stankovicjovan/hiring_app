import React from "react";
import "./index.css";

const HiredList = ({ hiredData, title }) => {
  return (
    <div className="hire-list">
      <h2 className="data-title">{title}</h2>
      {hiredData.map((data) => (
        <div className="data-preview hired-preview" key={data.id}>
          <div>
            <h2>{data.name}</h2>
            <p>
              Technology : <b>{data.technology}</b>
            </p>
            <p>
              Experience : <b>{data.experience} </b>
              {Number(data.experience) === 1 ? "year" : "years"}
            </p>
          </div>

          <div className="hired-price">
            <span>{data.price} $/h</span>
            <span className="hired-date">Hired: {data.newDate}</span>
            <span className="hired-date">Expires: {data.newExpiredDate}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HiredList;
