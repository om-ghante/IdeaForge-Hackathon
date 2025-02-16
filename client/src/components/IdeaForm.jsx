import { useState } from "react";
import axios from "axios";

const IdeaForm = ({ setIdeas }) => {
  const [description, setDescription] = useState("");
  const [theme, setTheme] = useState("");
  const [complexity, setComplexity] = useState("D-rank (Easy)");
  const [impact, setImpact] = useState("Genin (Low)");
  const [techStack, setTechStack] = useState([]);
  const [numIdeas, setNumIdeas] = useState(1);
  const [loading, setLoading] = useState(false);

  const availableTechStacks = ["React", "Node.js", "MongoDB", "Python", "Django", "Flutter", "TensorFlow", "Firebase"];

  const handleTechStackChange = (tech) => {
    setTechStack((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const generateIdeas = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/generate-idea`, {
        description,
        theme,
        complexity: complexity.split(" ")[0],
        impact: impact.split(" ")[0],
        techStack,
        numIdeas: Math.max(1, numIdeas),
      });

      setIdeas(response.data.ideas || []);
    } catch (error) {
      console.error("Summoning jutsu failed:", error);
      setIdeas(["Failed to generate ideas. Try again with more chakra!"]);
    }
    setLoading(false);
  };

  return (
    <div className="bg-orange-50 shadow-2xl rounded-2xl p-6 w-full border-4 border-orange-300 relative 
      transform transition-all duration-300 hover:shadow-orange-300/30 hover:-translate-y-1">
      
      {/* Animated Konoha leaf */}
      <div className="absolute top-2 right-2 animate-spin-slow">
        <svg className="w-12 h-12 text-red-600" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L4 12l8 10 8-10-8-10zm0 15a3 3 0 110-6 3 3 0 010 6z"/>
        </svg>
      </div>

      {/* Floating header */}
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-md
          border-2 border-red-800 hover:scale-105 transition-transform">
          KONOHA TECH
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-6 text-center text-orange-900 transform transition-all 
        hover:text-red-700 hover:scale-[1.01]">
        <span className="text-red-600 animate-pulse-slow">★</span> 
        Ninja Idea Generator Jutsu 
        <span className="text-red-600 animate-pulse-slow">★</span>
      </h2>

      <div className="space-y-4">
        {/* Mission Scroll */}
        <div className="animate-fade-in-up">
          <label className="block font-medium text-orange-800 mb-1 
            bg-gradient-to-r from-orange-100 to-transparent p-2 rounded-lg">
            Mission Scroll (Description)
          </label>
          <textarea
            placeholder="Describe your ninja mission..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border-2 border-orange-300 rounded-lg bg-orange-50 
              focus:ring-4 focus:ring-orange-400 focus:border-orange-500 placeholder-orange-300
              transition-all duration-300 hover:shadow-sm hover:shadow-orange-200"
            rows="3"
          />
        </div>

        {/* Village Theme */}
        <div className="animate-fade-in-up delay-100">
          <label className="block font-medium text-orange-800 mb-1 
            bg-gradient-to-r from-orange-100 to-transparent p-2 rounded-lg">
            Village Theme
          </label>
          <input
            type="text"
            placeholder="e.g. Chakra-powered Healthcare"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full p-3 border-2 border-orange-300 rounded-lg bg-orange-50 
              focus:ring-4 focus:ring-orange-400 focus:border-orange-500 placeholder-orange-300
              transition-all duration-300 hover:shadow-sm hover:shadow-orange-200"
          />
        </div>

        {/* Mission Rank & Impact Level */}
        <div className="grid grid-cols-2 gap-4 animate-fade-in-up delay-200">
          {/* Mission Rank Dropdown */}
          <div>
            <label className="block font-medium text-orange-800 mb-1">Mission Rank</label>
            <div className="relative group">
              <select 
                value={complexity} 
                onChange={(e) => setComplexity(e.target.value)} 
                className="w-full p-3 border-2 border-orange-300 rounded-lg bg-orange-50 
                  focus:ring-4 focus:ring-orange-400 pr-8 appearance-none
                  transition-all duration-300 group-hover:shadow-sm group-hover:shadow-orange-200"
              >
                <option>D-rank (Easy)</option>
                <option>C-rank (Medium)</option>
                <option>S-rank (Hard)</option>
              </select>
              <div className="absolute inset-y-0 right-2 flex items-center px-2 pointer-events-none">
                <svg className="w-6 h-6 text-orange-600 animate-bounce-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Impact Level Dropdown */}
          <div>
            <label className="block font-medium text-orange-800 mb-1">Impact Level</label>
            <div className="relative group">
              <select 
                value={impact} 
                onChange={(e) => setImpact(e.target.value)} 
                className="w-full p-3 border-2 border-orange-300 rounded-lg bg-orange-50 
                  focus:ring-4 focus:ring-orange-400 pr-8 appearance-none
                  transition-all duration-300 group-hover:shadow-sm group-hover:shadow-orange-200"
              >
                <option>Genin (Low)</option>
                <option>Chūnin (Medium)</option>
                <option>Jōnin (High)</option>
              </select>
              <div className="absolute inset-y-0 right-2 flex items-center px-2 pointer-events-none">
                <svg className="w-6 h-6 text-orange-600 animate-bounce-slow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Ninja Tools */}
        <div className="animate-fade-in-up delay-300">
          <label className="block font-medium text-orange-800 mb-1">Ninja Tools (Tech Stack)</label>
          <div className="flex flex-wrap gap-2">
            {availableTechStacks.map((tech) => (
              <button
                key={tech}
                type="button"
                onClick={() => handleTechStackChange(tech)}
                className={`px-4 py-2 rounded-full border-2 font-semibold transition-all 
                  duration-300 transform hover:scale-105 ${
                    techStack.includes(tech)
                      ? 'bg-red-600 text-white border-red-800 shadow-lg animate-bounce'
                      : 'bg-orange-100 text-orange-800 border-orange-300 hover:bg-orange-200 hover:shadow-md'
                  }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* Shadow Clones Input */}
        <div className="animate-fade-in-up delay-400">
          <label className="block font-medium text-orange-800 mb-1">Shadow Clones (Ideas)</label>
          <div className="relative group">
            <input
              type="number"
              min="1"
              max="10"
              value={numIdeas}
              onChange={(e) => setNumIdeas(parseInt(e.target.value) || 1)}
              className="w-full p-3 border-2 border-orange-300 rounded-lg bg-orange-50 
                focus:ring-4 focus:ring-orange-400 placeholder-orange-300
                transition-all duration-300 hover:shadow-sm hover:shadow-orange-200"
            />
            <div className="absolute right-3 top-3">
              <span className="text-orange-500 animate-pulse">✶</span>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={generateIdeas}
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 
            text-white font-bold rounded-lg transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-orange-300/50
            border-2 border-orange-600 flex items-center justify-center transform hover:scale-[1.02]
            active:scale-95 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-red-500/20 
            animate-shine opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {loading ? (
            <>
              <svg className="animate-spin-slow h-6 w-6 mr-2" viewBox="0 0 24 24">
                <path className="fill-red-800" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12 19C8.13401 19 5 15.866 5 12C5 8.13401 8.13401 5 12 5C15.866 5 19 8.13401 19 12C19 15.866 15.866 19 12 19Z"/>
                <path className="fill-orange-500" d="M12 5C15.866 5 19 8.13401 19 12C19 13.933 18.2165 15.683 17 16.929L18.3922 18.3922C19.9615 16.8621 21 14.5487 21 12C21 7.02944 16.9706 3 12 3V5Z"/>
              </svg>
              Summoning Ideas...
            </>
          ) : (
            <>
              <span className="mr-2 animate-ninja-sign opacity-0 group-hover:opacity-100 transition-opacity">🖐</span>
              Kuchiyose no Jutsu!
              <span className="ml-2 animate-ninja-sign opacity-0 group-hover:opacity-100 transition-opacity">🌀</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default IdeaForm;