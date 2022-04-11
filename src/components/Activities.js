import React, { useState, useEffect } from "react";

export default function Activities() {
  const [activities, setActivities] = useState([]);

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
    </div>
  );
}
