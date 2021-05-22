function rad2deg(rad) {
	return rad / Math.PI * 180;
}

function deg2rad(deg) {
	return deg * Math.PI / 180;
}

function clamp(val, min, max) {
	return Math.max(Math.min(val, max), min);
}

function convertSphericalPosdeg2rad(obj) {
	var cloned = obj.clone();
	cloned.x = deg2rad(cloned.x);
	cloned.y = deg2rad(cloned.y);
	return cloned;
}

function sphericalToCartesian(sph) {
	var azm = Math.PI / 2 - sph.x;
	var elv = Math.PI / 2 - sph.y;

	return {
		x: sph.z * Math.sin(elv) * Math.cos(azm),
		y: sph.z * Math.sin(elv) * Math.sin(azm),
		z: sph.z * Math.cos(elv)
	};
}

function length(vec) {
	return Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z);
}

function distance(vec1, vec2) {
	return length({
		x: vec2.x - vec1.x,
		y: vec2.y - vec1.y, 
		z: vec2.z - vec1.z
	});
}

function normalize(vec) {
	var len = length(vec);
	return {
		x: vec.x / len,
		y: vec.y / len,
		z: vec.z / len
	};
}

function dot(vec1, vec2) {
	return vec1.x * vec2.x + vec1.y * vec2.y + vec1.z * vec2.z;
}

function rotateAroundZ(vec, phi) {
	var cosPhi = Math.cos(phi);
	var sinPhi = Math.sin(phi);
	return {
		x: vec.x * cosPhi - vec.y * sinPhi,
		y: vec.x * sinPhi + vec.y * cosPhi,
		z: vec.z
	};
}

function rotateAroundY(vec, phi) {
	var cosPhi = Math.cos(phi);
	var sinPhi = Math.sin(phi);
	return {
		x: vec.x * cosPhi + vec.z * sinPhi,
		y: vec.y,
		z: -vec.x * sinPhi + vec.z * cosPhi
	};
}

function rotateAroundX(vec, phi) {
	var cosPhi = Math.cos(phi);
	var sinPhi = Math.sin(phi);
	return {
		x: vec.x,
		y: vec.y * cosPhi - vec.z * sinPhi,
		z: vec.y * sinPhi + vec.z * cosPhi
	};
}

function convertObjectdeg2rad(obj) {
	var cloned = obj.clone();
	for (var index in cloned) {
		if (typeof cloned[index] === "number") {
			cloned[index] = deg2rad(cloned[index]);
		}
	}
	return cloned;
}

function positionFixedSceneToScene(pos, eyeAttitudeRef) {
	var eyeAttitude = Ds.GetObjectAttrUsingRef(eyeAttitudeRef);
	var dayRotation = eyeAttitude.h;
	var earthPosition = eyeAttitude.p;
	var orthogonalEarthPosition = eyeAttitude.r;
	var scenePos = normalize(pos);
	scenePos = normalize(rotateAroundX(scenePos, earthPosition));
	scenePos = normalize(rotateAroundY(scenePos, orthogonalEarthPosition));
	scenePos = normalize(rotateAroundZ(scenePos, -dayRotation));
	
	return scenePos;
}

function printObject(text, object) {
	if (object == null) {
		object = text;
		print(JSON.stringify(object));
		return;
	}
	print(text + " " + JSON.stringify(object));
}

/**
  * Expects Cartesian mode ("CAR")
  * Domain: [-2*PI, 2*PI  ]
  * Range:  [0    , 10.883]
  */
function attitudeLength(attitude) {
	return Math.sqrt(attitude.p * attitude.p + attitude.r * attitude.r + attitude.h * attitude.h);
}

/**
  * Ignore distance
  * Var pos is the spericalposition
  * Used for spherical coordinates
*/
function sphericalLength(pos) {
	return Math.sqrt(pos.x * pos.x + pos.y * pos.y);
}

/**
  * Ignore distance
  * Used for spherical coordinates
*/
function sphericalDistance(a, b) {
	var diff = {x: a.x - b.x, y: a.y - b.y};
	return sphericalLength(diff);
}

function now() {
	return (new Date()).getTime() / 1000;
}

var dsRandNumber = Ds.NewRandomNumber(Date().getTime());

function rand() {
	return Ds.RandomNumber(dsRandNumber);
}