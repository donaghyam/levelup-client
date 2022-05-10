import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createGame, getGameTypes } from './GameManager.js'


export const GameForm = () => {
    const history = useHistory()
    const [gameTypes, setGameTypes] = useState([])

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skill_level: 1,
        number_of_players: 0,
        title: "",
        maker: "",
        game_type_id: 0
    })

    useEffect(() => {
        getGameTypes().then(data => setGameTypes(data))
    }, [])


    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
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
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
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
                    <input type="text" name="number_of_players" required autoFocus className="form-control"
                        value={currentGame.number_of_players}
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
                    <option value="0" id="skill_level">Select a skill level</option>
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
                                copy.game_type_id = event.target.value
                                setCurrentGame(copy)
                        }
                    }>
                    <option value="0" id="gameType">Select a game type </option>
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
                        game_type: parseInt(currentGame.game_type_id)
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}