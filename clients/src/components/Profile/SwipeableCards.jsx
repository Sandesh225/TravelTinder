import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import { useGetNearbyUsersQuery } from "../../features/apiSlice";
import "./SwipeableCards.css";

const SwipeableCards = () => {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [geoError, setGeoError] = useState(null);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          setGeoError("Unable to retrieve location.");
          console.error("Geolocation error:", error);
        }
      );
    } else {
      setGeoError("Geolocation is not supported by your browser.");
    }
  }, []);

  const { data: profiles, error, isLoading } = useGetNearbyUsersQuery(location);

  const [lastDirection, setLastDirection] = useState();

  const swiped = (direction, profileName) => {
    console.log("You swiped: " + direction + " on " + profileName);
    setLastDirection(direction);
  };

  const outOfFrame = (profileName) => {
    console.log(profileName + " left the screen!");
  };

  if (geoError) return <p>{geoError}</p>;
  if (isLoading) return <p>Loading nearby users...</p>;
  if (error) return <p>Failed to load profiles.</p>;

  return (
    <div className="swipeableCards">
      <h1>Nearby Travelers</h1>
      <div className="cardsContainer">
        {profiles.map((profile) => (
          <TinderCard
            className="swipe"
            key={profile._id}
            onSwipe={(dir) => swiped(dir, profile.user.username)}
            onCardLeftScreen={() => outOfFrame(profile.user.username)}
          >
            <div
              style={{ backgroundImage: `url(${profile.avatar})` }}
              className="card"
            >
              <h3>{profile.user.username}</h3>
              <p>{profile.bio}</p>
            </div>
          </TinderCard>
        ))}
      </div>
      {lastDirection ? <p>You swiped {lastDirection}</p> : null}
    </div>
  );
};

export default SwipeableCards;
