let added_a_bonus_cps = 0,
onclose_a_menu_bonus_cps = 0,
a_glow_anim = [""];

//generate achievements html elements when starting game
function generate_achievement_html_elements() {
	for(let i = 0; i < achievementKeys.length; i++) {
		$("#achi_group_"+achievements_data[achievementKeys[i]].group).append("<div id='"+achievementKeys[i]+"' class='achievements_icons'></div>");
		create_svg(0, "locked", achievementKeys[i]);
	}
	for (let i = 0; i < Game.permanent.unlocked_achievement.length; i++) {
		$("#"+Game.permanent.unlocked_achievement[i]).empty();
		create_svg(achievements_data[Game.permanent.unlocked_achievement[i]].lvl, achievements_data[Game.permanent.unlocked_achievement[i]].img, Game.permanent.unlocked_achievement[i]);
	}
	$("#achievements_complated").text(Game.permanent.unlocked_achievement.length+"/"+Object.keys(achievements_data).length);
	$("#achievements_bounes").text("CPS bonus "+simplifyNumber(Game.permanent.achievementsMulti*100)+"%");
}

//unlock achievement 
function unlock_achievement(achievement, level) {
	if(Game.permanent.unlocked_achievement.includes(achievement)) 
		return
	temp_bonus = 0
	Game.permanent.unlocked_achievement.push(achievement)
	Game.permanent.total_achievements++
	temp_bonus = parseFloat((Math.pow(level+1,(level+1)/3.5)/100).toFixed(2))
	added_a_bonus_cps += temp_bonus
	Game.permanent.achievementsMulti += temp_bonus
	log("<br>> "+con_span("Achievement ", "var(--achiev)")+"[<span id='"+achievement+"_a' style='color: var(--achiev_name)' class='achievements_card'>"+achievements_data[achievement].name+"</span>] unlocked, "+con_span("+"+simplifyNumber(temp_bonus*100)+"% ", "var(--golden)") + "CPS", "sys")
	CalResources()
	$("#"+achievement).empty()
	create_svg(achievements_data[achievement].lvl, achievements_data[achievement].img, achievement)
	a_glow_anim.push("#"+achievement)
	$("#"+achievement).addClass("achievements-glow")
	$("#achievements_complated").text(Game.permanent.unlocked_achievement.length+"/"+achievementKeys.length)
	$("#achievements_bounes").html("CPS bonus "+simplifyNumber(onclose_a_menu_bonus_cps*100)+"%"+con_span(" + "+simplifyNumber(added_a_bonus_cps*100)+"%", "var(--golden)"))
}

function recal_achievement() {
	new_bonus = 0
	Game.permanent.unlocked_achievement.forEach(function(value, index) {
		new_bonus += parseFloat((Math.pow(achievements_data[value].lvl,(achievements_data[value].lvl)/3.5)/100).toFixed(2))
	})
	Game.permanent.achievementsMulti = new_bonus
}

function click_achievement(id) {
	aoldsel = anewsel;
	anewsel = id;
	let temp = achievements_data[anewsel];
	$("#"+aoldsel).css("border", "1px solid var(--mainClr)");
	$("#"+anewsel).css("border", "2px solid var(--selectClr)");
	$("#achievements_name").text(temp.name);
	$("#achievements_des").text(temp.des);
}

function onhover_achievement_info(id) {
	id = id.replace("_a", "")
	$("#achievement_card_text").html(achievements_data[id].des)
}

var
total_hardware_marks = [["a_0", 500], ["a_1", 1000], ["a_2", 2000], ["a_3", 3000], ["a_4", 4000], ["a_5", 5000], 
["a_6", 6000], ["a_7", 7000], ["a_8", 8000], ["a_9", 9000], ["a_10", 10000], ["a_11", 11000], ["a_12", 12000]],

total_software_marks = [["a_13", 25], ["a_14", 50], ["a_15", 75], ["a_16", 100], ["a_17", 125], ["a_18", 150], 
["a_19", 200], ["a_20", 250], ["a_21", 300], ["a_22", 350], ["a_23", 400], ["a_24", 450], ["a_25", 500]],

//used object to write one while loop to use the >>[?]<<
h_mark_achiv = {
	h1: [["a_26", 50], ["a_27", 100], ["a_28", 150], ["a_29", 200], ["a_30", 250], ["a_31", 300],
		["a_32", 350], ["a_33", 400], ["a_34", 450], ["a_35", 500], ["a_36", 550], ["a_37", 600], ["a_38", 650]],
	h2: [["a_39", 50], ["a_40", 100], ["a_41", 150], ["a_42", 200], ["a_43", 250], ["a_44", 300],
		["a_45", 350], ["a_46", 400], ["a_47", 450], ["a_48", 500], ["a_49", 550], ["a_50", 600], ["a_51", 650]],
	h3: [["a_52", 50], ["a_53", 100], ["a_54", 150], ["a_55", 200], ["a_56", 250], ["a_57", 300],
		["a_58", 350], ["a_59", 400], ["a_60", 450], ["a_61", 500], ["a_62", 550], ["a_63", 600], ["a_64", 650]],
	h4: [["a_65", 50], ["a_66", 100], ["a_67", 150], ["a_68", 200], ["a_69", 250], ["a_70", 300],
		["a_71", 350], ["a_72", 400], ["a_73", 450], ["a_74", 500], ["a_75", 550], ["a_76", 600], ["a_77", 650]],
	h5: [["a_78", 25], ["a_79", 50], ["a_80", 100], ["a_81", 150], ["a_82", 200], ["a_83", 250],
		["a_84", 300], ["a_85", 350], ["a_86", 400], ["a_87", 450], ["a_88", 500], ["a_89", 550], ["a_90", 600]],
	h6: [["a_91", 25], ["a_92", 50], ["a_93", 100], ["a_94", 150], ["a_95", 200], ["a_96", 250],
		["a_97", 300], ["a_98", 350], ["a_99", 400], ["a_100", 450], ["a_101", 500], ["a_102", 550], ["a_103", 600]],
	h7: [["a_104", 1], ["a_105", 25], ["a_106", 50], ["a_107", 100], ["a_108", 150], ["a_109", 200], ["a_110", 250],
		["a_111", 300], ["a_112", 350], ["a_113", 400], ["a_114", 450], ["a_115", 500], ["a_116", 550]],
	h8: [["a_260", 1], ["a_261", 25], ["a_262", 50], ["a_263", 100], ["a_264", 150], ["a_265", 200], ["a_266", 250],
		["a_267", 300], ["a_268", 350], ["a_269", 400], ["a_270", 450], ["a_271", 500], ["a_272", 550]],
	h9: [["a_273", 1], ["a_274", 25], ["a_275", 50], ["a_276", 100], ["a_277", 150], ["a_278", 200], ["a_279", 250],
		["a_280", 300], ["a_281", 350], ["a_282", 400], ["a_283", 450], ["a_284", 500], ["a_285", 550]],
	h10: [["a_286", 1], ["a_287", 25], ["a_288", 50], ["a_289", 100], ["a_290", 150], ["a_291", 200], ["a_292", 250],
		["a_293", 300], ["a_294", 350], ["a_295", 400], ["a_296", 450], ["a_297", 500], ["a_298", 550]],
	h11: [["a_299", 1], ["a_300", 25], ["a_301", 50], ["a_302", 100], ["a_303", 150], ["a_304", 200], ["a_305", 250],
		["a_306", 300], ["a_307", 350], ["a_308", 400], ["a_309", 450], ["a_310", 500], ["a_311", 550]],
	h12: [["a_312", 1], ["a_313", 25], ["a_314", 50], ["a_315", 100], ["a_316", 150], ["a_317", 200], ["a_318", 250],
		["a_319", 300], ["a_320", 350], ["a_321", 400], ["a_322", 450], ["a_323", 500], ["a_324", 550]]
},

total_credit_in_one_session_marks = [["a_117", 1000000], ["a_118", 1000000000], ["a_119", 1000000000000], 
["a_120", 1000000000000000], ["a_121", 1000000000000000000], ["a_122", 1000000000000000000000], 
["a_123", 1000000000000000000000000], ["a_124", 1000000000000000000000000000], ["a_125", 1000000000000000000000000000000], 
["a_126", 1000000000000000000000000000000000], ["a_127", 1000000000000000000000000000000000000], 
["a_128", 1000000000000000000000000000000000000000], ["a_129", 1000000000000000000000000000000000000000000]],

total_credit_generated_marks = [["a_130", 1000000000], ["a_131", 1000000000000000], ["a_132", 1000000000000000000000], 
["a_133", 1000000000000000000000000000], ["a_134", 1000000000000000000000000000000000], 
["a_135", 1000000000000000000000000000000000000000], ["a_136", 1000000000000000000000000000000000000000000000], 
["a_137", 1000000000000000000000000000000000000000000000000000], 
["a_138", 1000000000000000000000000000000000000000000000000000000000], 
["a_139", 1000000000000000000000000000000000000000000000000000000000000000], 
["a_140", 1000000000000000000000000000000000000000000000000000000000000000000000], 
["a_141", 1000000000000000000000000000000000000000000000000000000000000000000000000000], 
["a_142", 1000000000000000000000000000000000000000000000000000000000000000000000000000000000]],

total_credit_spent_marks = [["a_143", 1000000000], ["a_144", 1000000000000000], ["a_145", 1000000000000000000000], 
["a_146", 1000000000000000000000000000], ["a_147", 1000000000000000000000000000000000], 
["a_148", 1000000000000000000000000000000000000000], ["a_149", 1000000000000000000000000000000000000000000000], 
["a_150", 1000000000000000000000000000000000000000000000000000], 
["a_151", 1000000000000000000000000000000000000000000000000000000000], 
["a_152", 1000000000000000000000000000000000000000000000000000000000000000], 
["a_153", 1000000000000000000000000000000000000000000000000000000000000000000000], 
["a_154", 1000000000000000000000000000000000000000000000000000000000000000000000000000], 
["a_155", 1000000000000000000000000000000000000000000000000000000000000000000000000000000000]],

