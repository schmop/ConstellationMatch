var PATH = "$Content\\User\\Produktion_extern\\ZodiacMatch\\";

include(PATH + "lib.js");
include(PATH + "polyfill.js");

var zodiacs = {	
   	"And": {
		pos: {x: 0.782691, y: 0.174883, z: 0.597336},
		sphericalDistance: 20,
		name: "Andromeda"
	},
	"Ant": {
		pos: {x: -0.737002, y: 0.368405, z: -0.566662},
		sphericalDistance: 17,
		name: "Luftpumpe"
	},
	"Aps": {
		pos: {x: -0.130213, y: -0.208720, z: -0.969268},
		sphericalDistance: 22,
		name: "Paradiesvogel"
	},
	"Aql": {
		pos: {x: 0.436761, y: -0.897215, z: 0.065154},
		sphericalDistance: 17,
		name: "Adler"
	},
	"Aqr": {
		pos: {x: 0.879368, y: -0.432278, z: -0.199619},
		sphericalDistance: 9.5,
		name: "Wassermann"
	},
	"Ara": {
		pos: {x: -0.098043, y: -0.561116, z: -0.821911},
		sphericalDistance: 24,
		name: "Altar"
	},
	"Ari": {
		pos: {x: 0.747905, y: 0.604442, z: 0.274387},
		sphericalDistance: 20,
		name: "Widder"
	},
	"Aur": {
		pos: {x: 0.107861, y: 0.736157, z: 0.668161},
		sphericalDistance: 15,
		name: "Fuhrmann"
	},
	"Boo": {
		pos: {x: -0.699526, y: -0.501676, z: 0.508905},
		sphericalDistance: 11.5,
		name: "Bärenhüter"
	},
	"Cae": {
		pos: {x: 0.253187, y: 0.759357, z: -0.599394},
		sphericalDistance: 27,
		name: "Grabstichel"
	},
	"Cam": {
		pos: {x: 0.082570, y: 0.273678, z: 0.958271},
		sphericalDistance: 10.5,
		name: "Giraffe"
	},
	"Cap": {
		pos: {x: 0.686428, y: -0.651906, z: -0.322234},
		sphericalDistance: 15,
		name: "Steinbock"
	},
	"Car": {
		pos: {x: -0.276375, y: 0.371213, z: -0.886464},
		sphericalDistance: 20,
		name: "Kiel des Schiffs"
	},
	"Cas": {
		pos: {x: 0.492836, y: 0.098338, z: 0.864547},
		sphericalDistance: 23,
		name: "Kassiopeia"
	},
	"Cen": {
		pos: {x: -0.649531, y: -0.113412, z: -0.751829},
		sphericalDistance: 8.5,
		name: "Zentaur"
	},
	"Cep": {
		pos: {x: 0.236792, y: -0.189658, z: 0.952869},
		sphericalDistance: 12,
		name: "Kepheus"
	},
	"Cet": {
		pos: {x: 0.895740, y: 0.425666, z: -0.128290},
		sphericalDistance: 8.5,
		name: "Walfisch"
	},
	"Cha": {
		pos: {x: -0.217572, y: 0.078753, z: -0.972862},
		sphericalDistance: 26,
		name: "Chamäleon"
	},
	"Cir": {
		pos: {x: -0.330222, y: -0.369108, z: -0.868742},
		sphericalDistance: 36,
		name: "Zirkel"
	},
	"Cma": {
		pos: {x: -0.187726, y: 0.892954, z: -0.409137},
		sphericalDistance: 18.5,
		name: "Großer Hund"
	},
	"Cmi": {
		pos: {x: -0.402458, y: 0.908349, z: 0.113710},
		sphericalDistance: 44,
		name: "Kleiner Hund"
	},
	"Cnc": {
		pos: {x: -0.581223, y: 0.738078, z: 0.342668},
		sphericalDistance: 20,
		name: "Krebs"
	},
	"Col": {
		pos: {x: 0.052796, y: 0.806622, z: -0.588705},
		sphericalDistance: 22,
		name: "Taube"
	},
	"Com": {
		pos: {x: -0.906814, y: -0.166602, z: 0.387211},
		sphericalDistance: 27,
		name: "Haar der Berenike"
	},
	"Cra": {
		pos: {x: 0.170136, y: -0.748271, z: -0.641205},
		sphericalDistance: 40,
		name: "Südliche Krone"
	},
	"Crb": {
		pos: {x: -0.477819, y: -0.707707, z: 0.520422},
		sphericalDistance: 36,
		name: "Nördliche Krone"
	},
	"Crt": {
		pos: {x: -0.956732, y: 0.128953, z: -0.260836},
		sphericalDistance: 26,
		name: "Becher"
	},
	"Cru": {
		pos: {x: -0.484375, y: -0.070806, z: -0.871991},
		sphericalDistance: 50,
		name: "Kreuz des Südens"
	},
	"Crv": {
		pos: {x: -0.936085, y: -0.121995, z: -0.329942},
		sphericalDistance: 36,
		name: "Rabe"
	},
	"Cvn": {
		pos: {x: -0.694607, y: -0.282554, z: 0.661577},
		sphericalDistance: 15,
		name: "Jagdhunde"
	},
	"Cyg": {
		pos: {x: 0.417471, y: -0.617314, z: 0.666815},
		sphericalDistance: 12,
		name: "Schwan"
	},
	"Del": {
		pos: {x: 0.617622, y: -0.757379, z: 0.211942},
		sphericalDistance: 36,
		name: "Delphin"
	},
	"Dor": {
		pos: {x: 0.151527, y: 0.495360, z: -0.855370},
		sphericalDistance: 19,
		name: "Schwertfisch"
	},
	"Dra": {
		pos: {x: -0.105553, y: -0.318137, z: 0.942150},
		sphericalDistance: 10,
		name: "Drache"
	},
	"Equ": {
		pos: {x: 0.782175, y: -0.612655, z: 0.113381},
		sphericalDistance: 37,
		name: "Füllen"
	},
	"Eri": {
		pos: {x: 0.550642, y: 0.674828, z: -0.491325},
		sphericalDistance: 7,
		name: "Eridanus"
	},
	"For": {
		pos: {x: 0.643358, y: 0.592309, z: -0.485037},
		sphericalDistance: 18,
		name: "Chemischer Ofen"
	},
	"Gem": {
		pos: {x: -0.246998, y: 0.870531, z: 0.425637},
		sphericalDistance: 16.5,
		name: "Zwillinge"
	},
	"Gru": {
		pos: {x: 0.663410, y: -0.257155, z: -0.702680},
		sphericalDistance: 18,
		name: "Kranich"
	},
	"Her": {
		pos: {x: -0.219343, y: -0.858577, z: 0.463394},
		sphericalDistance: 9,
		name: "Herkules"
	},
	"Hor": {
		pos: {x: 0.387001, y: 0.479274, z: -0.787735},
		sphericalDistance: 18,
		name: "Pendeluhr"
	},
	"Hya": {
		pos: {x: -0.939468, y: 0.208220, z: -0.272111},
		sphericalDistance: 5,
		name: "Wasserschlange"
	},
	"Hyi": {
		pos: {x: 0.296421, y: 0.156681, z: -0.942118},
		sphericalDistance: 22,
		name: "Kleine Wasserschlange"
	},
	"Ind": {
		pos: {x: 0.382510, y: -0.318854, z: -0.867190},
		sphericalDistance: 15,
		name: "Indianer"
	},
	"Lac": {
		pos: {x: 0.655225, y: -0.307863, z: 0.689855},
		sphericalDistance: 37,
		name: "Eidechse"
	},
	"Leo": {
		pos: {x: -0.912728, y: 0.319341, z: 0.254849},
		sphericalDistance: 10.5,
		name: "Löwe"
	},
	"Lep": {
		pos: {x: 0.118196, y: 0.945420, z: -0.303662},
		sphericalDistance: 29,
		name: "Hase"
	},
	"Lib": {
		pos: {x: -0.653378, y: -0.742866, z: -0.145767},
		sphericalDistance: 15,
		name: "Waage"
	},
	"Lmi": {
		pos: {x: -0.767904, y: 0.370352, z: 0.522649},
		sphericalDistance: 19,
		name: "Kleiner Löwe"
	},
	"Lup": {
		pos: {x: -0.478374, y: -0.569445, z: -0.668499},
		sphericalDistance: 17,
		name: "Wolf"
	},
	"Lyn": {
		pos: {x: -0.343372, y: 0.576752, z: 0.741251},
		sphericalDistance: 11.5,
		name: "Luchs"
	},
	"Lyr": {
		pos: {x: 0.180227, y: -0.785832, z: 0.591596},
		sphericalDistance: 34,
		name: "Leier"
	},
	"Men": {
		pos: {x: 0.034157, y: 0.193078, z: -0.980589},
		sphericalDistance: 24,
		name: "Tafelberg"
	},
	"Mic": {
		pos: {x: 0.580252, y: -0.551393, z: -0.599394},
		sphericalDistance: 30,
		name: "Mikroskop"
	},
	"Mon": {
		pos: {x: -0.394297, y: 0.916094, z: -0.072816},
		sphericalDistance: 10,
		name: "Einhorn"
	},
	"Mus": {
		pos: {x: -0.306117, y: -0.064451, z: -0.949810},
		sphericalDistance: 44,
		name: "Fliege"
	},
	"Nor": {
		pos: {x: -0.267773, y: -0.633547, z: -0.725889},
		sphericalDistance: 22,
		name: "Winkelmaß"
	},
	"Oct": {
		pos: {x: 0.075340, y: -0.122297, z: -0.989630},
		sphericalDistance: 19.5,
		name: "Oktant"
	},
	"Oph": {
		pos: {x: -0.220797, y: -0.971039, z: -0.091282},
		sphericalDistance: 11,
		name: "Schlangenträger"
	},
	"Ori": {
		pos: {x: 0.117554, y: 0.992344, z: 0.037865},
		sphericalDistance: 11.5,
		name: "Orion"
	},
	"Pav": {
		pos: {x: 0.161807, y: -0.371610, z: -0.914180},
		sphericalDistance: 19,
		name: "Pfau"
	},
	"Peg": {
		pos: {x: 0.919512, y: -0.205305, z: 0.335182},
		sphericalDistance: 9,
		name: "Pegasus"
	},
	"Per": {
		pos: {x: 0.460381, y: 0.533118, z: 0.709813},
		sphericalDistance: 12,
		name: "Perseus"
	},
	"Phe": {
		pos: {x: 0.660777, y: 0.158890, z: -0.733572},
		sphericalDistance: 14,
		name: "Phönix"
	},
	"Pic": {
		pos: {x: 0.051021, y: 0.591402, z: -0.804761},
		sphericalDistance: 21,
		name: "Maler"
	},
	"Psa": {
		pos: {x: 0.764296, y: -0.367593, z: -0.529838},
		sphericalDistance: 25,
		name: "Südlicher Fisch"
	},
	"Psc": {
		pos: {x: 0.949366, y: 0.135483, z: 0.283458},
		sphericalDistance: 9.5,
		name: "Fische"
	},
	"Pup": {
		pos: {x: -0.341598, y: 0.735569, z: -0.585020},
		sphericalDistance: 14,
		name: "Achterdeck des Schiffs"
	},
	"Pyx": {
		pos: {x: -0.601983, y: 0.607857, z: -0.517809},
		sphericalDistance: 35,
		name: "Schiffskompass"
	},
	"Ret": {
		pos: {x: 0.230556, y: 0.397660, z: -0.888094},
		sphericalDistance: 46,
		name: "Netz"
	},
	"Scl": {
		pos: {x: 0.831305, y: 0.121076, z: -0.542469},
		sphericalDistance: 15,
		name: "Bildhauer"
	},
	"Sco": {
		pos: {x: -0.334411, y: -0.813740, z: -0.475390},
		sphericalDistance: 12,
		name: "Skorpion"
	},
	"Sct": {
		pos: {x: 0.181610, y: -0.968288, z: -0.171568},
		sphericalDistance: 40,
		name: "Schild"
	},
	"Ser": {
		pos: {x: -0.193340, y: -0.978445, z: 0.072561},
		sphericalDistance: 8.5,
		name: "Schlange"
	},
	"Sex": {
		pos: {x: -0.890027, y: 0.455168, z: -0.025977},
		sphericalDistance: 21,
		name: "Sextant"
	},
	"Sge": {
		pos: {x: 0.433414, y: -0.844730, z: 0.313980},
		sphericalDistance: 50,
		name: "Pfeil"
	},
	"Sgr": {
		pos: {x: 0.317811, y: -0.811214, z: -0.490843},
		sphericalDistance: 11,
		name: "Schütze"
	},
	"Tau": {
		pos: {x: 0.380102, y: 0.880193, z: 0.284223},
		sphericalDistance: 13,
		name: "Stier"
	},
	"Tel": {
		pos: {x: 0.045203, y: -0.727986, z: -0.684100},
		sphericalDistance: 16,
		name: "Teleskop"
	},
	"Tra": {
		pos: {x: -0.173344, y: -0.340076, z: -0.924284},
		sphericalDistance: 40,
		name: "Südliches Dreieck"
	},
	"Tri": {
		pos: {x: 0.713849, y: 0.465342, z: 0.523332},
		sphericalDistance: 45,
		name: "Dreieck"
	},
	"Tuc": {
		pos: {x: 0.440534, y: -0.038064, z: -0.896929},
		sphericalDistance: 20,
		name: "Tukan"
	},
	"Uma": {
		pos: {x: -0.603789, y: 0.097075, z: 0.791211},
		sphericalDistance: 8.5,
		name: "Großer Wagen"
	},
	"Umi": {
		pos: {x: -0.136827, y: -0.135674, z: 0.981260},
		sphericalDistance: 20,
		name: "Kleiner Wagen"
	},
	"Vel": {
		pos: {x: -0.583077, y: 0.378613, z: -0.718800},
		sphericalDistance: 17,
		name: "Segel des Schiffs"
	},
	"Vir": {
		pos: {x: -0.943127, y: -0.332429, z: 0.001394},
		sphericalDistance: 9.5,
		name: "Jungfrau"
	},
	"Vol": {
		pos: {x: -0.178968, y: 0.306503, z: -0.934894},
		sphericalDistance: 26,
		name: "Fliegender Fisch"
	},
	"Vul": {
		pos: {x: 0.514262, y: -0.758378, z: 0.400495},
		sphericalDistance: 18,
		name: "Fuchs"
	}
};

