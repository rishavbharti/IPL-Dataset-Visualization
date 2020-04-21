function matchesWonByEachTeam(matches)
{
    let result = {}
    //const teams=[...new Set(matches.map(match=>match.team1))]
    //const seasons=[...new Set(matches.map(match=>match.season))]
    // console.log(teams)
    // console.log(seasons)
    for(let match=0; match<matches.length; match++)
    {
        const season = matches[match].season
        const winner = matches[match].winner
        if (result[season]) 
        {
            if(result[season][winner])
            {
                result[season][winner]+=1
            }
            else
            {
                result[season][winner]=1
            }
        } 
        else 
        {
            result[season] = {}
            result[season][winner]=1
        }
    }
    //console.log(result)
    return result;
}

module.exports = matchesWonByEachTeam