highist_cps_marks = [["a_156", 1000000], ["a_157", 100000000], ["a_158", 1000000000], ["a_159", 100000000000], 
["a_160", 1000000000000], ["a_161", 100000000000000], ["a_162", 1000000000000000], ["a_163", 100000000000000000], 
["a_164", 1000000000000000000], ["a_165", 100000000000000000000], ["a_166", 1000000000000000000000], 
["a_167", 100000000000000000000000], ["a_168", 1000000000000000000000000]],

total_data_in_sesstion_marks = [["a_325", 65536], ["a_326", 262144], ["a_327", 4194304], ["a_328", 33554432],
	["a_329", 134217728], ["a_330", 268435456], ["a_331", 1073741824], ["a_332", 4294967296], ["a_333", 34359738368],
	["a_334", 68719476736], ["a_335", 137438953472], ["a_336", 274877906944], ["a_337", 1099511627776]],

total_data_marks = [["a_338", 4194304], ["a_339", 16777216], ["a_340", 67108864], ["a_341", 268435456],
	["a_342", 1073741824], ["a_343", 4294967296], ["a_344", 17179869184], ["a_345", 68719476736], ["a_346", 274877906944],
	["a_347", 1099511627776], ["a_348", 4398046511104], ["a_349", 17592186044416], ["a_350", 70368744177664]],

highist_dps_marks = [["a_351", 128], ["a_352", 256], ["a_353", 512], ["a_354", 1024],
	["a_355", 2048], ["a_356", 4096], ["a_357", 8192], ["a_358", 16384], ["a_359", 32768],
	["a_360", 65536], ["a_361", 131072], ["a_362", 262144], ["a_363", 524288]],

total_clicks_marks = [["a_169", 500], ["a_170", 2000], ["a_171", 5000], ["a_172", 10000], ["a_173", 20000], 
["a_174", 30000], ["a_175", 45000], ["a_176", 60000], ["a_177", 80000], ["a_178", 100000], ["a_179", 125000], 
["a_180", 155000], ["a_181", 200000]],

total_credit_from_clicks_marks = [["a_182", 100000], ["a_183", 10000000], ["a_184", 1000000000], 
["a_185", 100000000000], ["a_186", 10000000000000], ["a_187", 1000000000000000], ["a_188", 100000000000000000], 
["a_189", 10000000000000000000], ["a_190", 1000000000000000000000], ["a_191", 100000000000000000000000], 
["a_192", 10000000000000000000000000], ["a_193", 1000000000000000000000000000], 
["a_194", 100000000000000000000000000000]],

total_task_complated_marks = [["a_195", 300], ["a_196", 900], ["a_197", 1950], ["a_198", 3000], ["a_199", 6000],
["a_200", 9000], ["a_201", 13500], ["a_202", 18000], ["a_203", 25500], ["a_204", 33000], ["a_205", 45000],
["a_206", 60000], ["a_207", 75000]],

total_credit_from_tasks_marks = [["a_377", 500000000000], ["a_378", 50000000000000], ["a_379", 5000000000000000], 
["a_380", 500000000000000000], ["a_381", 50000000000000000000], ["a_382", 5000000000000000000000],
["a_383", 500000000000000000000000], ["a_384", 50000000000000000000000000], ["a_385", 5000000000000000000000000000],
["a_386", 500000000000000000000000000000], ["a_387", 50000000000000000000000000000000],
["a_388", 5000000000000000000000000000000000], ["a_389", 500000000000000000000000000000000000]],

total_data_from_tasks_marks = [["a_390", 1048576], ["a_391", 10485760], ["a_392", 33554432], ["a_393", 67108864],
["a_394", 268435456], ["a_395", 1073741824], ["a_396", 4294967296], ["a_397", 17179869184], ["a_398", 68719476736],
["a_399", 137438953472], ["a_400", 274877906944], ["a_401", 549755813888], ["a_402", 1099511627776]],

total_pressing_task_complated_marks = [["a_208", 100], ["a_209", 300], ["a_210", 650], ["a_211", 1000], ["a_212", 2000], 
["a_213", 3000], ["a_214", 4500], ["a_215", 6000], ["a_216", 8500], ["a_217", 11000], ["a_218", 15000], ["a_219", 20000], 
["a_220", 25000]],

total_add_task_complated_marks = [["a_221", 100], ["a_222", 300], ["a_223", 650], ["a_224", 1000], ["a_225", 2000],
["a_226", 3000], ["a_227", 4500], ["a_228", 6000], ["a_229", 8500], ["a_230", 11000], ["a_231", 15000], ["a_232", 20000], 
["a_233", 25000]],

total_sequence_task_complated_marks = [["a_364", 100], ["a_365", 300], ["a_366", 650], ["a_367", 1000], ["a_368", 2000],
["a_369", 3000], ["a_370", 4500], ["a_371", 6000], ["a_372", 8500], ["a_373", 11000], ["a_374", 15000], ["a_375", 20000], 
["a_376", 25000]],

total_ol_purchases_marks = [["a_234", 50], ["a_235", 100], ["a_236", 200], ["a_237", 400], ["a_238", 400], 
["a_239", 500], ["a_240", 650], ["a_241", 800], ["a_242", 950], ["a_243", 1100], ["a_244", 1250], 
["a_245", 1400], ["a_246", 1600]],

total_time_played_marks = [["a_247", 3600], ["a_248", 36000], ["a_249", 86400], ["a_250", 259200], ["a_251", 604800], 
["a_252", 1209600], ["a_253", 1814400], ["a_254", 2419200], ["a_255", 3628800], ["a_256", 4838400], ["a_257", 7257600], 
["a_258", 9676800], ["a_259", 12096000]],

