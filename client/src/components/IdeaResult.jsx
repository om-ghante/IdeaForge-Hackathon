import React from "react";
import ReactMarkdown from "react-markdown";

const IdeaResult = ({ ideas = [] }) => {
  return (
    <div className="mt-6 bg-orange-50 p-6 rounded-2xl shadow-xl border-4 border-orange-300 relative 
      transform transition-all duration-300 hover:-translate-y-1 hover:shadow-orange-300/30 w-full">
      
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-6 text-center text-orange-900">
        <span className="text-red-600 animate-pulse-slow">✶</span> 
        Generated Ideas 
        <span className="text-red-600 animate-pulse-slow">✶</span>
      </h2>

      {/* Render Ideas */}
      {ideas.length > 0 ? (
        <div className="space-y-6"> {/* Add spacing between markdown blocks */}
          {ideas.map((idea, index) => (
            <div key={index} className="p-5 bg-white rounded-xl shadow-md hover:shadow-lg 
              border-l-4 border-red-600 transition-all duration-300 hover:border-orange-500">
              <ReactMarkdown className="prose prose-sm text-orange-900">{idea}</ReactMarkdown>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 animate-pulse">
          <p className="text-orange-600 italic">
            <span className="animate-bounce-slow inline-block">🌀</span> 
            Your ideas will appear here... 
            <span className="animate-bounce-slow inline-block delay-100">🌀</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default IdeaResult;
