import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.post("/generate-idea", async (req, res) => {
  const { description, theme, complexity, impact, techStack, numIdeas = 1 } = req.body;

  if (!description || !theme || !complexity || !impact || !techStack) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Generate ${numIdeas} innovative hackathon project ideas based on:
                - Description: ${description}
                - Theme: ${theme}
                - Complexity: ${complexity}
                - Impact level: ${impact}
                - Preferred Tech Stack: ${techStack.join(", ")}
                
                Provide a detailed project description.`,
              },
            ],
          },
        ],
      }
    );

    const ideaText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No idea generated.";

    // Splitting ideas based on numbered format (1. Project Title, 2. Project Title, etc.)
    const ideasArray = ideaText
      .split(/\n\*\*\d+\.\sProject Title:/) // Detects "**1. Project Title:**"
      .map((idea, index) => index === 0 ? idea.trim() : `**Project Title:**${idea.trim()}`)
      .filter((idea) => idea.length > 0);
    
    console.log("Processed Ideas Array:", ideasArray);
    
    res.json({ ideas: ideasArray });
    
  
  } catch (error) {
    console.error("Error generating idea:", error?.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate idea. Please try again." });
  }
});

app.get('/', (req, res) => {
    res.send('Server Started');
});

const PORT = process.env.PORT || 7173;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
