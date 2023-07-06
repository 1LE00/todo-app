import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/header/Header';
import Main from './components/main/Main';

function App() {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('items')) || []);
  const [originalList, setOriginalList] = useState([]);
  const [theme, setTheme] = useState(true);
  const [toggleState, setToggleState] = useState({
    all: true,
    active: false,
    completed: false
  })

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
    setOriginalList(items);
  }, [items])

  return (
    <div className={`App ${theme ? 'dark' : 'light'}`}>
      <Header theme={theme} setTheme={setTheme} />
      <Main theme={theme}
        setItems={setItems}
        originalList={originalList}
        setOriginalList={setOriginalList}
        toggleState={toggleState}
        setToggleState={setToggleState}
        items={
          toggleState.completed ? items.filter(item => item.checked === true) :
            toggleState.active ? items.filter(item => item.checked !== true) : items} />
    </div>
  );
}

export default App;
