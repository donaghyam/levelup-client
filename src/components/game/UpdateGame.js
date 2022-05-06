import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { getGameTypes, updateGame, getSingleGame } from './GameManager.js'


export const UpdateGame = () => {
    const history = useHistory()
    const [gameTypes, setGameTypes] = useState([])
    const [currentGame, setCurrentGame] = useState({})
    const [updatedGame, setUpdatedGame] = useState({})
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
                    <input type="text" name="title" default={currentGame.title} required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={
                            (event) => {
                                const copy = {...currentGame}
                                copy.title = event.target.value
                                setUpdatedGame(copy)
                        }
                    }
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" default={currentGame.maker} required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={
                            (event) => {
                                const copy = {...currentGame}
                                copy.maker = event.target.value
                                setUpdatedGame(copy)
                        }
                    }
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="number_of_players">Number of players: </label>
                    <input type="text" name="number_of_players" default={currentGame.number_of_players} required autoFocus className="form-control"
                        value={currentGame.number_of_players}
                        onChange={
                            (event) => {
                                const copy = {...currentGame}
                                copy.number_of_players = event.target.value
                                setUpdatedGame(copy)
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
                                setUpdatedGame(copy)
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
                                setUpdatedGame(copy)
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
                        maker: updatedGame.maker,
                        title: updatedGame.title,
                        number_of_players: parseInt(updatedGame.number_of_players),
                        skill_level: updatedGame.skill_level,
                        game_type: updatedGame.game_type_id
                    }

                    // Send POST request to your API
                    updateGame(game)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}