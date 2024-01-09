var 
c_reward = 0,
d_reward = 0,
punishment_type = 0,
debuffTime = 0,
threat = 0,

attack_difficulty = 0,
//for pass crack and fake certification
pc_fc_problem_answers = [],
pc_fc_problem_is_answered = [],
pc_fc_problem_text = "",
pc_fc_current = 0,
tries_left = 0,
//for pass crack only
pass_crack_problem_expression = "",
isGot = false,
pass_crack_problem_question_marks = "",
num = 0,
//defender
defender_grid_pos = [], // blocker current position
defender_movemnet_rate = 0,
defender_movemnet_time = 0,
defender_movemnet_diff = 0,
defender_movemnet_time_start = 0,
defender_moveR = 2,
defender_moveL = 2,
defender_moveU = 2,
defender_moveD = 2,
//seeker
seeker_grid_pos = [],
seeker_rate = 0,
seeker_time = 0,
seeker_time_diff = 0,
seeker_time_start = 0,
//seeker2
seeker2_grid_pos = [],
seeker2_rate = 0,
seeker2_time = 0,
seeker2_time_diff = 0,
seeker2_time_start = 0,
//seeker2
seeker3_grid_pos = [],
seeker3_rate = 0,
seeker3_time = 0,
seeker3_time_diff = 0,
seeker3_time_start = 0,
//grid
grid = 0,
grid_cells = [], //all grid cells coordinates
grid_pos = [], //current player position

//player
direction = 0,
blocker_time = 0,
blocker_time_diff = 0,
blocker_time_start = 0,
blocker_cell_size = 64,

pass_crack = function(dif) {
	//set task for input check
	task = "pass_crack"
	pc_fc_current = 0
	num = 0
	pc_fc_problem_answers = []
	pc_fc_problem_is_answered = []
	tries_left = 3
	$("#tries_left").empty()
	for (var i = 0; i < tries_left; i++) {
		$("#tries_left").append('<div class="defence_tries_icon"><svg class="lv0_icon"><use xlink:href="#shieldcomb"></use></svg></div>')
	}
	
	let r = 0,
	//n= number of operands+1, d = number of digits, p = number of problems
	n = 0, d = 0, p = 0;

	$("#pc-fc").css("display", "flex")
	$("#pc-fc").empty()
	$("#pc-fc").append('<p id="howToDif" style="font-size: 130%; padding: 2%;">Password: </p>')

	if(dif == 1) { n=2 ;d=1; p=3}
 	else if(dif == 2) { n=2; d=1; p=4}
	else if(dif == 3) { n=2; d=1; p=5}
	else { n=2; d=1; p=6}

	pass_crack_problem_question_marks = ""
	pc_fc_problem_text = ""
	//get text of ? equals to number of digits
	for(let k = 0; k < d; k++) {
		pass_crack_problem_question_marks += "?"
	}
	pass_crack_problem_question_marks = '<span id="qm" style="color: var(--golden); font-size: 120%;">'+pass_crack_problem_question_marks+'</span>'
	for(let i = 0; i < p; i++) {
		//set length to p
		pc_fc_problem_is_answered.push(false)
		//reset isGot for new problem
		isGot = false
		//true num for +, else num for *
		if(ranged_random(100, 1) <= 50) {
			num = ranged_random(5+dif, 1)
		}
		else {
			num = ranged_random(dif, 1)
		}
		//'ranged random' is for determine whether the '?' or the number to be found will be at first or not
		if(ranged_random(100, 1) <= 50) {
			pc_fc_problem_text = pass_crack_problem_question_marks
			pass_crack_problem_expression = num
			pc_fc_problem_answers.push(num)
			isGot = true
		} else {
			pc_fc_problem_text = num
			pass_crack_problem_expression = num
		}
		for(let j = 0; j < n; j ++) {
			r = ranged_random(3,1)
			//true num for +, else num for *
			if(ranged_random(100, 1) <= 50) {
				num = ranged_random(5+dif, 1)
			}
			else {
				num = ranged_random(dif, 1)
			}
			if(j == n-1 && isGot == false) {
				pc_fc_problem_answers.push(num)
				if(r == 1) { 
					pc_fc_problem_text += " + " + pass_crack_problem_question_marks
					pass_crack_problem_expression += " + " + num
				} else if(r == 2) { 
					pc_fc_problem_text += " - " + pass_crack_problem_question_marks
					pass_crack_problem_expression += " - " + num
				} else if(r == 3) { 
					pc_fc_problem_text += " * " + pass_crack_problem_question_marks
					pass_crack_problem_expression += " * " + num
				}
				//'ranged random' is for determine whether the '?' or the number to be found will be at second or not
			} else if(ranged_random(100, 1) <= 50 && isGot == false) {
				pc_fc_problem_answers.push(num)
				isGot = true
				if(r == 1) { 
					pc_fc_problem_text += " + " + pass_crack_problem_question_marks
					pass_crack_problem_expression += " + " + num
				} else if(r == 2) { 
					pc_fc_problem_text += " - " + pass_crack_problem_question_marks
					pass_crack_problem_expression += " - " + num
				} else if(r == 3) { 
					pc_fc_problem_text += " * " + pass_crack_problem_question_marks
					pass_crack_problem_expression += " * " + num
				}
			} else {
				if(r == 1) { 
					pc_fc_problem_text += " + " + num
					pass_crack_problem_expression += " + " + num
				} else if(r == 2) { 
					pc_fc_problem_text += " - " + num
					pass_crack_problem_expression += " - " + num
				} else if(r == 3) { 
					pc_fc_problem_text += " * " + num
					pass_crack_problem_expression += " * " + num
				}
			}
		}
	pc_fc_problem_text += " = " + simplifyNumberSmall(eval(pass_crack_problem_expression));
	$("#howToDif").append(make_random_text(ranged_random(3, 1))+'<span id="qm'+i+'" style="color: var(--golden);">'+pass_crack_problem_question_marks+'</span>'+make_random_text(ranged_random(3, 1)))
	$("#pc-fc").append('<div id="b'+i+'" class="pc-fc-box" style="font-size: 140%;"><p>'+pc_fc_problem_text+'</p></div>')
	}
	$("#gaia_input").css("display", "flex")
	//after creating all problems, set interaction vars and 
	$("#b"+pc_fc_current).css("background-color", "var(--def_curr)")
	$("#gaia_input_input").click().focus()
},

