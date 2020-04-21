function extraRuns(matches, deliveries)
{
    let result={}
    const sixteenId = (matches.filter(i=>i.season==2016)).map(i=>parseInt(i.id))
    const sxDeliveries = deliveries.filter(i=> sixteenId.includes(parseInt(i['match_id'])))
    for(let i in sxDeliveries)
    {
        const extras = sxDeliveries[i]['extra_runs']
        const team = sxDeliveries[i].bowling_team
        if(result[team])
        {
            result[team]+=parseInt(extras)
        }
        else
        {
            result[team]=parseInt(extras)
        }
    }
    //console.log(matches)
    return result
}

module.exports = extraRuns