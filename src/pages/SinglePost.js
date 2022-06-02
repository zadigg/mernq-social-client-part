import React, { useContext, useRef, useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/auth";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";
import AddCommment from "../components/comments/AddCommment";
import ViewComment from "../components/comments/ViewComment";
import CommentButton from "../components/CommentButton";

const SinglePost = (props) => {
  const { postId } = useParams();
  const { user } = useContext(AuthContext);
  const commentInputRef = useRef(null);

  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const { data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update(proxy, result) {
      setComment("");
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment,
    },
  });

  const deletePostCallback = () => {
    navigate("/");
  };

  let postMarkup;
  if (!data) {
    postMarkup = <p>Loading...</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
    } = data.getPost;
    postMarkup = (
      <div className="w-[461px] md:w-[600px] lg:w-[813px] mx-auto">
        <div className=" border  mt-3 px-6 py-4 rounded overflow-hidden shadow-lg">
          <div className="font-bold text-xl">{username}</div>
          <div>{moment(createdAt).fromNow()}</div>
          <div className="mt-3">{body}</div>

          <div className="pb-2 mx-5 flex justify-between mt-10">
            <div className="flex items-center space-x-5">
              <LikeButton user={user} post={{ id, likes, likeCount }} />
              <CommentButton commentCount={commentCount} />
            </div>
            {/* Delete Post */}
            {user && user.username === username && (
              <DeleteButton postId={id} callback={deletePostCallback} />
            )}
          </div>
        </div>
        {/* Add Comment  */}
        {user && (
          <div className="flex  items-center justify-center mt-3  mx-8 mb-4 ">
            <AddCommment
              setComment={setComment}
              comment={comment}
              commentInputRef={commentInputRef}
              submitComment={submitComment}
            />
          </div>
        )}

        {/* view comment */}
        {comments.map((comment) => (
          <ViewComment key={comment.id} comment={comment} postId={id} />
        ))}
      </div>
    );
  }

  //   console.log(data);
  return postMarkup;
};

const SUBMIT_COMMENT_MUTATION = gql`
  mutation ($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

const FETCH_POST_QUERY = gql`
  query ($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
export default SinglePost;
