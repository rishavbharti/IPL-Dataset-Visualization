function economyBowlers(matches, deliveries)
{
    let result={}
    for(let i=2008; i<=2019; i++)
    {
        result[i]=calculate(matches, deliveries, i)
    }
    //console.log(result)
    return result
}

function calculate(matches, deliveries, year)
{
    let total_runs={}, overs={}, eco
    const fifteenId = (matches.filter(i=>i.season==year)).map(i=>parseInt(i.id))
    const ffDeliveries = deliveries.filter(i=> fifteenId.includes(parseInt(i['match_id'])))
    //console.log(ffDeliveries)
    for(let i in ffDeliveries)
    {
        const runs = ffDeliveries[i]['total_runs']
        const bowler = ffDeliveries[i].bowler
        if(total_runs[bowler])
        {
            total_runs[bowler]+=parseInt(runs)
            if(parseInt(ffDeliveries[i].ball)==6)
            {
                overs[bowler]+=1
            }
        }
        else
        {
            total_runs[bowler]=parseInt(runs)
            overs[bowler]=0
        }
    }
    for(let i in total_runs)
    {
        total_runs[i]=total_runs[i]/overs[i]
    }
    eco=(Object.entries(total_runs).sort((a,b)=>a[1]-b[1])).slice(0, 10)
    // console.log(overs)
    // console.log(total_runs)
    //console.log(eco)
    return eco;
}

module.exports = economyBowlers