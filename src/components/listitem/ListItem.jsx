import './listitem.css';
import Cross from '../../assets/icons/icon-cross.svg';

const ListItem = ({ theme, id, isChecked, content, items, setItems, itemAdded, setItemAdded }) => {

    const handleDelete = () => {
        setItemAdded({
            state: false,
            value: '',
            id: null
        });
        setItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const handleChange = (e) => {
        const updatedItems = items.map(item => (item.id === id ? { ...item, checked: !item.checked } : item));
        setItems(updatedItems);
    };

    const handleDragStart = (event) => {
        event.dataTransfer.setData('text/plain', id.toString());
    };

    const handleDragEnter = (event) => {
        event.preventDefault();
        event.target.classList.add('drag-over');
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDragLeave = (event) => {
        event.target.classList.remove('drag-over');
    };

    const handleDrop = (event) => {
        event.preventDefault();
        event.target.classList.remove('drag-over');

        const droppedItemId = parseInt(event.dataTransfer.getData('text/plain'), 10);
        const draggedItemIndex = items.findIndex(item => item.id === droppedItemId);
        const droppedItemIndex = items.findIndex(item => item.id === id);

        if (draggedItemIndex !== droppedItemIndex) {
            const updatedItems = [...items];
            const [draggedItem] = updatedItems.splice(draggedItemIndex, 1);
            updatedItems.splice(droppedItemIndex, 0, draggedItem);
            setItems(updatedItems);
        }
    };

    return (
        <section
            draggable={true}
            onDragStart={handleDragStart}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`list-item list-item-box-${id} w-100 flex ${theme ? 'dark' : 'light'} ${itemAdded.state && itemAdded.id === id ? 'add-animation' : ''
                }`}
        >
            <section className="content flex w-100" onClick={handleChange}>
                <input
                    type="checkbox"
                    name={`list-item-${id}`}
                    id={`list-item-${id}`}
                    className="checkbox"
                    title="Mark as complete"
                    checked={isChecked}
                    onChange={handleChange}
                />
                <p className="item">{content}</p>
            </section>
            <button className="cross" onClick={handleDelete}>
                <img src={Cross} alt="Cross-icon" title="Clear item" />
            </button>
        </section>
    );
};

export default ListItem;
