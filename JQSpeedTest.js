/**
 * @summary     JQSpeedTest
 * @description jQuery "Plugin" to measure download and upload bandwidth (speed)
 * @version     1.0.1 (13/06/2018)
 * @author      Per Lasse Baasch
 *
 * Features:
 * 	- download speed test
 *  - upload speed test
 *  - response (ping) speed test
 *  - can run mulitple download,upload and ping test as specified
 *  - loop functionality for ongoing tests
 *  - cross-browser support
 *  - works on any webserver (Apache HTTP, Apache Tomcat, IIS, nginx);
 * 
 * Requirements:
 *  - An HTTP server that allows GET and POST calls
 *  - jQuery 1.3 or newer
 * 
 * For details please refer to: 
 * https://skycube.net 
 * https://github.com/skycube/jqspeedtest
 */

JQSpeedTest = function(options) {

	//************************** Configuration START *********************//
	var defaults = {
		// Callback function for Download output
		testDlCallback: defaultCallbackFunction,
		// Callback function for Upload output
		testUlCallback: defaultCallbackFunction,
		// Callback function for Response output
		testReCallback: defaultCallbackFunction,
		// Callback function for State
		testStateCallback: defaultCallbackFunction,
		// Callback function for the finish
		testFinishCallback: defaultCallbackFunction,
		// Count of Download Samples taken
		countDlSamples: 1,
		// Count of Upload Samples taken
		countUlSamples: 1,
		// Count of Response Samples taken
		countReSamples: 1,
		// Upload Unit Output
		uploadUnit: 'Mbps',
		// Download Unit Output
		downloadUnit: 'Mbps',
		// Include the Unit on Return,
		returnUnits: true,
		// Test Image URL (DEFAULT IS testimage.jpg)
		// you may want to replace this with a real url
		testImageUrl: 'testimage.jpg',
		// Test Imagee Size (Bytes) (DEFAULT IMAGE IS 4796123=4.8Mb)
		testImageSize: 4796123,
		// Test Upload Size (Bytes) (DEFAULT IS 2500000=2.5Mb)
		testUploadSize: 1500000,
		// Sleep time between tests to cool down a bit (DEFAULT IS 500ms)
		testSleepTime: 500,
    };
    var settings = $.extend( {}, defaults, options );
	//************************** Configuration END *********************//

	//** Current State
	var currentState = 'stopped';

	//** Some Global Vars
	var dlCounts = 0; var dlIntervalId = 0; var dlTestRunning = 'no'
	var ulCounts = 0; var ulIntervalId = 0; var ulTestRunning = 'no'
	var reCounts = 0; var reIntervalId = 0; var reTestRunning = 'no'

	//** Set the current state var from outside
	this.state = function(state){
		currentState = state;
		return true;
	}
	// Set the current state var from internal and call a callback function
	function setCurrentState(state){
		currenState = state;
		typeof settings.testStateCallback === 'function' && settings.testStateCallback(state);
	}

	//** Get the current state var from outside
	this.getCurrentState = function(state){
		return currentState;
	}

	//** First Start
	function init(){
		dlCounts = 0; 
		ulCounts = 0;
		reCounts = 0;
		testStart();
	}
	
	//** START
	init();

	//** Internal start and stop function
	function testStart(){
		if(currentState == 'forcestop'){
			setCurrentState('stopped');
			typeof settings.testFinishCallback === 'function' && settings.testFinishCallback('finished');
			return;
		}
		setCurrentState('running');
		if(dlCounts < settings.countDlSamples){
			if(dlTestRunning == 'no' && ulTestRunning == 'no' && reTestRunning == 'no'){
				dlCounts++;
				dlTestRunning = 'yes';
				setTimeout(function(){TestDownload(settings.elDlOutput)}, settings.testSleepTime);
			}
			clearTimeout(dlIntervalId)
			dlIntervalId = setTimeout(function(){ testStart(); }, 1000);
			return;
		}
		else if(ulCounts < settings.countUlSamples){
			if(dlTestRunning == 'no' && ulTestRunning == 'no' && reTestRunning == 'no'){
				ulCounts++;
				ulTestRunning = 'yes';
				setTimeout(function(){TestUpload(settings.elUlOutput)}, settings.testSleepTime);
			}
			clearTimeout(ulIntervalId)
			ulIntervalId = setTimeout(function(){ testStart(); }, 1000);
			return;
		}
		else if(reCounts < settings.countReSamples || settings.countReSamples == 'loop'){
			if(dlTestRunning == 'no' && ulTestRunning == 'no' && reTestRunning == 'no'){
				reCounts++;
				reTestRunning = 'yes';
				setTimeout(function(){TestResponse(settings.elReOutput)}, settings.testSleepTime);
			}
			clearTimeout(reIntervalId)
			reIntervalId = setTimeout(function(){ testStart(); }, 1000);
			return;
		}
		currentState = 'stopped';
		setCurrentState('stopped');
		typeof settings.testFinishCallback === 'function' && settings.testFinishCallback('finished');
	}

	//** Test the download speed
	function TestDownload(){
		var sendDate = (new Date()).getTime();
		$.ajax({
			type: "GET",
			url: settings.testImageUrl,
			timeout: 60000,
			cache: false,
			success: function(){
				var receiveDate = (new Date()).getTime();
				var duration = (receiveDate - sendDate) / 1000;
				var bitsLoaded = settings.testImageSize * 8;
				var speedBps = (bitsLoaded / duration).toFixed(2);
				var speedKbps = (speedBps / 1024).toFixed(2);
				var speedMbps = (speedKbps / 1024).toFixed(2);
				var speedGbps = (speedMbps / 1024).toFixed(2);
				if(settings.downloadUnit =='bps'){
					var response = speedBps;
					if(settings.returnUnits == true) {
						response = response + ' Bps';
					}
				}else if(settings.downloadUnit == 'Kbps'){
					var response = speedKbps
					if(settings.returnUnits == true) {
						response =  response + ' Kbps';
					}
				}else if(settings.downloadUnit == 'Mbps'){
					var response = speedMbps
					if(settings.returnUnits == true) {
						response =  response + ' Mbps';
					}
				}else{
					var response = speedGbps;
					if(settings.returnUnits == true) {
						response =  response + ' Gbps';
					}
				}
				dlTestRunning = 'no';
				typeof settings.testDlCallback === 'function' && settings.testDlCallback(response, duration);
			}
		});
	}

	//** Function to create random string
	function randomString(length){
		var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		var result = '';
		for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
		return result;
	}

	//** Test upload function
	function TestUpload(){
		var randData = {randomDataString:randomString(settings.testUploadSize)};
		var uploadSize = settings.testUploadSize;
		var sendDate = (new Date()).getTime();
		$.ajax({
			type: "POST",
			url: "",
			data: randData,
			timeout: 60000,
			cache: false,
			success: function(){
				var receiveDate = (new Date()).getTime();
				var duration = (receiveDate - sendDate) / 1000;
				var bitsLoaded = uploadSize * 8;
				var speedBps = (bitsLoaded / duration).toFixed(2);
				var speedKbps = (speedBps / 1024).toFixed(2);
				var speedMbps = (speedKbps / 1024).toFixed(2);
				var speedGbps = (speedMbps / 1024).toFixed(2);
				if(settings.uploadUnit == 'bps'){
					var response = speedBps;
					if(settings.returnUnits == true) {
						response = response + ' Bps';
					}
				}else if(settings.uploadUnit == 'Kbps'){
					var response = speedKbps;
					if(settings.returnUnits == true) {
						response =  response + ' Kbps';
					}
				}else if(settings.uploadUnit == 'Mbps'){
					var response = speedMbps;
					if(settings.returnUnits == true) {
						response =  response + ' Mbps';
					}
				}else{
					var response = speedGbps;
					if(settings.returnUnits == true) {
						response =  response + ' Gbps';
					}
				}
				ulTestRunning = 'no';
				typeof settings.testUlCallback === 'function' && settings.testUlCallback(response, duration);
			}
		});
	}

	//** Test Response time
	function TestResponse(){
		var sendDate = (new Date()).getTime();
		$.ajax({
			type: "HEAD",
			url: "",
			timeout: 60000,
			cache: false,
			success: function(){
				var receiveDate = (new Date()).getTime();
				var response = receiveDate - sendDate;
				var duration = response;
				reTestRunning = 'no';
				if(settings.returnUnits == true) {
					response = response + ' ms';
				}
				typeof settings.testReCallback === 'function' && settings.testReCallback(response, duration);
			}
		});
	}

	//** Default callback function
	function defaultCallbackFunction(value){
		window.console && console.log(value);
	}
}
