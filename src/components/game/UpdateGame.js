import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { getGameTypes, updateGame, getSingleGame } from './GameManager.js'


export const UpdateGame = () => {
    const history = useHistory()
    const [gameTypes, setGameTypes] = useState([])
    const [currentGame, setCurrentGame] = useState({})
    const {id} = useParams()


    useEffect(() => {
        getGameTypes()
            .then(data => setGameTypes(data))
    }, [])

    useEffect(() => {
        getSingleGame(id)
            .then(data => setCurrentGame(data))
    }, [])


    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Update Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" defaultValue={currentGame.title} required autoFocus className="form-control"
                        onChange={
                            (event) => {
                                const copy = {...currentGame}
                                copy.title = event.target.value
                                setCurrentGame(copy)
                        }
                    }
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" defaultValue={currentGame.maker} required autoFocus className="form-control"
                        onChange={
                            (event) => {
                                const copy = {...currentGame}  
                                copy.maker = event.target.value
                                setCurrentGame(copy)
                        }
                    }
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="number_of_players">Number of players: </label>
                    <input type="text" name="number_of_players" defaultValue={currentGame.number_of_players} required autoFocus className="form-control"
                        onChange={
                            (event) => {
                                const copy = {...currentGame}
                                copy.number_of_players = event.target.value
                                setCurrentGame(copy)
                        }
                    }
                    />
                </div>
            </fieldset>

            <fieldset>
                <label id="skillDropdownLabel" htmlFor="skill_level">Skill level: </label>
                <select className="skillDropdown" onChange={
                            (event) => {
                                const copy = {...currentGame}
                                copy.skill_level = event.target.value
                                setCurrentGame(copy)
                        }
                    }>
                    <option value={currentGame.skill_level} id="skill_level">{currentGame.skill_level}</option>
                    <option value="Beginner" id="skill_level">Beginner</option>
                    <option value="Intermediate" id="skill_level">Intermediate</option>
                    <option value="Expert" id="skill_level">Expert</option>

                </select>
            </fieldset>

            <fieldset>
                <label id="gameTypeDropdown" htmlFor="gameType">Game type: </label>
                <select className="skillDropdown" onChange={
                            (event) => {
                                const copy = {...currentGame}
                                copy.game_type = event.target.value
                                setCurrentGame(copy)
                        }
                    }>
                    <option value={currentGame.game_type?.id} id="gameType">{currentGame.game_type?.label}</option>
                    {
                        gameTypes.map(
                            (type) => {
                                return <option value={type.id} id="gameType">{type.label}</option>
                            }
                        )
                    }
                </select>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        number_of_players: parseInt(currentGame.number_of_players),
                        skill_level: currentGame.skill_level,
                        game_type: parseInt(currentGame.game_type)
                    }

                    // Send POST request to your API
                    updateGame(game, id)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}