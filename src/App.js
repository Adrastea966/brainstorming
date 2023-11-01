import React, { useState } from 'react';
import './App.css';
import { AiOutlineCloseCircle } from "react-icons/ai";

function App() {
  const [ideas, setIdeas] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [warningMessage, setWarningMessage] = useState('');
  const [showWarning, setShowWarning] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    // Verificar si el input está vacío y mostrar el popup de advertencia
    if (event.target.value.trim() === '') {
      setWarningMessage('No se permiten ideas vacías.');
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (inputValue.trim().length > 0) {
        if (inputValue.trim().length > 34) {
          setWarningMessage('El texto no puede tener más de 34 caracteres.');
          setShowWarning(true);
          setTimeout(() => {
            setShowWarning(false);
          }, 3000);
        } else {
          addIdea();
        }
      } else {
        setWarningMessage('No se permiten ideas vacías.');
        setShowWarning(true);
        setTimeout(() => {
          setShowWarning(false);
        }, 3000);
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
      }, 3000);
    } else {
      setWarningMessage('No se permiten ideas vacías.');
      setShowWarning(true);
      setTimeout(() => {
        setShowWarning(false);
      }, 3000);
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

  return (
    <div className="App">
      <div className="idea-container">
        <div className='ideas-input'>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder="Escribe tu idea..."
          />
          <button onClick={addIdea}>Agregar Idea</button>
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
          <button onClick={selectIdeas}>Seleccionar</button>
          <button onClick={() => setIdeas([])}>Borrar todo</button>
        </div>
      </div>
    </div>
  );
}

export default App;
