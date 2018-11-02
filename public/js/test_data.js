(function() {



    $("#testButton").on('click', function() {
        event.preventDefault()
        const ctx = $("#myChart")


        const options = {
            contentType: 'application/json',
            dataType: 'json',
            type: 'GET',
            url: 'api/test_json'
        };

        $.ajax(options)
        .done((jsonFileData) => {
        
            // document chart
            const toneNames = []
            const toneScores = []

            $.each(jsonFileData[0].tones, function(index, obj) {
                toneNames.push(obj.tone_name)
                toneScores.push(obj.score)
            })

            const myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: toneNames,
                    datasets: [{
                        label: 'Document Emotion Scores',
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
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            })

        //sentence data
        const ctx2 = $("#sentenceChart")

        const sentenceIds = []
        const angerScores = []
        const disgustScores = []
        const fearScores = []
        const joyScores = []
        const sadnessScores = []

        $.each(jsonFileData[1], function(index, sentenceObj) {
            sentenceIds.push(sentenceObj.sentence_id)
            angerScores.push(sentenceObj.tone_categories[0].tones[0].score)
            disgustScores.push(sentenceObj.tone_categories[0].tones[1].score)
            fearScores.push(sentenceObj.tone_categories[0].tones[2].score)
            joyScores.push(sentenceObj.tone_categories[0].tones[3].score)
            sadnessScores.push(sentenceObj.tone_categories[0].tones[4].score)
        })

        console.log(sentenceIds)
        console.log('angerScores', angerScores)
        console.log('disgustScores', disgustScores)

        const sentenceChart = new Chart(ctx2, {
            type: 'horizontalBar',
            data: {
                labels: sentenceIds,
                datasets: [{
                    label: 'Anger',
                    data: angerScores,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    hoverBackgroundColor: 'pink'
                },
                {
                    label: 'Disgust',
                    data: disgustScores,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)'
                },
                {
                    label: 'Fear',
                    data: fearScores,
                    backgroundColor: 'rgba(255, 206, 86, 0.5)'
                },
                {
                    label: 'Joy',
                    data: joyScores,
                    backgroundColor: 'rgba(75, 192, 192, 0.5)'
                },
                {
                    label: 'Sadness',
                    data: sadnessScores,
                    backgroundColor: 'rgba(153, 102, 255, 0.5)'
                }
            ]
        },
            options: {
                title: {
                    display: true,
                    text: 'Sentence Emotion Scores'
                },
                tooltips: {
                    titleFontSize: 12
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

    })

})()
