import React from "react";
import ReactMarkdown from "react-markdown";

const IdeaResult = ({ ideas = [] }) => {  // Ensure `ideas` is always an array
  return (
    <div className="mt-6 bg-gray-100 p-4 rounded-xl shadow-md w-full">
      <h2 className="text-xl font-semibold mb-2">Generated Ideas:</h2>
      {ideas.length > 0 ? (
        ideas.map((idea, index) => (
          <div key={index} className="mb-4 p-3 border-l-4 border-blue-500 bg-white rounded">
            <ReactMarkdown>{idea}</ReactMarkdown>
          </div>
        ))
      ) : (
        <p className="text-gray-600">Your ideas will appear here...</p>
      )}
    </div>
  );
};

export default IdeaResult;
