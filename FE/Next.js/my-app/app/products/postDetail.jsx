//use client component when browser interaction is needed, such as state management, event handling, and effects.
'use client'
import React from "react";

export default function PostDetail({ data = [] }) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sortBy, setSortBy] = React.useState("title-asc");

  // use useMemo to memoize the filtered and sorted posts based on searchTerm and sortBy to avoid unnecessary re-renders
  const posts = React.useMemo(() => {
    const list = Array.isArray(data) ? [...data] : [];

    const filtered = list.filter((post) => {
      const title = String(post?.title ?? "");
      return title.toLowerCase().includes(searchTerm.trim().toLowerCase());
    });

    filtered.sort((a, b) => {
      const titleA = String(a?.title ?? "");
      const titleB = String(b?.title ?? "");

      if (sortBy === "title-desc") {
        return titleB.localeCompare(titleA);
      }

      return titleA.localeCompare(titleB);
    });

    return filtered;
  }, [data, searchTerm, sortBy]);

  return (
    <div>
      <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
        <input
          type="text"
          placeholder="Type title to filter"
          value={searchTerm}
          style={{ padding: "4px 8px", borderRadius: "4px", border: "1px solid #333" }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="title-asc">Title A-Z</option>
          <option value="title-desc">Title Z-A</option>
        </select>
      </div>

      <div>
        {posts.length === 0 ? (
          <p>No posts match the current filter.</p>
        ) : (
          posts.map((post, index) => (
            <div key={post.id ?? index}>{post.title ?? "No title"}</div>
          ))
        )}
      </div>
    </div>
  );
}