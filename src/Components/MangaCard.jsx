import React from "react";
import "../styles/MangaCard.css";

function MangaCard({ title, cover, description, onClick }) {
  const maxTitleLength = 40;
  const displayTitle =
    title.length > maxTitleLength
      ? title.slice(0, maxTitleLength) + "..."
      : title;
  return (
    <div className="manga-card" onClick={onClick}>
      <img src={cover} alt={displayTitle} className="manga-card-cover" />
      <div className="manga-card-content">
        <h3 className="manga-card-title">{displayTitle}</h3>
      </div>
    </div>
  );
}

export default MangaCard;