fake_certificate = function(dif) {
	//set task for input check
	task = "fake_certificate"
	pc_fc_current = 0
	pc_fc_problem_answers = []
	pc_fc_problem_is_answered = []
	tries_left = 7
	$("#tries_left").empty()
	for (var i = 0; i < tries_left; i++) {
		$("#tries_left").append('<div class="defence_tries_icon"><svg class="lv0_icon"><use xlink:href="#shieldcomb"></use></svg></div>')
	}

	let r = 0,
	//g= number of groups, c = number of characters, p = number of problems
	g = 0, c = 0, p = 0;

	$("#pc-fc").css("display", "flex")
	$("#pc-fc").empty()

	if(dif == 1) { g=3; c=3; p=3}
 	else if(dif == 2) { g=4; c=3; p=3}
	else if(dif == 3) { g=4; c=4; p=3}
	else { g=4; c=5; p=3}

	for(let i = 0; i < p; i++) {
		//set length to p
		pc_fc_problem_is_answered.push(false)
		pc_fc_problem_text = ""
		for(let j = 0; j < g; j ++) {
			if(j == g-1) pc_fc_problem_text += make_random_text(c)
			else pc_fc_problem_text += make_random_text(c)+"-"
		}
		pc_fc_problem_answers.push(pc_fc_problem_text)
		$("#pc-fc").append('<div id="b'+i+'" class="pc-fc-box" style="font-size: 140%;"><p id="b_p'+i+'"></p></div>')
		for(let k = 0; k < pc_fc_problem_text.length; k++) {
			$("#b_p"+i).append('<span id="b_p_s'+i+k+'" style="color: var(--mainClr);">'+pc_fc_problem_text.charAt(k)+'</span>')
		}	
	}
	$("#gaia_input").css("display", "flex")
	//after creating all problems, set first problem bckground
	$("#b"+pc_fc_current).css("background-color", "var(--def_curr)")
	$("#gaia_input_input").click().focus()
},

