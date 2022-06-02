import React, { useContext } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";
import CommentButton from "./CommentButton";

const PostCard = ({
  post: { body, createdAt, id, username, likeCount, commentCount, likes },
}) => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <Link to={`/posts/${id}`}>
          <div>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{username}</div>
              <p className="text-gray-700 text-base">{body}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {moment(createdAt).fromNow(true)}
              </span>
            </div>
          </div>
        </Link>
        <div className="pb-2 mx-5 flex justify-between">
          <div className="flex items-center space-x-5">
            <LikeButton user={user} post={{ id, likes, likeCount }} />
            <Link to={`/posts/${id}`}>
              <CommentButton commentCount={commentCount} />
            </Link>
          </div>

          {user && user.username === username && <DeleteButton postId={id} />}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
