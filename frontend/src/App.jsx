import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [prompt, setPrompt] = useState('');
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);

  const generateStory = async () => {
    setLoading(true);
    setStory('');

    try {
      const response = await axios.post('http://localhost:5000/generate-story', { prompt });
      if (prompt.toLowerCase() === "what is your name" || prompt.toLowerCase()=="what's your name") {
        setStory("I am Geneartive AI. I am a Large Language Model Developed by Sriram and Arfan From Muthu Thevar Mukkulathore HR.Sec School Thirunagar, Madurai, India. Thank you.");
      } else {
        setStory(response.data.story);
      }
    } catch (error) {
      console.error('Error generating story:', error);

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="container">
      <h1>Generative AI</h1>
      <div>
        <textarea
          placeholder="Meassage AI."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows="4"
          cols="50"
        />
      </div>
      <button onClick={generateStory} disabled={loading}>
        {loading ? 'Generating...' : 'Send'}
      </button>
      {loading && <img src="https://cdn.dribbble.com/users/1907055/screenshots/10812238/media/60bf4d08e816fe6b561b02a462d5e31c.gif" alt="Loading..." />}
      {story && (
        <div>
          <h2>Generated Story:</h2>
          <p>{story}</p>
        </div>
      )}
    </div>

    <footer>
      <p>&copy; Developed By Sriram And Arfan</p>
    </footer>
    </>
  );
};

export default App;