blocker = function(dif) {
	$("#gaia_input").css("display", "none")
	task = "blocker"
	//number of grid columns and raws, wall spawn timer
	grid_cells = []
	path_1 = []
	path_2 = []
	path_3 = []
	direction = 2
	raws = 0
	columns = 0
	defender_movemnet_rate = 0
	tries_left = 1
	wall = 0
	$("#tries_left").empty()
	for (var i = 0; i < tries_left; i++) {
		$("#tries_left").append('<div class="defence_tries_icon"><svg class="lv0_icon"><use xlink:href="#shieldcomb"></use></svg></div>')
	}

	if(dif==1) {columns = 15; raws = 7; defender_movemnet_rate = 475; wall = 10; seeker_rate = 750}
	else if(dif==2) {columns = 17; raws = 7; defender_movemnet_rate = 425; wall = 14; seeker_rate = 675}
	else if(dif==3) {columns = 19; raws = 7; defender_movemnet_rate = 350; wall = 18; seeker_rate = 600; seeker2_rate = 700}
	else if(dif==4) {columns = 21; raws = 8; defender_movemnet_rate = 300; wall = 29; seeker_rate = 550; seeker2_rate = 600; seeker3_rate = 750}
	$("#path_switch").css("display", "grid")
	$("#path_switch").css("grid-template-columns", "repeat("+columns+", 1fr)")
	$("#path_switch").css("grid-template-rows", "repeat("+raws+", 0fr)")
	$("#path_switch").empty()
	for(let i = 0; i < raws; i++) {
		for(let j = 0; j < columns; j++) {
			id = i.toString()+"_"+j.toString()
			grid_cells.push(id)
			$("#path_switch").append('<div id="'+id+'" class="path_switch_cell"></div>')
		}
	}

	grid_cells.splice(grid_cells.indexOf("0_0"), 1)
	grid_cells.splice(grid_cells.indexOf("0_1"), 1)
	grid_cells.splice(grid_cells.indexOf("0_2"), 1)
	grid_cells.splice(grid_cells.indexOf("1_0"), 1)
	grid_cells.splice(grid_cells.indexOf("1_1"), 1)
	grid_cells.splice(grid_cells.indexOf("1_2"), 1)
	grid_cells.splice(grid_cells.indexOf("2_0"), 1)
	grid_cells.splice(grid_cells.indexOf("2_1"), 1)
	grid_cells.splice(grid_cells.indexOf("2_2"), 1)
	grid_cells.splice(grid_cells.indexOf((raws-3)+"_"+(columns-3)), 1)
	grid_cells.splice(grid_cells.indexOf((raws-3)+"_"+(columns-2)), 1)
	grid_cells.splice(grid_cells.indexOf((raws-3)+"_"+(columns-1)), 1)
	grid_cells.splice(grid_cells.indexOf((raws-2)+"_"+(columns-3)), 1)
	grid_cells.splice(grid_cells.indexOf((raws-2)+"_"+(columns-2)), 1)
	grid_cells.splice(grid_cells.indexOf((raws-2)+"_"+(columns-1)), 1)
	grid_cells.splice(grid_cells.indexOf((raws-1)+"_"+(columns-3)), 1)
	grid_cells.splice(grid_cells.indexOf((raws-1)+"_"+(columns-2)), 1)
	grid_cells.splice(grid_cells.indexOf((raws-1)+"_"+(columns-1)), 1)
	
	//grid_cells.splice(
	while(wall > 0) {
		r = ranged_random(grid_cells.length-1, 0)
		//grid_cells.splice(grid_cells.indexOf(r1+"_"+r2), 1)
		create_svg(0, "wall", grid_cells[r])
		$("#"+grid_cells[r]).addClass("wall")
		grid_cells.splice(r, 1)
		wall--
	}

	//start from top right corner
	grid_pos = [0,0]
	$("#0_0").empty()
	create_svg(0, "arrow", "0_0")
	$("#0_0").css("transform", "rotate(90deg)")
	$("#0_0").removeClass("wall")
	$("#0_0").addClass("player")
	create_svg(0, "impact_point", (raws-1).toString()+"_"+(columns-1).toString())
	$("#"+(raws-1).toString()+"_"+(columns-1).toString()).addClass("goal")

	//start defender from bottom left corner
	defender_grid_pos = [raws-1, columns-3]
	$("#"+raws-1+"_"+columns-3).empty()
	create_svg(2, "seeker", raws-1+"_"+columns-3)
    $("#"+ raws-1+"_"+columns-3).css("transform", "rotate(0deg)")

	//start blocker separate timer
	blocker_time = 0
	blocker_time_start = new Date().getTime()
	window.setTimeout(blocker_movement_loop, 500)
	
	//start defender separate timer
	defender_movemnet_time = 0
	defender_movemnet_time_start = new Date().getTime()
	window.setTimeout(defender_loop, defender_movemnet_rate)

	//start seeker from bottom left corner
	seeker_grid_pos = [raws-1, columns-4]
	$("#"+raws-1+"_"+columns-3).empty()
	create_svg(2, "seeker", raws-1+"_"+columns-4)
	$("#"+ raws-1+"_"+columns-3).css("transform", "rotate(0deg)")

	//start wall spawner separate timer
	seeker_time = 0
	seeker_time_start = new Date().getTime()
	window.setTimeout(seeker_loop, seeker_rate)

	if(dif == 3){
	    //start seeker2 from bottom left corner
		seeker2_grid_pos = [0, columns-1]
		$("#0"+columns-1).empty()
		create_svg(2, "seeker", "0_"+columns-1)
	    $("#0"+columns-1).css("transform", "rotate(270deg)")
	   
		seeker2_time = 0
		seeker2_time_start = new Date().getTime()
		window.setTimeout(seeker2_loop, seeker2_rate)
	}

	if(dif == 4){
	    //start seeker2 from bottom left corner
		seeker2_grid_pos = [0, columns-1]
		$("#0"+columns-1).empty()
		create_svg(2, "seeker", "0_"+columns-1)
	    $("#0"+columns-1).css("transform", "rotate(270deg)")
	   
		seeker2_time = 0
		seeker2_time_start = new Date().getTime()
		window.setTimeout(seeker2_loop, seeker2_rate)

		//start seeker3 from bottom left corner
		seeker3_grid_pos = [raws-1, 0]
		$("#"+(raws-1)+"_0").empty()
		create_svg(2, "seeker", "0_"+(raws-1)+"_0")
	    $("#"+(raws-1)+"_0").css("transform", "rotate(0deg)")
		//start wall spawner separate timer

		//start wall spawner separate timer
		seeker3_time = 0
		seeker3_time_start = new Date().getTime()
		window.setTimeout(seeker3_loop, seeker3_rate)
	}
};

function blocker_movement_loop() {
    if(is_attack) {
    	blocker_time +=500
   		blocker_time_diff = (new Date().getTime() - blocker_time_start) - blocker_time
   		//remove arrow image from current cell
   		$("#"+grid_pos[0]+"_"+grid_pos[1]).empty()
   		$("#"+grid_pos[0]+"_"+grid_pos[1]).removeClass("player")
    	//move up >> y--
    	if(direction == 1) {
    		if(grid_pos[0]-1 < 0 || $("#"+(grid_pos[0]-1)+"_"+grid_pos[1]).hasClass("wall")) 
    			end_attack(1)
    		else if($("#"+(grid_pos[0]-1)+"_"+grid_pos[1]).hasClass("goal")) {
    			Game.permanent.total_blocker_blocked++;
  				end_attack(2);
    		}
    		else {
    			grid_pos[0] = grid_pos[0]-1
    			create_svg(0, "arrow", grid_pos[0]+"_"+grid_pos[1])
    			$("#"+grid_pos[0]+"_"+grid_pos[1]).css("transform", "rotate(0deg)")
    			$("#"+grid_pos[0]+"_"+grid_pos[1]).addClass("player")
    		}
    	}
    	//move right >> x++
    	else if(direction == 2) {
    		if(grid_pos[1]+1 > columns-1 || $("#"+grid_pos[0]+"_"+(grid_pos[1]+1)).hasClass('wall')) 
    			end_attack(1)
    		else if($("#"+grid_pos[0]+"_"+(grid_pos[1]+1)).hasClass("goal")) {
    			Game.permanent.total_blocker_blocked++;
  				end_attack(2);
    		}
    		else {
    			grid_pos[1] = grid_pos[1]+1
    			create_svg(0, "arrow", grid_pos[0]+"_"+grid_pos[1])
    			$("#"+grid_pos[0]+"_"+grid_pos[1]).css("transform", "rotate(90deg)")
    			$("#"+grid_pos[0]+"_"+grid_pos[1]).addClass("player")
    		}
    	}
    	//move down >> y++
    	else if(direction == 3) {
    		if(grid_pos[0]+1 > raws-1 || $("#"+(grid_pos[0]+1)+"_"+grid_pos[1]).hasClass('wall')) 
    			end_attack(1)
    		else if($("#"+(grid_pos[0]+1)+"_"+grid_pos[1]).hasClass("goal")) {
    			Game.permanent.total_blocker_blocked++;
  				end_attack(2);
    		}
    		else {
    			grid_pos[0] = grid_pos[0]+1
    			create_svg(0, "arrow", grid_pos[0]+"_"+grid_pos[1])
    			$("#"+grid_pos[0]+"_"+grid_pos[1]).css("transform", "rotate(180deg)")
    			$("#"+grid_pos[0]+"_"+grid_pos[1]).addClass("player")
    		}
    	}
    	//move left >> x--
    	else if(direction == 4) {
    		if(grid_pos[1]-1 < 0 || $("#"+grid_pos[0]+"_"+(grid_pos[1]-1)).hasClass('wall')) 
    			end_attack(1)
    		else if($("#"+grid_pos[0]+"_"+(grid_pos[1]-1)).hasClass("goal")) {
    			Game.permanent.total_blocker_blocked++;
  				end_attack(2);
    		}
    		else {
    			grid_pos[1] = grid_pos[1]-1
    			create_svg(0, "arrow", grid_pos[0]+"_"+grid_pos[1])
    			$("#"+grid_pos[0]+"_"+grid_pos[1]).css("transform", "rotate(270deg)")
    			$("#"+grid_pos[0]+"_"+grid_pos[1]).addClass("player")
    		}
    	}
    	window.setTimeout(blocker_movement_loop, 500-blocker_time_diff)
    }
};

