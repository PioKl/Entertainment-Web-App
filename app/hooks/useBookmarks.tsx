import { useState, useEffect } from "react";
import apiClient from "@/app/utils/apiClient";

interface Bookmark {
  id: string;
  type: string;
}

const useBookmarks = () => {
  const [bookmarkedItems, setBookmarkedItems] = useState<Bookmark[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Pobierz zakładki
  useEffect(() => {
    const fetchBookmarks = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await apiClient.get("/api/bookmarks/bookmarks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data && Array.isArray(response.data.bookmarked)) {
          setBookmarkedItems(response.data.bookmarked);
        } else {
          console.error("Invalid bookmarks data format:", response.data);
        }
      } catch (err) {
        console.error("Error fetching bookmarks:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  // Dodaj/Usuń zakładkę
  const toggleBookmark = async (movieId: string | number, type: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found.");
      return;
    }

    const bookmark: Bookmark = { id: movieId.toString(), type };

    try {
      const exists = bookmarkedItems.some(
        (item) => item.id === bookmark.id && item.type === bookmark.type
      );

      if (exists) {
        // Usuń zakładkę
        const response = await apiClient.delete("/api/bookmarks/bookmark", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          data: { movieId: bookmark.id, type: bookmark.type },
        });

        if (response.status === 200) {
          setBookmarkedItems((prev) =>
            prev.filter(
              (item) => item.id !== bookmark.id || item.type !== bookmark.type
            )
          );
        } else {
          console.error("Failed to remove bookmark:", response.data);
        }
      } else {
        // Dodaj zakładkę
        const response = await apiClient.post(
          "/api/bookmarks/bookmark",
          { movieId: bookmark.id, type: bookmark.type },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          setBookmarkedItems((prev) => [...prev, bookmark]);
        } else {
          console.error("Failed to add bookmark:", response.data);
        }
      }
    } catch (err: any) {
      console.error("Error updating bookmarks:", err.response?.data || err);
    }
  };

  return { bookmarkedItems, toggleBookmark, isLoading };
};

export default useBookmarks;
