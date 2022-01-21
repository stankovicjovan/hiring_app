import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import useFetch from "./useFetch";
import { Link } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams();

  const [startDate, setStartDate] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isIncorrect, setIsIncorrect] = useState(false);

  const { data, error, isLoading } = useFetch(
    `http://localhost:8000/users/${id}`
  );

  const history = useHistory();

  const handleDelete = () => {
    fetch(`http://localhost:8000/users/${id}`, {
      method: "DELETE",
    }).then(() => {});
    fetch(`http://localhost:8000/hired/${id}`, {
      method: "DELETE",
    }).then(() => {
      console.log("User deleted");

      //
      history.push("/");
    });
  };
  const handleSubmitDate = (e) => {
    e.preventDefault();
    setIsDisabled(true);
    setIsIncorrect(false);
  };

  const handleHiring = () => {
    const date = new Date(startDate);
    const expires = new Date(expireDate);

    const currentDate = new Date();

    if (currentDate > date || currentDate > expires) {
      setIsDisabled(false);
      setIsIncorrect(true);
      return;
    }

    if (date > expires) {
      setIsDisabled(false);
      setIsIncorrect(true);
      return;
    }

    const newDate = date.toISOString().slice(0, 10);
    const newExpiredDate = expires.toISOString().slice(0, 10);

    const newData = { ...data, newDate, newExpiredDate };

    fetch("http://localhost:8000/hired/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    }).then(() => {
      console.log("Developed hired");

      //
      history.push("/");
    });
  };

  return (
    <div className="data-details">
      {isLoading && <h3>Loading...</h3>}
      {error && <div>{error}</div>}
      {data && (
        <fieldset>
          <legend>{data.name}</legend>
          <p>
            Email : <b>{data.email}</b>
          </p>
          <p>
            Phone number : <b>{data.number}</b>
          </p>
          <p>
            Technology : <b>{data.technology}</b>
          </p>
          <p>
            Experience : <b>{data.experience}</b>{" "}
            {Number(data.experience) === 1 ? "year" : "years"}
          </p>
          <p>
            Price : <b>{data.price}</b> $/h
          </p>
          <p>
            Location : <b>{data.location}</b>
          </p>
          <p>
            Language : <b>{data.language}</b>
          </p>

          <p>
            LinkedIn :
            <a href={data.linkedin} target="_blank" rel="noreferrer">
              <b>{data.linkedin}</b>
            </a>
          </p>
          <p>
            Profile picture :
            <a href={data.picture} target="_blank" rel="noreferrer">
              <b>{data.picture}</b>
            </a>
          </p>
          <p> Description : {data.description}</p>

          <fieldset className="hiring-options">
            <legend>
              Hiring Options <span>(required) </span>
            </legend>
            <form onSubmit={handleSubmitDate}>
              <label htmlFor="date">Start</label>
              <input
                type="datetime-local"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <label htmlFor="date">End</label>
              <input
                type="datetime-local"
                required
                value={expireDate}
                onChange={(e) => setExpireDate(e.target.value)}
              />
              <button className="hire-btn">Schedule hiring</button>
              {isIncorrect ? (
                <p className="form-warning">Plese enter valid dates!</p>
              ) : (
                ""
              )}
            </form>
          </fieldset>
          <button
            onClick={handleHiring}
            className="hire-btn"
            disabled={!isDisabled}
          >
            Hire me
          </button>
          <Link to={`/edit/${id}`}>
            <button className="edit-btn">Edit Profile</button>
          </Link>
          <button onClick={handleDelete}>Delete</button>
        </fieldset>
      )}
    </div>
  );
};

export default UserDetails;
