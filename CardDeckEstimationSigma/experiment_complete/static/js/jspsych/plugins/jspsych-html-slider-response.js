/**
 * jspsych-html-slider-response
 * a jspsych plugin for free response survey questions
 *
 * Josh de Leeuw
 *
 * documentation: docs.jspsych.org
 *
 */


jsPsych.plugins['html-slider-response'] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'html-slider-response',
    description: '',
    parameters: {
      stimulus: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus',
        default: undefined,
        description: 'The HTML string to be displayed'
      },
	  
	  feedbackgraph: {
		  type: jsPsych.plugins.parameterType.HTML_STRING,
		  pretty_name: 'feedbackgraph',
	  	  default: 0,
		  description: 'Displays the feedbackgraph'
	  },
	  
	  hazardgraph: {
		  type: jsPsych.plugins.parameterType.HTML_STRING,
		  pretty_name: 'hazardgraph',
	  	  default: 0,
		  description: 'Displays the hazardgraph'
	  },
	  sigmagraph: {
		  type: jsPsych.plugins.parameterType.HTML_STRING,
		  pretty_name: 'sigmagraph',
	  	  default: 0,
		  description: 'Displays the sigmagraph'
	  },
	  previousoutcome: {
		  type: jsPsych.plugins.parameterType.HTML_STRING,
		  pretty_name: 'previousoutcome',
	  	  default: 0,
		  description: 'Displays the previous error'
	  },
	  previousprediction: {
		  type: jsPsych.plugins.parameterType.HTML_STRING,
		  pretty_name: 'previousprediction',
	  	  default: 0,
		  description: 'Displays the previous error'
	  },
      min: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Min slider',
        default: 0,
        description: 'Sets the minimum value of the slider.'
      },
      max: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Max slider',
        default: 100,
        description: 'Sets the maximum value of the slider',
      },
      start: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Slider starting value',
        default: 0,
        description: 'Sets the starting value of the slider',
      },
      step: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Step',
        default: 1,
        description: 'Sets the step of the slider'
      },
      labels: {
        type: jsPsych.plugins.parameterType.KEYCODE,
        pretty_name:'Labels',
        default: [],
        array: true,
        description: 'Labels of the slider.',
      },
      button_label: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Button label',
        default:  'Continue',
        array: false,
        description: 'Label of the button to advance.'
      },
      prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null,
        description: 'Any content here will be displayed below the slider.'
      },
      stimulus_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus duration',
        default: null,
        description: 'How long to hide the stimulus.'
      },
      trial_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Trial duration',
        default: null,
        description: 'How long to show the trial.'
      },
      response_ends_trial: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Response ends trial',
        default: true,
        description: 'If true, trial will end when user makes a response.'
      },
      choices: {
        type: jsPsych.plugins.parameterType.KEYCODE,
        array: true,
        pretty_name: 'Choices',
        default: jsPsych.ALL_KEYS,
        description: 'The keys the subject is allowed to press to respond to the stimulus.'
      },
    }
  }


  plugin.trial = function(display_element, trial) {
	
    var html = '<div id="jspsych-html-slider-response-wrapper" style="margin: 0px 0px;">';
	html += '<canvas id="jspsych-html-slider-response-hazardgraph" height="100" width="400">' + trial.graph + '</canvas>';
	html += '<br></br>'
	html += '<canvas id="jspsych-html-slider-response-sigmagraph" height="100" width="400">' + trial.graph + '</canvas>';
	html += '<div id="jspsych-html-slider-response-stimulus" <p> Current Card:</p>'
	html += '<p style="border:3px; border-style:solid; border-color:#120A2A; font-size:30px; border-radius: 5px; width: 70px; height: 100px; margin:auto';
	html += '"jspsych-html-slider-response-container" style="position:center;">' + '<br>' + trial.stimulus;
	html += '<p style="font-size:26px" style="margin:-4px"><b><i>Which deck did this card come from?</i></b></p>'
	html += '<p style="font-size:21px" style="margin:-4px">Your guess: please enter a number 0-5000 and hit enter</p>'
	html += '<input type="text" autofocus="autofocus" value="'+trial.start+'" min="'+trial.min+'" max="'+trial.max+'" step="'+trial.step+'" style="width: 30%;" id="jspsych-html-slider-response-response"></input>';
	if(trialnumber <= 40){
	html += '<div class="jspsych-html-slider-response-previousoutcome" <p> Correct Deck Choice for Previous Trial:</p>'
	html += '<p style="border:3px; border-style:solid; border-color:#FF0000; font-size:30px; border-radius: 5px; width: 70px; height: 100px; margin:auto">' + '<br>' + trial.previousoutcome;
	html += '<p> Your Deck Choice for Previous Trial:</p>'
	html += '<p style="border:3px; border-style:solid; border-color:#0101DF; font-size:30px; border-radius: 5px; width: 70px; height: 100px; margin:auto">' + '<br>' + trial.previousprediction + '</div>';
	}
	html += '<br></br>'
	html += '<canvas id="jspsych-html-slider-response-feedbackgraph" height="200" width="400">' + trial.feedbackgraph + '</canvas>';
	html += '<div>'
    for(var j=0; j < trial.labels.length; j++){
      var width = 100/(trial.labels.length-1);
      var left_offset = (j * (100 /(trial.labels.length - 1))) - (width/2);
      html += '<div style="display: inline-block; position: absolute; left:'+left_offset+'%; text-align: center; width: '+width+'%;">';
      html += '<span style="text-align: center; font-size: 80%;">'+trial.labels[j]+'</span>';
      html += '</div>'
    }
    html += '</div>';
    html += '</div>';
    html += '</div>';
	

	

    if (trial.prompt !== null){
      html += trial.prompt;
    }

    // add submit button
    html += '<button id="jspsych-html-slider-response-next" class="jspsych-btn2">'+trial.button_label+'</button>';

    display_element.innerHTML = html;
	
	

    var response = {
      rt: null,
      response: null
    };
	

	stuff = [0,0,0,0,0,0,0]
	var ctx = document.getElementById("jspsych-html-slider-response-feedbackgraph");
	var myChart = new Chart(ctx, {
	    type: 'bar',
		options: {
			title: {
			            display: true,
			            text: 'Average Error Rates: Lower is Better'
			        },
		        scales: {
		          xAxes: [{
		            display: true
		          }],
		          yAxes: [{
					  ticks: {
		            display: false
					  },
		          }],
		        },
			},
	    data: {
	    labels: ["Rick", "Bob", "Yoshi","Pauline", "Odie", "Beth", "User"],
	      datasets: [{
	      label:"Move your mouse over the bars to see error numbers",
	      data: stuff,
  			
	        backgroundColor: ['rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
			  	'rgba(0,0,0,0.2)',
			  	'rgba(0,0,0,1)'
		  ],
					pointBackgroundColor :"rgb(255, 99, 132)",

	      					}]
	           },
	
	  })
	  function FeedBackChanger(FeedBackUpdate){
	  myChart.data.datasets[0].data = FeedBackUpdate; 
	  myChart.update();  
  		}
	FeedBackChanger(trial.feedbackgraph)
		
		
	var hvs = document.getElementById('jspsych-html-slider-response-hazardgraph')
	var width = hvs.width;
	var height = hvs.height;
	var htx = hvs.getContext("2d");
	
	function showhtx(indicatorlocation){
	htx.fillStyle = "bbbbc0";
	htx.fillRect(0,50,400,2);

	htx.fillRect(0,20,5,60);

	htx.fillRect(395,20,5,60);

	htx.fillStyle = "gold"
	htx.fillRect(indicatorlocation,40,20,30);
	
	htx.fillStyle = "black"
	htx.font = "20px Arial"
	htx.fillText("Rarely",10,95)
	htx.fillText("Frequently",300,95)
	htx.fillText("How often we switch decks",100,20)
}

	showhtx(trial.hazardgraph)

	var svs = document.getElementById('jspsych-html-slider-response-sigmagraph')
	var width = svs.width;
	var height = svs.height;
	var stx = svs.getContext("2d");
	
	function showstx(indicatorlocation){
	stx.fillStyle = "bbbbc0";
	stx.fillRect(0,50,400,2);

	stx.fillRect(0,20,5,60);

	stx.fillRect(395,20,5,60);

	stx.fillStyle = "gold"
	stx.fillRect(indicatorlocation,40,20,30);
	
	stx.fillStyle = "black"
	stx.font = "20px Arial"
	stx.fillText("Low",10,95)
	stx.fillText("High",350,95)
	stx.fillText("Randomness of the cards in each deck",40,20)
}

	showstx(trial.sigmagraph)
	
// Enable navigation prompt
window.onbeforeunload = function() {
    return true;
};

document.addEventListener("contextmenu", function(e){
    e.preventDefault();
}, false); 

$('input[id=jspsych-html-slider-response-response]').focus();


    /*display_element.querySelector('#jspsych-html-slider-response-next').addEventListener('click', function() {
      // measure response time
      var endTime = (new Date()).getTime();
      response.rt = endTime - startTime;
      response.response = display_element.querySelector('#jspsych-html-slider-response-response').value;
	  console.log(display_element.querySelector('#jspsych-html-slider-response-response').value)
	  if(isNaN(display_element.querySelector('#jspsych-html-slider-response-response').value))
		  {response.response = prompt("Please Enter a Number")
  			if(isNaN(response.response) || response.response == null){
  				response.response = prompt("Please Enter a Number")
  			}}

      if(trial.response_ends_trial){
        end_trial();
      } else {
        display_element.querySelector('#jspsych-html-slider-response-next').disabled = true;
      }

    });
	*/
	// KEYBOARD ENTER
    var after_response = function(info) {

      // after a valid response, the stimulus will have the CSS class 'responded'
      // which can be used to provide visual feedback that a response was recorded

      // only record the first response
      if (response.key == null) {
        response = info;
      }

      if (trial.response_ends_trial) {
		  
	      var endTime = (new Date()).getTime();
	      response.rt = endTime - startTime;
	      response.response = display_element.querySelector('#jspsych-html-slider-response-response').value;
		  console.log(display_element.querySelector('#jspsych-html-slider-response-response').value)
		  if(isNaN(display_element.querySelector('#jspsych-html-slider-response-response').value))
			  {response.response = prompt("Please Enter a Number")
	  			if(isNaN(response.response) || response.response == null){
	  				response.response = prompt("Please Enter a Number")
	  			}}
        end_trial();
      }
    };

    // start the response listener
    if (trial.choices != jsPsych.NO_KEYS) {
      var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: trial.choices,
        rt_method: 'date',
        persist: false,
        allow_held_key: false
      });
    }
	
	
	
    function end_trial(){

      jsPsych.pluginAPI.clearAllTimeouts();

      // save data
      var trialdata = {
        "rt": response.rt,
        "response": response.response,
        "stimulus": trial.stimulus
      };

      display_element.innerHTML = '';

      // next trial
      jsPsych.finishTrial(trialdata);
    }

    if (trial.stimulus_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        display_element.querySelector('#jspsych-html-slider-response-stimulus').style.visibility = 'hidden';
      }, trial.stimulus_duration);
    }

    // end trial if trial_duration is set
    if (trial.trial_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, trial.trial_duration);
    }

    var startTime = (new Date()).getTime();
  };

  return plugin;
})();
