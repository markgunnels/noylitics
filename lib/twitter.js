var sys      = require('sys');
var path     = require('path');
var events   = require('events');
var stats    = require('../lib/stats');
var utils    = require('../lib/utils');
var TwitterNode = require('../deps/twitter-node/lib').TwitterNode;

var twitter = exports;

var TwitterCollector = exports.TwitterCollector = function(query) {
    this.twitterNode = new TwitterNode({
	user: 'noylitics', 
	password: 'n0ylitics',
	track: [query]
    });
};

twitter.TwitterCollector.prototype = Object.create(events.EventEmitter.prototype);

TwitterCollector.prototype.onTweet = function(tweet) {
    sys.puts(tweet.text);
    this.emit('tweet', tweet.user.screen_name, tweet.text);

    //count
    var count = {};
    var urls = utils.urlMatch(tweet.text);    
    count['url'] = urls;
    count['author'] = [tweet.user.screen_name]; 
    this.emit('count', count);

    //rater
    if(tweet.text.indexOf("rate") >= 0) {
	sys.puts("??????????????????????????????????? RATING ??????????????????????????????");
	rating = utils.parseRate(tweet.text);
	if(rating != {}) {
	    this.emit('rating', rating['title'], rating['value']);
	}
    }
}

TwitterCollector.prototype.run = function() {
    var onTweet = stats.createBoundedWrapper(this, this.onTweet);
    this.twitterNode.addListener('tweet', onTweet).stream();    
}
