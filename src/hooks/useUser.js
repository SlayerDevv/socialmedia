import axios from "axios";
import { useState } from "react";

export const useUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const getUser = async (token) => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_END_POINT}:5000/api/v1/user/get`,
      {
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    setLoading(false);
    return data;
  };

  const UpdateUser = async (userame) => {
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_END_POINT}:5000/api/v1/user/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
    } catch (err) {}
  };
  return { getUser, loading, error };
};
