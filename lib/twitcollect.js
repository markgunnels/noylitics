var sys          = require('sys');
var path         = require('path');
var events       = require('events');
var http         = require('http');
var twitter-node = require('../deps/twitter-node');

var twitcollect = exports;

/**
 * The Rater keeps a list of identifiers and the ratings assigned to 
 * it.
 * @constructor
 */
twitcollect.Collector = function(counter, rater) {
    this.counter = counter;
    this.rater = rater;
    this.twitter  = new twitter-node.TwitterNode({
	user: 'noylitics', 
	password: 'n0ylitics',
	track: ['convergese']
    });
};

twitcollect.Collector.prototype = {
    
    /**
     * Is the rater currently tracking the identifier?
     * @returns true if tracking, false if not
     */
    identifierExists : function(identifier) {
  	return this.rateables.hasOwnProperty(identifier);
    },

    /**
     * Adds a rating to the identifier.
     */
    addRating : function(identifier, rating)
    {	
	var currentRateables = [];
   	if(this.identifierExists(identifier))
   	{
	    currentRateables = this.rateables[identifier];
   	}
	currentRateables.push(rating)
	this.rateables[identifier] = currentRateables;
    },
    
    /**
     * Returns the average rating of the identifier.
     */
    value : function(identifier) 
    {
	var ratings = this.rateables[identifier];
	sys.puts(ratings.sum());
	return (ratings.sum()/ratings.length);
    }

};
