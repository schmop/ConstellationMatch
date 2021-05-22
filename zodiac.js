var PATH = "$Content\\User\\Produktion_extern\\ZodiacMatch\\";

include(PATH + "polyfill.js");
include(PATH + "lib.js");
include(PATH + "zodiacData.js");

var IMAGE_PATH_PREFIX = "img\\flam";
var IMAGE_PATH_SUFFIX = ".png";

var zodiacName = "ari";
var playSet = {};
var eyeAttitudeRef = Ds.NewObjectAttrRef("eye", "attitude");
var cursorPositionRef = Ds.NewObjectAttrRef("cursor", "position");
var cursorColorRef = Ds.NewObjectAttrRef("cursor", "color");
var cursorIntensityRef = Ds.NewObjectAttrRef("cursor", "intensity");
var controllerRef = Ds.NewObjectAttrController(1.0, 0.0, 0.0, 'linear', false, false);
var slowControllerRef = Ds.NewObjectAttrController(4.0, 1.0, 1.0, 'linear', false, false);

var HEIGHT_LOWER_BOUND = deg2rad(15);
var HEIGHT_UPPER_BOUND = deg2rad(75);

/**
  * Color works in percentage range (0% - 100%)
  */
var COLOR_BLUE = {r: 0, g: 20, b: 80};
var COLOR_YELLOW = {r: 60, g: 60, b: 0};
var COLOR_RED = {r: 100, g: 20, b: 0};
var COLOR_GREEN = {r: 20, g: 100, b: 0};
var COLOR_WHITE = {r: 100, g: 100, b: 100};
var MAXIMAL_HOVER_ANGLE = deg2rad(20);

function gatherZodiacRefs() {
	for (var name in zodiacs) {
		zodiacs[name].stickColorRef = Ds.NewObjectAttrRef(name + "stick", "color");
		zodiacs[name].stickWidthRef = Ds.NewObjectAttrRef(name + "stick", "width");
		zodiacs[name].stickIntensityRef = Ds.NewObjectAttrRef(name + "stick", "intensity");
		zodiacs[name].artIntensityRef = Ds.NewObjectAttrRef(name + "art", "intensity");
		zodiacs[name].hovering = false;
	}
}

function resetZodiacs() {
	for (var name in zodiacs) {
		zodiacs[name].finished = false;
		zodiacs[name].hovering = false;
		zodiacs[name].faulty = false;
		Ds.SetObjectAttrUsingRef(zodiacs[name].artIntensityRef, 0, controllerRef);
		Ds.SetObjectAttrUsingRef(zodiacs[name].stickWidthRef, 2);
		Ds.SetObjectAttrUsingRef(zodiacs[name].stickIntensityRef, 100, controllerRef);
	}
}

function getCurrentZodiacName() {
    return zodiacs[zodiacName].name;
}

function selectZodiac(name) {
	zodiacName = name;
	print("Selecting zodiac " + name);
	Ds.SendStringCommand("cursor modeltexture 0 " + PATH + IMAGE_PATH_PREFIX + name.toLowerCase() + IMAGE_PATH_SUFFIX);
	var zodiac = zodiacs[name];
	if (zodiac == null) {
		print("Error selecting zodiac with name: " + name);
		return;
	}
	var position = Ds.GetObjectAttrUsingRef(cursorPositionRef);
	position.z = zodiac.sphericalDistance;
	Ds.SetObjectAttrUsingRef(cursorIntensityRef, 0);
	Ds.ObjectFaceObject('cursor', 'eye');
	Ds.SetObjectAttrUsingRef(cursorPositionRef, position);
	updateText();
	Ds.Wait(0.1); // Don't clamp
	Ds.SetObjectAttrUsingRef(cursorIntensityRef, 100, controllerRef);
}

function colorAllZodiacs(color) {
	for (var name in zodiacs) {
		colorZodiac(name, color);
	}
}

function colorActiveZodiacs(colorActive, colorNonActive) {
	colorAllZodiacs(colorNonActive);
	for (var name in playSet) {
		colorZodiac(name, colorActive);
	}
}

function colorZodiac(name, color) {
	zodiacs[name].color = color;
	Ds.SetObjectAttrUsingRef(zodiacs[name].stickColorRef, color);
}

function selectPlaySet(gameModeName) {
	if (!(gameModeName in gameModes)) {
		print("Gamemode " + gameModeName + " is not supported!");
		return;
	}
	playSet = {};
	currentGameMode = gameModeName;
	for (var name of gameModes[gameModeName].gameset) {
		if (!(name in zodiacs)) {
			print(name + " not found!");
		}
		playSet[name] = zodiacs[name];
	}
	rotateTo(gameModes[gameModeName].rotation);
}

