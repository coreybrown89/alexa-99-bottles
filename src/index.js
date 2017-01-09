/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * App ID for the skill
 */
 var APP_ID = "amzn1.ask.skill.e4cb6118-5cb2-4d6b-86b7-4e38c747f6e6";

/**
 * Array containing beer facts.
 */
var FACTS = [
    "The first beer bottle was sold in eighteen fifty.",
    "The oldest beer advertisement was found on a clay tablet from four thousand B. C.",
    "The oldest known recipe is for a four-thousand-year-old beer made by the Sumerians.",
    "The first professional brewers were all women called brewsters. For many cultures, you had to be considered very beautiful to be a brewer.",
    "A beer expert is called a Cerevisaphile. A word derived from the Latin name of the Roman goddess of agriculture, Ceres, meaning strength",
    "Workers who worked on the Pyramids of Egypt were often partially paid in beer. Workers received about four liters of beer a day.",
    "A Babylonian king demanded that his countrymen should have a daily ration of beer.",
    "Ancient Babylonians first brewed beer. They were so serious about it that if anyone brewed a bad batch, they would be drowned in it as punishment.",
    "Chicha is a traditional Peruvian corn beer that is said to date back to the Incan times. Its extremely strange secret ingredient being. Spit.",
    "In early Mesopotamia, now Iran, beer was made from delectable barley, but since nineteen seventy-nine, the production and consumption of beer are punishable under Islamic law.",
    "In the nineteen century, nursing mothers in Germany would drink up to seven pints of beer a day.",
    "Hops. The bittering agent in beer, belong to the family of Cannabaceae, a close cousin of marijuana.",
    "Brown bottles help keep beer fresh.",
    "Women who drink two to three beers a day become smarter and increase their cognitive functioning skills.",
    "Belguim boasts of the largest beer brands in the world.",
    "Beer commercials in America are not allowed to show anyone consuming alcohol.",
    "The Average American consumes twenty-three gallons of beer in a year.",
    "Obama is the first President in history to brew his own beer. He personally pays for the equipment and ingredients. White House Honey Ale is brewed by the White House chefs.",
    "The best beer in the world is Westvleteren twelve. It is a ten point two percent, alcohol by volume, Trappist beer that has been in production since nineteen forty.",
    "Ethanol, the intoxicant in beer, is a very powerful antiseptic.",
    "A nineteenth-century shipwreck near Finland carried the oldest drinkable beer in the world which was found to taste very old, with some burnt notes and an acidic aftertaste.",
    "Beer strengthens bones; it has a high level of silicon which increases the calcium deposits and minerals for bone tissue.",
    "One, twelve-ounce bottom of beer creates protective levels of plasma antioxidants that can prevent heart disease.",
    "According to a study from the London Business School, political differences dictate American beverage choice. Conservatives prefer domestic pours such as Busch to imports like Guinness.",
    "To pour a perfect pint of Guinness you need to let it rest for exactly one-hundred-nineteen point five seconds between the first pour and the top-up, a period called the surge and settle.",
    "Storing beer upright reduces the chance of oxidation and contamination from the cap.",
    "Vielle Bon Secours is by far the most expensive been, sold only at Bierdrome in London at seven hundred pounds, or eight hundred and seventy dollars.",
    "The first modern American I-P-A was Anchor Liberty Ale.",
    "North Dakota drinks more beer per person than any other state in the U S.",
    "Seven point three million liters of beer were severed at Oktoberfest in two thousand fifteen.",
    "Mississippi and Alabama legalized homebrewing in two thousand thirteen.",
    "Every American craft brewery combined employs fewer people than Anheuser-Busch",
    "The Belgian double, spelled d-u-b-b-e-l, is named that way because people back then were illiterate",
    "The thirty-three on Rolling Rock bottles has no known meaning.",
    "During Prohibition, people were prescribed medical beer",
    "Yingling is America's largest craft brewery.",
    "With only ice and salt, you can fully chill a beer in two minutes",
    "People were drinking beer five thousand years ago",
    "Abraham Lincoln taxed beer to help pay for the Civil War",
    "The only drinks that are more widely consumed worldwide than beer are water and tea",
    "In 1814 London suffered the Great Beer Flood when about 388,000 gallons of beer flooded the streets around Tottenham Court Road after vats in a brewery ruptured",
    "In Medieval Britain, more beer was drunk than water as the alcohol made it safer.",
    "People in the Czech Republic drink more beer than anywhere else, an average amount of one hundred forty-three liters per head."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

var Fact = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Fact.prototype = Object.create(AlexaSkill.prototype);
Fact.prototype.constructor = Fact;

Fact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Fact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Fact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Fact.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say tell me a beer fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random beer fact from the beer facts list
    var factIndex = Math.floor(Math.random() * FACTS.length);
    var randomFact = FACTS[factIndex];

    // Create speech output
    var speechOutput = "Did you know?: " + randomFact;
    var cardTitle = "Your Fact";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the Beer Facts skill.
    var fact = new Fact();
    fact.execute(event, context);
};

