import React from "react";

const AddCommment = ({
  setComment,
  comment,
  commentInputRef,
  submitComment,
}) => {
  return (
    <form className="w-full max-w-xl bg-white rounded-lg px-4 pt-2">
      <div className="w-full md:w-full px-3 mb-2 mt-2">
        <textarea
          className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
          name="body"
          placeholder="Type Your Comment"
          required
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          ref={commentInputRef}
        ></textarea>
      </div>
      <div className="-mr-1 flex justify-end items-end ">
        <button
          disabled={comment.trim() === ""}
          onClick={submitComment}
          className="bg-gray-500 text-white disabled:bg-gray-200 disabled:text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
          type="submit"
        >
          Post Comment
        </button>
      </div>
    </form>
  );
};

export default AddCommment;
