export const getEvents = () => {
    return fetch("http://localhost:8000/events", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const createEvent = (event) => {
    const fetchOption = {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/JSON"
        },
        body: JSON.stringify(event)
    }
    return fetch("http://localhost:8000/events", fetchOption)
        .then(response => response.json())
}