import React from "react";

const CommentButton = ({ commentCount }) => {
  return (
    <button className="group relative  bg-transparent border border-gray-300 px-5 py-1 rounded-lg flex space-x-2 items-center">
      <div className="absolute top-[-120%] left-[49%] opacity-0 group-hover:opacity-100 z-50 bg-black text-white px-4 py-1 rounded-md">
        Comment
      </div>

      <div className="absolute opacity-0 group-hover:opacity-100 top-[-25%] left-[49%] w-4 overflow-hidden inline-block">
        <div className="  h-2 w-11 bg-black -rotate-45 transform origin-top-left"></div>
      </div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </div>
      <div>{commentCount}</div>
    </button>
  );
};
 
export default CommentButton;
