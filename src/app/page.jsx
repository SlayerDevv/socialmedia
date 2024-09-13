"use client";
import Image from "next/image";
import jwt from "jsonwebtoken";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { useUser } from "../hooks/useUser";
import { usePost } from "@/hooks/usePost";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import CreatePost from "@/components/post/CreatePost";
import Post from "@/components/post/Post";
export default function Home() {
  const [user, setUser] = useState(null);
  const [Posts, setPosts] = useState([]);
  const { state } = useContext(AuthContext);
  const router = useRouter();
  const { getUser, error, loading } = useUser();
  const { GetPosts } = usePost();

  const [token, setToken] = useState("");
  const [Loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const token = document.cookie.split("token=").pop().split(";").shift();
      setToken(token);
    }
  }, []);

  const fetchData = async () => {
    if (token) {
      setLoaded(false);
      var data = await getUser(token);
      var posts = await GetPosts(token);
      setUser(data.data);
      setPosts(posts);
      setLoaded(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  return (
    Loaded && (
      <main className="items-center space-y-[20px] flex flex-col justify-center">
        <Navbar
          avatar={user.avatar}
          firstName={user.firstName}
          lastName={user.lastName}
          username={user.username}
          showMenu={true}
        />
        <div className="flex justify-center">
          <CreatePost avatar={user.avatar} />
        </div>
        <div className="space-y-[20px] ">
          {Posts.length > 0 ? (
            Posts.map(post => (
             <Post key={post.id} PostContent={post.content} CreatedAt={post.createdAt} author_username={post.author.username} PostAttachements={post.attachements} author_picture={post.author.avatar}/>
            ))
          ): (
            <p>No posts available</p>
          )}
        </div>
      </main>
    )
  )
}