function defender_loop(argument) {
	if(is_attack) {
		defender_movemnet_time += defender_movemnet_rate
	   	defender_movemnet_diff = (new Date().getTime() - defender_movemnet_time_start) - defender_movemnet_time

	   	//remove seeker image current cell
   		$("#"+defender_grid_pos[0]+"_"+defender_grid_pos[1]).empty()
   		$("#"+defender_grid_pos[0]+"_"+defender_grid_pos[1]).removeClass("wall")
   		if(defender_moveU > 0) {
   			if($("#"+(defender_grid_pos[0]-1)+"_"+defender_grid_pos[1]).hasClass("player"))
   				end_attack(1)
   			else {
   				defender_grid_pos[0] = defender_grid_pos[0]-1
	    		create_svg(2, "seeker", defender_grid_pos[0]+"_"+defender_grid_pos[1])
	    		$("#"+defender_grid_pos[0]+"_"+defender_grid_pos[1]).css("transform", "rotate(0deg)")
	    		$("#"+defender_grid_pos[0]+"_"+defender_grid_pos[1]).addClass("wall")
	    		defender_moveU--
   			}
   		}
   		else if(defender_moveR > 0) {
   			if($("#"+defender_grid_pos[0]+"_"+(defender_grid_pos[1]+1)).hasClass("player"))
   				end_attack(1)
   			else {
	   			defender_grid_pos[1] = defender_grid_pos[1]+1
	    		create_svg(2, "seeker", defender_grid_pos[0]+"_"+defender_grid_pos[1])
	    		$("#"+defender_grid_pos[0]+"_"+defender_grid_pos[1]).css("transform", "rotate(90deg)")
	    		$("#"+defender_grid_pos[0]+"_"+defender_grid_pos[1]).addClass("wall")
	    		defender_moveR--
    		}
   		}
   		else if(defender_moveL > 0) {
   			if($("#"+defender_grid_pos[0]+"_"+(defender_grid_pos[1]-1)).hasClass("player"))
   				end_attack(1)
   			else {
				defender_grid_pos[1] = defender_grid_pos[1]-1
	    		create_svg(2, "seeker", defender_grid_pos[0]+"_"+defender_grid_pos[1])
	    		$("#"+defender_grid_pos[0]+"_"+defender_grid_pos[1]).css("transform", "rotate(270deg)")
	    		$("#"+defender_grid_pos[0]+"_"+defender_grid_pos[1]).addClass("wall")
	    		defender_moveL--
	    	}
   		}
   		else if(defender_moveD > 0) {
   			if($("#"+(defender_grid_pos[0]+1)+"_"+defender_grid_pos[1]).hasClass("player"))
   				end_attack(1)
   			else {
	   			defender_grid_pos[0] = defender_grid_pos[0]+1
	    		create_svg(2, "seeker", defender_grid_pos[0]+"_"+defender_grid_pos[1])
	    		$("#"+defender_grid_pos[0]+"_"+defender_grid_pos[1]).css("transform", "rotate(180deg)")
	    		$("#"+defender_grid_pos[0]+"_"+defender_grid_pos[1]).addClass("wall")
	    		defender_moveD--
	    	}
   		}
   		else {
   			defender_moveU = 2
   			defender_moveR = 2
   			defender_moveL = 2
   			defender_moveD = 2

   			defender_grid_pos[0] = defender_grid_pos[0]-1
    		create_svg(2, "seeker", defender_grid_pos[0]+"_"+defender_grid_pos[1])
    		$("#"+defender_grid_pos[0]+"_"+defender_grid_pos[1]).css("transform", "rotate(0deg)")
    		$("#"+defender_grid_pos[0]+"_"+defender_grid_pos[1]).addClass("wall")
    		defender_moveU--
   		}
		window.setTimeout(defender_loop, defender_movemnet_rate-defender_movemnet_diff);
	}
	else {
		defender_moveU = 2
   		defender_moveR = 2
   		defender_moveL = 2
   		defender_moveD = 2
	}
}


