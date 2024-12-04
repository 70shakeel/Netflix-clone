"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const MyListPage = () => {
  const { data: session } = useSession();
  const [myList, setMyList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      const fetchMyList = async () => {
        try {
          const response = await fetch("/api/mylist", {
            headers: {
              Authorization: `Bearer ${session.user.token}`,
            },
          });
          const data = await response.json();
          setMyList(data);
        } catch (error) {
          console.error("Error fetching My List:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchMyList();
    } else {
      setLoading(false);
    }
  }, [session]);

  const handleRemove = async (id) => {
    try {
      const response = await fetch(`/api/mylist/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session.user.token}`,
        },
      });

      if (response.ok) {
        setMyList(myList.filter((item) => item.id !== id));
      } else {
        console.error("Error removing item");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  if (!session) return <p>Please log in to view your list.</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My List</h1>
      {myList.length === 0 ? (
        <p>No items in your list.</p>
      ) : (
        <ul>
          {myList.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center p-2 border-b"
            >
              <span>{item.title}</span>
              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-600 hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyListPage;
