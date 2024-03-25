import {useHttp} from '../../hooks/http.hook';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import { createSelector } from '@reduxjs/toolkit';

// import {fetchHeroes } from '../../actions';
import {heroesDelete, fetchHeroes, filteredHeroesSelector} from './heroesSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import './heroesList.scss'

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {

    // const filteredHeroesSelector = createSelector(
    //     (state) => state.filters.activeFilter,
    //     selectAll,
    //     (filter, heroes) => {
    //         if(filter === 'all') {
    //             return heroes;
    //         } else {
    //             return heroes.filter(item => item.element === filter)
    //         }
    //     }
    // );
    // const filterHeroes = useSelector(state => {
    //     if(state.filters.activeFilter === 'all') {
    //         return state.heroes.heroes;
    //     } else {
    //         return state.heroes.heroes.filter(item => item.element === state.filters.activeFilter)
    //     }
    // })
    const filterHeroes = useSelector(filteredHeroesSelector);
    const {heroesLoadingStatus} = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes());
        // eslint-disable-next-line
    }, []);

    const herDelete = useCallback(
        (id) => {
            request(`http://localhost:3001/heroes/${id}`, 'DELETE')
                .then(console.log(`Delete Heroes - ${id}`))
                .then(() => dispatch(heroesDelete(id)))
                .catch(err => console.log(err))
        }, [request])

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return (
                <CSSTransition
                    timeout={0}
                    classNames='heroes'>
                    <h5 className="text-center mt-5">Героев пока нет</h5>
                </CSSTransition>  
            )
        }

        return arr.map(({id, ...props}) => {
            return (
                <CSSTransition
                key={id}
                timeout={500}
                classNames='heroes'>
                    <HeroesListItem onDelete={() => herDelete(id)} key={id} {...props}/>
                </CSSTransition>
            )
        })
    }

    const elements = renderHeroesList(filterHeroes);
    return (
        <TransitionGroup component={'ul'}>
            {elements}
        </TransitionGroup>
    )
}

export default HeroesList;