/******************************************************
 * START CODE FOR DEMO 1
 * Example which executes 1 Downloads, 1 Uplodads and 1 Repsonse Time Checks and shows the time taken
 ******************************************************
 * Demo01 Start Button and Init
 */
$("#Demo-1-StartButton").click(function(e){
	$('#Demo-1-StartButton').hide();
	$('#Demo-1-StopButton').show();
	$('#Demo-1-dl-result').text('not tested');
	$('#Demo-1-ul-result').text('not tested');
	$('#Demo-1-re-result').text('not tested');
	$('#Demo-1-dl-duration').text('0');
	$('#Demo-1-ul-duration').text('0');
	$('#Demo-1-re-duration').text('0');
	Demo1 = new JQSpeedTest({
		testStateCallback: Demo1callBackFunctionState,
		testFinishCallback: Demo1callbackFunctionFinish,
		testDlCallback: Demo1callbackFunctionDl,
		testUlCallback: Demo1callbackFunctionUl,
		testReCallback: Demo1callbackFunctionRe,
	});
});
/** Demo01 Stop Button **/
$('#Demo-1-StopButton').click(function(e){
	Demo1.state('forcestop');
});
/** Demo1 Sample Call Back Function for State **/
function Demo1callBackFunctionState(value){
	$('#Demo-1-State').text(value);
}
/** Demo1 Sample Call Back Function for Finshi **/
function Demo1callbackFunctionFinish(value){
	$('#Demo-1-StartButton').show();
	$('#Demo-1-StopButton').hide();
}
/** Demo1 Sample Call Back Function for Download Result **/
function Demo1callbackFunctionDl(value, duration){
	$('#Demo-1-dl-result').text(value);
	$('#Demo-1-dl-duration').text(duration);
}
/** Demo1 Sample Call Back Function for Upload Result **/
function Demo1callbackFunctionUl(value, duration){
	$('#Demo-1-ul-result').text(value);
	$('#Demo-1-ul-duration').text(duration);
}
/** Demo1 Sample Call Back Function for Response Time **/
function Demo1callbackFunctionRe(value, duration){
	$('#Demo-1-re-result').text(value);
	$('#Demo-1-re-duration').text(duration);
}
