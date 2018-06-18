
d3.csv("data/data.csv", function(data) {
    data = data.map(function(d) 
    { return [ +d["id"], d["state"],d["abbr"],+d["poverty"],
                +d["povertyMoe"],+d["age"],+d["ageMoe"],+d["income"],
                +d["incomeMoe"],+d["healthcare"],+d["healthcareLow"],+d["healthcareHigh"],
                +d["obesity"],+d["obesityLow"],+d["obesityHigh"],+d["smokes"],
                +d["smokesLow"],+d["smokesHigh"],d["party"] ]; });
        
        arr = [];
        arr.push(['abbr','income','poverty','party','other']);
        for(i=1; i < data.length; i++){
            arr.push([data[i][2],data[i][7],data[i][3],data[i][18],5]);
        }
        console.log(arr);
    });
    
function drawSeriesChart() {
    var data = google.visualization.arrayToDataTable(arr);
    var options = {
        title: 'Correlation(-.78) between poverty level and income by'+
        'how state voted in last election(Democrat or Republican)',
        hAxis: {title: 'Income', viewWindow: {min: 35000} },
        vAxis: {title: 'Poverty', viewWindow: {min:6} },
        bubble: {textStyle: {fontSize: 11}, opacity:0.4 },
        series: {'Democrat': {color: 'blue'},'Republican': {color: 'red'} }
      };
      var chart = new google.visualization.BubbleChart(document.getElementById('series_chart_div'));
      chart.draw(data, options);
}
    