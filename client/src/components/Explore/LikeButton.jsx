import React from "react";
import { toast } from "react-toastify";
import { useCreateMatchMutation } from "../../features/apiSlice";
import { useSelector } from "react-redux";

const LikeButton = ({ user2Id }) => {
  const loggedInUser = useSelector((state) => state.auth.user);
  const [createMatch] = useCreateMatchMutation();

  const handleLike = async () => {
    try {
      await createMatch({ user1Id: loggedInUser._id, user2Id }).unwrap();
      toast.success("Match request sent!");
    } catch (error) {
      if (error?.status === 409) {
        toast.error("Match already exists with this user!");
      } else {
        console.error("Match request failed:", error);
        toast.error("Error sending match request");
      }
    }
  };

  return (
    <button
      className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      onClick={handleLike}
    >
      Like
    </button>
  );
};

export default LikeButton;
