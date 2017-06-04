# The Rush
Solution to [theScore's interview question](https://github.com/tsicareers/nfl-rushing).

### Installation and running this solution
Clone into the repo:
```
git clone http://github.com/nficca/nfl-rushing
cd nfl-rushing
```
Ensure you have [ruby](https://www.ruby-lang.org/en/downloads/) and [bundler](http://bundler.io/) installed, then run:
```
bundle install
bundle exec rails db:create db:migrate
```
You may now see the web app running at `localhost:3000` after running:
```
bundle exec rails server
```
You'll notice, however, that there's no data. You can import data like so:
```
bundle exec script/import_rushings rushing.json
```
You may also supply your own json file as long as it is in the same format as `rushing.json`.
