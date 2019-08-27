# MetricsApp
Static testing environment for metrics pulling app

## How to use the metrics app

First, paste the video Id into the input field. Check all fields that you want to be included in the request. Set the limit to the number of metrics you would like to receive in the response. These will start with the most recent from the current time or the start date if you specify one. By default this is set to -1, meaning the system will respond with all available metrics within the given timeframe.

Next select whether you would like to filter out metrics from WireWax (the IP addresses for the London and New York office), and if you would like to filter out metrics recorded on embed.wirewax.com/embed.wirewax.tv. By default these are both blocked.

If you would like to limit your request to fall between a specific date range you can set the start and end date using the optional date pickers.

Next, if you would like to sort the metrics by specific fields you can select a field from the sort by dropdown. By default this is toggled off (set to don't sort) but it can be set to filter all metrics by embed location (URL), browsers, and devices.

Finally select all services you would like the report to contain. If you are requesting custom metrics make sure to change the format to old if you are requesting metrics for an old video that may of been using the old metric format.

That's really all there is to it. Once you have the form field out just hit the submit button and your download should begin shortly!