function seeker_loop() {
	if(is_attack) {
		seeker_time += seeker_rate
	   	seeker_time_diff = (new Date().getTime() - seeker_time_start) - seeker_time
	   	
	   	moveR = false
   		moveL = false
   		moveT = false
   		moveB = false
   		
   		$("#"+seeker_grid_pos[0]+"_"+seeker_grid_pos[1]).empty()
   		$("#"+seeker_grid_pos[0]+"_"+seeker_grid_pos[1]).removeClass("wall")

   		//call direction
   		//T or B
   		if(grid_pos[0] < seeker_grid_pos[0])
   			moveT = true
   		else if(grid_pos[0] > seeker_grid_pos[0])
   			moveB = true
   		else {
   			moveT = false
   			moveB = false
   		}
   		//L or R
   		if(grid_pos[1] < seeker_grid_pos[1])
   			moveL = true
   		else if(grid_pos[1] > seeker_grid_pos[1])
   			moveR = true
   		else {
   			moveL = false
   			moveR = false
   		}

   		//diagonals
   		//++
   		if(moveT && moveR) {
   			r = ranged_random(1, 0) 
   			if(r == 1) 
   			 	moveR = false
   			 else
   			 	moveT = false
   		}
   		//+-
   		else if(moveT && moveL) {
   			r = ranged_random(1, 0) 
   			if(r == 1) 
   			 	moveL = false
   			 else
   			 	moveT = false
   		}
   		//--
   		else if(moveB && moveL) {
   			r = ranged_random(1, 0) 
   			if(r == 1) 
   			 	moveL = false
   			 else
   			 	moveB = false
   		}
   		//-+
   		else if(moveB && moveR) {
   			r = ranged_random(1, 0) 
   			if(r == 1) 
   			 	moveR = false
   			 else
   			 	moveB = false
   		}

	   	//move up >> y--
    	if(moveT) {
    		if($("#"+(seeker_grid_pos[0]-1)+"_"+seeker_grid_pos[1]).hasClass("player")) 
    			end_attack(1)
    		else {
    			seeker_grid_pos[0] = seeker_grid_pos[0]-1
    			create_svg(7, "seeker", seeker_grid_pos[0]+"_"+seeker_grid_pos[1])
    			$("#"+seeker_grid_pos[0]+"_"+seeker_grid_pos[1]).css("transform", "rotate(0deg)")
    			$("#"+seeker_grid_pos[0]+"_"+seeker_grid_pos[1]).addClass("wall")
    			$("#"+seeker_grid_pos[0]+"_"+seeker_grid_pos[1]+" > svg").addClass("blocker")
    		}
    	}
    	//move right >> x++
    	else if(moveR) {
    		if($("#"+seeker_grid_pos[0]+"_"+(seeker_grid_pos[1]+1)).hasClass('player')) 
    			end_attack(1)
    		else {
    			seeker_grid_pos[1] = seeker_grid_pos[1]+1
    			create_svg(7, "seeker", seeker_grid_pos[0]+"_"+seeker_grid_pos[1])
    			$("#"+seeker_grid_pos[0]+"_"+seeker_grid_pos[1]).css("transform", "rotate(90deg)")
    			$("#"+seeker_grid_pos[0]+"_"+seeker_grid_pos[1]).addClass("wall")
    			$("#"+seeker_grid_pos[0]+"_"+seeker_grid_pos[1]+" > svg").addClass("blocker")
    		}
    	}
    	//move down >> y++
    	else if(moveB) {
    		if($("#"+(seeker_grid_pos[0]+1)+"_"+seeker_grid_pos[1]).hasClass('player')) 
    			end_attack(1)
    		else {
    			seeker_grid_pos[0] = seeker_grid_pos[0]+1
    			create_svg(7, "seeker", seeker_grid_pos[0]+"_"+seeker_grid_pos[1])
    			$("#"+seeker_grid_pos[0]+"_"+seeker_grid_pos[1]).css("transform", "rotate(180deg)")
    			$("#"+seeker_grid_pos[0]+"_"+seeker_grid_pos[1]).addClass("wall")
    			$("#"+seeker_grid_pos[0]+"_"+seeker_grid_pos[1]+" > svg").addClass("blocker")
    		}
    	}
    	//move left >> x--
    	else if(moveL) {
    		if($("#"+seeker_grid_pos[0]+"_"+(seeker_grid_pos[1]-1)).hasClass('player')) 
    			end_attack(1)
    		else {
    			seeker_grid_pos[1] = seeker_grid_pos[1]-1
    			create_svg(7, "seeker", seeker_grid_pos[0]+"_"+seeker_grid_pos[1])
    			$("#"+seeker_grid_pos[0]+"_"+seeker_grid_pos[1]).css("transform", "rotate(270deg)")
    			$("#"+seeker_grid_pos[0]+"_"+seeker_grid_pos[1]).addClass("wall")
    			$("#"+seeker_grid_pos[0]+"_"+seeker_grid_pos[1]+" > svg").addClass("blocker")
    		}
    	}
    	window.setTimeout(seeker_loop, seeker_rate-seeker_time_diff);
	}
}

