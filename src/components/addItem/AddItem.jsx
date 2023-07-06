import { useRef, useState } from 'react';
import './additem.css'
const AddItem = ({ theme, items, setItems, setItemAdded, setToggleState }) => {
    const [inputValue, setInpuValue] = useState('');
    const inputField = useRef(null);

    const handleNewItem = (e) => {
        e.preventDefault();
        if (inputValue.trim().length === 0) {
            return inputField.current.focus();
        }
        const content = inputValue.trim();
        // * Slice to make the fisrt letter of input uppercase
        const slicedContent = content.slice(0, 1).toUpperCase() + content.slice(1);
        // * Sort the array so that new id will always be equal to array[array.length -1].id +1, i.e no duplications due to draggable feature
        const sortedArray = items.sort((a, b) => a.id - b.id);
        const itemObject = {
            id: sortedArray.length ? sortedArray[sortedArray.length - 1].id + 1 : 1,
            checked: false,
            content: slicedContent
        }
        // * Don't allow duplicate items in the list
        if (items.length !== 0) {
            const duplicateItem = items.filter(item => item.content === itemObject.content);
            if (duplicateItem.length === 1) {
                setToggleState({
                    all: true,
                    active: false,
                    completed: false
                });
                setItemAdded({
                    state: true,
                    value: slicedContent,
                    id: duplicateItem[0].id
                });
                return
            }
        }
        // * Change the toggle state to All when adding a new item to the list 
        setToggleState({
            all: true,
            active: false,
            completed: false
        });
        setItems(prevItems => [...prevItems, itemObject]);
        setInpuValue('');

    }
    return (
        <section className={`add-item-container w-100 ${theme ? 'dark' : 'light'}`}>
            <form action="" method="post" className="flex add-item-form" onSubmit={handleNewItem}>
                <button type="submit" className='post' title='Click to add a new item'>
                    <i className='hidden'>''Button to submit'</i>
                </button>
                <input autoFocus type="text"
                    name="new-item"
                    id="new-item"
                    className='new-item w-100'
                    maxLength='50'
                    placeholder="Create a new todo..."
                    autoComplete='off'
                    value={inputValue}
                    ref={inputField}
                    onChange={(e) => {
                        setInpuValue(e.target.value); setItemAdded({
                            state: false,
                            value: '',
                            id: null
                        })
                    }}
                />
            </form>
        </section>
    )
}

export default AddItem