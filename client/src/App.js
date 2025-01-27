import { use, useEffect, useState } from "react";
import "./App.css";
import { Search } from "lucide-react";
import QuestionList from "./components/QuestionList";
import Pagination from "./components/Pagination";

function App() {
  const [data, setData] = useState([]);
  const [metaData, setMetaData] = useState({});
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [msg, setMsg] = useState("");

  const fetchQuestions = async () => {
    try {
      if (!title || title.length <= 0) {
        alert("Please provide title");
        return;
      }
      setMsg("");
      setLoading(true);
      const response = await fetch(
        `http://127.0.0.1:5000/questions?title=${title}&page=${page}&limit=${limit}`
      );
      const res = await response.json();
      const { data, next, previous, total } = res;
      if (data.length <= 0) setMsg("Not Found");
      setData(data);
      setMetaData({ data, next, previous, total });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      console.log(metaData);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchQuestions();
  };

  useEffect(() => {
    fetchQuestions();
  }, [page, limit]);

  return (
    <main>
      <h3 className="heading">SpeakX Assignment</h3>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            placeholder="Search here..."
          />
          <button type="submit" disabled={loading}>
            <Search strokeWidth={2} className="search-icon" />
          </button>
        </div>
      </form>

      <div style={{ marginTop: "1rem", height: "60vh", overflow: "auto" }}>
        {loading ? <h4>Loading...</h4> : <QuestionList data={data} />}
      </div>
      <p>{msg}</p>
      {data.length > 0 && (
        <Pagination
          page={page}
          setPage={setPage}
          limit={limit}
          total={metaData.total}
        />
      )}
    </main>
  );
}

export default App;
