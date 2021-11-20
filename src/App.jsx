import createPagination from "./utils/createPagination";
import React, { useState, useEffect } from "react";
import "./style.scss";
import PostItem from "./components/postItem";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([])
  const articlesPerPage = 8

  const { pagination } = createPagination({
    numberOfArticles: 100,
    articlesPerPage,
    numberOfButtons: 8,
    currentPage
  });

  const handleClick = page => setCurrentPage(page);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${articlesPerPage}&_page=${currentPage}`)
      .then(data => data.json())
      .then(data => setPosts(data))
  }, [currentPage])
  return (
    <div className="content">
      <div className="content">
        <ul className="posts">
          {
            posts.length && posts.map(item => <PostItem key={item.id} post={item} />)
          }
        </ul>
      </div>
      <div className="pagination">

        <ul>
          <li
            className={`${pagination[0] === currentPage && "disabled"}`}
            onClick={handleClick.bind(null, currentPage - 1)}
          >
            Prev
          </li>
          {pagination.map((page, i) => (
            <li
              key={i}
              className={`${currentPage === page && "active"}`}
              onClick={handleClick.bind(null, page)}
            >
              {page}
            </li>
          ))}
          <li
            className={`${pagination.reverse()[0] === currentPage && "disabled"}`}
            onClick={handleClick.bind(null, currentPage + 1)}
          >
            Next
          </li>
        </ul>
      </div>
    </div>

  );
}
