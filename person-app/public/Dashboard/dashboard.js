let container = document.getElementById("container");

anychart.onDocumentReady(function () {
    anychart.onDocumentReady(function () {
        var chart = anychart.line();
        
        var series1 = chart.line([
            {x: 'Cycling', value: 18},
            {x: 'Swimming', value: 25},
            {x: 'Run', value: 10},
            {x: 'Hiking', value: 20}
        ]);
        
        var series2 = chart.line([
            {x: 'Cycling', value: 35},
            {x: 'Swimming', value: 23},
            {x: 'Run', value: 14},
            {x: 'Hiking', value: 50}
        ]);
        
        // Get Z-Index of the line series.
        var zIndex = series2.zIndex();
        
        chart.title('Z-Index of the series is ' + zIndex);
        
        chart.container('container');
        chart.draw();
    });
});