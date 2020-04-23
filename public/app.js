function fetchAndVisualizeData() {
  fetch("./data.json")
    .then(r => r.json())
    .then(visualizeData);
}

fetchAndVisualizeData();

function visualizeData(data) 
{
  visualizeMatchesPlayedPerYear(data.matchesPlayedPerYear);
  visualizeMatchesWonByEachTeam(data.matchesWonByEachTeam);
  visualizeExtraRuns(data.extraRuns)
  visualizeEconomyBowlers(data.economyBowlers[2015])
  visualizeStadiums(data.stadiums)
  return;
}

var year
const form = document.querySelector('form')
form.addEventListener('submit', (e)=>{
  year = form.elements.year.value
  //console.log(form.elements.year.value)
  e.preventDefault()
  fetch(`/economy?year=${year}`)
    .then(data => data.json())
    .then(visualizeCustomData)
})

// var year
// const form = document.querySelector('form')
// form.addEventListener('submit', (e)=>{
//   year = form.elements.year.value
//   //console.log(form.elements.year.value)
//   e.preventDefault()
//   fetch("./data.json")
//     .then(data => data.json())
//     .then(visualizeCustomData)
// })  data.economyBowlers[year], year

function visualizeCustomData(data)
{
  document.querySelector("#custom-economy-bowlers").innerHTML="", visualizeCustomEconomyBowlers(data, year)
  return;
}

function visualizeCustomEconomyBowlers(data, year)
{
  Highcharts.chart("custom-economy-bowlers", {
    chart: {
      type: "column"
    },
    title: {
      text: `Top 10 economical bowlers of ${year}`
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Economy"
      }
    },
    series: [
      {
        name: "Economy",
        data: data
      }
    ]
  });
}

function visualizeMatchesPlayedPerYear(matchesPlayedPerYear) 
{
  const seriesData = [];
  for (let year in matchesPlayedPerYear) 
  {
    seriesData.push([year, matchesPlayedPerYear[year]]);
  }
  //console.log(seriesData)

  Highcharts.chart("matches-played-per-year", {
    chart: {
      type: "column"
    },
    title: {
      text: "Matches Played Per Year"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches"
      }
    },
    series: [
      {
        name: "Years",
        data: seriesData
      }
    ]
  });
}

function visualizeMatchesWonByEachTeam(data)
{
    const series = []
    let year = Object.keys(data)
    const team = []
    for(let i=0;i<year.length;i++)
    {    
      team.push(Object.keys(data[year[i]]))
    }
    const teams=[...new Set([].concat.apply([], team))]
    //console.log(teams)
    for(let i in teams)
    {
      let total=[]
      for(let j in year)
      {
        if(data[year[j]].hasOwnProperty(teams[i]))
        {
          total.push(data[year[j]][teams[i]])
        }
        else{
          total.push(0)
        }
      }
      series.push({name: teams[i], data: total})
    }
    //console.log(series)
    //return series

    Highcharts.chart('matches-won-by-each-team', {
      chart: {
          type: 'column'
      },
      title: {
          text: 'Number of matches won by each team over all the years of IPL'
      },
      subtitle: {
          text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
      },
      xAxis: {
          categories: year,
          crosshair: true
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Matches won'
          }
      },
      tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
      },
      plotOptions: {
          column: {
              pointPadding: 0.2,
              borderWidth: 0
          }
      },
      series: series
    });
}

function visualizeExtraRuns(data)
{
  const seriesData = [];
  for (let i in data) 
  {
    seriesData.push([i, data[i]]);
  }
  //console.log(seriesData)

  Highcharts.chart("extra-runs", {
    chart: {
      type: "column"
    },
    title: {
      text: "Extra runs conceded by each team in 2016"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Extra runs"
      }
    },
    series: [
      {
        name: "Runs",
        data: seriesData
      }
    ]
  });
}

function visualizeEconomyBowlers(data)
{
  Highcharts.chart("economy-bowlers", {
    chart: {
      type: "column"
    },
    title: {
      text: "Top 10 economical bowlers of 2015"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Economy"
      }
    },
    series: [
      {
        name: "Economy",
        data: data
      }
    ]
  });
}

function visualizeStadiums(data)
{
  //console.log(data)
  const series = []
  let stadium = Object.keys(data)
  //console.log(stadium)
  const team = []
  for(let i=0;i<stadium.length;i++)
  {    
    team.push(Object.keys(data[stadium[i]]))
  }
  const teams=[...new Set([].concat.apply([], team))]
  //console.log(teams)
  for(let i in teams)
  {
    let total=[]
    for(let j in stadium)
    {
      if(data[stadium[j]].hasOwnProperty(teams[i]))
      {
        total.push(data[stadium[j]][teams[i]])
      }
      else{
        total.push(0)
      }
    }
    series.push({name: teams[i], data: total})
  }
  //console.log(series)
  //return series

      Highcharts.chart('stadiums', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Story: Matches won by each team per venue'
        },
        xAxis: {
            categories: stadium
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Matches won vs Stadium'
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: series
    });
}