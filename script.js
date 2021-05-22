var PATH = "$Content\\User\\Produktion_extern\\ZodiacMatch\\";

include(PATH + "polyfill.js");
include(PATH + "lib.js");
include(PATH + "zodiac.js");
include(PATH + "timeline.js");
include(PATH + "startScreen.js");

var NON_MONOSPACE_FACTOR = 2.5;

var eyeAttitudeRef = Ds.NewObjectAttrRef("eye", "attitude");
var eyePositionRef = Ds.NewObjectAttrRef("eye", "position");
var eyeScaleRef = Ds.NewObjectAttrRef("eye", "scale");
var cursorColorRef = Ds.NewObjectAttrRef("cursor", "color");
var cursorIntensityRef = Ds.NewObjectAttrRef("cursor", "intensity");
var controllerRef = Ds.NewObjectAttrController(1.0, 0.0, 0.0, 'linear', false, false);
var slowControllerRef = Ds.NewObjectAttrController(4.0, 1.0, 1.0, 'linear', false, false);
var winmessageHClipRef = Ds.NewObjectAttrRef("winmessage", "hclip");
var winmessageIntensityRef = Ds.NewObjectAttrRef("winmessage", "intensity");
var winmessageTextRef = Ds.NewObjectAttrRef("winmessage", "text");
var winmessagePosRef = Ds.NewObjectAttrRef("winmessage", "position");
var statusmessageTextRef = Ds.NewObjectAttrRef("statusmessage", "text");
var statusmessagePosRef = Ds.NewObjectAttrRef("statusmessage", "position");
var backgroundMusicPlayStatusRef = Ds.NewObjectAttrRef("backgroundMusic", "playStatus");

var highScores = {};
var currentGameMode = "all";

var lookOffset = 0;
var lookingVertical = false;

var gameEndScreen = false;
var tries = 0;
var score = 0;

function updateTextPosition() {
	var statusPos = Ds.GetObjectAttrUsingRef(statusmessagePosRef);
	var winPos = Ds.GetObjectAttrUsingRef(winmessagePosRef);
	statusPos.x = winPos.x = lookOffset;
	Ds.SetObjectAttrUsingRef(statusmessagePosRef, statusPos);
	Ds.SetObjectAttrUsingRef(winmessagePosRef, winPos);
}

function updateText() {
	var spacing = " ".repeat(getCurrentZodiacName().length * NON_MONOSPACE_FACTOR);
	Ds.SetObjectAttrUsingRef(statusmessageTextRef, getCurrentZodiacName() + " (" + score + " Treffer)|" + spacing + "(" + tries + " Versuche)");
}

function playSound(soundName) {
	Ds.ExecuteObjectCommand(soundName, "play");
}

function setLookDirection(directionName) {
    // reset eye or the controls will be messed up
	Ds.SetObjectAttrUsingRef(eyeAttitudeRef, {h: 0, p: 0, r: 0}, slowControllerRef);
	switch(directionName) {
	case "south":
		lookOffset = 0;
		Ds.SendStringCommand("earthRotationController source1 xbox0 rStick.y");
		Ds.SendStringCommand("earthRotationController scale1 0.25");
		Ds.SendStringCommand("earthRotationController scale2 0");
		lookingVertical = false;
		break;
	case "north":
		lookOffset = deg2rad(180);
		Ds.SendStringCommand("earthRotationController source1 xbox0 rStick.y");
		Ds.SendStringCommand("earthRotationController scale1 -0.25");
		Ds.SendStringCommand("earthRotationController scale2 0");
		lookingVertical = false;
		break;
	case "east":
		lookOffset = deg2rad(90);
		Ds.SendStringCommand("earthRotationController source2 xbox0 rStick.y");
		Ds.SendStringCommand("earthRotationController scale1 0");
		Ds.SendStringCommand("earthRotationController scale2 -0.25");
		lookingVertical = true;
		break;
	case "west":
		lookOffset = deg2rad(270);
		Ds.SendStringCommand("earthRotationController source2 xbox0 rStick.y");
		Ds.SendStringCommand("earthRotationController scale1 0");
		Ds.SendStringCommand("earthRotationController scale2 0.25");
		lookingVertical = true;
		break;
	}
	updateTextPosition();
}

