import { TinderCard } from "react-tinder-card";
const onSwipe = (direction) => {
  console.log("You swipe  " + direction);
};
const onCardLeftScreen = (myIdentifier) => {
  console.log(myIdentifier + " left the screen");
};

return (
  <TinderCard
    onSwipe={onSwipe}
    onCardLeftScreen={() => onCardLeftScreen("fooBar")}
    preventSwipe={["right", "left"]}
  >
    Hello, World!
  </TinderCard>
);
