import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHttp } from "../../hooks/http.hook";
import Spinner from "../spinner/Spinner";
// import { fetchFilters } from "../../actions";
import {activeFilterChanged, fetchFilters, selectAll } from "./filtersSlice";
import classNames from "classnames";
import store from "../../store";

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом


const HeroesFilters = () => {
    const {request} = useHttp();
    const {filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
    const filters = selectAll(store.getState());
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchFilters());
    }, []);

    if (filtersLoadingStatus === 'loading') {
        return <Spinner/>
    } else if (filtersLoadingStatus === 'error') {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const onFilterHeroes = (filterName) => {
        dispatch(activeFilterChanged(filterName))
    }

    const renderFilters = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Филтры не добавлены</h5>
        }

        return arr.map(({name, description, className}) => {
            const filtersClass = classNames('btn', className, {
                "active": name === activeFilter  
            })
            return (
                <button key={name} id={name} onClick={() => onFilterHeroes(name)} className={filtersClass}>{description}</button>
            )
        })
    }

    const element = renderFilters(filters);


    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {element}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;