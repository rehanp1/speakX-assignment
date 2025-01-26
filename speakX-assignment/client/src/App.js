import { useState } from "react";
import "./App.css";
import { Search } from "lucide-react";
import QuestionList from "./components/QuestionList";

function App() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(10);

  const fetchQuestions = async (e) => {
    e.preventDefault();

    try {
      if (!title || title.length <= 0) {
        alert("Please provide title");
        return;
      }

      setLoading(true);
      const response = await fetch(
        `http://127.0.0.1:5000/questions/?title=${title}`
      );
      const res = await response.json();
      setData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // const startIndex = (page - 1) * limit;
  // const endIndex = page * limit;

  return (
    <main>
      <h3 className="heading">SpeakX Assignment</h3>
      <form onSubmit={fetchQuestions}>
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

      <div>{loading ? <h4>Loading...</h4> : <QuestionList data={data} />}</div>

      <div></div>
    </main>
  );
}

export default App;
