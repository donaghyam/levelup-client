import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { getGames } from "../game/GameManager.js"
import { getSingleEvent, updateEvent } from "./EventManager.js"

export const UpdateEvent = () => {
    const history = useHistory()
    const [games, setGames] = useState([])
    const [currentEvent, setCurrentEvent] = useState({})
    const {id} = useParams()

    useEffect(() => {
        getGames()
            .then(data => setGames(data))
    }, [])

    useEffect(() => {
        getSingleEvent(id)
            .then(data => setCurrentEvent(data))
    }, [])


    return (
        <form className="eventForm">
            <h2 className="eventForm__title">Register New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" defaultValue={currentEvent.description} required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={
                            (event) => {
                                const copy = {...currentEvent}
                                copy.description = event.target.value
                                setCurrentEvent(copy)
                        }
                    }
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" defaultValue={currentEvent.date} required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={
                            (event) => {
                                const copy = {...currentEvent}
                                copy.date = event.target.value
                                setCurrentEvent(copy)
                        }
                    }
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="time" name="time" defaultValue={currentEvent.time} required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={
                            (event) => {
                                const copy = {...currentEvent}
                                copy.time = event.target.value
                                setCurrentEvent(copy)
                        }
                    }
                    />
                </div>
            </fieldset>

            <fieldset>
                <label id="gameDropdown" htmlFor="game">Game: </label>
                <select className="skillDropdown" onChange={
                            (event) => {
                                const copy = {...currentEvent}
                                copy.game_id = event.target.value
                                setCurrentEvent(copy)
                        }
                    }>
                    <option defaultValue={currentEvent.game_id} id="game">{currentEvent.game?.title}</option>
                    {
                        games.map(
                            (game) => {
                                return <option value={game.id} id="gameType">{game.title}</option>
                            }
                        )
                    }
                </select>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const event = {
                        description: currentEvent.description,
                        date: currentEvent.date,
                        time: currentEvent.time,
                        game: parseInt(currentEvent.game_id),
                    }

                    // Send POST request to your API
                    updateEvent(event, id)
                        .then(() => history.push("/events"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}