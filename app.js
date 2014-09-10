/**
 * 
 */

var request = require("request");
var uaProvider = require("./UserAgentProvider");

var headersMain = 
{
	'Host': 'mojburger.mcdonalds.pl',
	'Connection': 'keep-alive',
	'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
	'User-Agent': uaProvider.getRandom(),
	'Accept-Encoding': 'gzip,deflate,sdch',
	'Accept-Language': 'en-US,en;q=0.8'
}

var headersBurgers = 
{
	'Host': 'mojburger.mcdonalds.pl',
	'Connection': 'keep-alive',
	'Accept': 'application/json, text/javascript, */*; q=0.01',
	'X-Requested-With': 'XMLHttpRequest',
	'User-Agent': uaProvider.getRandom(),
	'Referer': 'http://mojburger.mcdonalds.pl/detail/540f519f0a73c',
	'Accept-Encoding': 'gzip,deflate,sdch',
	'Accept-Language': 'en-US,en;q=0.8'
}

var headersCaptcha = 
{
	'Host': 'mojburger.mcdonalds.pl',
	'Connection': 'keep-alive',
	'Accept': 'application/json, text/javascript, */*; q=0.01',
	'X-Requested-With': 'XMLHttpRequest',
	'User-Agent': uaProvider.getRandom(),
	'Referer': 'http://mojburger.mcdonalds.pl/detail/540f519f0a73c',
	'Accept-Encoding': 'gzip,deflate,sdch',
	'Accept-Language': 'en-US,en;q=0.8'
}

reqMain()

function reqMain()
{
	request(
			{
				uri: "http://mojburger.mcdonalds.pl/detail/540f519f0a73c",
				method: "GET",
				headers: headersMain
		},
		
		function(error, response, body) 
		{
			console.log(response.headers)
			reqBurgers()
		}
	)
}

function reqBurgers()
{
	request(
			{
				uri: "http://mojburger.mcdonalds.pl/services/stats",
				method: "GET",
				headers: headersBurgers
		},
		
		function(error, response, body) 
		{
			console.log(response.headers)
			var myburger = response.headers['set-cookie'][0].split(";")[0]
			headersCaptcha.Cookie = myburger
			reqCaptcha()
		}
	)
}

function reqCaptcha()
{
	request(
			{
				uri: "http://mojburger.mcdonalds.pl/services/captcha",
				method: "GET",
				headers: headersCaptcha
		},
		
		function(error, response, body) 
		{
			console.log(headersCaptcha)
			var myburger = response.headers['set-cookie'][0].split(";")[0]
			headersCaptcha.Cookie = myburger
			htmlCaptcha = JSON.parse(body.substring(1)).data.captcha
			solveCaptcha(htmlCaptcha)
		}
	)
}

function solveCaptcha(htmlCaptcha)
{
	domCaptcha = $.parseHTML(htmlCaptcha)
}