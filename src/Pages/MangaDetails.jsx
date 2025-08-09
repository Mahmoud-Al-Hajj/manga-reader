import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/MangaDetails.css";

export default function MangaDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [manga, setManga] = useState(null);
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.mangadex.org/manga/${id}?includes[]=cover_art&includes[]=author&includes[]=artist&includes[]=tag`
      )
      .then((res) => setManga(res.data.data))
      .catch(console.error);

    axios
      .get(
        `https://api.mangadex.org/manga/${id}/feed?limit=40&translatedLanguage[]=en,ar&includeEmptyPages=0&order[chapter]=asc`
      )
      .then((res) => setChapters(res.data.data))
      .catch(console.error);
  }, [id]);

  if (!manga) return <div className="details-loading">Loading...</div>;

  const attr = manga.attributes;
  const coverRel = manga.relationships?.find((r) => r.type === "cover_art");
  const coverUrl = coverRel
    ? `https://uploads.mangadex.org/covers/${manga.id}/${coverRel.attributes.fileName}.512.jpg`
    : "https://mangadex.org/img/cover-placeholder.png";
  const title = attr.title.en || Object.values(attr.title)[0];
  const description = attr.description?.en || "No description available.";
  const genres = attr.tags?.map(
    (tag) => tag.attributes.name.en || Object.values(tag.attributes.name)[0]
  );
  const status = attr.status;
  const year = attr.year || "?";
  const chaptersCount = attr.chapterCount || "?";
  const volumes = attr.volumeCount || "?";

  // Handle chapter click
  const handleChapterClick = (chapterId) => {
    navigate(`/read/${chapterId}`);
  };

  return (
    <div className="details-container">
      <div className="details-card">
        <img src={coverUrl} alt={title} className="details-cover" />
        <div className="details-info">
          <h2 className="details-title">{title}</h2>
          <div className="details-meta">
            <span>Status: {status}</span>
            <span>Year: {year}</span>
            <span>Chapters: {chaptersCount}</span>
            <span>Volumes: {volumes}</span>
          </div>
          <div className="details-genres">
            {genres?.map((g, i) => (
              <span key={i} className="details-genre">
                {g}
              </span>
            ))}
          </div>
          <p className="details-synopsis">{description}</p>
          <div className="details-chapters">
            <h3>Chapters</h3>
            <ul className="chapter-list">
              {chapters.filter((ch) => ch.attributes.chapter).length === 0 && (
                <li>No chapters available.</li>
              )}
              {chapters
                .filter((ch) => ch.attributes.chapter)
                .map((ch) => (
                  <li key={ch.id}>
                    <button
                      className="chapter-link"
                      onClick={() => handleChapterClick(ch.id)}
                    >
                      Chapter {ch.attributes.chapter}
                      {ch.attributes.title ? ` - ${ch.attributes.title}` : ""}
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