function resetGame() {
	gameEndScreen = false;
	colorActiveZodiacs(COLOR_WHITE, COLOR_BLUE);
	resetTimeline();
	Ds.SetObjectAttrUsingRef(winmessageIntensityRef, 0, controllerRef);
	tries = 0;
	score = 0;
	resetZodiacs();
}

function rotateTo(rotation) {
	var changedRotation = rotation.clone();
	if (lookingVertical) {
		changedRotation.p = 0;
	}
	var eyeAttitude = Ds.GetObjectAttrUsingRef(eyeAttitudeRef);
	eyeAttitude = Object.assign(eyeAttitude, changedRotation);
	Ds.SetObjectAttrUsingRef(eyeAttitudeRef, eyeAttitude, slowControllerRef);
}

function getWinTextPos() {
	return {
		x: lookOffset,
		y: deg2rad(45)
	};
}

function gameWonScreen(reason) {
	playSound("gameWonSound");
	gameEndScreen = true;
	var winmessage = reason + "|Drücke Ⓐ um nochmal zu spielen";
	var newHighscore = false;
	if (!(currentGameMode in highScores)) {
		highScores[currentGameMode] = {
			tries: tries,
			score: score
		};
		newHighscore = true;
	} else {
		newHighscore = highScores[currentGameMode].score < score ||
					   (highScores[currentGameMode].score === score && highScores[currentGameMode].tries > tries);
		if (newHighscore) {
			highScores[currentGameMode] = {
				tries: tries,
				score: score
			};
			winmessage = "Neuer Rekord:|" + score + " Treffer mit " + tries + " Versuchen|" + winmessage;
		} else {
			winmessage = "Rekord nicht überboten:|" + highScores[currentGameMode].score + " Treffer mit " + highScores[currentGameMode].tries + " Versuchen|" + winmessage;
		}
		Ds.SetObjectAttrUsingRef(winmessageTextRef, winmessage);
	}
	
	var winmessageTextPos = Ds.GetObjectAttrUsingRef(winmessagePosRef);
	winmessageTextPos = Object.assign(winmessageTextPos, getWinTextPos());
	Ds.SetObjectAttrUsingRef(winmessagePosRef, winmessageTextPos);
	Ds.SetObjectAttrUsingRef(winmessageHClipRef, 0);
	Ds.SetObjectAttrUsingRef(winmessageIntensityRef, 100);
	Ds.SetObjectAttrUsingRef(winmessageHClipRef, 100, controllerRef);
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

function gameOverTick() {
	if (!timelineTick()) {
		gameWonScreen("Die Zeit ist abgelaufen!");
	}
}

function trySelectInitialZodiac() {
	if (!selectRandomZodiac()) {
		print("Error selecting initial zodiac!");
	}
}

function handleMessages() {
	var message = Ds.GetMessage();
	if (message !== "") {
		if (message === 'select') {
			if (gameEndScreen) {
				resetGame();
				trySelectInitialZodiac();
			} else if (gameStartedAlready() && trySelect() && !selectRandomZodiac()) {
				updateText();
				gameWonScreen("Das Spiel ist beendet!");
			}
		} else if (message in gameModes) {
			selectPlaySet(message);
			resetGame();
			trySelectInitialZodiac();
		} else if(message.startsWith("look")) {
			setLookDirection(message.substr("look".length));
		} else if (message !== zodiacName) {
			selectZodiac(message);
		}
	}
}

function keepBackgroundMusicAlive() {
	var playStatusIndex = Ds.GetObjectAttrUsingRef(backgroundMusicPlayStatusRef);
	var playStatusString = Ds.GetEnumItemNameUsingIndex("playStatusEnum", playStatusIndex);
	if (playStatusString === 'stopped') {
		playSound('backgroundMusic');
	}
}

function initializeZodiacsAndArts() {
	Ds.SendStringCommand('script play ' + PATH + 'startSticks.ds');
	Ds.Wait(1); // SendStringCommand does not wait for the script to finish executing
}

startScreen();

// startup
initializeZodiacsAndArts();
gatherZodiacRefs();
createTimeline();
setLookDirection("north");
resetGame();
selectRandomZodiac();

// gameloop
var tick = 0;

while(true) {
	handleGlobalCallbacks();
	handleMessages();
	clampCursorElevation();
	hoverConstellation();
	gameOverTick();
	keepBackgroundMusicAlive();
	
	Ds.Wait(0.01, "system");   // wait until the next frame before going through the main loop again

}