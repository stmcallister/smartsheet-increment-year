# Smartsheet Increment Year
Node.js sample for updating date values in Smartsheet

This is a sample shows the following using the [smartsheet-javascript-sdk](https://github.com/smartsheet-platform/smartsheet-javascript-sdk):

* Get Sheet
* Update Row

## Scenario
I have a sheet where I keep track of a list of birthdays. An email notification is set up to remind me of these birthdays as they approach each year. 
This is great, except for the list is getting long, and each year I need to update the year on each date. This script - implimented as a scheduled cron job - automates that date increment process.

## Setup
* Generate a [Smartsheet Access Token](http://smartsheet-platform.github.io/api-docs/#direct-api-access)
* Get your Sheet ID from the Sheet Properties in the Smartsheet UI.

## Samples
There are three samples in this project.
* smartsheet-increment-year.js - imperative approach to parsing Smartsheet data
* smartsheet-increment-year-function.js - functional approach using map() and filter() functions
* smartsheet-increment-year-function-webtask.js - functional approach that can be used in an [Auth0 Webtask](https://webtask.io/)

