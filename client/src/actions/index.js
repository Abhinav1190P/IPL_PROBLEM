import axios from 'axios'

export function getAllTeams(){
    const teams = axios.get('http://localhost:3001/teams')
    .then(response => response.data)
    return {
        type:"GET_TEAMS",
        payload:teams
    }
} 

export function updateAllTeams(team){
    const teams = axios.post('http://localhost:3001/update-scores',team)
    .then(response=>response.data)
    return {
        type:"UPDATE_TEAMS",
        payload:teams
    }
}

