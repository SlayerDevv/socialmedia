import jwt from "jsonwebtoken";

export async function VerifyToken(token) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_END_POINT}:5000/api/v1/token/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    return data.valid
  } else {
    return data.valid
  }
}
