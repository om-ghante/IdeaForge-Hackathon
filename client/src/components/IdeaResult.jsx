import React from "react";
import ReactMarkdown from "react-markdown";

const IdeaResult = ({ ideas = [] }) => {
  return (
    <div
      className="mt-6 bg-orange-50 p-6 rounded-2xl shadow-xl border-4 border-orange-300 relative 
      transform transition-all duration-300 hover:-translate-y-1 hover:shadow-orange-300/30"
    >
      {/* Animated Ninja Star Badge */}
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 animate-float">
        <div
          className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md
          border-2 border-red-800 flex items-center"
        >
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L4 12l8 10 8-10-8-10zm0 15a3 3 0 110-6 3 3 0 010 6z" />
          </svg>
          KONOHA IDEAS
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-center text-orange-900">
        <span className="text-red-600 animate-pulse-slow">✶</span>
        Summoned Ninja Concepts
        <span className="text-red-600 animate-pulse-slow">✶</span>
      </h2>

      {ideas.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {ideas.map((idea, index) => (
            <div
              key={index}
              className="animate-fade-in-up p-5 bg-white rounded-xl shadow-md hover:shadow-lg 
                border-l-4 border-red-600 transition-all duration-300 hover:border-orange-500"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="mb-3">
                <div className="flex items-center mb-2">
                  <span className="text-red-600 font-bold mr-2">
                    #{index + 1}
                  </span>
                  <span className="text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                    {idea.match(/Rank Mission/)
                      ? idea.split("\n")[0].replace("#", "").trim()
                      : "D-Rank Mission"}
                  </span>
                </div>
                <ReactMarkdown className="prose prose-sm text-orange-900">
                  {
                    idea
                      .replace(/\*\*(.*?)\*\*/g, "**$1**")
                      .replace(/#{2,} /g, "### ") // Normalize headings
                  }
                </ReactMarkdown>
              </div>

              <div className="mt-4">
                <div className="border-t border-orange-200 pt-2 flex justify-center space-x-3">
                  <span className="text-red-600 text-sm">✦</span>
                  <span className="text-orange-500 text-sm">✧</span>
                  <span className="text-red-600 text-sm">✦</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 animate-pulse">
          <p className="text-orange-600 italic">
            <span className="animate-bounce-slow inline-block">🌀</span>
            Awaiting ninja wisdom...
            <span className="animate-bounce-slow inline-block delay-100">
              🌀
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default IdeaResult;
