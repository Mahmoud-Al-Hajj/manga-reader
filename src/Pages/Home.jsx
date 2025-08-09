import React, { useEffect, useState } from "react";
import MangaCard from "../Components/MangaCard";
import "../styles/Home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [mangaList, setMangaList] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const limit = 24;

  useEffect(() => {
    setIsLoading(true);
    const params = [
      `limit=${limit}`,
      `offset=${(page - 1) * limit}`,
      "order[followedCount]=desc",
      "includes[]=cover_art",
      "contentRating[]=safe",
      "contentRating[]=suggestive",
    ];
    if (search) params.push(`title=${encodeURIComponent(search)}`);
    axios
      .get(`https://api.mangadex.org/manga?${params.join("&")}`)
      .then((res) => {
        setMangaList(res.data.data);
        setTotal(res.data.total || 0);
      })
      .finally(() => setIsLoading(false));
  }, [page, search]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  const totalPages = total ? Math.ceil(total / limit) : 1;

  return (
    <div className="home-container">
      <h1 className="home-title">Popular Manga</h1>
      <form
        className="home-search-bar"
        onSubmit={handleSearchSubmit}
        autoComplete="off"
      >
        <input
          className="home-search-input"
          type="text"
          placeholder="Search manga..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className="home-search-btn" type="submit">
          Search
        </button>
      </form>
      <div className="manga-list">
        {isLoading ? (
          <div className="home-loading">Loading...</div>
        ) : (
          mangaList.map((manga) => {
            const attr = manga.attributes;
            const coverRel = manga.relationships?.find(
              (r) => r.type === "cover_art"
            );
            const coverUrl = coverRel
              ? `https://uploads.mangadex.org/covers/${manga.id}/${coverRel.attributes.fileName}.256.jpg`
              : "mafi covers";
            const title = attr.title.en || Object.values(attr.title)[0];
            return (
              <MangaCard
                key={manga.id}
                title={title}
                cover={coverUrl}
                onClick={() => navigate(`/manga/${manga.id}`)}
              />
            );
          })
        )}
      </div>
      <div className="home-pagination">
        <button
          className="home-page-btn"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1 || isLoading}
        >
          Previous
        </button>
        <span className="home-page-num">
          Page {page} / {totalPages}
        </span>
        <button
          className="home-page-btn"
          onClick={() => setPage((p) => p + 1)}
          disabled={isLoading || page >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
