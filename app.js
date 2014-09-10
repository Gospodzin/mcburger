/**
 * 
 */

 
var cheerio = require("cheerio")
var request = require("request")
var uaProvider = require("./UserAgentProvider")
var captchaSolver = require("./CaptchaSolver")

var myburger = null

var control =
[{op: reqMain, parms: null},
 {op: reqStats, parms: null},
 {op: reqCaptcha, parms: null},
 {op: reqToken, parms: null},
 {op: reqVotes, parms: null}]

var headersMain = 
{
	'Host': 'mojburger.mcdonalds.pl',
	'Connection': 'keep-alive',
	'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
	'User-Agent': uaProvider.getRandom(),
	'Accept-Encoding': 'gzip,deflate,sdch',
	'Accept-Language': 'en-US,en;q=0.8'
}

var headers = 
{
	'Host': 'mojburger.mcdonalds.pl',
	'Connection': 'keep-alive',
	'Accept': 'application/json, text/javascript, */*; q=0.01',
	'X-Requested-With': 'XMLHttpRequest',
	'User-Agent': headersMain['User-Agent'],
	'Referer': 'http://mojburger.mcdonalds.pl/detail/540f519f0a73c',
	'Accept-Encoding': 'gzip,deflate,sdch',
	'Accept-Language': 'en-US,en;q=0.8'
}

var postHeaders =
{
	'Host': 'mojburger.mcdonalds.pl',
	'Connection': 'keep-alive',
	'Content-Length': '124',
	'Origin': 'http://mojburger.mcdonalds.pl',
	'User-Agent': headersMain['User-Agent'],
	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
	'ci_csrf_token': '',
	'Accept': '*/*',
	'X-Requested-With': 'XMLHttpRequest',
	'Referer': 'http://mojburger.mcdonalds.pl/detail/540f519f0a73c',
	'Accept-Encoding': 'gzip,deflate,sdch',
	'Accept-Language': 'en-US,en;q=0.8'
}

reqMain()

function extractImages(n)
{
	console.log(n)
	if(n > 0)
		setTimeout(function(){reqMain();extractImages(n-1);}, Math.random() * 5000);
}

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
			console.log("MAIN")
			reqStats()
		}
	)
}

function reqStats()
{
	request(
			{
				uri: "http://mojburger.mcdonalds.pl/services/stats",
				method: "GET",
				headers: headers
		},
		
		function(error, response, body) 
		{
			console.log("STATS")
			myburger = response.headers['set-cookie'][0].split(";")[0]
			headers.Cookie = myburger
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
				headers: headers
		},
		
		function(error, response, body) 
		{
			console.log("CAPTCHA")
			myburger = response.headers['set-cookie'][0].split(";")[0]
			headers.Cookie = myburger
			htmlCaptcha = JSON.parse(body.substring(1)).data.captcha
			reqToken()
		}
	)
}

function solveCaptcha(htmlCaptcha)
{
	console.log(htmlCaptcha)
	var $ = cheerio.load(htmlCaptcha)
	var names = $('p').text()
				 .split(/ i |kliknij /)
				 .slice(1, 3)
	console.log(names)
	
	var uris = [captchaSolver.getUri(names[0]),
	        captchaSolver.getUri(names[1])]
	console.log(uris) 
	
	var values = [$("img[src='"+uris[0]+"']").parent().find('input').attr('value'),
	          $("img[src='"+uris[1]+"']").parent().find('input').attr('value')]
	console.log(values)
	
	return values
}

function reqToken()
{
	request(
			{
				uri: "http://mojburger.mcdonalds.pl/services/token",
				method: "GET",
				headers: headers
		},
		
		function(error, response, body) 
		{
			console.log("TOKEN")
			postHeaders.Cookie = myburger
			reqVotes()
		}
	)
}

function reqVotes()
{
	request(
			{
				uri: "http://mojburger.mcdonalds.pl/services/votes",
				method: "POST",
				headers: headers,
				form: {
					captcha: solveCaptcha(htmlCaptcha),
					burger_id: '540f519f0a73c' ,
					vote: '1'
				}
		},
		
		function(error, response, body) 
		{
			console.log("VOTES")
			console.log(body)
		}
	)
}