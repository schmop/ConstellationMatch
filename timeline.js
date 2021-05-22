var PATH = "$Content\\User\\Produktion_extern\\ZodiacMatch\\";

include(PATH + "polyfill.js");
include(PATH + "lib.js");

var TIMELINE_STEPS = 100;

var eyePositionRef = Ds.NewObjectAttrRef("eye", "position");
var eyeScaleRef = Ds.NewObjectAttrRef("eye", "scale");

var timelineTimestamp = 0;
var startTimestamp = 0;
var timebased = false;

function createTimeline() {
	var timelinePanelSuffix = "panel";
	for (var i = 0; i < TIMELINE_STEPS; i++) {
		var panelName = timelinePanelSuffix + i;
		Ds.CreateObject(panelName, "emptyClass", "temporary");
		var usedColor = i < (0.75 * TIMELINE_STEPS) ? "green" : (i <= (0.9 * TIMELINE_STEPS) ? "yellow" : "red");
		Ds.AddObjectChild(panelName, usedColor);
		Ds.SetObjectAttr(panelName, "position", {
			x: deg2rad(((TIMELINE_STEPS/2)-i)*360/TIMELINE_STEPS),
			y: 0,
			z: 50,
			mode: "spherical"
		});
		Ds.SetObjectAttr(panelName, "color", {r: 30, g: 30, b: 30});
		Ds.ObjectFaceObject(panelName, "eye");
		Ds.SceneAddObject(panelName, "near");
	}
}

function resetTimeline() {
	var timelinePanelPrefix = "panel";
	for (var i = 0; i < 100; i++) {
		var panelName = timelinePanelPrefix + i;
		// hack to use the control panel
		timebased = Ds.GetObjectAttrUsingRef(eyePositionRef).x;
		var intensity = timebased ? 100 : 0;
		Ds.SetObjectAttr(panelName, "intensity", intensity);
	}
	if (timebased) {
		startTimestamp = 0;
		setTimeout(startTiming, 4000);
	}
}

function startTiming() {
	// hack to use the control panel
	gametime = Math.round(Ds.GetObjectAttrUsingRef(eyeScaleRef).z);
	startTimestamp = timelineTimestamp = now();
}

function getStepFromTimestamp(timestamp) {
	return Math.min(99, Math.floor((timestamp - startTimestamp) * 100 / gametime));
}

function gameStartedAlready() {
	return !timebased || startTimestamp > 0;
}

/**
 * @return false If time has run out, true if time is left
 */
function timelineTick() {
	if (timebased && startTimestamp > 0 && !gameEndScreen) {
		var timelinePanelPrefix = "panel";
		var currentTime = now();
		var currentStep = getStepFromTimestamp(currentTime);
		var lastStep = getStepFromTimestamp(timelineTimestamp);
		for (var step = lastStep; step <= currentStep; step++) {
			var panelName = timelinePanelPrefix + step;
			Ds.SetObjectAttr(panelName, "intensity", 40);
		}
		timelineTimestamp = currentTime;

		return currentTime - startTimestamp < gametime;
	}
	
	return true;
}
