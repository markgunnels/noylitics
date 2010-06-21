var stats = require('./stats'),
    sys   = require('sys');

var counter = new stats.Counter();

counter.increment('test');
counter.increment('test');
counter.increment('sam');

sys.puts(counter.value('test'));
sys.puts(counter.value('sam'));

var rater = new stats.Rater();

rater.addRating('sam', 4);
rater.addRating('sam', 2);
sys.puts(rater.value('sam'));