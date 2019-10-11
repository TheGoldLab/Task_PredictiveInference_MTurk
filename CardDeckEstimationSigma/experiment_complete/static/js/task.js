var psiturk = new PsiTurk(uniqueId, adServerLoc, mode);
function quarter() {
  window.resizeTo(
    window.screen.availWidth,
    window.screen.availHeight
  );
}
quarter()

	var trialnumber = 1
    var timeline = [];
	var Previous_subject_response = []
	var SPnumber = 100;
		
	var block_number = 0;
	var block_column = Math.floor(Math.random() * 101);
	
	
	var feedbacknumbers = 0
	var hazardindicator = 1
	var sigmaindicator = 20;
	var reward = 60;
	var trials_per_block = 400
	
	var Sigma_check = 0;
	
	Subject_TrainingError_Array = []
	Subject_RealError_Array = []
	Subject_Error_Array = []
	var SubCumTrainingError = []
	var SubCumRealError = []
	var SubCumError = []
    
	   
	
	   function round(value, decimals) {
	     return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
	   }
	   

	   
	   var instructions1 = {
	   	   type: 'image-keyboard-response',
		   stimulus: 'static/images/instructionsP1.jpg',
		   post_trial_gap: 100,
	   }
	   
	   var instructions2 = {
	   	   type: 'image-keyboard-response',
		   stimulus: 'static/images/instructionsP2.jpg',
		   post_trial_gap: 100,
	   }
	   
	   var instructions3 = {
	   	   type: 'image-keyboard-response',
		   stimulus: 'static/images/instructionsP3.jpg',
		   post_trial_gap: 100,
	   }
	   
	   var instructions4 = {
	   	   type: 'image-keyboard-response',
		   stimulus: 'static/images/instructionsP4.jpg',
		   post_trial_gap: 100,
	   }
	   
	   var instructions5 = {
	   	   type: 'image-keyboard-response',
		   stimulus: 'static/images/instructionsP5.jpg',
		   post_trial_gap: 100,
	   }
	   
	   var instructions6 = {
	   	   type: 'image-keyboard-response',
		   stimulus: 'static/images/instructionsP6.jpg',
		   post_trial_gap: 100,
	   }
	   
	   var instructions7 = {
	   	   type: 'image-keyboard-response',
		   stimulus: 'static/images/instructionsP7.jpg',
		   post_trial_gap: 100,
	   }
	   
	   var instructions8 = {
		   type: 'html-keyboard-response',
		   stimulus: '<p>Press SpaceBar to begin.</p>',
		   post_trial_gap: 100,
	   }
	   

	   var Gender_options = ["Male", "Female", "Transgender", "Do Not Wish To Say"];
	   var Ethnicity_options = ["American Indian or Alaskan Native","Asian","Black or African American","Native Hawaiian or Pacific Islander","White","Hispanic or Latino","Other","Do Not Wish to Respond"]
	   var demographics = {
		   type: "survey-multi-choice",
		   questions: [{prompt:"Gender Orientation:", options: Gender_options, required:true,}, 
		   {prompt:"Ethnicity:", options: Ethnicity_options, required:true}],
	   };
	   var age = {
	     type: "survey-text",
	     questions: [{prompt: "How old are you?"}],
		   post_trial_gap: 100
	   };
  
  var trial = {
    type: 'html-slider-response',
    min: -100,
    max: 100,
    start: [],
    step: .01,
	choices: ['enter'],
	previousoutcome: [],
	previousprediction: [],
	hazardgraph: hazardindicator,
	sigmagraph: sigmaindicator,
	feedbackgraph: 0,
	Subjectprediction: SPnumber,
    stimulus:[],
	labels: [],
    prompt: '',
    response_ends_trial: true,
	  

	  on_start: function(trial){
		  trial.stimulus = ObservationActual.data[trialnumber][block_column]
		trial.graph = 0
		trial.minigraph = 0
		  
		  if(isNaN(Previous_subject_response)){
		  	Previous_subject_response = 2500
		  }
		  if(Previous_subject_response > 5000){
		  	Previous_subject_response = 2500
		  }
		  
		Subject_feedback_transform = Previous_subject_response;

		trial.previousoutcome = GenerativeMean.data[trialnumber-1][block_column]
			if(trialnumber <= 1){
				trial.previousoutcome = 0
				}  
		trial.previousprediction = Previous_subject_response
		
		  
		  
		switch (Sigma_check){
		  case 'R1':
			  trial.sigmagraph = 50
			  break;
		  case 'R80':
			  trial.sigmagraph = 150
			  break;
		  case 'R400':
		      trial.sigmagraph = 375
		      break;
		  default:
			  trial.sigmagraph = 0
			  break;
		  }
		  
		  
		  switch (Hazard_check){
		  case 'h10':
			  trial.hazardgraph = 40
			  break;
			  /*case 'h34':
			  trial.hazardgraph = 125
			  break;
		  case 'h80':
			  trial.hazardgraph = 325
			  break; */
		  }
		  if(trialnumber <=41){
			  AVD = trialnumber-1}
			  else{
				  AVD = trialnumber-41;		  	
			  }
			  console.log(AVD)
		  ErrorRow = [BayesError.data[trialnumber-1][block_column]/AVD, DR1Error.data[trialnumber-1][block_column]/AVD, DR2Error.data[trialnumber-1][block_column]/AVD, MLError.data[trialnumber-1][block_column]/AVD,SA1Error.data[trialnumber-1][block_column]/AVD,SA2Error.data[trialnumber-1][block_column]/AVD]

		  if(trialnumber != 1 && trialnumber <= 41){ 
		  Subject_Error = Math.abs(Subject_feedback_transform - GenerativeMean.data[trialnumber-1][block_column])
		  Subject_TrainingError_Array.push(Subject_Error)
	      SubCumTrainingError = Subject_TrainingError_Array.reduce((a,b) => a + b,0)
		  ErrorRow.push(SubCumTrainingError/AVD)

		  }
		   
		  if(trialnumber > 41){ 
		  Subject_Error = Math.abs(Subject_feedback_transform - GenerativeMean.data[trialnumber-1][block_column])
		  Subject_RealError_Array.push(Subject_Error)
	      SubCumRealError = Subject_RealError_Array.reduce((a,b) => a + b,0)
		  ErrorRow.push(SubCumRealError/AVD)

     	  } 
		  //ErrorRow = [BayesError.data[trialnumber-1][0], DR1Error.data[trialnumber-1][0], DR2Error.data[trialnumber-1][0], EvidenceError.data[trialnumber-1][0],MLError.data[trialnumber-1][0],SA1Error.data[trialnumber-1][0],SA2Error.data[trialnumber-1][0]]
		 
		  trial.feedbackgraph = ErrorRow
	  },
  	on_finish: function(){
  		  trialnumber += 1
    }
}
	  

  
  var block_number_reset = {
   type:"html-keyboard-response",
   stimulus: "Previous Block Completed. Loading numbers for a new block. The experiment will begin the next block in 2 minutes",
	  choices: jsPsych.NO_KEYS,
	  trial_duration: 120000,
	  on_start: function(data){
		trialnumber = 1;
		block_number = block_number + 1
		Subject_TrainingError_Array = []
		Subject_RealError_Array = []
		TestVar = block_conditions_shuffled[block_number]
		Observationloader()
		Generatorloader()
		SigmaCheck()
		HazardCheck()
		Bayesloader()
		DR1loader()
		DR2loader()
		//Evidenceloader()
		MLloader()
		SA1loader()
		SA2loader()
		

	  }
  }
    
  var first_block = {
		  timeline: [trial],
		  repetitions: trials_per_block
	  }
  
  var second_block = {
	  timeline: [trial],
	  repetitions: trials_per_block
  }
  
  var third_block = {
	  timeline: [trial],
	  repetitions: trials_per_block
  }
  
  // Generate Hazard Array  
  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
  
 
  //Push the timeline and number of reps
 
 timeline.push(demographics);
 timeline.push(age);

