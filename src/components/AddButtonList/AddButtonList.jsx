import React, {useState} from 'react';
import List from '../List/List'
import './AddbuttonList.scss'
import Badge from "../Badge/Badge";
import closeSvg from '../../assets/img/close.svg'



const AddButtonList = ({colors , onAdd}) => {
    const [visiblePopup, setVisiblePopup] = useState(false)
    const [selectedColor,selectColor] = useState(colors[0].id)
    const [inputValue, setInputValue] = useState('')
    //Очистка value and color при закрытии
    const onClose = () => {
        setVisiblePopup(false);
        setInputValue('');
        selectColor(colors[0].id)
    }
    // создание объекта при вводе value и color
    const addList = () =>{
        if (!inputValue ) {
            alert('Введите название списка')
            return
        }
        const color = colors.filter(c => c.id === selectedColor)[0].name;
        onAdd({ id:Math.random() , name: inputValue , color: color });
        onClose()
    }
    return (
        <div className="add-list">
            <List
                onClick={() => {
                    setVisiblePopup(true)
                }}
                items={[
                    {
                        className: 'list__add-button',
                        icon:
                            <svg width="11" height="11" viewBox="0 0 16 16" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 1V15" stroke="black" strokeWidth="2" strokeLinecap="round"
                                      strokeLinejoin="round"/>
                                <path d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round"
                                      strokeLinejoin="round"/>
                            </svg>
                        ,
                        name: 'Добавить список'
                    },
                ]}/>
            {visiblePopup &&
            <div className="add-list__popup">
                <img onClick={onClose} className="add-list__popup-close-btn" src={closeSvg} alt="close-btn"/>

                <input
                    value={inputValue}
                    onChange={e => {
                        setInputValue(e.target.value)
                    }}
                    className="field" type="text"
                    placeholder="Название списка"/>
                <div className="add-list__popup-colors">
                    {colors.map(color => (
                        <Badge
                            className={selectedColor === color.id && 'active'}
                            onClick={() => selectColor(color.id)}
                            key={color.id}
                            color={color.name}/>

                    ))}
                </div>
                <button onClick={addList} className="button">Добавить</button>
            </div>}
        </div>
    )
}

export default AddButtonList;