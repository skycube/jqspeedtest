/******************************************************
 * START CODE FOR DEMO 3
 * Example which morris
 ******************************************************/
$("#Demo-3-StartButton").click(function(e){
	$('#Demo-3-StartButton').hide();
	$('#Demo-3-StopButton').show();
	chartData = [];
	Demo3 = new JQSpeedTest({
		countDlSamples:0,
		countUlSamples:0,
		countReSamples:100,
		testSleepTime: 500,
		returnUnits: false,
		testStateCallback: Demo3callBackFunctionState,
		testFinishCallback: Demo3callbackFunctionFinish,
		testReCallback: Demo3callbackFunctionRe,
	});
});
/** Demo3 Stop Button **/
$('#Demo-3-StopButton').click(function(e){
	Demo3.state('forcestop');
});
/** Demo3 Sample Call Back Function for State **/
function Demo3callBackFunctionState(value){
	$('#Demo-3-State').text(value);
}
/** Demo3 Sample Call Back Function for Finshi **/
function Demo3callbackFunctionFinish(value){
	$('#Demo-3-StartButton').show();
	$('#Demo-3-StopButton').hide();
}
/** Chart Data init **/
var chartData = [];
chartData.push({
		x: new Date().getTime(),
		y: '0'
});
/** Demo3 Sample Call Back Function for Response Time **/
function Demo3callbackFunctionRe(val){
	if(val>300) val = 300; // Little Hack
	chartData.push({
		x: new Date().getTime(),
		y: val
	});
	Demo3graph.setData(chartData);
}
/** Demo3 Morris Chart **/
var Demo3graph = Morris.Line({
	element: 'Demo-3-graph',
	data: chartData,
	xkey: 'x',
	ykeys: ['y'],
	labels: ['Response time'],
	parseTime: true,
	ymin: 'auto',
	ymax: 'auto',
	postUnits: ' ms',
	hideHover: true
});
