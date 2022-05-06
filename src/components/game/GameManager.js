export const getGames = () => {
    return fetch("http://localhost:8000/games", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const getSingleGame = (id) => {
    return fetch(`http://localhost:8000/games/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const getGameTypes = () => {
    return fetch("http://localhost:8000/gametypes", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
    .then(response => response.json())
}

export const createGame = (game) => {
    const fetchOption = {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/JSON"
        },
        body: JSON.stringify(game)
    }
    return fetch("http://localhost:8000/games", fetchOption)
        .then(response => response.json())
}

export const updateGame = (game) => {
    const fetchOption = {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`,
            "Content-Type": "application/JSON"
        },
        body: JSON.stringify(game)
    }
    return fetch("http://localhost:8000/games", fetchOption)
        .then(response => response.json())
}