function getUnfinishedZodiacs() {
	return playSet.filter(function (zodiac, name) {
		return !zodiac.finished;
	})
}

/**
  * @return true if a new random zodiac was selectable. On false assume gameset is empty
  */
function selectRandomZodiac() {
	var usedKeys = Object.keys(getUnfinishedZodiacs());
	if (!usedKeys.length) {
	
		return false;
	}
	var index = Math.floor(rand() * usedKeys.length);
	selectZodiac(usedKeys[index]);
	
	return true;
}

function explodeZodiac(name) {
	Ds.SetObjectAttrUsingRef(zodiacs[name].stickWidthRef, 300, controllerRef);
	Ds.SetObjectAttrUsingRef(zodiacs[name].stickIntensityRef, 0, controllerRef);
}

function showArt(name) {
	Ds.SetObjectAttrUsingRef(zodiacs[name].artIntensityRef, 100, controllerRef);
}

function hideAllArts() {
	for (var name in zodiacs) {
		Ds.SetObjectAttrUsingRef(zodiacs[name].artIntensityRef, 0, controllerRef);
	}
}

function cursorFadeout() {
	Ds.SetObjectAttrUsingRef(cursorIntensityRef, 0, controllerRef);
}

/**
  * @return true if a zodiac was selected
  */
function trySelect() {
	var hoveringZodiacName = zodiacs.findIndex(function(zodiac) {
		return zodiac.hovering;
	});
	if (hoveringZodiacName != null) {
		var hoveringZodiac = zodiacs[hoveringZodiacName];
		if (hoveringZodiacName === zodiacName) {
			tries++;
			score++;
			playSound("scoreSound");
			hoveringZodiac.finished = true;
			colorZodiac(hoveringZodiacName, COLOR_GREEN);
			explodeZodiac(hoveringZodiacName);
			showArt(hoveringZodiacName);
			cursorFadeout();
			colorActiveZodiacs(COLOR_WHITE, COLOR_BLUE);
			for (var zodiac of zodiacs) {
				zodiac.faulty = false;
			}
			
			return true;
		} else if (!hoveringZodiac.faulty) {
			tries++;
			playSound("failSound");
			colorZodiac(hoveringZodiacName, COLOR_RED);
			hoveringZodiac.faulty = true;
			updateText();
		}
	}
	
	return false;
}

function getLowerBound() {
	return HEIGHT_LOWER_BOUND;
}

function getUpperBound() {
	return HEIGHT_UPPER_BOUND;
}

function clampCursorElevation() {
	var EPSILON = 0.001;
	cursorPosition = Ds.GetObjectAttrUsingRef(cursorPositionRef);
	if (cursorPosition.y < getLowerBound() - EPSILON || cursorPosition.y > getUpperBound() + EPSILON) {
		cursorPosition.y = clamp(cursorPosition.y, getLowerBound(), getUpperBound());
		cursorPosition.z = zodiacs[zodiacName].sphericalDistance;
		Ds.SetObjectAttrUsingRef(cursorPositionRef, cursorPosition);
	}
}

function setHoverZodiacSticks(name, hover) {
	zodiacs[name].hovering = hover;
	Ds.SetObjectAttrUsingRef(zodiacs[name].stickColorRef, (hover ? COLOR_YELLOW : zodiacs[name].color));
}

function hoverConstellation() {
	// get zodiac that is closest to cursor
	var searchResult = null;

	cursorScenePosition = positionFixedSceneToScene(sphericalToCartesian(cursorPosition), eyeAttitudeRef);
	for (var name in playSet) {
		if (zodiacs[name].finished) {
			continue;
		}
		var curZodiacPos = zodiacs[name].pos;
		var phi = Math.acos(dot(cursorScenePosition , curZodiacPos));
		if (searchResult == null || searchResult.phi > phi) {
			searchResult = {
				phi: phi,
				zodiacName: name
			};
		}
	}
	// hover nearest
	if (searchResult != null) {
		var currentlyHovering = searchResult.phi < MAXIMAL_HOVER_ANGLE;
		if (zodiacs[searchResult.zodiacName].hovering !== currentlyHovering) {
			setHoverZodiacSticks(searchResult.zodiacName, currentlyHovering);
		}
	}
	// unhover everyone else
	for (var name in playSet) {
		if (searchResult == null || name !== searchResult.zodiacName) {
			if (zodiacs[name].hovering) {
				setHoverZodiacSticks(name, false);
			}
		}
	}
}

function disableAllArts() {
	Ds.SendStringCommand("constellationarts off");
}

function disableArt() {
	Ds.SendStringCommand(zodiacName + "Art off");
}

function enableArt() {
	Ds.SendStringCommand(zodiacName + "Art on");
}
