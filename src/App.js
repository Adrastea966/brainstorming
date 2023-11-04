import React, { useState, useEffect } from 'react';
import './App.css';
import { AiOutlineCloseCircle } from "react-icons/ai";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [ideas, setIdeas] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [warningMessage, setWarningMessage] = useState('');
  const [showWarning, setShowWarning] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setShowWarning(false);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (inputValue.trim().length === 0) {
        setWarningMessage('No se permiten ideas vacías.');
        setShowWarning(true);
        setTimeout(() => {
          setShowWarning(false);
        }, 2000);
      } else {
        setShowWarning(false);
        addIdea();
      }
    }
  };

  const addIdea = () => {
    if (inputValue.trim().length > 0 && inputValue.trim().length <= 34) {
      const truncatedText = inputValue.trim();
      setIdeas([...ideas, { text: truncatedText, id: Date.now(), selected: false }]);
      setInputValue('');
    } else if (inputValue.trim().length > 34) {
      setWarningMessage('El texto no puede superar los 34 caracteres.');
      setShowWarning(true);
      setTimeout(() => {
        setShowWarning(false);
      }, 2000);
    } else {
      setWarningMessage('No se permiten ideas vacías.');
      setShowWarning(true);
      setTimeout(() => {
        setShowWarning(false);
      }, 2000);
    }
  };

  const deleteIdea = (id) => {
    setIdeas(ideas.filter((idea) => idea.id !== id));
  };

  const toggleIdeaSelection = (id) => {
    setIdeas((prevIdeas) =>
      prevIdeas.map((idea) =>
        idea.id === id ? { ...idea, selected: !idea.selected } : idea
      )
    );
  };

  const selectIdeas = () => {
    setIdeas(ideas.filter((idea) => idea.selected));
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      document.body.classList.add('fadeOut');
    }, 6000);
  }, []);

  return (
    <div className={`App ${isLoading ? 'loading' : ''}`}>
      {isLoading && <div className="loading-screen">  <video autoPlay loop muted className="background-video">
        <source src="../video.mp4" type="video/mp4" />
      </video> </div>}
      <div className="idea-container">
        <div className='ideas-input'>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder="Escribe tu idea..."
            className='input-twister'
          />
          <button className='btn-agregar-idea' onClick={addIdea}>Agregar Idea</button>
        </div>
        <div className='ideas-items-contenedor'>
          {ideas.map((idea) => (
            <div
              key={idea.id}
              className={`idea ${idea.selected ? 'selected' : ''}`}
              style={{
                transform: `rotate(${Math.random() * 20 - 10}deg)`,
                minHeight: '50px',
                maxWidth: '280px',
                height: idea.text.length > 50 ? 'auto' : '40px',
              }}
              onClick={() => toggleIdeaSelection(idea.id)}
            >
              <p>{idea.text}</p>
              <AiOutlineCloseCircle className="idea-delete" onClick={() => deleteIdea(idea.id)} />
            </div>
          ))}
        </div>
        {showWarning && <div className="warning-popup">{warningMessage}</div>}
        <div className='botones-contenedor'>
          <button className='btn-seleccionar' onClick={selectIdeas}>
            <img src="../../image/mano.png" alt="Mano ilustracion" className="btn-seleccionar" />
            Seleccionar
          </button>
          <button className='btn-borrar-todo' onClick={() => setIdeas([])}>
            <img src="../../image/goma.png" alt="Goma ilustracion" className="btn-borrar-todo" />
            Borrar todo
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;