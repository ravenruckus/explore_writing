(function() {
    'use strict'


             $("button[type='submit']").on('click', function() {
                event.preventDefault()
                const ctx = $("#myChart")
                $("#document_tones").removeClass('hide')
                $("#sentenceData").removeClass('hide')


                const userText = $("textarea").val().trim()

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
                    
                    // Document Chart
                    const toneNames = []
                    const toneScores = []

                    $.each(jsonFileData[0].tones, function(index, obj) {
                        toneNames.push(obj.tone_name)
                        toneScores.push(obj.score)
                    })

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
                            legend: {
                                display: false
                            },
                            scales: {
                                yAxes: [{
                                   ticks: {
                                        beginAtZero: true
                                    }
                                }]
                            }
                        }
                    })

                    // Sentence data
                    const ctx2 = $("#sentenceChart")

                    const sentenceIds = []
                    const angerScores = []
                    const disgustScores = []
                    const fearScores = []
                    const joyScores = []
                    const sadnessScores = []
                    const sentencesText = []

                    $.each(jsonFileData[1], function(index, sentenceObj) {
                        sentenceIds.push(sentenceObj.sentence_id)
                        angerScores.push(sentenceObj.tone_categories[0].tones[0].score)
                        disgustScores.push(sentenceObj.tone_categories[0].tones[1].score)
                        fearScores.push(sentenceObj.tone_categories[0].tones[2].score)
                        joyScores.push(sentenceObj.tone_categories[0].tones[3].score)
                        sadnessScores.push(sentenceObj.tone_categories[0].tones[4].score)
                        sentencesText.push(sentenceObj.text)
                    })

                    const sentenceChart = new Chart(ctx2, {
                        type: 'horizontalBar',
                        data: {
                            labels: sentenceIds,
                            datasets: [{
                                label: 'Anger',
                                data: angerScores,
                                backgroundColor: 'hsla(340, 100%, 80%, .75)'
                                // hoverBackgroundColor: 'hsla(340, 50%, 8%, .4)'
                            },
                            {
                                label: 'Disgust',
                                data: disgustScores,
                                backgroundColor: 'hsla(240, 100%, 80%, .7)'
                                // hoverBackgroundColor: 'hsla(240, 50%, 8%, .4)'

                            },
                            {
                                label: 'Fear',
                                data: fearScores,
                                backgroundColor: 'hsla(50, 100%, 80%, .7)'
                                // hoverBackgroundColor: 'hsla(50, 50%, 8%, .4)'
                            },
                            {
                                label: 'Joy',
                                data: joyScores,
                                backgroundColor: 'hsla(180, 100%, 80%, .7)'
                                // hoverBackgroundColor: 'hsla(180, 50%, 8%, .4)'
                            },
                            {
                                label: 'Sadness',
                                data: sadnessScores,
                                backgroundColor: 'hsla(280, 100%, 80%, .7)'
                                // hoverBackgroundColor: 'hsla(280, 50%, 8%, .4)'
                            }
                        ]
                    },
                        options: {
                            onClick: function(evt) {

                                var activePoints = sentenceChart.getElementsAtEvent(evt)
                            
                                if(activePoints[0]) {
                                    $("#sentenceText").text(sentencesText[activePoints[0]._index])
                                }

                            },
                            tooltips: {
                                titleFontSize: 18
                            },
                            scales: {
                                xAxes: [{
                                    stacked: true
                                }],
                                yAxes: [{
                                    stacked: true
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


