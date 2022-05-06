import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { getEvents } from "./EventManager"

export const EventList = (props) => {
    const [ events, setEvents ] = useState([])

    const history = useHistory()

    useEffect(() => {
        getEvents().then(data => setEvents(data))
    }, [])

    return (
        <article className="events">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/events/new" })
                }}
            >Register New Event</button>
            {
                events.map(event => {
                    return <section key={`event--${event.id}`} className="event">
                        <div className="event__description">Description: {event.description}</div>
                        <div className="event__date">Date: {event.date}</div>
                        <div className="event__time">Time: {event.time}</div>
                        <div className="event__gameId">Game: {event.game.title}</div>
                    </section>
                })
            }
        </article>
    )
}