timeline.push(instructions1)
timeline.push(instructions2) 
timeline.push(instructions3) 
timeline.push(instructions4) 
timeline.push(instructions5) 
timeline.push(instructions6) 
timeline.push(instructions7)
timeline.push(instructions8) 

  
  
 
 
 timeline.push(first_block);
 timeline.push(block_number_reset)
 
 
 timeline.push(second_block)
 timeline.push(block_number_reset)
 
 timeline.push(third_block)
 
 

var block_conditions = ['_h10_R1', '_h10_R80','_h10_R400']
block_conditions_shuffled = shuffle(block_conditions)
 
var TestVar = block_conditions_shuffled[0]
 
 
 var ObservationData = $ .get(`static/images/xt${TestVar}.csv`, function(){

   ObservationActual = Papa.parse(ObservationData.responseText, {
	   dynamicTyping: true
   })
})

var GenerativeData = $ .get(`static/images/mut${TestVar}.csv`, function(){
	
	GenerativeMean = Papa.parse(GenerativeData.responseText, {
		dynamicTyping: true
	})
})


///////////////////////////////
 function Observationloader(){
	 var ObservationData = $ .get(`static/images/xt${TestVar}.csv`, function(){

   ObservationActual = Papa.parse(ObservationData.responseText, {
	   dynamicTyping: true
	   
	   
   })
   return ObservationData
})
}

function Generatorloader(){

var GenerativeData = $ .get(`static/images/mut${TestVar}.csv`, function(){
	
	GenerativeMean = Papa.parse(GenerativeData.responseText, {
		dynamicTyping: true
	})
	return GenerativeData
})
}
/////////////////////////

var BayesData = $ .get(`static/images/Estimations_Bayes${TestVar}.csv`, function(){

	BayesError = Papa.parse(BayesData.responseText, {
		dynamicTyping: true
	})
})

