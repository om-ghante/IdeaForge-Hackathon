import { useState } from "react";
import IdeaForm from "./components/IdeaForm";
import IdeaResult from "./components/IdeaResult";

function App() {
  const [ideas, setIdeas] = useState([]);

  return (
    <div className="flex flex-col items-center p-6">
      <IdeaForm setIdeas={setIdeas} />
      <IdeaResult ideas={ideas} />
    </div>
  );
}

export default App;
