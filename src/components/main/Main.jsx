import './main.css'
import AddItem from '../addItem/AddItem'
import ListItem from '../listitem/ListItem'
import { useEffect, useState } from 'react'

const Main = ({ theme, items, setItems, originalList, setOriginalList, toggleState, setToggleState }) => {
  const [isBreakPoint, setIsBreakPoint] = useState(false);
  const [itemAdded, setItemAdded] = useState({
    state: false,
    value: '',
    id: null
  });

  // * Filter out the number of active list items
  const itemsLeft = originalList.filter(item => item.checked !== true);

  useEffect(() => {
    // * Set breakpoint initially when window is not resized
    setIsBreakPoint(window.matchMedia("(min-width: 586px)").matches);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 586) {
        setIsBreakPoint(true);
      } else {
        setIsBreakPoint(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const clearCompleted = () => {
    setItems(originalList.filter(item => item.checked !== true))
  }

  return (
    <main id='main'>
      <AddItem theme={theme}
        items={originalList}
        setItems={setItems}
        setOriginalList={setOriginalList}
        setItemAdded={setItemAdded}
        toggleState={toggleState}
        setToggleState={setToggleState} />
      {itemAdded.state && <p className={`duplicate ${theme ? 'dark' : 'light'}`}>Item '<strong className='input-value'>{`${itemAdded.value}`}</strong>' is already added</p>}
      {originalList.length ?
        <section className={`todo-container ${theme ? 'dark' : 'light'}`}>
          {items.length ?
            items.map(item =>
              <ListItem theme={theme}
                key={item.id}
                id={item.id}
                content={item.content}
                isChecked={item.checked}
                items={originalList}
                itemAdded={itemAdded}
                setItems={setItems}
                setItemAdded={setItemAdded} />)
            : toggleState.completed ?
              <p className={`message ${theme ? 'dark' : 'light'}`}>There are no completed list-items.</p>
              : toggleState.active ?
                <p className={`message ${theme ? 'dark' : 'light'}`}>There are no active list-items.</p> : null}
          {!isBreakPoint &&
            <section className={`bottom flex ${theme ? 'dark' : 'light'}`}>
              <section className="left items-left">{`${itemsLeft.length} item${itemsLeft.length === 1 ? '' : 's'} left`}</section>
              <button className='clear-completed' onClick={clearCompleted}>Clear Completed</button>
            </section>
          }
          <section className={`actions flex ${theme ? 'dark' : 'light'}`}>
            <section className={isBreakPoint ? 'items-left' : 'hidden none'}>
              {`${itemsLeft.length} item${itemsLeft.length === 1 ? '' : 's'} left`}
            </section>
            <section className={`list-toggle flex ${theme ? 'dark' : 'light'}`}>
              <button className={`all ${toggleState.all ? 'selected' : ''}`}
                onClick={() => {
                  setToggleState({
                    all: true,
                    active: false,
                    completed: false
                  });
                  setItemAdded({
                    state: false,
                    value: '',
                    id: null
                  });
                }}>All</button>
              <button className={`active ${toggleState.active ? 'selected' : ''}`}
                onClick={() => {
                  setToggleState({
                    all: false,
                    active: true,
                    completed: false
                  });
                  setItemAdded({
                    state: false,
                    value: '',
                    id: null
                  });
                }}>Active</button>
              <button className={`completed ${toggleState.completed ? 'selected' : ''}`}
                onClick={() => {
                  setToggleState({
                    all: false,
                    active: false,
                    completed: true
                  });
                  setItemAdded({
                    state: false,
                    value: '',
                    id: null
                  });
                }}>Completed</button>
            </section>
            <button className={isBreakPoint ? 'clear-completed' : 'hidden none'} onClick={clearCompleted}>Clear Completed</button>
          </section>
          <footer className={`footer text-center ${theme ? 'dark' : 'light'}`}>Drag and drop to reorder list</footer>
        </section>
        :
        <section className={`empty-todo text-center ${theme ? 'dark' : 'light'}`}>Your list is empty.</section>
      }
    </main>
  )
}

export default Main