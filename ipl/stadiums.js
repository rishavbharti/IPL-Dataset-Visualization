function stadiums(matches)
{
    //console.log(matches)
    let result = {}
    for(let i in matches)
    {
        let winner = matches[i].winner
        let loser = matches[i].winner === matches[i].team1 ? matches[i].team2 : matches[i].team1
        //console.log(winner+'    '+loser)
        let stadium = matches[i].venue
        if(result[stadium])
        {
            if(result[stadium][winner])
            {
                result[stadium][winner]+=1
            }
            else
            {
                result[stadium][winner]=1
            }
        }
        else
        {
            result[stadium]={}
            result[stadium][winner]=1
            result[stadium][loser]=0
        }
    }
    //console.log(result)
    return result
}

module.exports = stadiums