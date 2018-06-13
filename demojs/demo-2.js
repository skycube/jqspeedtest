/******************************************************
 * START CODE FOR DEMO 2
 * Example which executes 3 Downloads, 3 Uplodads and 3 Repsonse Time Checks and calculates the average
 ******************************************************
 * Demo2 Start Button and Init
 */
$("#Demo-2-StartButton").click(function(e){
	$('#Demo-2-StartButton').hide();
	$('#Demo-2-StopButton').show();
	$('#Demo-2-dl-result').text('not tested');
	$('#Demo-2-ul-result').text('not tested');
	$('#Demo-2-re-result').text('not tested');
	$('#Demo-2-dl-average').text('0 Mbps');
	$('#Demo-2-ul-average').text('0 Mbps');
	$('#Demo-2-re-average').text('0 Mbps');
	Demo2 = new JQSpeedTest({
		countDlSamples:3,
		countUlSamples:3,
		countReSamples:3,
		returnUnits: false,
		testStateCallback: Demo2callBackFunctionState,
		testFinishCallback: Demo2callbackFunctionFinish,
		testDlCallback: Demo2callbackFunctionDl,
		testUlCallback: Demo2callbackFunctionUl,
		testReCallback: Demo2callbackFunctionRe,
	});
});
/** Demo2 Stop Button **/
$('#Demo-2-StopButton').click(function(e){
	Demo2.state('forcestop');
});
/** Demo2 Sample Call Back Function for State **/
function Demo2callBackFunctionState(value){
	$('#Demo-2-State').text(value);
}
/** Demo2 Sample Call Back Function for Finshi **/
function Demo2callbackFunctionFinish(value){
	$('#Demo-2-StartButton').show();
	$('#Demo-2-StopButton').hide();
}
/** Demo2 Sample Call Back Function for Download Result **/
var Demo2storedDl = 0;
function Demo2callbackFunctionDl(value){
	if($('#Demo-2-dl-result').text() == 'not tested'){
		$('#Demo-2-dl-result').text('');
	}
	$('#Demo-2-dl-result').append(value+' Mbps<br>');
	Demo2storedDl = calcAverage(value, Demo2storedDl);
	$('#Demo-2-dl-average').text(Demo2storedDl + ' Mbps');
}
/** Demo2 Sample Call Back Function for Upload Result **/
var Demo2storedUl = 0;
function Demo2callbackFunctionUl(value){
	if($('#Demo-2-ul-result').text() == 'not tested'){
		$('#Demo-2-ul-result').text('');
	}
	$('#Demo-2-ul-result').append(value+' Mbps<br>');
	Demo2storedUl = calcAverage(value, Demo2storedUl);
	$('#Demo-2-ul-average').text(Demo2storedUl + ' Mbps');
}
/** Demo2 Sample Call Back Function for Response Time **/
var Demo2storedRe = 0;
function Demo2callbackFunctionRe(value){
	if($('#Demo-2-re-result').text() == 'not tested'){
		$('#Demo-2-re-result').text('');
	}
	$('#Demo-2-re-result').append(value+' ms<br>');
	Demo2storedRe = calcAverage(value, Demo2storedRe);
	$('#Demo-2-re-average').text(Demo2storedRe + ' ms');
}
