"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AvatarPlaceholderImage from "@/app/images/user.svg";
import styles from "../../styles/profile.module.scss";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Użycie zmiennej środowiskowej
});

export default function Profile() {
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [currentProfilePic, setCurrentProfilePic] = useState<string | null>(
    null
  ); // URL zdjęcia profilowego
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login"); // Przekierowanie na stronę logowania, jeśli użytkownik nie jest zalogowany
    } else {
      /* !! 
    null, undefined, 0, '' (pusty string), NaN, false → wynik to false
    jakakolwiek inna wartość (np. string, liczba różna od zera, obiekt, tablica) → wynik to true
    */
      setIsLoggedIn(!!token);
      fetchProfilePic(token); // Pobranie aktualnego zdjęcia profilowego
    }
  }, [router]);

  const fetchProfilePic = async (token: string) => {
    try {
      const response = await apiClient.get("/api/profile/profile-pic", {
        headers: {
          Authorization: `Bearer ${token}`, // Dodaj token JWT do nagłówka
        },
        responseType: "blob", // Pobierz dane jako blob
      });

      const imageUrl = URL.createObjectURL(response.data); // Konwersja blobu na URL
      setCurrentProfilePic(imageUrl);
    } catch (error) {
      console.error("Error when downloading profile picture:", error);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null; // Sprawdź, czy plik został wybrany
    setProfilePic(file);
    setErrorMessage(null); // Resetuj komunikaty o błędach przy wyborze pliku
  };

  const handleUpload = async (e: FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // Pobierz token z localStorage
    if (!token) {
      setErrorMessage("The user is not logged in.");
      return;
    }

    if (!profilePic) {
      setErrorMessage("Please select the file before uploading.");
      return;
    }
    const formData = new FormData();
    formData.append("profilePic", profilePic);

    try {
      await apiClient.post("/api/profile/profile-pic", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // Dodaj token JWT do nagłówka
        },
      });
      setSuccessMessage("The profile picture was uploaded successfully!");
      setProfilePic(null); // Resetuj plik po sukcesie
      fetchProfilePic(token); // Odśwież zdjęcie profilowe po przesłaniu
    } catch (error) {
      console.error("Error while uploading a photo:", error); // Loguj błąd
      setErrorMessage("An error occurred while uploading a photo");
    }
  };

  return (
    <>
      <div className={styles.profile}>
        <h2 className={styles.profile__heading}>Profile</h2>
        {errorMessage && (
          <span className={styles.profile__errorMessage}>{errorMessage}</span>
        )}
        {successMessage && (
          <span className={styles.profile__successMessage}>
            {successMessage}
          </span>
        )}
        {isLoggedIn ? (
          <>
            <div
              className={`${styles["profile__profileImageContainer"]} ${
                currentProfilePic && styles["--avatar-loaded"]
              }`}
            >
              {currentProfilePic ? (
                <Image
                  className={styles.profile__profileImage}
                  src={currentProfilePic}
                  alt="Profile picture"
                  width={150}
                  height={150}
                  style={{ width: "150px", height: "150px" }}
                />
              ) : (
                <AvatarPlaceholderImage
                  className={styles.profile__profilePlaceholderImage}
                />
              )}
            </div>

            <form className={styles.profile__form} onSubmit={handleUpload}>
              {/* accept="image/*" tylko z rozszerzeniami .jpg, .png, .gif */}
              <input
                className={styles.profile__fileUpload}
                type="file"
                onChange={handleFileChange}
                accept="image/*"
              />
              <button
                className={`btn ${styles["profile__button"]}`}
                type="submit"
              >
                Update profile picture
              </button>
            </form>
          </>
        ) : (
          <span>Login to upload your profile picture</span>
        )}
      </div>
    </>
  );
}
