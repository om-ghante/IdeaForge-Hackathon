import { useState } from "react";
import axios from "axios";

const IdeaForm = ({ setIdeas }) => {
  const [description, setDescription] = useState("");
  const [theme, setTheme] = useState("");
  const [complexity, setComplexity] = useState("Easy");
  const [impact, setImpact] = useState("Low");
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
        complexity,
        impact,
        techStack,
        numIdeas: Math.max(1, numIdeas), // Ensure at least 1 idea is generated
      });

      setIdeas(response.data.ideas || []);
    } catch (error) {
      console.error("Error generating ideas:", error);
      setIdeas(["Failed to generate ideas. Try again."]);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-full">
      <h2 className="text-2xl font-bold mb-4">Generate Hackathon Ideas</h2>

      <label className="block font-medium">Project Description:</label>
      <textarea
        placeholder="Briefly describe your project idea..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded mb-3"
      />

      <label className="block font-medium">Theme:</label>
      <input
        type="text"
        placeholder="e.g. AI in Healthcare"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="w-full p-2 border rounded mb-3"
      />

      <label className="block font-medium">Complexity:</label>
      <select value={complexity} onChange={(e) => setComplexity(e.target.value)} className="w-full p-2 border rounded mb-3">
        <option>Easy</option>
        <option>Medium</option>
        <option>Hard</option>
      </select>

      <label className="block font-medium">Impact:</label>
      <select value={impact} onChange={(e) => setImpact(e.target.value)} className="w-full p-2 border rounded mb-3">
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <label className="block font-medium">Tech Stack (Select Multiple):</label>
      <div className="flex flex-wrap gap-2 mb-3">
        {availableTechStacks.map((tech) => (
          <button
            key={tech}
            onClick={() => handleTechStackChange(tech)}
            className={`px-3 py-1 rounded border ${
              techStack.includes(tech) ? "bg-blue-600 text-white border-blue-800" : "bg-gray-200"
            }`}
          >
            {tech}
          </button>
        ))}
      </div>

      <label className="block font-medium">Number of Ideas to Generate:</label>
      <input
        type="number"
        min="1"
        max="10"
        value={numIdeas}
        onChange={(e) => setNumIdeas(parseInt(e.target.value) || 1)}
        className="w-full p-2 border rounded mb-3"
      />

      <button
        onClick={generateIdeas}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Ideas"}
      </button>
    </div>
  );
};

export default IdeaForm;
