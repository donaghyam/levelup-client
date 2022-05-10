import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { deleteEvent, getEvents, joinEvent, leaveEvent } from "./EventManager"

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
                        <button className="btn btn-2 btn-sep icon-create"
                            onClick={() => {
                                history.push({ pathname: `/edit_event/${event.id}` })
                            }}
                        >Edit Event</button>
                        <button className="btn btn-2 btn-sep icon-create"
                            onClick={() => {
                                deleteEvent(event.id)
                                .then(getEvents)
                                .then(data => setEvents(data))
                            }}
                        >Delete Event</button>
                        {
                            event.joined ? 
                                <button className="btn btn-2 btn-sep icon-create"
                                    onClick={() => {
                                        leaveEvent(event.id)
                                        .then(getEvents)
                                        .then(data => setEvents(data))
                                    }}
                                >Leave Event</button>
                            :
                                <button className="btn btn-2 btn-sep icon-create"
                                    onClick={() => {
                                        joinEvent(event.id)
                                        .then(getEvents)
                                        .then(data => setEvents(data))
                                    }}
                                >Join Event</button>
                        }
                        <br></br>
                    </section>
                })
            }
        </article>
    )
}