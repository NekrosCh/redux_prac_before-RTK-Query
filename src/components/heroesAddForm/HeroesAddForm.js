import { useState } from "react";
import {useHttp} from "../../hooks/http.hook"
import { useSelector, useDispatch } from "react-redux";
// import { heroesCreated } from "../../actions";
import { heroesCreated } from "../heroesList/heroesSlice";
import { selectAll } from "../heroesFilters/filtersSlice";
import { v4 as uuidv4 } from 'uuid';
import store from "../../store";

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const [heroesName, setHeroesName] = useState('');
    const [heroesDescr, setHeroesDescr] = useState('');
    const [heroesElem, setHeroesElem] = useState('');
    const filters = selectAll(store.getState());
    const {request} = useHttp();
    const dispatch = useDispatch();

    const onSubmitHeroes = (e) => {
        e.preventDefault();
        const newHero = {
            id: uuidv4(),
            name: heroesName,
            description: heroesDescr,
            element: heroesElem
        }
        request('http://localhost:3001/heroes', 'POST', JSON.stringify(newHero))
            .then(res => console.log(`Успешно отправлено. ${{res}}`))
            .then(dispatch(heroesCreated(newHero)))
            .catch(error => console.log(error));
        setHeroesName('');
        setHeroesDescr('');
        setHeroesElem('');
    }

    const renderOptionsElem = (elems) => {
        return elems.map(({name, description}) => {
            if (name === 'all') {
                return;
            }
            return (
                <option key={name} value={name}>{description}</option>
            )
        })
    }

    return (
        <form 
            onSubmit={onSubmitHeroes}
            className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input
                    onChange={(e) => setHeroesName(e.target.value)}
                    value={heroesName} 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    onChange={(e) => setHeroesDescr(e.target.value)}
                    value={heroesDescr}
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select
                    onChange={(e) => setHeroesElem(e.target.value)}
                    value={heroesElem} 
                    required
                    className="form-select" 
                    id="element" 
                    name="element">
                    <option >Я владею элементом...</option>
                    {renderOptionsElem(filters)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;