function seeker2_loop() {
	if(is_attack) {
		seeker2_time += seeker2_rate
	   	seeker2_time_diff = (new Date().getTime() - seeker2_time_start) - seeker2_time
	   	
	   	moveR = false
   		moveL = false
   		moveT = false
   		moveB = false
   		
   		$("#"+seeker2_grid_pos[0]+"_"+seeker2_grid_pos[1]).empty()
   		$("#"+seeker2_grid_pos[0]+"_"+seeker2_grid_pos[1]).removeClass("wall")

   		//call direction
   		//T or B
   		if(grid_pos[0] < seeker2_grid_pos[0])
   			moveT = true
   		else if(grid_pos[0] > seeker2_grid_pos[0])
   			moveB = true
   		else {
   			moveT = false
   			moveB = false
   		}
   		//L or R
   		if(grid_pos[1] < seeker2_grid_pos[1])
   			moveL = true
   		else if(grid_pos[1] > seeker2_grid_pos[1])
   			moveR = true
   		else {
   			moveL = false
   			moveR = false
   		}

   		//diagonals
   		//++
   		if(moveT && moveR) {
   			r = ranged_random(1, 0) 
   			if(r == 1) 
   			 	moveR = false
   			 else
   			 	moveT = false
   		}
   		//+-
   		else if(moveT && moveL) {
   			r = ranged_random(1, 0) 
   			if(r == 1) 
   			 	moveL = false
   			 else
   			 	moveT = false
   		}
   		//--
   		else if(moveB && moveL) {
   			r = ranged_random(1, 0) 
   			if(r == 1) 
   			 	moveL = false
   			 else
   			 	moveB = false
   		}
   		//-+
   		else if(moveB && moveR) {
   			r = ranged_random(1, 0) 
   			if(r == 1) 
   			 	moveR = false
   			 else
   			 	moveB = false
   		}

	   	//move up >> y--
    	if(moveT) {
    		if($("#"+(seeker2_grid_pos[0]-1)+"_"+seeker2_grid_pos[1]).hasClass("player")) 
    			end_attack(1)
    		else {
    			seeker2_grid_pos[0] = seeker2_grid_pos[0]-1
    			create_svg(4, "seeker", seeker2_grid_pos[0]+"_"+seeker2_grid_pos[1])
    			$("#"+seeker2_grid_pos[0]+"_"+seeker2_grid_pos[1]).css("transform", "rotate(0deg)")
    			$("#"+seeker2_grid_pos[0]+"_"+seeker2_grid_pos[1]).addClass("wall")
    			$("#"+seeker2_grid_pos[0]+"_"+seeker2_grid_pos[1]+" > svg").addClass("blocker")
    		}
    	}
    	//move right >> x++
    	else if(moveR) {
    		if($("#"+seeker2_grid_pos[0]+"_"+(seeker2_grid_pos[1]+1)).hasClass('player')) 
    			end_attack(1)
    		else {
    			seeker2_grid_pos[1] = seeker2_grid_pos[1]+1
    			create_svg(4, "seeker", seeker2_grid_pos[0]+"_"+seeker2_grid_pos[1])
    			$("#"+seeker2_grid_pos[0]+"_"+seeker2_grid_pos[1]).css("transform", "rotate(90deg)")
    			$("#"+seeker2_grid_pos[0]+"_"+seeker2_grid_pos[1]).addClass("wall")
    			$("#"+seeker2_grid_pos[0]+"_"+seeker2_grid_pos[1]+" > svg").addClass("blocker")
    		}
    	}
    	//move down >> y++
    	else if(moveB) {
    		if($("#"+(seeker2_grid_pos[0]+1)+"_"+seeker2_grid_pos[1]).hasClass('player')) 
    			end_attack(1)
    		else {
    			seeker2_grid_pos[0] = seeker2_grid_pos[0]+1
    			create_svg(4, "seeker", seeker2_grid_pos[0]+"_"+seeker2_grid_pos[1])
    			$("#"+seeker2_grid_pos[0]+"_"+seeker2_grid_pos[1]).css("transform", "rotate(180deg)")
    			$("#"+seeker2_grid_pos[0]+"_"+seeker2_grid_pos[1]).addClass("wall")
    			$("#"+seeker2_grid_pos[0]+"_"+seeker2_grid_pos[1]+" > svg").addClass("blocker")
    		}
    	}
    	//move left >> x--
    	else if(moveL) {
    		if($("#"+seeker2_grid_pos[0]+"_"+(seeker2_grid_pos[1]-1)).hasClass('player')) 
    			end_attack(1)
    		else {
    			seeker2_grid_pos[1] = seeker2_grid_pos[1]-1
    			create_svg(4, "seeker", seeker2_grid_pos[0]+"_"+seeker2_grid_pos[1])
    			$("#"+seeker2_grid_pos[0]+"_"+seeker2_grid_pos[1]).css("transform", "rotate(270deg)")
    			$("#"+seeker2_grid_pos[0]+"_"+seeker2_grid_pos[1]).addClass("wall")
    			$("#"+seeker2_grid_pos[0]+"_"+seeker2_grid_pos[1]+" > svg").addClass("blocker")
    		}
    	}
    	window.setTimeout(seeker2_loop, seeker2_rate-seeker2_time_diff);
	}
}

