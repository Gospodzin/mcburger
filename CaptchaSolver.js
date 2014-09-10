/**
 * New node file
 */


module.exports = {
  getUri: getUri
};

function getUri(name)
{
	return map[name.toLowerCase()]
}

var map =
{'big mac®'								: 'http://mojburger.mcdonalds.pl/application/cache/img/captcha/9be81222b9a4a31efab4f8903427c7a0.jpg',
 'chicken wings'						: 'http://mojburger.mcdonalds.pl/application/cache/img/captcha/280670082329d99a5c6fb810650496f7.jpg',
 'wieśmac®'								: 'http://mojburger.mcdonalds.pl/application/cache/img/captcha/1d26ec53a96e967514f19a1ef8bd8e73.jpg',
 'mcwrap® klasyczny grillowany kurczak'	: 'http://mojburger.mcdonalds.pl/application/cache/img/captcha/688ddbe650bc54f6dc1d7e3f3c3d87c1.jpg',
 'kajzerka kurczak premium'				: 'http://mojburger.mcdonalds.pl/application/cache/img/captcha/ec64b3894a0bc46499c1377b2df46324.jpg',
 'mcchicken®'							: 'http://mojburger.mcdonalds.pl/application/cache/img/captcha/817d5cce331660fc0f96898b6328728d.jpg',
 'frytki małe'							: 'http://mojburger.mcdonalds.pl/application/cache/img/captcha/ad287bbf26cd00ef926633c1d28f4766.jpg',
 'chicken box duży'						: 'http://mojburger.mcdonalds.pl/application/cache/img/captcha/d217ba927b6c40a3c46ffd5dbf73c63d.jpg',
 'kanapka śniadaniowa wieprzowa deluxe'	: 'http://mojburger.mcdonalds.pl/application/cache/img/captcha/9dd26cb4f4ba04dba060626b3dea70d2.jpg',
 'mccroissant®'							: 'http://mojburger.mcdonalds.pl/application/cache/img/captcha/c8cc17e3bb1cea56700276c1fd9c3401.jpg',
 'shake o smaku czekoladowym'			: 'http://mojburger.mcdonalds.pl/application/cache/img/captcha/10ac0ba938741c01b7097654d41eeb96.jpg',
 'napój średni 0,4 l​'					: 'http://mojburger.mcdonalds.pl/application/cache/img/captcha/a67c618379bf354058fd656ea3e939e2.jpg',
 'owocogurt'							: 'http://mojburger.mcdonalds.pl/application/cache/img/captcha/969034f7f0f2bdb4f57a33408ddc312d.jpg',
 'sweet mcgriddles'						: 'http://mojburger.mcdonalds.pl/application/cache/img/captcha/f3616e781fb2c5eac4e94b6a733fea11.jpg',
 'sałatka z sosem'						: 'http://mojburger.mcdonalds.pl/application/cache/img/captcha/ff65fc27ee1c92eb6a620a27e69ac4be.jpg',
 'ciastko'								: 'http://mojburger.mcdonalds.pl/application/cache/img/captcha/aed94b85dabffdeb5e76b564724d91bd.jpg',
 'mcroyal®'								: 'http://mojburger.mcdonalds.pl/application/cache/img/captcha/975e1b971d09a731333929340c5f3848.jpg',
 'mcflurry®​'							: 'http://mojburger.mcdonalds.pl/application/cache/img/captcha/5f08e6b473e88ce1ab9acb173eaedcbc.jpg'} 