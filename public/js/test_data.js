(function() {

const ctx = $("#myChart")


$("#testButton").on('click', function() {
    event.preventDefault()

    const options = {
        contentType: 'application/json',
        dataType: 'json',
        type: 'GET',
        url: 'api/test_json'
    };

    $.ajax(options)
    .done((jsonFileData) => {
       
        //category title
        $("#watsonData").append($("<h3>").text(jsonFileData.category_name)) 
        
        const $ul =  $("<ul>")
        $.each(jsonFileData.tones, function(index, value) {
        $ul.append($("<li>").text(value.tone_name + ' ').append($("<span>").text(value.score)))
        })
        
        $("#watsonData").append($ul)

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
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        })

    })

})



// document.onkeypress = function(evt) {
//     evt = evt || window.event;
//     var charCode = evt.keyCode || evt.which;
//     var charStr = String.fromCharCode(charCode)
//     console.log(charStr)
// }

// $("button[type='submit']").on('click', function() {
//     event.preventDefault()
//     const userText = $("textarea").val().trim()
//     console.log('I clicked the submit button')
//     console.log('userText', userText)
//     $('#textareaData').text($('textarea').val())

//     const options = {
//         contentType: 'application/json',
//         data: JSON.stringify({ userText }),
//         dataType: 'json',
//         type: 'POST',
//         url: 'test_post'
//     };

//     $.ajax(options)
//     .done((data) => {

//         console.log('data', data)
//         console.log('finished posting')
//     })
//     .fail(($xhr) => {
//         console.log('there has been a failure')
//     })


// })


// $("#testButton").on('click', function() {
//     event.preventDefault()
//     console.log('I am clicking on the test button')
//     const options = {
//         contentType: 'application/json',
//         dataType: 'json',
//         type: 'GET',
//         url: 'test_json'
//     };

//     $.ajax(options)
//     .done((jsonFileData) => {
//         console.log('json data', jsonFileData)
//         console.log('jsonFileData.tones', jsonFileData.tones)

//        $("#watsonData").append($("<h3>").text(jsonFileData.category_name)) //category title
        
//        const $ul =  $("<ul>")
//         $.each(jsonFileData.tones, function(index, value) {
//             $ul.append($("<li>").text(value.tone_name + ' ').append($("<span>").text(value.score)))
//         })
        
//         $("#watsonData").append($ul)

//     })

// })


// $('textarea').val()
// var Delta = Quill.import('delta');
// var quill = new Quill('#editor', {
//  modules: {
//      toolbar: true
//  },
//  placeholder: 'Compose an epic...',
//  theme: 'snow'
// });

// var change = new Delta();
// quill.on('text-change', function(delta){
//     change = change.compose(delta)
// })

// console.log('change', quill.getContents())

// $('button').on('click', function() {
//     console.log('change on click', change.ops[1].insert)
//     //  console.log('quill.getContents() inside click', quill.getContents())

//     const options = {
//         contentType: 'application/json',
//         data: JSON.stringify(change),
//         dataType: 'json',
//         type: 'POST',
//         url: 'test_post'
//     };

//     $.ajax(options)
//     .done((data) => {
//         const parsedData = data.ops[1].insert

//         $('#data').text(parsedData)
//         console.log('data', data)
//         console.log('finished posting')
//     })
    
// })

})()