function seeker3_loop() {
	if(is_attack) {
		seeker3_time += seeker3_rate
	   	seeker3_time_diff = (new Date().getTime() - seeker3_time_start) - seeker3_time
	   	
	   	moveR = false
   		moveL = false
   		moveT = false
   		moveB = false
   		
   		$("#"+seeker3_grid_pos[0]+"_"+seeker3_grid_pos[1]).empty()
   		$("#"+seeker3_grid_pos[0]+"_"+seeker3_grid_pos[1]).removeClass("wall")

   		//call direction
   		//T or B
   		if(grid_pos[0] < seeker3_grid_pos[0])
   			moveT = true
   		else if(grid_pos[0] > seeker3_grid_pos[0])
   			moveB = true
   		else {
   			moveT = false
   			moveB = false
   		}
   		//L or R
   		if(grid_pos[1] < seeker3_grid_pos[1])
   			moveL = true
   		else if(grid_pos[1] > seeker3_grid_pos[1])
   			moveR = true
   		else {
   			moveL = false
   			moveR = false
   		}

   		//diagonals
   		//++
   		if(moveT && moveR) {
   			r = ranged_random(1, 0) 
   			if(r == 1) 
   			 	moveR = false
   			 else
   			 	moveT = false
   		}
   		//+-
   		else if(moveT && moveL) {
   			r = ranged_random(1, 0) 
   			if(r == 1) 
   			 	moveL = false
   			 else
   			 	moveT = false
   		}
   		//--
   		else if(moveB && moveL) {
   			r = ranged_random(1, 0) 
   			if(r == 1) 
   			 	moveL = false
   			 else
   			 	moveB = false
   		}
   		//-+
   		else if(moveB && moveR) {
   			r = ranged_random(1, 0) 
   			if(r == 1) 
   			 	moveR = false
   			 else
   			 	moveB = false
   		}

	   	//move up >> y--
    	if(moveT) {
    		if($("#"+(seeker3_grid_pos[0]-1)+"_"+seeker3_grid_pos[1]).hasClass("player")) 
    			end_attack(1)
    		else {
    			seeker3_grid_pos[0] = seeker3_grid_pos[0]-1
    			create_svg(6, "seeker", seeker3_grid_pos[0]+"_"+seeker3_grid_pos[1])
    			$("#"+seeker3_grid_pos[0]+"_"+seeker3_grid_pos[1]).css("transform", "rotate(0deg)")
    			$("#"+seeker3_grid_pos[0]+"_"+seeker3_grid_pos[1]).addClass("wall")
    			$("#"+seeker3_grid_pos[0]+"_"+seeker3_grid_pos[1]+" > svg").addClass("blocker")
    		}
    	}
    	//move right >> x++
    	else if(moveR) {
    		if($("#"+seeker3_grid_pos[0]+"_"+(seeker3_grid_pos[1]+1)).hasClass('player')) 
    			end_attack(1)
    		else {
    			seeker3_grid_pos[1] = seeker3_grid_pos[1]+1
    			create_svg(6, "seeker", seeker3_grid_pos[0]+"_"+seeker3_grid_pos[1])
    			$("#"+seeker3_grid_pos[0]+"_"+seeker3_grid_pos[1]).css("transform", "rotate(90deg)")
    			$("#"+seeker3_grid_pos[0]+"_"+seeker3_grid_pos[1]).addClass("wall")
    			$("#"+seeker3_grid_pos[0]+"_"+seeker3_grid_pos[1]+" > svg").addClass("blocker")
    		}
    	}
    	//move down >> y++
    	else if(moveB) {
    		if($("#"+(seeker3_grid_pos[0]+1)+"_"+seeker3_grid_pos[1]).hasClass('player')) 
    			end_attack(1)
    		else {
    			seeker3_grid_pos[0] = seeker3_grid_pos[0]+1
    			create_svg(6, "seeker", seeker3_grid_pos[0]+"_"+seeker3_grid_pos[1])
    			$("#"+seeker3_grid_pos[0]+"_"+seeker3_grid_pos[1]).css("transform", "rotate(180deg)")
    			$("#"+seeker3_grid_pos[0]+"_"+seeker3_grid_pos[1]).addClass("wall")
    			$("#"+seeker3_grid_pos[0]+"_"+seeker3_grid_pos[1]+" > svg").addClass("blocker")
    		}
    	}
    	//move left >> x--
    	else if(moveL) {
    		if($("#"+seeker3_grid_pos[0]+"_"+(seeker3_grid_pos[1]-1)).hasClass('player')) 
    			end_attack(1)
    		else {
    			seeker3_grid_pos[1] = seeker3_grid_pos[1]-1
    			create_svg(4, "seeker", seeker3_grid_pos[0]+"_"+seeker3_grid_pos[1])
    			$("#"+seeker3_grid_pos[0]+"_"+seeker3_grid_pos[1]).css("transform", "rotate(270deg)")
    			$("#"+seeker3_grid_pos[0]+"_"+seeker3_grid_pos[1]).addClass("wall")
    			$("#"+seeker3_grid_pos[0]+"_"+seeker3_grid_pos[1]+" > svg").addClass("blocker")
    		}
    	}
    	window.setTimeout(seeker3_loop, seeker3_rate-seeker3_time_diff);
	}
}

//exclude two cell in front of player direction
function exclude_near_player_cella(y, x) {
	let result = false,
	arr = [];
	if(direction == 1){
		arr.push((grid_pos[0]-1))
		arr.push((grid_pos[0]-2))
		arr.forEach(function(item) {
			if(item == y)
				result = true
		});
	}
	else if(direction == 2){
		arr.push((grid_pos[1]+1))
		arr.push((grid_pos[1]+2))
		arr.forEach(function(item) {
			if(item == x)
				result = true
		});
	}
	else if(direction == 3){
		arr.push((grid_pos[0]+1))
		arr.push((grid_pos[0]+2))
		arr.forEach(function(item) {
			if(item == y)
				result = true
		});
	}
	else if(direction == 4) {
		arr.push((grid_pos[1]-1))
		arr.push((grid_pos[1]-2))
		arr.forEach(function(item) {
			if(item == x)
				result = true
		});
	}
	return result;
}

function make_random_text(length) {
    let result='',
    characters= 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for(let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random()*characters.length))
   }
   return result
};

