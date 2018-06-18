
        ['DNK',    78.6,               1.84,      'Europe',         5523095],
        ['EGY',    72.73,              2.78,      'Middle East',    79716203],
        ['GBR',    80.05,              2,         'Europe',         61801570],
        ['IRN',    72.49,              1.7,       'Middle East',    73137148],
        ['IRQ',    68.09,              4.77,      'Middle East',    31090763],
        ['ISR',    81.55,              2.96,      'Middle East',    7485600],
        ['RUS',    68.6,               1.54,      'Europe',         141850000],
        ['USA',    78.09,              2.05,      'North America',  307007000]
      ]);

      var data = d3.csvParseRows("data/data.csv",function(d,i){
        return{
            id: d[0], state: d[1],abbr: d[2], poverty: d[3],povertyMoe: d[4],
            age: d[5], ageMoe: d[6], income: d[7], incomeMoe: d[8], healthcare: d[9],
            healthcareLow: d[10], healthcareHigh: d[11], obesity: d[12], obesityLow: d[13],
            obesityHigh: d[14], smokes: d[15],smokesLow: d[16], smokesHigh: d[17], party: d[18]
        };
    });
    var data = d3.csvParseRows(string, function(d, i) {
        return {
        year: new Date(+d[0], 0, 1), // convert first colum column to Date
        make: d[1],
        model: d[2],
        length: +d[3] // convert fourth column to number
    };
});
d3.text("data/data.csv", function(text) {
    var data = d3.csvParseRows(text).map(function(row) {
        return row.map(function(value) {
        return +value;
        });
    });
    console.log(data);
});