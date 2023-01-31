const axios = require('axios')

const getUsers = async (req, res) => {
    try {
        const { since, per_page } = req.query;
        const url = 'https://api.github.com/users?'
        const sinceQuery = 'since='

        if ((since && isNaN(Number(since))) || (per_page && isNaN(Number(per_page)))) {
            const message = "Query parameters must be a number"
            return res.status(400).json(message)
        }

        if (per_page && Number(per_page) > 100) {
            const message = "per_page cannot be bigger than 100"
            return res.status(400).json(message)
        }

        if (!since && !per_page) {
            const response = await axios.get(url)
            const users = response.data
            const message = "You can use since and per_page variables as query params."
            const nextUrl = `${url}${sinceQuery}${users[users.length - 1].id}`

            return res.json({ message, nextUrl, users })
        }

        if (!since && per_page) {
            let perPageQuery = 'per_page='
            const response = await axios.get(`${url}${perPageQuery}${per_page}`)
            const users = response.data
            const message = "Try using since variable as query params."
            const nextUrl = `${url}${sinceQuery}${users[users.length - 1].id}`

            return res.json({ message, nextUrl, users })
        }

        if (since && per_page) {
            let perPageQuery = 'per_page='
            const response = await axios.get(`${url}${sinceQuery}${since}&${perPageQuery}${per_page}`)
            const users = response.data
            const nextUrl = `${url}${sinceQuery}${users[users.length - 1].id}&${perPageQuery}${per_page}`

            return res.json({ nextUrl, users })
        }

        const response = await axios.get(`${url}${sinceQuery}${since}`)
        const users = response.data
        const nextUrl = `${url}${sinceQuery}${users[users.length - 1].id}`

        return res.json({ nextUrl, users })
    } catch (err) {
        res.json(err.message)
    }

}

const getUserDetails = async (req, res) => {
    try {
        const { username } = req.params

        const url = `https://api.github.com/users/${username}`
        const response = await axios.get(url)
        const user = response.data

        res.json(user)
    } catch (err) {
        const message = 'User not found'
        res.status(404).json({ message, err })
    }
}

const getUserRepos = async (req, res) => {
    try {
        const { username } = req.params
        const url = `https://api.github.com/users/${username}/repos`
        const response = await axios.get(url)
        const userRepos = response.data

        res.json(userRepos)
    } catch (err) {
        const message = 'User not found'
        res.status(404).json({ message, err })
    }
}


module.exports = {
    getUsers,
    getUserDetails,
    getUserRepos
}