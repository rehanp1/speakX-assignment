import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";

const Pagination = ({ page, setPage, total, limit }) => {
  const [counter, setCounter] = useState(1);
  const [nPages, SetNPages] = useState(Math.ceil(total / limit));

  const [blocks, setBlocks] = useState([]);

  const handleCounter = (val) => {
    setCounter((prev) => prev + val);
  };

  useEffect(() => {
    let start = (counter - 1) * limit;
    let end = counter * limit;
    let arr = [];
    for (let i = start; i < end; i++) {
      arr.push(i + 1);
    }
    setBlocks(arr);
  }, [counter, limit]);

  return (
    <div className="pagination">
      <button
        style={{ marginRight: "1rem" }}
        disabled={counter === 1}
        onClick={() => handleCounter(-1)}
      >
        <ChevronLeft />
      </button>
      {blocks.map((num, idx) => {
        return (
          num < Math.ceil(total / limit) && (
            <span
              onClick={() => setPage(num)}
              key={idx}
              style={{ background: num === page && "cyan" }}
            >
              {num}
            </span>
          )
        );
      })}
      <p className="extension"></p>
      <span
        style={{ background: nPages === page && "cyan" }}
        onClick={() => setPage(nPages)}
      >
        {nPages}
      </span>
      <button
        style={{ marginLeft: "1rem" }}
        disabled={counter === Math.ceil(nPages / limit)}
        onClick={() => handleCounter(1)}
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
