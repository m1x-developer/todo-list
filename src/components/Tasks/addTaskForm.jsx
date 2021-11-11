import React, {useState} from 'react';
import addSvg from "../../assets/img/add.svg";
import axios from "axios";

const AddTaskForm = ({list, onAddTask}) => {
    const [visibleForm, setFormVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsloading] = useState('');


    const toggleFormVisible = () => {
        setFormVisible(!visibleForm)
        setInputValue('')
    }

    const addTask = () => {
        const obj = {
            "listId": list.id,
            "text": inputValue,
            "completed": false
        }
        setIsloading(true);
        axios.post('http://localhost:3001/tasks' , obj).then(({data}) => {
            onAddTask(list.id, data)
            toggleFormVisible()
        }).catch(() => {
            alert('Ошибка при добавлении задачи')
        })
            .finally(() => {setIsloading(true)})
    }

    return (
        <div className="tasks__form">
            {!visibleForm ?
                (<div onClick={toggleFormVisible} className="tasks__form-new">
                    <img src={addSvg} alt="add"/>
                    <span>Новая задача</span>
                </div>) : (
                    <div className="tasks__form-block">
                        <input
                            className="field"
                            type="text"
                            placeholder="Название задачи"
                            value={inputValue}
                            onChange={event => setInputValue(event.target.value)}
                        />
                        <button
                            disabled={isLoading}
                            onClick={addTask}
                            className="button">{isLoading ? 'Добавление задачи ' : 'Добавить задачу'}
                        </button>
                        <button
                            onClick={toggleFormVisible}
                            className="button button--grey">Отмена
                        </button>
                    </div>
                )}


        </div>
    );
};

export default AddTaskForm;