var DR1Data = $ .get(`static/images/Estimations_DR1${TestVar}.csv`, function(){

	DR1Error = Papa.parse(DR1Data.responseText, {
		dynamicTyping: true
	})
})

var DR2Data = $ .get(`static/images/Estimations_DR2${TestVar}.csv`, function(){

	DR2Error = Papa.parse(DR2Data.responseText, {
		dynamicTyping: true
	})
})

/*
var EvidenceData = $ .get(`static/images/Predictions_Evidence${TestVar}.csv`, function(){

	EvidenceError = Papa.parse(EvidenceData.responseText, {
		dynamicTyping: true
	})
})
*/
var MLData = $ .get(`static/images/Estimations_ML${TestVar}.csv`, function(){

	MLError = Papa.parse(MLData.responseText, {
		dynamicTyping: true
	})
})

var SA1Data = $ .get(`static/images/Estimations_SA1${TestVar}.csv`, function(){

	SA1Error = Papa.parse(SA1Data.responseText, {
		dynamicTyping: true
	})
})

var SA2Data = $ .get(`static/images/Estimations_SA2${TestVar}.csv`, function(){

	SA2Error = Papa.parse(SA2Data.responseText, {
		dynamicTyping: true
	})
})
/////////////////////////////
////////////////////////////

function Bayesloader(){

var BayesData = $ .get(`static/images/Estimations_Bayes${TestVar}.csv`, function(){

	BayesError = Papa.parse(BayesData.responseText, {
		dynamicTyping: true
	})
})
}

function DR1loader(){

var DR1Data = $ .get(`static/images/Estimations_DR1${TestVar}.csv`, function(){

	DR1Error = Papa.parse(DR1Data.responseText, {
		dynamicTyping: true
	})
})
}

function DR2loader(){

var DR2Data = $ .get(`static/images/Estimations_DR2${TestVar}.csv`, function(){

	DR2Error = Papa.parse(DR2Data.responseText, {
		dynamicTyping: true
	})
})
}


/*function Evidenceloader(){

var EvidenceData = $ .get(`static/images/Predictions_Evidence${TestVar}.csv`, function(){

	EvidenceError = Papa.parse(EvidenceData.responseText, {
		dynamicTyping: true
	})
})
}
*/
function MLloader(){

var MLData = $ .get(`static/images/Estimations_ML${TestVar}.csv`, function(){

	MLError = Papa.parse(MLData.responseText, {
		dynamicTyping: true
	})
})
}

function SA1loader(){

var SA1Data = $ .get(`static/images/Estimations_SA1${TestVar}.csv`, function(){

	SA1Error = Papa.parse(SA1Data.responseText, {
		dynamicTyping: true
	})
})
}
function SA2loader(){

var SA2Data = $ .get(`static/images/Estimations_SA2${TestVar}.csv`, function(){

	SA2Error = Papa.parse(SA2Data.responseText, {
		dynamicTyping: true
	})
})
}
///////////////////////////////////////

function SigmaCheck(){
var str = block_conditions_shuffled[block_number]
		R_Index = str.lastIndexOf('R')
		Sigma_check = str.substr(R_Index,20)
		return Sigma_check
}
SigmaCheck()

function HazardCheck(){
	var str = block_conditions_shuffled[block_number]
		Hazard_check = str.substr(1,3)
		return Hazard_check
}
HazardCheck()

//////////////////////////////
//Initalize experiment  
  jsPsych.init({
	  timeline: timeline,
	  preload: [ObservationData, GenerativeData, BayesData, DR1Data, DR2Data, MLData, SA1Data, SA2Data],
	  on_data_update: function(data){
		  jsPsych.data.get().addToLast({GenerativeMean: GenerativeMean.data[trialnumber-1][block_column]})
		  jsPsych.data.get().addToLast({ObservationActual: ObservationActual.data[trialnumber-1][block_column]})
		  jsPsych.data.get().addToLast({Sigma0: Sigma_check})
		  jsPsych.data.get().addToLast({Hazard: Hazard_check})
		  jsPsych.data.get().addToLast({Block_Column: block_column})
		  jsPsych.data.get().addToLast({SubjectTrainingErrorCumulative:SubCumTrainingError})
		  jsPsych.data.get().addToLast({SubjectErrorCumulative:SubCumRealError})
		  psiturk.recordTrialData(data);
		  var raw_data = jsPsych.data.get().select('response');
		  var placement = raw_data.values.length
		  Previous_subject_response = raw_data.values[placement-1];
	  },
    on_finish: function(){
		window.onbeforeunload = null;
		
		TheBonus = 0 
		psiturk.recordUnstructuredData("bonus", TheBonus
		/*jsPsych.data.get()
		.filter([{RedMean: first}])
		.select('RedMean')
		.mean() */
	);
		psiturk.saveData({
			success: function(){
			psiturk.computeBonus("compute_bonus", function() {
				psiturk.completeHIT();
				});
			}
		});
	},
});