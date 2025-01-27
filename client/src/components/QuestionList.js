import React from "react";

const QuestionList = ({ data = [], page, limit }) => {
  return (
    <div className="questions-container">
      {data.map(({ title, type }, idx) => (
        <div className="question-list" key={idx}>
          <h4>
            {idx + 1 + (page - 1) * limit} Question: {title}
          </h4>
          <p>Type: {type}</p>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;
