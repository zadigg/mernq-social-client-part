import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import DeleteDialogue from "./DeleteDialogue";

import { FETCH_POSTS_QUERY } from "../util/graphql";

const DeleteButton = ({ postId, commentId, callback }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

  const [deletePostOrMutation] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false);

      if (!commentId) {
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY,
        });
        const newData = {
          ...data,
          getPosts: data.getPosts.filter((post) => post.id !== postId),
        };
        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data: newData,
        });
      }

      if (callback) callback();
    },
    variables: {
      postId,
      commentId,
    },
  });

  return (
    <>
      <button
        onClick={() => setConfirmOpen(true)}
        className="relative group bg-transparent border  border-gray-300 px-5 py-1 rounded-lg flex space-x-2 items-center"
      >
        <div
          className={`absolute ${
            commentId
              ? "top-[-150%] left-[-170%] w-[180px]"
              : "top-[-135%] left-[-130%]"
          }  opacity-0 group-hover:opacity-100 z-50 bg-black text-white px-4 py-1 rounded-md w-[150px]`}
        >
          {commentId ? "Delete Comment" : "Delete Post"}
        </div>

        <div className="absolute opacity-0 group-hover:opacity-100 top-[-35%] left-[49%] w-4 overflow-hidden inline-block">
          <div className="  h-2 w-11 bg-black -rotate-45 transform origin-top-left"></div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-red-500 "
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {/*  */}
      {/* This is where i write the delete confirm 4:40  */}

      {confirmOpen && (
        <div className="absolute  top-0 z-50">
          <DeleteDialogue
            deletePost={deletePostOrMutation}
            setConfirmOpen={setConfirmOpen}
            confirmOpen={confirmOpen}
          />
        </div>
      )}
    </>
  );
};

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export default DeleteButton;
