import { Team } from 'hkclient-redux/types/teams'

// Use when sorting multiple teams by their `display_name` field
function compareTeamsByDisplayName(locale: string, a: Team, b: Team) {
  if (a.display_name !== null) {
    if (a.display_name !== b.display_name) {
      return a.display_name.localeCompare(b.display_name, locale, {
        numeric: true,
      })
    }
  }

  return a.name.localeCompare(b.name, locale, { numeric: true })
}

// Use to filter out teams that are deleted and without display_name, then sort by their `display_name` field
export function filterAndSortTeamsByDisplayName(teams: Team[], locale: string, teamsOrder = ''): Team[] {
  if (!teams) {
    return []
  }

  const teamsOrderList = teamsOrder.split(',')

  const customSortedTeams = teams
    .filter((team) => {
      if (team !== null) {
        return teamsOrderList.includes(team.id)
      }
      return false
    })
    .sort((a, b) => {
      return teamsOrderList.indexOf(a.id) - teamsOrderList.indexOf(b.id)
    })

  const otherTeams = teams
    .filter((team) => {
      if (team !== null) {
        return !teamsOrderList.includes(team.id)
      }
      return false
    })
    .sort((a, b) => {
      return compareTeamsByDisplayName(locale, a, b)
    })

  return [...customSortedTeams, ...otherTeams].filter((team) => {
    //TODO: Check !
    return team && !(team.delete_at > 0) && team.display_name != null
  })
}
