(function() {
    'use strict'


             $("button[type='submit']").on('click', function() {
                event.preventDefault()

                const ctx = $("#myChart")


                const userText = $("textarea").val().trim()

                $('#textareaData').text(userText)

                const options = {
                    contentType: 'application/json',
                    data: JSON.stringify({ userText }),
                    dataType: 'json',
                    type: 'POST',
                    url: 'api/analyze_text'
                };

               $.ajax(options)
                .done((jsonFileData) => {
                    // add a loading image
                    
                    const toneNames = []
                    const toneScores = []

                    $.each(jsonFileData.tones, function(index, obj) {
                        toneNames.push(obj.tone_name)
                        toneScores.push(obj.score)
                    })

                    // figure out if I can make the top value 1 maybe?
                    var myChart = new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: toneNames,
                            datasets: [{
                                label: 'score',
                                data: toneScores,
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.5)',
                                    'rgba(54, 162, 235, 0.5)',
                                    'rgba(255, 206, 86, 0.5)',
                                    'rgba(75, 192, 192, 0.5)',
                                    'rgba(153, 102, 255, 0.5)'
                                ],
                                borderColor: [
                                    'rgba(255,99,132,1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)'
                                ],
                                borderWidth: 1
                            }]
                            
                        },
                        options: {
                            scales: {
                                xAxes: [{
                                    stacked: true
                                }],
                                yAxes: [{
                                    stacked: true,
                                    ticks: {
                                        beginAtZero:true
                                    }
                                }]
                            }
                        }
                    })

                })
                .fail(($xhr) => {
                    console.log('Something went wrong.')
                })

            })

            
})();