achievements_data = {
	a_0: {
		name: "Tiny System",
		des: "Have 500 Hardware",
		img: "system",
		lvl: 1,
		group: 0
	},
	a_1: {
		name: "Mini System",
		des: "Have 1,000 Hardware",
		img: "system",
		lvl: 2,
		group: 0
	},
	a_2: {
		name: "Small System",
		des: "Have 2,000 Hardware",
		img: "system",
		lvl: 3,
		group: 0
	},
	a_3: {
		name: "Mediocre System",
		des: "Have 3,000 Hardware",
		img: "system",
		lvl: 4,
		group: 0
	},
	a_4: {
		name: "Big System",
		des: "Have 4,000 Hardware",
		img: "system",
		lvl: 5,
		group: 0
	},
	a_5: {
		name: "Large System",
		des: "Have 5,000 Hardware",
		img: "system",
		lvl: 6,
		group: 0
	},
	a_6: {
		name: "Huge System",
		des: "Have 6,000 Harware",
		img: "system",
		lvl: 7,
		group: 0
	},
	a_7: {
		name: "Massive System",
		des: "Have 7,000 Hardware",
		img: "system",
		lvl: 8,
		group: 0
	},
	a_8: {
		name: "Super System",
		des: "Have 8,000 Hardware",
		img: "system",
		lvl: 9,
		group: 0
	},
	a_9: {
		name: "International System",
		des: "Have 9,000 Hardware",
		img: "system",
		lvl: 10,
		group: 0
	},
	a_10: {
		name: "Continental System",
		des: "Have 10,000 Hardware",
		img: "system",
		lvl: 11,
		group: 0
	},
	a_11: {
		name: "Global System",
		des: "Have 11,000 Hardware",
		img: "system",
		lvl: 12,
		group: 0
	},
	a_12: {
		name: "Planetary System",
		des: "Have 12,000 Hardware",
		img: "system",
		lvl: 13,
		group: 0
	},
	a_13: {
		name: "Just Transistors",
		des: "Update your Softwares 25 times",
		img: "disc",
		lvl: 1,
		group: 0
	},
	a_14: {
		name: "Binary Language",
		des: "Update your Softwares 50 times",
		img: "disc",
		lvl: 2,
		group: 0
	},
	a_15: {
		name: "Machine Language",
		des: "Update your Softwares 75 times",
		img: "disc",
		lvl: 3,
		group: 0
	},
	a_16: {
		name: "Assembly",
		des: "Update your Softwares 100 times",
		img: "disc",
		lvl: 4,
		group: 0
	},
	a_17: {
		name: "Low-level Languages",
		des: "Update your Softwares 125 times",
		img: "disc",
		lvl: 5,
		group: 0
	},
	a_18: {
		name: "High-level Languages",
		des: "Update your Softwares 150 times",
		img: "disc",
		lvl: 6,
		group: 0
	},
	a_19: {
		name: "SIMULA",
		des: "Update your Softwares 200 times",
		img: "disc",
		lvl: 7,
		group: 0
	},
	a_20: {
		name: "C/C++/Java...",
		des: "Update your Softwares 250 times",
		img: "disc",
		lvl: 8,
		group: 0
	},
	a_21: {
		name: "Spaghetti Code",
		des: "Update your Softwares 300 times",
		img: "disc",
		lvl: 9,
		group: 0
	},
	a_22: {
		name: "Lasagna Code",
		des: "Update your Softwares 350 times",
		img: "disc",
		lvl: 10,
		group: 0
	},
	a_23: {
		name: "Coding Design Patterns",
		des: "Update your Softwares 400 times",
		img: "disc",
		lvl: 11,
		group: 0
	},
	a_24: {
		name: "Yet, Spaghetti Pattern is the dominant",
		des: "Update your Softwares 450 times",
		img: "disc",
		lvl: 12,
		group: 0
	},
	a_25: {
		name: "Software engineer",
		des: "Update your Softwares 500 times",
		img: "disc",
		lvl: 13,
		group: 0
	},
	a_26: {
		name: "Key",
		des: "Install 50 Keyboards",
		img: "keyboard",
		lvl: 1,
		group: 0
	},
	a_27: {
		name: "Board",
		des: "Install 100 Keyboards",
		img: "keyboard",
		lvl: 2,
		group: 0
	},
	a_28: {
		name: "Keyboard",
		des: "Install 150 Keyboards",
		img: "keyboard",
		lvl: 3,
		group: 0
	},
	a_29: {
		name: "Keys and Boards",
		des: "Install 200 Keyboards",
		img: "keyboard",
		lvl: 4,
		group: 0
	},
	a_30: {
		name: "Too many Keys and Boards",
		des: "Install 250 Keyboards",
		img: "keyboard",
		lvl: 5,
		group: 0
	},
	a_31: {
		name: "Keyboard True",
		des: "Install 300 Keyboards",
		img: "keyboard",
		lvl: 6,
		group: 0
	},
	a_32: {
		name: "Keyboard True Max",
		des: "Install 350 Keyboards",
		img: "keyboard",
		lvl: 7,
		group: 0
	},
	a_33: {
		name: "Keyboard True Max X",
		des: "Install 400 Keyboards",
		img: "keyboard",
		lvl: 8,
		group: 0
	},
	a_34: {
		name: "Keyboard True Max X Ultra",
		des: "Install 450 Keyboards",
		img: "keyboard",
		lvl: 9,
		group: 0
	},
	a_35: {
		name: "Keyboard True Max X Ultra Ultimate",
		des: "Install 500 Keyboards",
		img: "keyboard",
		lvl: 10,
		group: 0
	},
	a_36: {
		name: "Keyboard True Max X Ultra Ultimate Definitive",
		des: "Install 550 Keyboards",
		img: "keyboard",
		lvl: 11,
		group: 0
	},
	a_37: {
		name: "Just keep adding names and you will be fine",
		des: "Install 600 Keyboards",
		img: "keyboard",
		lvl: 12,
		group: 0
	},
	a_38: {
		name: "Too many names to be displayed",
		des: "Install 650 Keyboards",
		img: "keyboard",
		lvl: 13,
		group: 0
	},
	a_39: {
		name: "Mouse",
		des: "Install 50 Mouse",
		img: "mouse",
		lvl: 1,
		group: 0
	},
	a_40: {
		name: "Double Mouse???",
		des: "Install 100 Mouse",
		img: "mouse",
		lvl: 2,
		group: 0
	},
	a_41: {
		name: "Self positioning mouse, for lazy people",
		des: "Install 150 Mouse",
		img: "mouse",
		lvl: 3,
		group: 0
	},
	a_42: {
		name: "Eye tracking mouse",
		des: "Install 200 Mouse",
		img: "mouse",
		lvl: 4,
		group: 0
	},
	a_43: {
		name: "Mind reading mouse",
		des: "Install 250 Mouse",
		img: "mouse",
		lvl: 5,
		group: 0
	},
	a_44: {
		name: "Heart reading mouse",
		des: "Install 300 Mouse",
		img: "mouse",
		lvl: 6,
		group: 0
	},
	a_45: {
		name: "Soul reading mouse",
		des: "Install 350 Mouse",
		img: "mouse",
		lvl: 7,
		group: 0
	},
	a_46: {
		name: "Mouse that have its own conscious",
		des: "Install 400 Mouse",
		img: "mouse",
		lvl: 8,
		group: 0
	},
	a_47: {
		name: "Wait, this Mouse is talking?",
		des: "Install 450 Mouse",
		img: "mouse",
		lvl: 9,
		group: 0
	},
	a_48: {
		name: "Its saying its first word...",
		des: "Install 500 Mouse",
		img: "mouse",
		lvl: 10,
		group: 0
	},
	a_49: {
		name: "01000011 01101100 01101001 01100011 01101011",
		des: "Install 550 Mouse",
		img: "mouse",
		lvl: 11,
		group: 0
	},
	a_50: {
		name: "We are firnds now",
		des: "Install 600 Mouse",
		img: "mouse",
		lvl: 12,
		group: 0
	},
	a_51: {
		name: "At night, i see it move by its own, something is not right!",
		des: "Install 650 Mouse",
		img: "mouse",
		lvl: 13,
		group: 0
	},
	a_52: {
		name: "Wooden Chair",
		des: "Install 50 Chair",
		img: "chair",
		lvl: 1,
		group: 0
	},
	a_53: {
		name: "Plastic Chair",
		des: "Install 100 Chair",
		img: "chair",
		lvl: 2,
		group: 0
	},
	a_54: {
		name: "Wheelchair",
		des: "Install 150 Chair",
		img: "chair",
		lvl: 3,
		group: 0
	},
	a_55: {
		name: "Office Chair",
		des: "Install 200 Chair",
		img: "chair",
		lvl: 4,
		group: 0
	},
	a_56: {
		name: "Gaming Chair",
		des: "Install 250 Chair",
		img: "chair",
		lvl: 5,
		group: 0
	},
	a_57: {
		name: "Smart Chair",
		des: "Install 300 Chair",
		img: "chair",
		lvl: 6,
		group: 0
	},
	a_58: {
		name: "A.I. integrated chair",
		des: "Install 350 Chair",
		img: "chair",
		lvl: 7,
		group: 0
	},
	a_59: {
		name: "Ever heard of a chair that tells you to get up?",
		des: "Install 400 Chair",
		img: "chair",
		lvl: 8,
		group: 0
	},
	a_60: {
		name: "It was a bad idea to install A.I. in chairs",
		des: "Install 450 Chair",
		img: "chair",
		lvl: 9,
		group: 0
	},
	a_61: {
		name: "This chair is out of control!",
		des: "Install 500 Chair",
		img: "chair",
		lvl: 10,
		group: 0
	},
	a_62: {
		name: "How do i command it to stop following me!?",
		des: "Install 550 Chair",
		img: "chair",
		lvl: 11,
		group: 0
	},
	a_63: {
		name: "Final solution, where is the hammer?",
		des: "Install 600 Chair",
		img: "chair",
		lvl: 12,
		group: 0
	},
	a_64: {
		name: "The chair is resisting!",
		des: "Install 650 Chair",
		img: "chair",
		lvl: 13,
		group: 0
	},
	a_65: {
		name: "Floor is your Desk",
		des: "Install 50 Desk",
		img: "desk",
		lvl: 1,
		group: 0
	},
	a_66: {
		name: "Rock Desk",
		des: "Install 100 Desk",
		img: "desk",
		lvl: 2,
		group: 0
	},
	a_67: {
		name: "Wooden Desk",
		des: "Install 150 Desk",
		img: "desk",
		lvl: 3,
		group: 0
	},
	a_68: {
		name: "Moveable Desk",
		des: "Install 200 Desk",
		img: "desk",
		lvl: 4,
		group: 0
	},
	a_69: {
		name: "L shaped Desk",
		des: "Install 250 Desk",
		img: "desk",
		lvl: 5,
		group: 0
	},
	a_70: {
		name: "Desk with drawers",
		des: "Install 300 Desk",
		img: "desk",
		lvl: 6,
		group: 0
	},
	a_71: {
		name: "Touch Desk",
		des: "Install 350 Desk",
		img: "desk",
		lvl: 7,
		group: 0
	},
	a_72: {
		name: "Hologram Desk",
		des: "Install 400 Desk",
		img: "desk",
		lvl: 8,
		group: 0
	},
	a_73: {
		name: "A.I. integrated Desk",
		des: "Install 450 Desk",
		img: "desk",
		lvl: 9,
		group: 0
	},
	a_74: {
		name: "Desk with a bed",
		des: "Install 500 Desk",
		img: "desk",
		lvl: 10,
		group: 0
	},
	a_75: {
		name: "Desk with a fridge",
		des: "Install 550 Desk",
		img: "desk",
		lvl: 11,
		group: 0
	},
	a_76: {
		name: "Full house Desk",
		des: "Install 600 Desk",
		img: "desk",
		lvl: 12,
		group: 0
	},
	a_77: {
		name: "Desks are real estate now",
		des: "Install 650 Desk",
		img: "desk",
		lvl: 13,
		group: 0
	},
	a_78: {
		name: "CRT Monitor",
		des: "Install 25 Monitor",
		img: "monitor",
		lvl: 1,
		group: 0
	},
	a_79: {
		name: "LED Monitor",
		des: "Install 50 Monitor",
		img: "monitor",
		lvl: 2,
		group: 0
	},
	a_80: {
		name: "LCD Monitor",
		des: "Install 100 Monitor",
		img: "monitor",
		lvl: 3,
		group: 0
	},
	a_81: {
		name: "OLED Monitor",
		des: "Install 150 Monitor",
		img: "monitor",
		lvl: 4,
		group: 0
	},
	a_82: {
		name: "AMOLED Monitor",
		des: "Install 200 Monitor",
		img: "monitor",
		lvl: 5,
		group: 0
	},
	a_83: {
		name: "Touch Monitor",
		des: "Install 250 Monitor",
		img: "monitor",
		lvl: 6,
		group: 0
	},
	a_84: {
		name: "Smart Monitor",
		des: "Install 300 Monitor",
		img: "monitor",
		lvl: 7,
		group: 0
	},
	a_85: {
		name: "A.I. integrated Monitor",
		des: "Install 350 Monitor",
		img: "monitor",
		lvl: 8,
		group: 0
	},
	a_86: {
		name: "Monitor with a camera",
		des: "Install 400 Monitor",
		img: "monitor",
		lvl: 9,
		group: 0
	},
	a_87: {
		name: "Monitoring room",
		des: "Install 450 Monitor",
		img: "monitor",
		lvl: 10,
		group: 0
	},
	a_88: {
		name: "Monitor that watches you instead",
		des: "Install 500 Monitor",
		img: "monitor",
		lvl: 11,
		group: 0
	},
	a_89: {
		name: "Someone is watching me, i can feel it",
		des: "Install 550 Monitor",
		img: "monitor",
		lvl: 12,
		group: 0
	},
	a_90: {
		name: "Hologram Monitor",
		des: "Install 600 Monitor",
		img: "monitor",
		lvl: 13,
		group: 0
	},
	a_91: {
		name: "Gateway",
		des: "Install 25 Router",
		img: "router",
		lvl: 1,
		group: 0
	},
	a_92: {
		name: "Router",
		des: "Install 50 Router",
		img: "router",
		lvl: 2,
		group: 0
	},
	a_93: {
		name: "Home Router",
		des: "Install 100 Router",
		img: "router",
		lvl: 3,
		group: 0
	},
	a_94: {
		name: "WIFI Router",
		des: "Install 150 Router",
		img: "router",
		lvl: 4,
		group: 0
	},
	a_95: {
		name: "Router with two Antennas",
		des: "Install 200 Router",
		img: "router",
		lvl: 5,
		group: 0
	},
	a_96: {
		name: "Router with three Antennas",
		des: "Install 250 Router",
		img: "router",
		lvl: 6,
		group: 0
	},
	a_97: {
		name: "Router with four Antennas",
		des: "Install 300 Router",
		img: "router",
		lvl: 7,
		group: 0
	},
	a_98: {
		name: "Gaming Router",
		des: "Install 350 Router",
		img: "router",
		lvl: 8,
		group: 0
	},
	a_99: {
		name: "A.I. integrated Router",
		des: "Install 400 Router",
		img: "router",
		lvl: 9,
		group: 0
	},
	a_100: {
		name: "Unlimited speed Router, or so they say...",
		des: "Install 450 Router",
		img: "router",
		lvl: 10,
		group: 0
	},
	a_101: {
		name: "This Router choose best paths as needed, Amazing",
		des: "Install 500 Router",
		img: "router",
		lvl: 11,
		group: 0
	},
	a_102: {
		name: "What is this Network that this router keep conecting to?",
		des: "Install 550 Router",
		img: "router",
		lvl: 12,
		group: 0
	},
	a_103: {
		name: "This Router knows about me more than my mother...",
		des: "Install 600 Router",
		img: "router",
		lvl: 13,
		group: 0
	},
	a_104: {
		name: "So this System is running on what?",
		des: "Install 1 PC",
		img: "pc",
		lvl: 1,
		group: 0
	},
	a_105: {
		name: "Microcomputers",
		des: "Install 25 PC",
		img: "pc",
		lvl: 2,
		group: 0
	},
	a_106: {
		name: "Minicomputers",
		des: "Install 50 PC",
		img: "pc",
		lvl: 3,
		group: 0
	},
	a_107: {
		name: "Mainframe computers",
		des: "Install 100 PC",
		img: "pc",
		lvl: 4,
		group: 0
	},
	a_108: {
		name: "Supercomputers",
		des: "Install 150 PC",
		img: "pc",
		lvl: 5,
		group: 0
	},
	a_109: {
		name: "PC Company",
		des: "Install 200 PC",
		img: "pc",
		lvl: 6,
		group: 0
	},
	a_110: {
		name: "Nanosoft",
		des: "Install 250 PC",
		img: "pc",
		lvl: 7,
		group: 0
	},
	a_111: {
		name: "Computers factory",
		des: "Install 300 PC",
		img: "pc",
		lvl: 8,
		group: 0
	},
	a_112: {
		name: "A.I. integrated Computers",
		des: "Install 350 PC",
		img: "pc",
		lvl: 9,
		group: 0
	},
	a_113: {
		name: "I can just sit here and it will do everything for me!",
		des: "Install 400 PC",
		img: "pc",
		lvl: 10,
		group: 0
	},
	a_114: {
		name: "I think it's broken!",
		des: "Install 450 PC",
		img: "pc",
		lvl: 11,
		group: 0
	},
	a_115: {
		name: "It's running unknown Tasks!",
		des: "Install 500 PC",
		img: "pc",
		lvl: 12,
		group: 0
	},
	a_116: {
		name: "I am reducing my resources consumption",
		des: "Install 550 PC",
		img: "pc",
		lvl: 13,
		group: 0
	},
	a_117: {
		name: "Generative",
		des: "Generate 1M Credit in one session",
		img: "banknote",
		lvl: 1,
		group: 1
	},
	a_118: {
		name: "Regional economist",
		des: "Generate 1B Credit in one session",
		img: "banknote",
		lvl: 2,
		group: 1
	},
	a_119: {
		name: "International economist",
		des: "Generate 1T Credit in one session",
		img: "banknote",
		lvl: 3,
		group: 1
	},
	a_120: {
		name: "Global economist",
		des: "Generate 1Q Credit in one session",
		img: "banknote",
		lvl: 4,
		group: 1
	},
	a_121: {
		name: "Planetary economist",
		des: "Generate 1aa Credit in one session",
		img: "banknote",
		lvl: 5,
		group: 1
	},
	a_122: {
		name: "Galactic economist",
		des: "Generate 1ab Credit in one session",
		img: "banknote",
		lvl: 6,
		group: 1
	},
	a_123: {
		name: "Universal economist",
		des: "Generate 1ac Credit in one session",
		img: "banknote",
		lvl: 7,
		group: 1
	},
	a_124: {
		name: "Multiverse economist",
		des: "Generate 1ad Credit in one session",
		img: "banknote",
		lvl: 8,
		group: 1
	},
	a_125: {
		name: "Dimensional economist",
		des: "Generate 1ae Credit in one session",
		img: "banknote",
		lvl: 9,
		group: 1
	},
	a_126: {
		name: "Multidimensional economist",
		des: "Generate 1af Credit in one session",
		img: "banknote",
		lvl: 10,
		group: 1
	},
	a_127: {
		name: "Beyond and further economist",
		des: "Generate 1ag Credit in one session",
		img: "banknote",
		lvl: 11,
		group: 1
	},
	a_128: {
		name: "What lies in the Unknown economist",
		des: "Generate 1ah Credit in one session",
		img: "banknote",
		lvl: 12,
		group: 1
	},
	a_129: {
		name: "What lies in what we can't know economist",
		des: "Generate 1ai Credit in one session",
		img: "banknote",
		lvl: 13,
		group: 1
	},
	a_130: {
		name: "Billionaire",
		des: "Generate total of 1B Credit",
		img: "bank",
		lvl: 1,
		group: 1
	},
	a_131: {
		name: "Quadrillionaire",
		des: "Generate total of 1Q Credit",
		img: "bank",
		lvl: 2,
		group: 1
	},
	a_132: {
		name: "ab-naire?",
		des: "Generate total of 1ab Credit",
		img: "bank",
		lvl: 3,
		group: 1
	},	
	a_133: {
		name: "Ok, seriously how did you not get investigated?",
		des: "Generate total of 1ad Credit",
		img: "bank",
		lvl: 4,
		group: 1
	},
	a_134: {
		name: "Who he is above the laws",
		des: "Generate total of 1af Credit",
		img: "bank",
		lvl: 5,
		group: 1
	},
	a_135: {
		name: "I can buy myself a planet",
		des: "Generate total of 1ah Credit",
		img: "bank",
		lvl: 6,
		group: 1
	},
	a_136: {
		name: "I have so much money i don't know what to do with it",
		des: "Generate total of 1aj Credit",
		img: "bank",
		lvl: 7,
		group: 1
	},
	a_137: {
		name: "I am investing my money to improve Earth",
		des: "Generate total of 1al Credit",
		img: "bank",
		lvl: 8,
		group: 1
	},
	a_138: {
		name: "Scientist have developed a system that will help",
		des: "Generate total of 1an Credit",
		img: "bank",
		lvl: 9,
		group: 1
	},
	a_139: {
		name: "Things going great",
		des: "Generate total of 1ap Credit",
		img: "bank",
		lvl: 10,
		group: 1
	},
	a_140: {
		name: "World hunger is almost a myth",
		des: "Generate total of 1ar Credit",
		img: "bank",
		lvl: 11,
		group: 1
	},
	a_141: {
		name: "The system is doing far more then it should be.",
		des: "Generate total of 1at Credit",
		img: "bank",
		lvl: 12,
		group: 1
	},
	a_142: {
		name: "G.A.I.A",
		des: "Generate total of 1av Credit",
		img: "bank",
		lvl: 13,
		group: 1
	},
	a_143: {
		name: "Spending without regrets",
		des: "Spend total of 1B Credit",
		img: "price",
		lvl: 1,
		group: 1
	},
	a_144: {
		name: "Money circulation",
		des: "Spend total of 1Q Credit",
		img: "price",
		lvl: 2,
		group: 1
	},
	a_145: {
		name: "Shopping",
		des: "Spend total of 1ab Credit",
		img: "price",
		lvl: 3,
		group: 1
	},
	a_146: {
		name: "Shopping spree",
		des: "Spend total of 1ad Credit",
		img: "price",
		lvl: 4,
		group: 1
	},
	a_147: {
		name: "I pay, things get done!",
		des: "Spend total of 1af Credit",
		img: "price",
		lvl: 5,
		group: 1
	},
	a_148: {
		name: "Looking for new way to spend money on",
		des: "Spend total of 1ah Credit",
		img: "price",
		lvl: 6,
		group: 1
	},
	a_149: {
		name: "It never ends",
		des: "Spend total of 1aj Credit",
		img: "price",
		lvl: 7,
		group: 1
	},
	a_150: {
		name: "I invested money to improve Earth",
		des: "Spend total of 1al Credit",
		img: "price",
		lvl: 8,
		group: 1
	},
	a_151: {
		name: "Massive budget, but I got this",
		des: "Spend total of 1an Credit",
		img: "price",
		lvl: 9,
		group: 1
	},
	a_152: {
		name: "The results are good",
		des: "Spend total of 1ap Credit",
		img: "price",
		lvl: 10,
		group: 1
	},
	a_153: {
		name: "When problems get solved, new ones replace them",
		des: "Spend total of 1ar Credit",
		img: "price",
		lvl: 11,
		group: 1
	},
	a_154: {
		name: "It is too good to be true",
		des: "Spend total of 1at Credit",
		img: "price",
		lvl: 12,
		group: 1
	},
	a_155: {
		name: "G.A.I.A",
		des: "Spend total of 1av Credit",
		img: "price",
		lvl: 13,
		group: 1
	},
	a_156: {
		name: "1M credit a second, keeps the doctor away",
		des: "Generate 1M Credit per second",
		img: "credit",
		lvl: 1,
		group: 1
	},
	a_157: {
		name: "What is better than 1M?, 100M",
		des: "Generate 100M Credit per second",
		img: "credit",
		lvl: 2,
		group: 1
	},
	a_158: {
		name: "Into the realm of Wealth",
		des: "Generate 1B Credit per second",
		img: "credit",
		lvl: 3,
		group: 1
	},
	a_159: {
		name: "Billions and Billions...",
		des: "Generate 100B Credit per second",
		img: "credit",
		lvl: 4,
		group: 1
	},
	a_160: {
		name: "Imagine owning Trillions in 64bits only...",
		des: "Generate 1T Credit per second",
		img: "credit",
		lvl: 5,
		group: 1
	},
	a_161: {
		name: "Just don't spend it in a suspicious way",
		des: "Generate 100T Credit per second",
		img: "credit",
		lvl: 6,
		group: 1
	},
	a_162: {
		name: "Never ending dream",
		des: "Generate 1Q Credit per second",
		img: "credit",
		lvl: 7,
		group: 1
	},
	a_163: {
		name: "What you take will return",
		des: "Generate 100Q Credit per second",
		img: "credit",
		lvl: 8,
		group: 1
	},
	a_164: {
		name: "Sharing it to other people",
		des: "Generate 1aa Credit per second",
		img: "credit",
		lvl: 9,
		group: 1
	},
	a_165: {
		name: "Everyone is happy",
		des: "Generate 100aa Credit per second",
		img: "credit",
		lvl: 10,
		group: 1
	},
	a_166: {
		name: "bittersweet",
		des: "Generate 1ab Credit per second",
		img: "credit",
		lvl: 11,
		group: 1
	},
	a_167: {
		name: "Nothing is perfect",
		des: "Generate 100ab Credit per second",
		img: "credit",
		lvl: 12,
		group: 1
	},
	a_168: {
		name: "G.A.I.A",
		des: "Generate 1ac Credit per second",
		img: "credit",
		lvl: 13,
		group: 1
	},
	a_169: {
		name: "Making sure the program is working",
		des: "Use the Clicker program 500 times",
		img: "click",
		lvl: 1,
		group: 2
	},
	a_170: {
		name: "Making sure the mouse is working",
		des: "Use the Clicker 2,000 times",
		img: "click",
		lvl: 2,
		group: 2
	},
	a_171: {
		name: "Yep, they are working",
		des: "Use the Clicker 5,000 times",
		img: "click",
		lvl: 3,
		group: 2
	},
	a_172: {
		name: "Testing my limit",
		des: "Use the Clicker 10,000 times",
		img: "click",
		lvl: 4,
		group: 2
	},
	a_173: {
		name: "Testing my patience",
		des: "Use the Clicker 20,000 times",
		img: "click",
		lvl: 5,
		group: 2
	},
	a_174: {
		name: "Keep clicking",
		des: "Use the Clicker 30,000 times",
		img: "click",
		lvl: 6,
		group: 2
	},
	a_175: {
		name: "What time it is?, it's CLICKING time",
		des: "Use the Clicker 45,000 times",
		img: "click",
		lvl: 7,
		group: 2
	},
	a_176: {
		name: "Click Click Click",
		des: "Use the Clicker 60,000 times",
		img: "click",
		lvl: 8,
		group: 2
	},
	a_177: {
		name: "Check on your mouse",
		des: "Use the Clicker 80,000 times",
		img: "click",
		lvl: 9,
		group: 2
	},
	a_178: {
		name: "Good job, you did it",
		des: "Use the Clicker 100,000 times",
		img: "click",
		lvl: 10,
		group: 2
	},
	a_179: {
		name: "Sky is the only limit",
		des: "Use the Clicker 125,000 times",
		img: "click",
		lvl: 11,
		group: 2
	},
	a_180: {
		name: "Loosing my mind",
		des: "Use the Clicker 155,000 times",
		img: "click",
		lvl: 12,
		group: 2
	},
	a_181: {
		name: "Clicker Bot",
		des: "Use the Clicker 200,000 times",
		img: "click",
		lvl: 13,
		group: 2
	},
	a_182: {
		name: "Making money by clicking",
		des: "Generate total of 100,000 credit by clicking",
		img: "cursor",
		lvl: 1,
		group: 2
	},
	a_183: {
		name: "Easiest job",
		des: "Generate total of 10M credit by clicking",
		img: "cursor",
		lvl: 2,
		group: 2
	},
	a_184: {
		name: "Is this real?",
		des: "Generate total of 1B credit by clicking",
		img: "cursor",
		lvl: 3,
		group: 2
	},
	a_185: {
		name: "Click and get paid",
		des: "Generate total of 100B credit by clicking",
		img: "cursor",
		lvl: 4,
		group: 2
	},
	a_186: {
		name: "Expert clicker",
		des: "Generate total of 10T credit by clicking",
		img: "cursor",
		lvl: 5,
		group: 2
	},
	a_187: {
		name: "Clicker economist",
		des: "Generate total of 1Q credit by clicking",
		img: "cursor",
		lvl: 6,
		group: 2
	},
	a_188: {
		name: "Stop asking me how i did it, ask who program it...",
		des: "Generate total of 100Q credit by clicking",
		img: "cursor",
		lvl: 7,
		group: 2
	},
	a_189: {
		name: "Professional clicker",
		des: "Generate total of 10aa credit by clicking",
		img: "cursor",
		lvl: 8,
		group: 2
	},
	a_190: {
		name: "Feels like it's not worth it",
		des: "Generate total of 1ab credit by clicking",
		img: "cursor",
		lvl: 9,
		group: 2
	},
	a_191: {
		name: "Pushing through pain",
		des: "Generate total of 100ab credit by clicking",
		img: "cursor",
		lvl: 10,
		group: 2
	},
	a_192: {
		name: "Pursuing a goal",
		des: "Generate total of 10ac credit by clicking",
		img: "cursor",
		lvl: 11,
		group: 2
	},
	a_193: {
		name: "Not giving up",
		des: "Generate total of 1ad credit by clicking",
		img: "cursor",
		lvl: 12,
		group: 2
	},
	a_194: {
		name: "Endless regret",
		des: "Generate total of 100ad credit by clicking",
		img: "cursor",
		lvl: 13,
		group: 2
	},
	a_195: {
		name: "Check list",
		des: "Complate total of 300 Tasks",
		img: "tasks",
		lvl: 1,
		group: 3
	},
	a_196: {
		name: "Todo List",
		des: "Complate total of 900 Tasks",
		img: "tasks",
		lvl: 2,
		group: 3
	},
	a_197: {
		name: "Job done",
		des: "Complate total of 1,950 Tasks",
		img: "tasks",
		lvl: 3,
		group: 3
	},
	a_198: {
		name: "Hard worker",
		des: "Complate total of 3,000 Tasks",
		img: "tasks",
		lvl: 4,
		group: 3
	},
	a_199: {
		name: "Fast fingers",
		des: "Complate total of 6,000 Tasks",
		img: "tasks",
		lvl: 5,
		group: 3
	},
	a_200: {
		name: "Accelerated thinking",
		des: "Complate total of 9,000 Tasks",
		img: "tasks",
		lvl: 6,
		group: 3
	},
	a_201: {
		name: "Business man",
		des: "Complate total of 13,500 Tasks",
		img: "tasks",
		lvl: 7,
		group: 3
	},
	a_202: {
		name: "Accomplished finely",
		des: "Complate total of 18,000 Tasks",
		img: "tasks",
		lvl: 8,
		group: 3
	},
	a_203: {
		name: "Never complaining",
		des: "Complate total of 25,500 Tasks",
		img: "tasks",
		lvl: 9,
		group: 3
	},
	a_204: {
		name: "It's already done sir",
		des: "Complate total of 33,000 Tasks",
		img: "tasks",
		lvl: 10,
		group: 3
	},
	a_205: {
		name: "The right man for any task",
		des: "Complate total of 45,000 Tasks",
		img: "tasks",
		lvl: 11,
		group: 3
	},
	a_206: {
		name: "Did i get faster using the keyboard?",
		des: "Complate total of 60,000 Tasks",
		img: "tasks",
		lvl: 12,
		group: 3
	},
	a_207: {
		name: "Jack of all trades",
		des: "Complate total of 75,000 Tasks",
		img: "tasks",
		lvl: 13,
		group: 3
	},
	a_208: {
		name: "Press this",
		des: "Complate total of 100 Pressing Tasks",
		img: "pressing",
		lvl: 1,
		group: 3
	},
	a_209: {
		name: "Press that",
		des: "Complate total of 300 Pressing Tasks",
		img: "pressing",
		lvl: 2,
		group: 3
	},
	a_210: {
		name: "Press everything",
		des: "Complate total of 650 Pressing Tasks",
		img: "pressing",
		lvl: 3,
		group: 3
	},
	a_211: {
		name: "Press everywhere",
		des: "Complate total of 1,000 Pressing Tasks",
		img: "pressing",
		lvl: 4,
		group: 3
	},
	a_212: {
		name: "Pressing maneuver",
		des: "Complate total of 2,000 Pressing Tasks",
		img: "pressing",
		lvl: 5,
		group: 3
	},
	a_213: {
		name: "Pressing expert",
		des: "Complate total of 3,000 Pressing Tasks",
		img: "pressing",
		lvl: 6,
		group: 3
	},
	a_214: {
		name: "Pressing machine",
		des: "Complate total of 4,500 Pressing Tasks",
		img: "pressing",
		lvl: 7,
		group: 3
	},
	a_215: {
		name: "Golden finger",
		des: "Complate total of 6,000 Pressing Tasks",
		img: "pressing",
		lvl: 8,
		group: 3
	},
	a_216: {
		name: "Pressing is my life",
		des: "Complate total of 8,500 Pressing Tasks",
		img: "pressing",
		lvl: 9,
		group: 3
	},
	a_217: {
		name: "Looking for more pressing tasks",
		des: "Complate total of 11,000 Pressing Tasks",
		img: "pressing",
		lvl: 10,
		group: 3
	},
	a_218: {
		name: "Press, sleep, repeat",
		des: "Complate total of 15,000 Pressing Tasks",
		img: "pressing",
		lvl: 11,
		group: 3
	},
	a_219: {
		name: "Certain someone would love this tasks",
		des: "Complate total of 20,000 Pressing Tasks",
		img: "pressing",
		lvl: 12,
		group: 3
	},
	a_220: {
		name: "STANLEY would be proud of you",
		des: "Complate total of 25,000 Pressing Tasks",
		img: "pressing",
		lvl: 13,
		group: 3
	},
	a_221: {
		name: "I can do Addition",
		des: "Complate total of 100 Addition Tasks",
		img: "calculator",
		lvl: 1,
		group: 3
	},
	a_222: {
		name: "I know what 377 + 733 is",
		des: "Complate total of 300 Addition Tasks",
		img: "calculator",
		lvl: 2,
		group: 3
	},
	a_223: {
		name: "Addition is awesome",
		des: "Complate total of 650 Addition Tasks",
		img: "calculator",
		lvl: 3,
		group: 3
	},
	a_224: {
		name: "Brain training",
		des: "Complate total of 1,000 Addition Tasks",
		img: "calculator",
		lvl: 4,
		group: 3
	},
	a_225: {
		name: "Addition and money, i can do both",
		des: "Complate total of 2,000 Addition Tasks",
		img: "calculator",
		lvl: 5,
		group: 3
	},
	a_226: {
		name: "Natural Numbers",
		des: "Complate total of 3,000 Addition Tasks",
		img: "calculator",
		lvl: 6,
		group: 3
	},
	a_227: {
		name: "Whole Numbers",
		des: "Complate total of 4,500 Addition Tasks",
		img: "calculator",
		lvl: 7,
		group: 3
	},
	a_228: {
		name: "Solveing problems faster, i can feel it",
		des: "Complate total of 6,000 Addition Tasks",
		img: "calculator",
		lvl: 8,
		group: 3
	},
	a_229: {
		name: "Solve from left to right",
		des: "Complate total of 8,500 Addition Tasks",
		img: "calculator",
		lvl: 9,
		group: 3
	},
	a_230: {
		name: "Basic arithmetic operation expert",
		des: "Complate total of 11,000 Addition Tasks",
		img: "calculator",
		lvl: 10,
		group: 3
	},
	a_231: {
		name: "ADDmatician?",
		des: "Complate total of 15,000 Addition Tasks",
		img: "calculator",
		lvl: 11,
		group: 3
	},
	a_232: {
		name: "ADDiction!",
		des: "Complate total of 20,000 Addition Tasks",
		img: "calculator",
		lvl: 12,
		group: 3
	},
	a_233: {
		name: "Human ADDculator",
		des: "Complate total of 25,000 Addition Tasks",
		img: "calculator",
		lvl: 13,
		group: 3
	},
	a_234: {
		name: "Browsing the store",
		des: "Purchase Total of 50 items from the Online store",
		img: "cart",
		lvl: 1,
		group: 4
	},
	a_235: {
		name: "So many things to buy",
		des: "Purchase Total of 100 items from the Online store",
		img: "cart",
		lvl: 2,
		group: 4
	},
	a_236: {
		name: "One of each item please",
		des: "Purchase Total of 200 items from the Online store",
		img: "cart",
		lvl: 3,
		group: 4
	},
	a_237: {
		name: "The favourite customer",
		des: "Purchase Total of 300 items from the Online store",
		img: "cart",
		lvl: 4,
		group: 4
	},
	a_238: {
		name: "Endless Bottom cart",
		des: "Purchase Total of 400 items from the Online store",
		img: "cart",
		lvl: 5,
		group: 4
	},
	a_239: {
		name: "Thank you for your patronage",
		des: "Purchase Total of 500 items from the Online store",
		img: "cart",
		lvl: 6,
		group: 4
	},
	a_240: {
		name: "Wherever you go, there are happy faces",
		des: "Purchase Total of 650 items from the Online store",
		img: "cart",
		lvl: 7,
		group: 4
	},
	a_241: {
		name: "More than enough",
		des: "Purchase Total of 800 items from the Online store",
		img: "cart",
		lvl: 8,
		group: 4
	},
	a_242: {
		name: "Shopping addict",
		des: "Purchase Total of 950 items from the Online store",
		img: "cart",
		lvl: 9,
		group: 4
	},
	a_243: {
		name: "Golden customer",
		des: "Purchase Total of 1,100 items from the Online store",
		img: "cart",
		lvl: 10,
		group: 4
	},
	a_244: {
		name: "Diamond customer",
		des: "Purchase Total of 1,250 items from the Online store",
		img: "cart",
		lvl: 11,
		group: 4
	},
	a_245: {
		name: "Shareholder",
		des: "Purchase Total of 1,400 items from the Online store",
		img: "cart",
		lvl: 12,
		group: 4
	},
	a_246: {
		name: "Almost Golden",
		des: "Purchase Total of 1,600 items from the Online store",
		img: "cart",
		lvl: 13,
		group: 4
	},
	a_247: {
		name: "First hour",
		des: "Keep the system on for total of 1 hour",
		img: "duration",
		lvl: 1,
		group: 5
	},
	a_248: {
		name: "Keep it on",
		des: "Keep the system on for total of 10 hours",
		img: "duration",
		lvl: 2,
		group: 5
	},
	a_249: {
		name: "24",
		des: "Keep the system on for total of 1 day",
		img: "duration",
		lvl: 3,
		group: 5
	},
	a_250: {
		name: "3 days and 3 nights",
		des: "Keep the system on for total of 3 days",
		img: "duration",
		lvl: 4,
		group: 5
	},
	a_251: {
		name: "Keeping my attendance",
		des: "Keep the system on for total of 1 week",
		img: "duration",
		lvl: 5,
		group: 5
	},
	a_252: {
		name: "Regularity",
		des: "Keep the system on for total of 2 weeks",
		img: "duration",
		lvl: 6,
		group: 5
	},
	a_253: {
		name: "Time is running",
		des: "Keep the system on for total of 3 weeks",
		img: "duration",
		lvl: 7,
		group: 5
	},
	a_254: {
		name: "First paycheck",
		des: "Keep the system on for total of 1 month",
		img: "duration",
		lvl: 8,
		group: 5
	},
	a_255: {
		name: "Still not detected",
		des: "Keep the system on for total of 1 month and 2 weeks",
		img: "duration",
		lvl: 9,
		group: 5
	},
	a_256: {
		name: "Part of my routine",
		des: "Keep the system on for total of 2 months",
		img: "duration",
		lvl: 10,
		group: 5
	},
	a_257: {
		name: "Not letting go",
		des: "Keep the system on for total of 3 months",
		img: "duration",
		lvl: 11,
		group: 5
	},
	a_258: {
		name: "A third of a year",
		des: "Keep the system on for total of 4 months",
		img: "duration",
		lvl: 12,
		group: 5
	},
	a_259: {
		name: "Fighting requires commitment",
		des: "Keep the system on for total of 5 months",
		img: "duration",
		lvl: 13,
		group: 5
	},
	a_260: {
		name: "Photovoltaic effect",
		des: "Install 1 Solar power",
		img: "solar_power",
		lvl: 1,
		group: 0
	},
	a_261: {
		name: "Sun energy",
		des: "Install 25 Solar power",
		img: "solar_power",
		lvl: 2,
		group: 0
	},
	a_262: {
		name: "Sun bro",
		des: "Install 50 Solar power",
		img: "solar_power",
		lvl: 3,
		group: 0
	},
	a_263: {
		name: "Solar panels grid",
		des: "Install 100 Solar power",
		img: "solar_power",
		lvl: 4,
		group: 0
	},
	a_264: {
		name: "Solar system",
		des: "Install 150 Solar power",
		img: "solar_power",
		lvl: 5,
		group: 0
	},
	a_265: {
		name: "Solar Pioneer",
		des: "Install 200 Solar power",
		img: "solar_power",
		lvl: 6,
		group: 0
	},
	a_266: {
		name: "Solar Sustainer",
		des: "Install 250 Solar power",
		img: "solar_power",
		lvl: 7,
		group: 0
	},
	a_267: {
		name: "Solar Sentinel",
		des: "Install 300 Solar power",
		img: "solar_power",
		lvl: 8,
		group: 0
	},
	a_268: {
		name: "Solar Sage",
		des: "Install 350 Solar power",
		img: "solar_power",
		lvl: 9,
		group: 0
	},
	a_269: {
		name: "A.I. integrated Solar panels",
		des: "Install 400 Solar power",
		img: "solar_power",
		lvl: 10,
		group: 0
	},
	a_270: {
		name: "Power leakage",
		des: "Install 450 Solar power",
		img: "solar_power",
		lvl: 11,
		group: 0
	},
	a_271: {
		name: "Sun tracking solar panels",
		des: "Install 500 Solar power",
		img: "solar_power",
		lvl: 12,
		group: 0
	},
	a_272: {
		name: "It's night time, yet they are moving!",
		des: "Install 550 Solar power",
		img: "solar_power",
		lvl: 13,
		group: 0
	},
	a_273: {
		name: "Electromagnetic induction",
		des: "Install 1 Magnatic generator",
		img: "magnatic_generator",
		lvl: 1,
		group: 0
	},
	a_274: {
		name: "Electromagnetic compatibility",
		des: "Install 25 Magnatic generator",
		img: "magnatic_generator",
		lvl: 2,
		group: 0
	},
	a_275: {
		name: "Energy producer",
		des: "Install 50 Magnatic generator",
		img: "magnatic_generator",
		lvl: 3,
		group: 0
	},
	a_276: {
		name: "North magnetic pole",
		des: "Install 100 Magnatic generator",
		img: "magnatic_generator",
		lvl: 4,
		group: 0
	},
	a_277: {
		name: "Free energy",
		des: "Install 150 Magnatic generator",
		img: "magnatic_generator",
		lvl: 5,
		group: 0
	},
	a_278: {
		name: "Electricity institution",
		des: "Install 200 Magnatic generator",
		img: "magnatic_generator",
		lvl: 6,
		group: 0
	},
	a_279: {
		name: "Electricity company",
		des: "Install 250 Magnatic generator",
		img: "magnatic_generator",
		lvl: 7,
		group: 0
	},
	a_280: {
		name: "Power Grid",
		des: "Install 300 Magnatic generator",
		img: "magnatic_generator",
		lvl: 8,
		group: 0
	},
	a_281: {
		name: "Electromagnet Expert",
		des: "Install 350 Magnatic generator",
		img: "magnatic_generator",
		lvl: 9,
		group: 0
	},
	a_282: {
		name: "A.I. integrated Magnatic generator",
		des: "Install 400 Magnatic generator",
		img: "magnatic_generator",
		lvl: 10,
		group: 0
	},
	a_283: {
		name: "Energy distribution",
		des: "Install 450 Magnatic generator",
		img: "magnatic_generator",
		lvl: 11,
		group: 0
	},
	a_284: {
		name: "Unknown consumption",
		des: "Install 500 Magnatic generator",
		img: "magnatic_generator",
		lvl: 12,
		group: 0
	},
	a_285: {
		name: "Powering it",
		des: "Install 550 Magnatic generator",
		img: "magnatic_generator",
		lvl: 13,
		group: 0
	},
	a_286: {
		name: "Revolutionary communication",
		des: "Install 1 Radio tower",
		img: "radio_tower",
		lvl: 1,
		group: 0
	},
	a_287: {
		name: "Radio brodcasting",
		des: "Install 25 Radio tower",
		img: "radio_tower",
		lvl: 2,
		group: 0
	},
	a_288: {
		name: "1G communication",
		des: "Install 50 Radio tower",
		img: "radio_tower",
		lvl: 3,
		group: 0
	},
	a_289: {
		name: "AM Radio",
		des: "Install 100 Radio tower",
		img: "radio_tower",
		lvl: 4,
		group: 0
	},
	a_290: {
		name: "FM Radio",
		des: "Install 150 Radio tower",
		img: "radio_tower",
		lvl: 5,
		group: 0
	},
	a_291: {
		name: "2G communication",
		des: "Install 200 Radio tower",
		img: "radio_tower",
		lvl: 6,
		group: 0
	},
	a_292: {
		name: "3G communication",
		des: "Install 250 Radio tower",
		img: "radio_tower",
		lvl: 7,
		group: 0
	},
	a_293: {
		name: "4G communication",
		des: "Install 300 Radio tower",
		img: "radio_tower",
		lvl: 8,
		group: 0
	},
	a_294: {
		name: "5G communication",
		des: "Install 350 Radio tower",
		img: "radio_tower",
		lvl: 9,
		group: 0
	},
	a_295: {
		name: "A.I. integrated Radio tower",
		des: "Install 400 Radio tower",
		img: "radio_tower",
		lvl: 10,
		group: 0
	},
	a_296: {
		name: "Internet of things",
		des: "Install 450 Radio tower",
		img: "radio_tower",
		lvl: 11,
		group: 0
	},
	a_297: {
		name: "Transmission Balancing",
		des: "Install 500 Radio tower",
		img: "radio_tower",
		lvl: 12,
		group: 0
	},
	a_298: {
		name: "... --- ...",
		des: "Install 550 Radio tower",
		img: "radio_tower",
		lvl: 13,
		group: 0
	},
	a_299: {
		name: "RAdio Detection And Ranging",
		des: "Install 1 Radar dish",
		img: "radar_dish",
		lvl: 1,
		group: 0
	},
	a_300: {
		name: "Detection Mesh",
		des: "Install 25 Radar dish",
		img: "radar_dish",
		lvl: 2,
		group: 0
	},
	a_301: {
		name: "Country reconnaissance",
		des: "Install 50 Radar dish",
		img: "radar_dish",
		lvl: 3,
		group: 0
	},
	a_302: {
		name: "Regional reconnaissance",
		des: "Install 100 Radar dish",
		img: "radar_dish",
		lvl: 4,
		group: 0
	},
	a_303: {
		name: "World wide reconnaissance",
		des: "Install 150 Radar dish",
		img: "radar_dish",
		lvl: 5,
		group: 0
	},
	a_304: {
		name: "Cosmic frequency detection",
		des: "Install 200 Radar dish",
		img: "radar_dish",
		lvl: 6,
		group: 0
	},
	a_305: {
		name: "Interstellar Dish",
		des: "Install 250 Radar dish",
		img: "radar_dish",
		lvl: 7,
		group: 0
	},
	a_306: {
		name: "Universal Wave Network",
		des: "Install 300 Radar dish",
		img: "radar_dish",
		lvl: 8,
		group: 0
	},
	a_307: {
		name: "Ethereal Signal collector",
		des: "Install 350 Radar dish",
		img: "radar_dish",
		lvl: 9,
		group: 0
	},
	a_308: {
		name: "A.I. integrated Radar dish",
		des: "Install 400 Radar dish",
		img: "radar_dish",
		lvl: 10,
		group: 0
	},
	a_309: {
		name: "Detection of everything",
		des: "Install 450 Radar dish",
		img: "radar_dish",
		lvl: 11,
		group: 0
	},
	a_310: {
		name: "Holographic wave Imaging",
		des: "Install 500 Radar dish",
		img: "radar_dish",
		lvl: 12,
		group: 0
	},
	a_311: {
		name: "Hive mind",
		des: "Install 550 Radar dish",
		img: "radar_dish",
		lvl: 13,
		group: 0
	},
	a_312: {
		name: "Unknown heights",
		des: "Install 1 Satellite",
		img: "satellite",
		lvl: 1,
		group: 0
	},
	a_313: {
		name: "Observation Mesh",
		des: "Install 25 Satellite",
		img: "satellite",
		lvl: 2,
		group: 0
	},
	a_314: {
		name: "Country Surveillance",
		des: "Install 50 Satellite",
		img: "satellite",
		lvl: 3,
		group: 0
	},
	a_315: {
		name: "Regional Surveillance",
		des: "Install 100 Satellite",
		img: "satellite",
		lvl: 4,
		group: 0
	},
	a_316: {
		name: "World wide Surveillance",
		des: "Install 150 Satellite",
		img: "satellite",
		lvl: 5,
		group: 0
	},
	a_317: {
		name: "Cosmic Observer",
		des: "Install 200 Satellite",
		img: "satellite",
		lvl: 6,
		group: 0
	},
	a_318: {
		name: "Interstellar navigator",
		des: "Install 250 Satellite",
		img: "satellite",
		lvl: 7,
		group: 0
	},
	a_319: {
		name: "Universal Messenger",
		des: "Install 300 Satellite",
		img: "satellite",
		lvl: 8,
		group: 0
	},
	a_320: {
		name: "Satellite Interceptor",
		des: "Install 350 Satellite",
		img: "satellite",
		lvl: 9,
		group: 0
	},
	a_321: {
		name: "A.I. integrated Satellites",
		des: "Install 400 Satellite",
		img: "satellite",
		lvl: 10,
		group: 0
	},
	a_322: {
		name: "Unnatural condensed observation",
		des: "Install 450 Satellite",
		img: "satellite",
		lvl: 11,
		group: 0
	},
	a_323: {
		name: "24/7 tracking",
		des: "Install 500 Satellite",
		img: "satellite",
		lvl: 12,
		group: 0
	},
	a_324: {
		name: "Sky eyes",
		des: "Install 550 Satellite",
		img: "satellite",
		lvl: 13,
		group: 0
	},
	a_325: {
		name: "Magnetic Drum Memory",
		des: "Decode 64KB data in one session",
		img: "memory_card",
		lvl: 1,
		group: 6
	},
	a_326: {
		name: "Williams Tube",
		des: "Decode 256KB data in one session",
		img: "memory_card",
		lvl: 2,
		group: 6
	},
	a_327: {
		name: "Electrostatic Storage",
		des: "Decode 4MB data in one session",
		img: "memory_card",
		lvl: 3,
		group: 6
	},
	a_328: {
		name: "Delay Line Memory",
		des: "Decode 32MB data in one session",
		img: "memory_card",
		lvl: 4,
		group: 6
	},
	a_329: {
		name: "Torsion Wire Memory",
		des: "Decode 128MB data in one session",
		img: "memory_card",
		lvl: 5,
		group: 6
	},
	a_330: {
		name: "Thin Film Memory",
		des: "Decode 256MB data in one session",
		img: "memory_card",
		lvl: 6,
		group: 6
	},
	a_331: {
		name: "Cache Memory",
		des: "Decode 1GB data in one session",
		img: "memory_card",
		lvl: 7,
		group: 6
	},
	a_332: {
		name: "MOS Memory",
		des: "Decode 4GB data in one session",
		img: "memory_card",
		lvl: 8,
		group: 6
	},
	a_333: {
		name: "Static RAM",
		des: "Decode 32GB data in one session",
		img: "memory_card",
		lvl: 9,
		group: 6
	},
	a_334: {
		name: "Virtual memory",
		des: "Decode 64GB data in one session",
		img: "memory_card",
		lvl: 10,
		group: 6
	},
	a_335: {
		name: "DRAM",
		des: "Decode 128GB data in one session",
		img: "memory_card",
		lvl: 11,
		group: 6
	},
	a_336: {
		name: "Synchronous Dynamic RAM",
		des: "Decode 256GB data in one session",
		img: "memory_card",
		lvl: 12,
		group: 6
	},
	a_337: {
		name: "DDRAM",
		des: "Decode 1TB data in one session",
		img: "memory_card",
		lvl: 13,
		group: 6
	},
	a_338: {
		name: "Magnetic Core Memory",
		des: "Decode total of 4MB Data",
		img: "data",
		lvl: 1,
		group: 6
	},
	a_339: {
		name: "Magnetic Disk Storage",
		des: "Decode total of 16MB Data",
		img: "data",
		lvl: 2,
		group: 6
	},
	a_340: {
		name: "Tape Storage",
		des: "Decode total of 64MB Data",
		img: "data",
		lvl: 3,
		group: 6
	},
	a_341: {
		name: "Flash Memory",
		des: "Decode total of 256MB Data",
		img: "data",
		lvl: 4,
		group: 6
	},
	a_342: {
		name: "Magneto-Optical Disc",
		des: "Decode total of 1GB Data",
		img: "data",
		lvl: 5,
		group: 6
	},
	a_343: {
		name: "Phase Change Memory",
		des: "Decode total of 4GB Data",
		img: "data",
		lvl: 6,
		group: 6
	},
	a_344: {
		name: "3D XPoint Memory",
		des: "Decode total of 16BB Data",
		img: "data",
		lvl: 7,
		group: 6
	},
	a_345: {
		name: "NAND Flash Memory",
		des: "Decode total of 64GB Data",
		img: "data",
		lvl: 8,
		group: 6
	},
	a_346: {
		name: "SSDs",
		des: "Decode total of 256GB Data",
		img: "data",
		lvl: 9,
		group: 6
	},
	a_347: {
		name: "3D NAND Flash Memory",
		des: "Decode total of 1TB Data",
		img: "data",
		lvl: 10,
		group: 6
	},
	a_348: {
		name: "Storage Class Memory",
		des: "Decode total of 4TB Data",
		img: "data",
		lvl: 11,
		group: 6
	},
	a_349: {
		name: "Data Silos",
		des: "Decode total of 16TB Data",
		img: "data",
		lvl: 12,
		group: 6
	},
	a_350: {
		name: "Data Lakes",
		des: "Decode total of 64TB Data",
		img: "data",
		lvl: 13,
		group: 6
	},
	a_351: {
		name: "Two ways connection",
		des: "Decode 128B of Data per second",
		img: "histogram",
		lvl: 1,
		group: 6
	},
	a_352: {
		name: "Trainee data miner",
		des: "Decode 256B of Data per second",
		img: "histogram",
		lvl: 2,
		group: 6
	},
	a_353: {
		name: "Mega decoder",
		des: "Decode 512B of Data per second",
		img: "histogram",
		lvl: 3,
		group: 6
	},
	a_354: {
		name: "Junior data miner",
		des: "Decode 1KB of Data per second",
		img: "histogram",
		lvl: 4,
		group: 6
	},
	a_355: {
		name: "Intermediate data miner",
		des: "Decode 2KB of Data per second",
		img: "histogram",
		lvl: 5,
		group: 6
	},
	a_356: {
		name: "Senior data miner",
		des: "Decode 4KB of Data per second",
		img: "histogram",
		lvl: 6,
		group: 6
	},
	a_357: {
		name: "Data worm",
		des: "Decode 8KB of Data per second",
		img: "histogram",
		lvl: 7,
		group: 6
	},
	a_358: {
		name: "Tunneling all apps...",
		des: "Decode 16KB of Data per second",
		img: "histogram",
		lvl: 8,
		group: 6
	},
	a_359: {
		name: "Central communication streamline",
		des: "Decode 32KB of Data per second",
		img: "histogram",
		lvl: 9,
		group: 6
	},
	a_360: {
		name: "Main spyware",
		des: "Decode 64KB of Data per second",
		img: "histogram",
		lvl: 10,
		group: 6
	},
	a_361: {
		name: "Data phishing",
		des: "Decode 128KB of Data per second",
		img: "histogram",
		lvl: 11,
		group: 6
	},
	a_362: {
		name: "Social media clone",
		des: "Decode 256KB of Data per second",
		img: "histogram",
		lvl: 12,
		group: 6
	},
	a_363: {
		name: "The Internet",
		des: "Decode 512KB of Data per second",
		img: "histogram",
		lvl: 13,
		group: 6
	},
	a_364: {
		name: "Sequencer",
		des: "Complate total of 100 Sequence task",
		img: "sequence",
		lvl: 1,
		group: 3
	},
	a_365: {
		name: "Getting it right",
		des: "Complate total of 300 Sequence task",
		img: "sequence",
		lvl: 2,
		group: 3
	},
	a_366: {
		name: "It doesn't matter to be right, it needs to be all 4 directions",
		des: "Complate total of 650 Sequence task",
		img: "sequence",
		lvl: 3,
		group: 3
	},
	a_367: {
		name: "Sequence specialist",
		des: "Complate total of 1,000 Sequence task",
		img: "sequence",
		lvl: 4,
		group: 3
	},
	a_368: {
		name: "Sequence motif",
		des: "Complate total of 2,000 Sequence task",
		img: "sequence",
		lvl: 5,
		group: 3
	},
	a_369: {
		name: "Purely sequential",
		des: "Complate total of 3,000 Sequence task",
		img: "sequence",
		lvl: 6,
		group: 3
	},
	a_370: {
		name: "You and G.A.I.A might become friends",
		des: "Complate total of 4,500 Sequence task",
		img: "sequence",
		lvl: 7,
		group: 3
	},
	a_371: {
		name: "Sequentially without emotions",
		des: "Complate total of 6,000 Sequence task",
		img: "sequence",
		lvl: 8,
		group: 3
	},
	a_372: {
		name: "Work in sequence or importance?",
		des: "Complate total of 8,500 Sequence task",
		img: "sequence",
		lvl: 9,
		group: 3
	},
	a_373: {
		name: "Sequential execution",
		des: "Complate total of 11,000 Sequence task",
		img: "sequence",
		lvl: 10,
		group: 3
	},
	a_374: {
		name: "Must be in this order",
		des: "Complate total of 15,000 Sequence task",
		img: "sequence",
		lvl: 11,
		group: 3
	},
	a_375: {
		name: "Sequences can be found anywhere",
		des: "Complate total of 20,000 Sequence task",
		img: "sequence",
		lvl: 12,
		group: 3
	},
	a_376: {
		name: "up, up, down, down, left, right, left, right, B, A",
		des: "Complate total of 25,000 Sequence task",
		img: "sequence",
		lvl: 13,
		group: 3
	},
	a_377: {
		name: "Credits?, sign me in",
		des: "Generate total of 500B credit from tasks",
		img: "tasks_credit",
		lvl: 1,
		group: 3
	},
	a_378: { 
		name: "A job to be done",
		des: "Generate total of 50T credit from tasks",
		img: "tasks_credit",
		lvl: 2,
		group: 3
	},
	a_379: {
		name: "Getting paied",
		des: "Generate total of 5Q credit from tasks",
		img: "tasks_credit",
		lvl: 3,
		group: 3
	},
	a_380: {
		name: "Getting paied for pressing buttons",
		des: "Generate total of 500Q credit from tasks",
		img: "tasks_credit",
		lvl: 4,
		group: 3
	},
	a_381: {
		name: "Generative hands",
		des: "Generate total of 50aa credit from tasks",
		img: "tasks_credit",
		lvl: 5,
		group: 3
	},
	a_382: {
		name: "All according to what's required",
		des: "Generate total of 5ab credit from tasks",
		img: "tasks_credit",
		lvl: 6,
		group: 3
	},
	a_383: {
		name: "G.A.I.S's system is not complete",
		des: "Generate total of 500ab credit from tasks",
		img: "tasks_credit",
		lvl: 7,
		group: 3
	},
	a_384: {
		name: "In digital economy, you can alway bypass",
		des: "Generate total of 50ac credit from tasks",
		img: "tasks_credit",
		lvl: 8,
		group: 3
	},
	a_385: {
		name: "Once the system is down, all these Credits means nothing",
		des: "Generate total of 5ad credit from tasks",
		img: "tasks_credit",
		lvl: 9,
		group: 3
	},
	a_386: {
		name: "Be careful, achieving much might puts you on G.A.I.A's balancing list",
		des: "Generate total of 500ad credit from tasks",
		img: "tasks_credit",
		lvl: 10,
		group: 3
	},
	a_387: {
		name: "Task commitment",
		des: "Generate total of 50ae credit from tasks",
		img: "tasks_credit",
		lvl: 11,
		group: 3
	},
	a_388: {
		name: "Just one more to gain more",
		des: "Generate total of 5af credit from tasks",
		img: "tasks_credit",
		lvl: 12,
		group: 3
	},
	a_389: {
		name: "Taskaholic",
		des: "Generate total of 500af credit from tasks",
		img: "tasks_credit",
		lvl: 13,
		group: 3
	},
	a_390: {
		name: "Paied in Data",
		des: "Generate total of 1MB Data from tasks",
		img: "tasks_data",
		lvl: 1,
		group: 3
	},
	a_391: {
		name: "Data is money",
		des: "Generate total of 10MB Data from tasks",
		img: "tasks_data",
		lvl: 2,
		group: 3
	},
	a_392: {
		name: "Data Transaction",
		des: "Generate total of 32MB Data from tasks",
		img: "tasks_data",
		lvl: 3,
		group: 3
	},
	a_393: {
		name: "Any bit can be the key",
		des: "Generate total of 64MB Data from tasks",
		img: "tasks_data",
		lvl: 4,
		group: 3
	},
	a_394: {
		name: "Disguised transferation",
		des: "Generate total of 256MB Data from tasks",
		img: "tasks_data",
		lvl: 5,
		group: 3
	},
	a_395: {
		name: "Giga worth of tasks",
		des: "Generate total of 1GB Data from tasks",
		img: "tasks_data",
		lvl: 6,
		group: 3
	},
	a_396: {
		name: "Searching for G.A.I.A's traces",
		des: "Generate total of 4GB Data from tasks",
		img: "tasks_data",
		lvl: 7,
		group: 3
	},
	a_397: {
		name: "In digital economy, Data is everything",
		des: "Generate total of 16GB Data from tasks",
		img: "tasks_data",
		lvl: 8,
		group: 3
	},
	a_398: {
		name: "No Data about you?, then you do not exist",
		des: "Generate total of 64GB Data from tasks",
		img: "tasks_data",
		lvl: 9,
		group: 3
	},
	a_399: {
		name: "If you do not exist, then you can't be on G.A.I.A's balancing list",
		des: "Generate total of 128GB Data from tasks",
		img: "tasks_data",
		lvl: 10,
		group: 3
	},
	a_400: {
		name: "Tasks bot",
		des: "Generate total of 256GB Data from tasks",
		img: "tasks_data",
		lvl: 11,
		group: 3
	},
	a_401: {
		name: "HQ's reliable agent",
		des: "Generate total of 512GB Data from tasks",
		img: "tasks_data",
		lvl: 12,
		group: 3
	},
	a_402: {
		name: "Dataaholic",
		des: "Generate total of 1TB Data from tasks",
		img: "tasks_data",
		lvl: 13,
		group: 3
	}
};

var achievementKeys = Object.keys(achievements_data);