/**
Wintersternenhimmel:
		orion,
		stier,
		zwillinge,
		fuhrmann,
		gr. hund,
		kl. hund,
		hasen,
		einhorn
**/
var winterNames = [
	"Ori",
	"Tau",
	"Gem",
	"Aur",
	"Cma",
	"Cmi",
	"Lep",
	"Mon"
];

/**
Herbststernenhimmel:
		pegasus,
		andromeda,
		cassiopeia,
		perseus,
		walfisch,
		fische,
		widder,
		cepheus
**/
var fallNames = [
	"Peg",
	"And",
	"Cas",
	"Per",
	"Cet",
	"Psc",
	"Ari",
	"Cep"
];
/**
Frühlingssternenhimmel:
		Löwe,
		Jungfrau,
		Bärenhüter,
		Nördliche Krone,
		Haar der Berenike
*/
var springNames = [
	"Leo",
	"Vir",
	"Boo",
	"Crb",
	"Com"
];
/**
Sommersternenhimmel:
		Schwan,
		Adler,
		Laier,
		Herkules,
		Delphin,
		Pfeil
*/
var summerNames = [
	"Cyg",
	"Aql",
	"Lyr",
	"Her",
	"Del",
	"Sge"
];
/**
Nordhalbkugel:
		Großer wagen,
		Kleiner Wagen,
		Cassiopeia
		Drachen,
		Cepheus,
		Giraffe
*/
var north = [
	"Uma",
	"Umi",
	"Cas",
	"Dra",
	"Cep",
	"Cam"
];
/**
Südhalbkugel:
		Kreuz des südens,
		Fliege,
		Centaur,
		Oktanten,
		cameleon,
		Tafelberg,
		kl. Wasserschlange,
		Paradiesvogel
*/
var south = [
	"Cru",
	"Mus",
	"Cen",
	"Oct",
	"Cha",
	"Men",
	"Hyi",
	"Aps"
];

