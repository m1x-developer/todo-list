import React from 'react';
import './List.scss'
import classNames from "classnames";
import Badge from "../Badge/Badge";
import removeSvg from "../../assets/img/remove.svg"


const List = ({items, isRemovable, onClick , onRemove}) => {
    // уточнение для удаления
    const removeList = (item) => {
        if(window.confirm('Вы действительное хотите удалить список ? ')) {
            onRemove(item)
        }
    }
    return (
        <ul onClick={onClick} className="list">
            {items.map((item, index) => (
                <li key={index} className={classNames(item.className, {'active': item.active})}>
                    <i>
                        {item.icon ? item.icon : <Badge color={item.color}/>}
                    </i>
                    <span>{item.name}</span>
                    {isRemovable &&
                    <img
                        className="list__remove-icon"
                        src={removeSvg}
                        alt="delete"
                        onClick={() => removeList(item)}
                    />

                    }
                </li>
            ))}
        </ul>
    );
};

export default List;