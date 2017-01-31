'use strict';
module.change_code = 1;
var _ = require('lodash');
var Skill = require('alexa-app');
var CTM_SESSION_KEY = 'chicken_tikka_masala';
var skillService = new Skill.app('chicken-tikka-masala');
var ChickenTikkaMasalaHelper = require('./chicken-tikka-masala_helper');
var DatabaseHelper = require('./database_helper');
var databaseHelper = new DatabaseHelper();

var getChickenTikkaMasalaHelper = function(chickenTikkaMasalaHelperData) {
  if (chickenTikkaMasalaHelperData === undefined) {
    chickenTikkaMasalaHelperData = {};
  }
  return new ChickenTikkaMasalaHelper(chickenTikkaMasalaHelperData);
};

var getChickenTikkaMasalaHelperFromRequest = function(request) {
  var chickenTikkaMasalaHelperData = request.session(CTM_SESSION_KEY);
  return getChickenTikkaMasalaHelper(chickenTikkaMasalaHelperData);
};



var chickenTikkaMasalaIntentFunction = function(chickenTikkaMasalaHelper, request, response) {
  console.log(chickenTikkaMasalaHelper);
  if (chickenTikkaMasalaHelper.completed()) {
    response.say('Congratulations! Your Chicken Tikka Masala is complete!');
    response.shouldEndSession(true);
  } else {
    response.say(chickenTikkaMasalaHelper.getPrompt());
    response.reprompt("I didnt hear you. " + chickenTikkaMasalaHelper.getPrompt());
    response.shouldEndSession(false);
  }
  response.session(CTM_SESSION_KEY, chickenTikkaMasalaHelper);
  response.send();
};





skillService.intent('saveChickenTikkaMasalaIntent', {
    'utterances': ['{save} {|a|the|my} {chicken tikka masala | tikka masala | chicken masala | chicken |  masala | tikka}']
  },
  function(request, response) {
    var chickenTikkaMasalaHelper = getChickenTikkaMasalaHelperFromRequest(request);
    saveChickenTikkaMasala(chickenTikkaMasalaHelper, request);
    response.say('Your Chicken Tikka Masala progress has been saved!');
    response.shouldEndSession(true).send();
    return false;
  }
);



skillService.intent('loadChickenTikkaMasalaIntent', {
    'utterances': ['{load|resume} {|a|the} {|last} {chicken tikka masala | tikka masala | chicken masala | chicken |  masala | tikka}']
  },
  function(request, response) {
    var userId = request.userId;
    databaseHelper.readChickenTikkaMasalaData(userId).then(function(result) {
      return (result === undefined ? {} : JSON.parse(result['data']));
    }).then(function(loadedChickenTikkaMasalaData) {
      var ChickenTikkaMasalaHelper = new ChickenTikkaMasalaHelper(loadedChickenTikkaMasalaData);
      return chickenTikkaMasalaIntentFunction(ChickenTikkaMasalaHelper, request, response);
    });
    return false;
  }
);




skillService.intent('advanceStepIntent', {
    'utterances': ['{next|advance|continue}']
  },
  function(request, response) {
    var chickenTikkaMasalaHelper = getChickenTikkaMasalaHelperFromRequest(request);
    chickenTikkaMasalaHelper.currentStep++;
    chickenTikkaMasalaIntentFunction(chickenTikkaMasalaHelper, request, response);
  }
);



skillService.launch(function(request, response) {
  var prompt = 'Welcome to chicken tikka masala! To start cooking, say cook chicken tikka masala';
  response.say(prompt).shouldEndSession(false);
});




skillService.intent('ChickenTikkaMasalaIntent', {
    'utterances': ['{new|start|create|begin|build|make|cook} {|a|the} {chicken tikka masala | tikka masala | chicken masala}']
  },
  function(request, response) {
    var chickenTikkaMasalaHelper = new ChickenTikkaMasalaHelper({});
    chickenTikkaMasalaIntentFunction(chickenTikkaMasalaHelper, request, response);
  }
);


var saveChickenTikkaMasala = function(cakeBakerHelper, request) {
  var userId = request.userId;
  databaseHelper.storeCakeBakerData(userId, JSON.stringify(cakeBakerHelper))
    .then(function(result) {
      return result;
    }).catch(function(error) {
      console.log(error);
    });
};

skillService.intent('AMAZON.HelpIntent', {},
  function(request, response) {
	var chickenTikkaMasalaHelper = getChickenTikkaMasalaHelperFromRequest(request);
    var help = 'Welcome to chicken tikka masala.' +
      'To start a new recipe, say create a chicken tikka masala.' +
      'You can also say stop or cancel to exit.';
    if (chickenTikkaMasalaHelper.started) {
      help = chickenTikkaMasalaHelper.getStep().help;
    }
    response.say(help).shouldEndSession(false);
  });
  
  
  
  var chickenTikkaMasalaHelper = function(chickenTikkaMasalaData) {
  if (chickenTikkaMasalaData === undefined) {
    chickenTikkaMasalaHelperData = {};
  }
  return new MadlibHelper(chickenTikkaMasalaHelperData);
};
var cancelIntentFunction = function(req, res) {
  res.say('Goodbye!').shouldEndSession(true);
};

skillService.intent('AMAZON.CancelIntent', {}, cancelIntentFunction);
skillService.intent('AMAZON.StopIntent', {}, cancelIntentFunction);

module.exports = skillService;
