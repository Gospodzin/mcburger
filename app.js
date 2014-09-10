/**
 * 
 */

 
var cheerio = require("cheerio")
var request = require("request")
var uaProvider = require("./UserAgentProvider")
var captchaSolver = require("./CaptchaSolver")

var failures = 0
var iteration = 0
runFromTimeToTime(5000)

function runFromTimeToTime(meanTime)
{
	setTimeout(
			function()
			{	
				console.log("ITEARTION: " + iteration++)
				runInstance()
				runFromTimeToTime(meanTime)
			}, 
			2*meanTime * Math.random())
}

function runInstance()
{
	var myburger = null
	
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
	
	var control =
		[{op: reqMain, parms: []},
		 {op: reqStats, parms: []},
		 {op: reqCaptcha, parms: []},
		 {op: reqToken, parms: []},
		 {op: reqVotes, parms: []}]
	
	function run(control)
	{
		if(control.length == 0)
			return
		
		var cur = control.shift()
		cur.op(control, cur.parms)
	}
	
	function reqMain(control, parms)
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
				run(control)
			}
		)
	}
	
	function reqStats(control, parms)
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
				run(control)
			}
		)
	}
	
	function reqCaptcha(control, parms)
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
				run(control)
			}
		)
	}
	
	function reqToken(control, parms)
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
				run(control)
			}
		)
	}
	
	function reqVotes(control, parms)
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
				if(JSON.parse(body.substring(1)).status == 'ok')
					console.log("SUCCESS!!!")
				else
				{
					console.log("FAILURE###")
					failures++
				}
				console.log("FAILURES: " + failures)
				run(control)
			}
		)
	}
	
	run(control)
}

function solveCaptcha(htmlCaptcha)
{
	var $ = cheerio.load(htmlCaptcha)
	var names = $('p').text()
				 .split(/ i |kliknij /)
				 .slice(1, 3)
	
	var uris = [captchaSolver.getUri(names[0]),
	        captchaSolver.getUri(names[1])]
	
	var values = [$("img[src='"+uris[0]+"']").parent().find('input').attr('value'),
	          $("img[src='"+uris[1]+"']").parent().find('input').attr('value')]
	
	return values
}