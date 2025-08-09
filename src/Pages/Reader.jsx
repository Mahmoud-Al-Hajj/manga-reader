import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/Reader.css";

export default function Reader() {
  const { chapterId } = useParams();
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPages() {
      try {
        // Get chapter info (for hash and server)
        const res = await axios.get(
          `https://api.mangadex.org/at-home/server/${chapterId}`
        );
        const { baseUrl, chapter } = res.data;
        const pageUrls = chapter.data.map(
          (filename) => `${baseUrl}/data/${chapter.hash}/${filename}`
        );
        setPages(pageUrls);
      } catch (err) {
        setError("Failed to load chapter pages.");
      } finally {
        setLoading(false);
      }
    }
    fetchPages();
  }, [chapterId]);

  if (loading) return <div className="reader-loading">Loading pages...</div>;
  if (error) return <div className="reader-error">{error}</div>;

  return (
    <div className="reader-container">
      {pages.map((url, i) => (
        <img key={i} src={url} alt={`Page ${i + 1}`} className="reader-page" />
      ))}
    </div>
  );
}
