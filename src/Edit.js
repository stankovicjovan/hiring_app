import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();

  const [name, setName] = useState(``);
  const [email, setEmail] = useState(``);
  const [number, setNumber] = useState(``);
  const [price, setPrice] = useState(``);
  const [experience, setExperience] = useState(``);
  const [location, setLocation] = useState(``);
  const [language, setLanguage] = useState(``);
  const [linkedin, setLinkedin] = useState(``);
  const [picture, setPicture] = useState(``);
  const [description, setDescription] = useState(``);
  const [technology, setTechnology] = useState(``);
  const [isPending, setIsPending] = useState(false);

  const history = useHistory();

  const handleUpdate = (e) => {
    e.preventDefault();
    const data = {
      name,
      description,
      email,
      technology,
      number,
      price,
      experience,
      location,
      language,
      linkedin,
      picture,
    };

    setIsPending(true);

    fetch(`http://localhost:8000/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then(() => {
      console.log("User Edited");
      setIsPending(false);
      history.push("/");
    });
  };

  const handleCancel = () => {
    history.push("/");
  };

  return (
    <div className="create">
      <h2>Edit Profile</h2>
      <form onSubmit={handleUpdate}>
        <div className="form-holder">
          <div className="form-card">
            <label>Name:</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength="20"
            />

            <label>Email:</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength="20"
            />

            <label>Phone number:</label>
            <input
              type="number"
              required
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              maxLength="15"
            />

            <label>Price per hour:</label>
            <input
              type="number"
              required
              value={price}
              min="0"
              max="999"
              onChange={(e) => setPrice(e.target.value)}
              placeholder="$"
            />

            <label>Experience:</label>
            <input
              type="number"
              required
              value={experience}
              min="0"
              maxLength="2"
              onChange={(e) => setExperience(e.target.value)}
              placeholder="years"
            />
          </div>
          <div className="form-card">
            <label>Technology used:</label>
            <select
              value={technology}
              onChange={(e) => setTechnology(e.target.value)}
            >
              <option value="JAVA"> JAVA</option>
              <option value="javascript"> Javascript</option>
              <option value=".NET"> .NET</option>
              <option value="flutter"> Flutter</option>
              <option value="python"> Python</option>
              <option value="PHP"> PHP</option>
            </select>

            <label>Location:</label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Country"
            />

            <label>Language:</label>
            <input
              type="text"
              required
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              placeholder="Native Language"
            />

            <label>LinkedIn profile:</label>
            <input
              type="url"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />
            <label>Profile picture url:</label>
            <input
              type="url"
              value={picture}
              onChange={(e) => setPicture(e.target.value)}
            />
          </div>
        </div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Tell us something about yourself"
          rows="5"
        ></textarea>
        {!isPending && <button onClick={handleCancel}>Cancel</button>}
        {!isPending && <button>Update</button>}
        {isPending && <h3>Updating information...</h3>}
      </form>
    </div>
  );
};

export default Edit;