var zod = [
	"Ari",
	"Tau",
	"Gem",
	"Cnc",
	"Leo",
	"Vir",
	"Lib",
	"Sco",
	"Oph",
	"Sgr",
	"Cap",
	"Aqr",
	"Psc"
];

var all = Object.keys(zodiacs);

var gameModes = {
	south: {
		gameset: south,
		label: "Sternbilder der Südhalbkugel",
		rotation: {
			 h: deg2rad(-100),
			 p: deg2rad(-122),
			 r: 0
		}
	},
	north: {
		gameset: north,
		label: "Sternbilder der Nordhalbkugel",
		rotation: {
			 h: deg2rad(18),
			 p: deg2rad(-45),
			 r: 0
		}
	},
	winter: {
		gameset: winterNames,
		label: "Wintersternbilder",
		rotation: {
			 h: deg2rad(18),
			 p: deg2rad(-45),
			 r: 0
		}
	},
	summer: {
		gameset: summerNames,
		label: "Sommersternbilder",
		rotation: {
			 h: deg2rad(112),
			 p: deg2rad(-14),
			 r: 0
		}
	},
	fall: {
		gameset: fallNames,
		label: "Herbststernbilder",
		rotation: {
			 h: deg2rad(40),
			 p: deg2rad(-80),
			 r: 0
		}
	},
	spring: {
		gameset: springNames,
		label: "Frühlingssternbilder",
		rotation: {
			 h: deg2rad(111),
			 p: deg2rad(42),
			 r: 0
		}
	},
	zodiac: {
		gameset: zod,
		label: "Tierkreiszeichen",
		rotation: {
			h: deg2rad(0),
			p: deg2rad(-38), // wolfsburg
			r: 0
		}
	},
	all: {
		gameset: all,
		label: "Alle Sternbilder",
		rotation: {
			 h: deg2rad(0),
			 p: deg2rad(-38), // wolfsburg
			 r: 0
		}
	}
};
