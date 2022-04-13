import React, { useState, useEffect } from "react";

import { UseAuth } from "../custom-hooks";

export default function Activities() {
  const { isLoggedIn, token } = UseAuth();
  const [activities, setActivities] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    async function fetchActivities() {
      try {
        const response = await fetch(`http://localhost:3000/api/activities`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        const activities = await response.json();

        setActivities(activities);
      } catch (err) {
        console.error(err);
      }
    }

    fetchActivities();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/activities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      const newRoutine = await response.json();
      console.log(newRoutine);
    } catch (err) {
      console.error(err);
    }
  }

  // eslint-disable-next-line
  //   useEffect(() => {
  //     setPosts(posts.filter((post) => containsSearchTerm(post, searchTerm)));
  //   }, [searchTerm]);

  // this validator returns true if searchTerm is found in field
  //   function containsSearchTerm(post, searchTerm) {
  //     for (let key in post) {
  //       switch (key) {
  //         case "willDeliver":
  //         case "active":
  //         case "_id":
  //         case "author":
  //         case "__v":
  //         case "isAuthor":
  //           continue;
  //       }

  //       const currentField = post[key];

  //       if (currentField.indexOf(searchTerm) >= 0) {
  //         return true;
  //       }
  //     }
  //     return false;
  //   }

  return (
    <div className="activities">
      <h1>Public Activities</h1>
      {/* <form>
        <label>Search:</label>
        <input
          type="text"
          className="searchBar"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        ></input>
      </form> */}
      {activities &&
        activities.map((activity) => {
          const { id, name, description } = activity;

          return (
            <div className="individualActivity" key={id}>
              <h3>{name}</h3>
              <p>{description}</p>
            </div>
          );
        })}
      {isLoggedIn && (
        <aside>
          <form className="newActivityForm" onSubmit={handleSubmit}>
            <h3>Create New Activity</h3>
            <div className="activityName">
              <label>Name:</label>
              <input
                className="input"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div className="activityDescription">
              <label>Description:</label>
              <input
                className="input"
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
              />
            </div>
            <input
              className="submitBtn"
              type="submit"
              value="Submit New Activity"
            />
          </form>
        </aside>
      )}
    </div>
  );
}
