import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import PostCard from "../components/PostCard";

import { AuthContext } from "../context/auth";
import PostForm from "../components/PostForm";
import { FETCH_POSTS_QUERY } from "../util/graphql";

function Home() {
  const { user } = useContext(AuthContext);
  const { loading, error, data: posts } = useQuery(FETCH_POSTS_QUERY);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error : {error}(</p>;

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-5 w-full flex justify-center mt-5 ">
        Recent Post
      </h1>

      <div className="grid grid-cols-1 ml-10 md:ml-0  md:grid-cols-2 lg:grid-cols-3 gap-4">
        {user && (
          <div>
            <PostForm />
          </div>
        )}

        {posts ? (
          posts.getPosts.map((post) => (
            <div key={post.id} className="transition ease-in-out delay-150 ">
              <PostCard post={post} />
            </div>
          ))
        ) : (
          <p>No posts found</p>
        )}
      </div>
    </div>
  );
}

export default Home;
