import React, { useContext } from "react";
import moment from "moment";
import DeleteButton from "../DeleteButton";
import { AuthContext } from "../../context/auth";

const ViewComment = ({ comment, postId }) => {
  const { user } = useContext(AuthContext);
  return (
    <div
      key={comment.id}
      className="border border-gray-100 px-6 py-4 rounded overflow-hidden shadow-lg flex justify-between items-end "
    >
      <div>
        <div className="font-semibold">{comment.username}</div>
        <div className="text-gray-500">
          {moment(comment.createdAt).fromNow()}
        </div>
        <div>{comment.body}</div>
      </div>
      <div>
        {user && user.username === comment.username && (
          <DeleteButton postId={postId} commentId={comment.id} />
        )}
      </div>
    </div>
  );
};

export default ViewComment;
