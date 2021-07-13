## Stock portfolio monitor (course project)

Enter which stocks and ETFs you bought on US stock market, and it will show how much profit you got last week, month or year. Graphs will show price change over time.

Features:
* Add, edit, delete stock symbols in portfolio
* Search stock symbols by ticker, company name or description
* Display current price near buy price
* Calculate profits in USD and percents for week, month or year. Total profit and per stock.
* 2 graphs below each other for comparison: candlestock graph for selected stock and total profit graph for all stocks
* Support for same stock bought on different days and with different price
* Lazy loading of data. When you click on "1 month", then month data are loaded. But when you click between "1 week" and "1 month" several times, then data are not loaded again each time.
* API errors are displayed on UI
* Uses free version of API from https://finnhub.io/ . It has rate limits per minute, so if you ran into limit and got an error, just wait a minute. Also only US stocks are accessible.

# Demo
http://stock-portfolio-monitor-elegorod.surge.sh/
