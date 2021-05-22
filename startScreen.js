var oldCursorAz = 0;
var oldDirection = 0;

function startScreen() {
	var IDLE_TIME = 0;
	var titleIntensityRef = Ds.NewObjectAttrRef("titelMessage", "intensity");
	var startIntensityRef = Ds.NewObjectAttrRef("startMessage", "intensity");
	
	var timestamp = now();
	// read controller for early skip
	while (now() - timestamp <= IDLE_TIME) {
		var message = Ds.GetMessage();
		if (message !== "") {
			break; // skip
		}
		Ds.Wait(0.01);
	}
	Ds.SetObjectAttrUsingRef(titleIntensityRef, 0);
	Ds.SetObjectAttrUsingRef(startIntensityRef, 0);
	
	gamemodeSelection();
}
var tik = 0;
/**
  * @return -1 for a left press, 1 for a right press, 0 else
  */
function getCursorDirection() {
	var STICK_DEADZONE = 0.001;
	var OVERFLOW_LIMIT = deg2rad(20);
	
	var cursorAz = Ds.GetObjectAttrUsingRef(cursorPositionRef).x;
	var delta = cursorAz - oldCursorAz;
	
	oldCursorAz = cursorAz;
	var newDirection = 0;
	// If angle overflows 180 degrees it will drop to -180 degress vice versa
	if (Math.abs(delta) > OVERFLOW_LIMIT) {
		return 0;
	}
	if (delta > STICK_DEADZONE) {
		// pressing right
		newDirection = 1;
	} else if (delta < -STICK_DEADZONE) {
		// pressing left
		newDirection = -1;
	} else {
		// not pressing
		newDirection = 0;
	}
	
	if (newDirection === oldDirection) {
		oldDirection = newDirection;
		
		return 0;
	}
	
	oldDirection = newDirection;
	
	return newDirection;
}
var oldAttitude = {p: 0, h: 0};

function getCameraDirection() {
	var OVERFLOW_LIMIT = deg2rad(20);
	var att = Ds.GetObjectAttrUsingRef(eyeAttitudeRef);
	//Ds.SetObjectAttrUsingRef(eyeAttitudeRef);
	att.h *= -1;
	att.p *= -1;
	var delta = att.p - oldAttitude.p + att.h - oldAttitude.h;
	oldAttitude = att;
	if (Math.abs(delta) > OVERFLOW_LIMIT) {
		return 0;
	}
	
	return delta * 200;
}

function initGamemodeButtonRefs(gamemodes) {
	Ds.SendStringCommand('script play ' + PATH + 'buttonMenu.ds');
	Ds.Wait(1);
	var refs = {};
	var lastPos = 0;
	for (var mode of gamemodes) {
		var modeNamePascalCase = mode.substr(0, 1).toUpperCase() + mode.substr(1);
		modeNamePascalCase[0] = modeNamePascalCase[0].toUpperCase();
		refs[mode] = {
			textIntensityRef: Ds.NewObjectAttrRef("gamemodeText" + modeNamePascalCase, "intensity"),
			textColorRef: Ds.NewObjectAttrRef("gamemodeText" + modeNamePascalCase, "color"),
			textPositionRef: Ds.NewObjectAttrRef("gamemodeText" + modeNamePascalCase, "position"),
			buttonIntensityRef: Ds.NewObjectAttrRef("gamemodeButton" + modeNamePascalCase, "intensity"),
			buttonColorRef: Ds.NewObjectAttrRef("gamemodeButton" + modeNamePascalCase, "color"),
			buttonPositionRef: Ds.NewObjectAttrRef("gamemodeButton" + modeNamePascalCase, "position")
		};
		
		var textPos = Ds.GetObjectAttrUsingRef(refs[mode].textPositionRef);
		var buttonPos = Ds.GetObjectAttrUsingRef(refs[mode].buttonPositionRef);
		textPos.x = buttonPos.x = lastPos;
		lastPos += deg2rad(45);
		
		Ds.SetObjectAttrUsingRef(refs[mode].textPositionRef, textPos);
		Ds.SetObjectAttrUsingRef(refs[mode].buttonPositionRef, buttonPos);
	}
	
	return refs;
}

function gamemodeSelection() {
	var buttons = [
		"spring",
		"summer",
		"fall",
		"winter",
		"all",
		"north",
		"south",
		"zodiac"
	];
	var gameModeIndex = 0;
	var gamemodeRefs = initGamemodeButtonRefs(buttons);
	var timelimitTextRef = Ds.NewObjectAttrRef("timelimitText", "text");
	Ds.SetObjectAttrUsingRef(gamemodeRefs[buttons[gameModeIndex]].buttonColorRef, {r: 100, g: 100, b: 0});
	Ds.SetObjectAttrUsingRef(gamemodeRefs[buttons[gameModeIndex]].textColorRef, {r: 100, g: 100, b: 0});
	oldCursorAz = Ds.GetObjectAttrUsingRef(cursorPositionRef).x;

	while (true) {
		var cursorDirection = getCursorDirection();
		var cameraDirection = getCameraDirection();
		if (cameraDirection !== 0) {
			updateTimelimit(cameraDirection, timelimitTextRef);
		}
		var oldIndex = gameModeIndex;
		gameModeIndex = mod(gameModeIndex + cursorDirection, buttons.length);
		if (cursorDirection !== 0) {
			Ds.SetObjectAttrUsingRef(gamemodeRefs[buttons[oldIndex]].buttonColorRef, {r: 100, g: 100, b: 100});
			Ds.SetObjectAttrUsingRef(gamemodeRefs[buttons[oldIndex]].textColorRef, {r: 100, g: 100, b: 100});
			Ds.SetObjectAttrUsingRef(gamemodeRefs[buttons[gameModeIndex]].buttonColorRef, {r: 100, g: 100, b: 0});
			Ds.SetObjectAttrUsingRef(gamemodeRefs[buttons[gameModeIndex]].textColorRef, {r: 100, g: 100, b: 0});
		}
		var message = Ds.GetMessage();
		if (message === "select") {
			print(buttons[gameModeIndex]);
			selectPlaySet(buttons[gameModeIndex]);
			break;
		}
		Ds.Wait(0.01);
	}
	
	// Hide Buttons
	
	for (var ref of gamemodeRefs) {
		Ds.SetObjectAttrUsingRef(ref.textIntensityRef, 0);
		Ds.SetObjectAttrUsingRef(ref.buttonIntensityRef, 0);
	}
	Ds.SetObjectAttr("timelimitText", "intensity", 0);
}

function updateTimelimit(delta, ref) {
	var eyeScale = Ds.GetObjectAttrUsingRef(eyeScaleRef);
	eyeScale.z = clamp(eyeScale.z + delta, 15, 301);
	if (tik++ % 50 === 0) {
		print(eyeScale.z + ", " + delta);
	}
	Ds.SetObjectAttrUsingRef(eyeScaleRef, eyeScale);
	var timelimitText = "Kein Zeitlimit";
	if (eyeScale.z <= 300) {
		var minutes = Math.floor(eyeScale.z / 60);
		var seconds = Math.floor(eyeScale.z % 60);
		timelimitText = "Zeitlimit " + minutes + ":" + seconds;
	}
	Ds.SetObjectAttrUsingRef(ref, timelimitText);
}