function hack_blocked_reward(dif) {
	let multi_text
	switch(dif) {
		case 1:
			c_reward = (cps+7) * 350
			d_reward = dps * 1908
			multi_text = "1"
			Game.permanent.total_easy_hack_blocked++
			break
		case 2:
			c_reward = (cps+7) * 595
			d_reward = dps * 3243.6
			multi_text = "1.7"
			Game.permanent.total_normal_hack_blocked++
			break;
		case 3:
			c_reward = (cps+7) * 1050
			d_reward = dps * 5724
			multi_text = "3"
			Game.permanent.total_hard_hack_blocked++
			break;
		case 4:
			c_reward = (cps+7) * 2450
			d_reward = dps * 13356
			multi_text = "7"
			Game.permanent.total_impossible_hack_blocked++
			break;
	}
	Game.permanent.total_gaia_blocked++
	increase_credit(c_reward)
	increase_data(d_reward)
	idle_block++
	log("<br>> "+con_span("HACK Blocked!", "var(--blockedClr)"), "sys")
	log("<br>> Credit: "+con_span("+"+simplifyNumber(c_reward)+" (x"+multi_text+")", "var(--blockedClr)"), "sys")
	log("<br>> Data: "+con_span("+"+get_data_with_symbol(d_reward, 3)+" (x"+multi_text+")", "var(--blockedClr)"), "sys")
	Events["GAIA_FIRST_BLOCK"]()
}

function hacked_punishment(dif) {
	sobatage = ""
	debuffTime = dif * (120 + 2 * Game.permanent.gaia_difficulty)
	multi_name = ""
	visual_id = ""
	eff_ = dif * (10.25 + 0.075 * Game.permanent.gaia_difficulty)
	gaia_sobatage_effect_timer = debuffTime

	punishment_type = ranged_random(5, 1)
	if(punishment_type == 1) {
		multi_name = "gaia_credit"
		visual_id = "q_cps"
		sobatage = "Credit generating"
	}
	else if(punishment_type == 2) {
		multi_name = "gaia_data"
		visual_id = "q_dps"
		sobatage = "Data decoding"
	}
	else if(punishment_type == 3) {
		multi_name = "gaia_click"
		visual_id = "clicker"
		sobatage = "Click gaining"
	}
	else if(punishment_type == 4) {
		multi_name = "gaia_materials"
		visual_id = "q_mpm"
		sobatage = "Materials production"
	}
	else if(punishment_type == 5) {
		multi_name = "gaia_network"
		visual_id = "q_net"
		sobatage = "Network speed"
	}
	else if(punishment_type == 6) {
		multi_name = "gaia_energy"
		visual_id = "q_eng"
		sobatage = "System Energy"
	}

	generate_effect(debuffTime, multi_name, "+", "-", visual_id, "eclipse", eff_/100, sobatage+" sobataged by -"+(eff_).toFixed(3)+"% for /e by G.A.I.A", 2)

	threat = Math.floor(1.25*dif)
	Game.permanent.total_gaia_hacked++
	Game.impermanent.threat += threat
	idle_hack++
	idle_threat += threat
	log("<br>> "+con_span("HACKED!", "var(--negativeClr)"), "sys")
	log("<br>> "+sobatage+" sobataged by "+con_span("-"+(eff_).toFixed(3)+"%", "var(--negativeClr)")+" for "+con_span(formatTimeMinute(debuffTime), "var(--negativeClr)"), "sys")
	log("<br>> Threat: "+con_span("+"+threat+"%", "var(--negativeClr)"), "sys")
	Events["GAIA_FIRST_HACKED"]()
}


function end_attack(type) {
	is_attack = false
	if(type == 2) {
		hack_blocked_reward(attack_difficulty)
	}
	else {
		hacked_punishment(attack_difficulty)
	}
	task = Game.impermanent.task
	$("#hack_title").css("display", "none")
	$("#pc-fc").css("display", "none")
	$("#path_switch").css("display", "none")

	$("body").removeClass("glitch")
	$("#hacked_view").css("display", "none")
	$("#def-con").css("display", "none")

	attack_timer = 0
	//make sure ad menu will be ontop again	
	Events["GAIA_FIRST_HACK"]()
	$("#gaia_input_input").val("")
	$("#percentage_threat").html(simplifyNumberSmall(Game.impermanent.threat)+"%")
	check_threat()
}

function typeWriter() {
	if(is_attack) {
	  if (tW_ctr < hack_txt.length) {
	    $("#hack_text_anim").append('<br>'+hack_txt[tW_ctr])
	    tW_ctr++
	    setTimeout(typeWriter, 50)
	  }
	  else {
	  	tW_ctr = 0
	  	$("#hack_text_anim").css("display", "none")
	  	$("#hack_title").css("display", "flex")
	  }
	}
	else 
		tW_ctr = 0
}

function start_hack_animation() {
	//turn on G.A.I.A logo and glitch effect
	$("body").addClass("glitch")
	$("#hacked_view").css("display", "flex")
	$("#hack_text_anim").css("display", "block")
	$("#hack_text_anim").text('')
	//make sure to turn off tutorial view if visible
	$("#tutorial_view").css("display", "none")
	$("#tutorial_arrow").css("display", "none")
	$("#tutorial_arrow").stop("arrow_anim",true, true)

	//start text animation
	typeWriter()

	//after 4 seconds turn of hack_title and turn on defence-contianer to display def type
	hack_animation_start = setArrayTimeout(function() {
		$("#hack_title").css("display", "none")
		$("#def-con").css("display", "flex")
		$("#pc-fc").css("display", "none")
		$("#path_switch").css("display", "none")
		$("#gaia_input_input").val("")
		if(atkType == 1) 
			pass_crack(attack_difficulty)
		else if(atkType == 2)
			fake_certificate(attack_difficulty)
		else{
			blocker(attack_difficulty)
		} 
	}, 5000)
}

function end_hack_animation() {
	clearTimeout(hack_animation_start)
	$("#hacked_view").css("display", "none")
	$("#hack_text_anim").css("display", "none")
	$("#hack_title").css("display", "none")
	$("#def-con").css("display", "none")
	$("#pc-fc").css("display", "none")
	$("#path_switch").css("display", "none")
	$("body").removeClass("glitch")
}