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
                text: `Generate ${numIdeas} detailed hackathon project ideas using this template:
                ## **Project Title**
                **Rank:** ${complexity}
                **Impact:** ${impact}
                ### Core Concept
                [2-3 sentence description]
                
                ### Ninja Features
                - Feature 1
                - Feature 2
                
                ### Tech Stack
                ${techStack.join(", ")}
                
                ### Mission Challenges
                - Challenge 1
                - Challenge 2
                
                Base this on:
                - Theme: ${theme}
                - Main Description: ${description}
                
                Use proper markdown formatting with ## headers. Separate different ideas with '~~~'`
              },
            ],
          },
        ],
      }
    );

    const ideaText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No idea generated.";
    const ideasArray = ideaText.split(/~~~+/g).filter(Boolean);

    res.json({ ideas: ideasArray });
  } catch (error) {
    console.error("Error generating idea:", error?.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate idea. Please try again." });
  }
});

app.get('/', (req, res) => {
    res.send('Konoha Idea Generator Server');
});

const PORT = process.env.PORT || 7173;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));