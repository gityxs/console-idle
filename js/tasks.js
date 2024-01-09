var
//for fake cerificate
curr_fc_charAt = 0,
//general
difficulty = "Easy",
difficulty_multi = 1,
task_points_loop = 0,
lose_points = 0,
current_task_reward_type = 0,
current_task_reward = 0,


//add task
addTask_num1 = 0,
addTask_num2 = 0,
addAnswer = 0,
addanswer_text = "",

//press task
//keyName and their e.code
keyName = {
	0 : "KeyA",
	1 : "KeyB",
	2 : "KeyC",
	3 : "KeyD",
	4 : "KeyE",
	5 : "KeyF",
	6 : "KeyG",
	7 : "KeyH",
	8 : "KeyI",
	9 : "KeyJ",
	10 : "KeyK",
	11 : "KeyL",
	12 : "KeyM",
	13 : "KeyN",
	14 : "KeyO",
	15 : "KeyP",
	16 : "KeyQ",
	17 : "KeyR",
	18 : "KeyS",
	19 : "KeyT",
	20 : "KeyU",
	21 : "KeyV",
	22 : "KeyW",
	23 : "KeyX",
	24 : "KeyY",
	25 : "KeyZ"
},

MinkeyToBePressed = 11,
MaxkeyToBePressed = 18,
keyToBePressed = "",
next_keyToBePressed = keyName[ranged_random(25,0)],
last_keyToBePressed = "",
pressMaxCount = 0, 
pressCount = 0,

keyToBePressed_digit,
numpad_array = {
	0: "Numpad0",
	1: "Numpad1",
	2: "Numpad2",
	3: "Numpad3",
	4: "Numpad4",
	5: "Numpad5",
	6: "Numpad6",
	7: "Numpad7",
	8: "Numpad8",
	9: "Numpad9"
},
digit_array = {
	0: "Digit0",
	1: "Digit1",
	2: "Digit2",
	3: "Digit3",
	4: "Digit4",
	5: "Digit5",
	6: "Digit6",
	7: "Digit7",
	8: "Digit8",
	9: "Digit9"
},

arrows_code = {
	1: "ArrowUp",
	2: "ArrowRight",
	3: "ArrowDown",
	4: "ArrowLeft"
},
squence_arr = [],
squence_amount = 4,
squence_curr_pos = 0,
squence_text = "",

pressTask = function() {
	last_keyToBePressed = keyToBePressed
	keyToBePressed = next_keyToBePressed
	if(difficulty == "Hard")
		do {
			next_keyToBePressed = keyName[ranged_random(25,0)]
		}
		while(next_keyToBePressed == keyToBePressed)
	else
		next_keyToBePressed = keyName[ranged_random(25,0)]
	
	pressMaxCount = ranged_random(MaxkeyToBePressed,MinkeyToBePressed)
	pressCount = 0
	$("#current_task_text").text("Press "+keyToBePressed.substring(3)+": "+(pressMaxCount-pressCount)+". Next: "+next_keyToBePressed.substring(3))

	current_task_reward_type = ranged_random(2,1) //1=credit, 2=data

	$("#tasks_mini_reward_icon").empty()
	if(current_task_reward_type == 1) {
		current_task_reward = ((pressMaxCount*Game.impermanent.pressing_task_multi+((Game.impermanent.pressing_task_infinite_keys*Game.impermanent.hardware_count.h1/100)*cps))*Game.impermanent.ol.Pressing.multi)*difficulty_multi
		create_svg(0, "credit", "tasks_mini_reward_icon")
		$("#current_task_reward").text("Reward: "+simplifyNumber(current_task_reward))
	}
	else {
		current_task_reward = ((pressMaxCount+((Game.impermanent.pressing_task_infinite_keys*Game.impermanent.hardware_count.h1/100)*dps))*Game.impermanent.ol.Pressing.multi)*difficulty_multi
		create_svg(0, "data", "tasks_mini_reward_icon")
		$("#current_task_reward").text("Reward: "+get_data_with_symbol(current_task_reward, 3))
	}
},
addTask = function() {
	if(difficulty == "Easy") {
		//left side
		addTask_num1 = ranged_random(9, 1);
		//right side
		addTask_num2 = ranged_random(9-addTask_num1, 0)
		addAnswer = addTask_num1 + addTask_num2;
		addanswer_text = con_span("?", "var(--golden)")
		lose_points = addAnswer
	}
	else if(difficulty == "Normal"){
		//left side
		addTask_num1 = ranged_random(99, 10);
		//right side
		addTask_num2 = ranged_random(99-addTask_num1, 0)
		addAnswer = addTask_num1 + addTask_num2
		addanswer_text = (addAnswer).toString()
		temp = ranged_random(1, 0)
		addAnswer = Number(addanswer_text.charAt(temp))
		addanswer_text = addanswer_text.replace(addanswer_text.charAt(temp), con_span("?", "var(--golden)"))
		lose_points = addAnswer
	}
	else {
		//left side
		addTask_num1 = ranged_random(999, 100);
		//right side
		addTask_num2 = ranged_random(999-addTask_num1, 0)
		addAnswer = addTask_num1 + addTask_num2
		addanswer_text = (addAnswer).toString()
		temp = ranged_random(2, 0)
		addAnswer = Number(addanswer_text.charAt(temp))
		addanswer_text = addanswer_text.replace(addanswer_text.charAt(temp), con_span("?", "var(--golden)"))
		lose_points = addAnswer
	}
	

	keyToBePressed = numpad_array[addAnswer]
	keyToBePressed_digit = digit_array[addAnswer]
	$("#current_task_text").html("Cal "+addTask_num1+" + "+addTask_num2+" = "+addanswer_text)

	current_task_reward_type = ranged_random(2,1) //1=credit, 2=data

	$("#tasks_mini_reward_icon").empty();
	if(current_task_reward_type == 1) {
		current_task_reward = ((1+addAnswer*Game.impermanent.add_task_multi+((Game.impermanent.add_task_overflow*Game.impermanent.hardware_count.h1/100)*cps))*Game.impermanent.ol.Add.multi)*difficulty_multi
		create_svg(0, "credit", "tasks_mini_reward_icon");
		$("#current_task_reward").text("Reward: "+simplifyNumber(current_task_reward))
	}
	else {
		current_task_reward = ((1+addAnswer+((Game.impermanent.add_task_overflow*Game.impermanent.hardware_count.h1/100)*dps))*Game.impermanent.ol.Add.multi)*difficulty_multi
		create_svg(0, "data", "tasks_mini_reward_icon");
		$("#current_task_reward").text("Reward: "+get_data_with_symbol(current_task_reward, 3))
	}
}
squenceTask = function() {
	squence_arr = []
	squence_curr_pos = 0
	squence_text = ""
	sr = squence_amount
	for(i = 0; i<sr; i++) {
		r = ranged_random(4, 1)
		squence_arr.push(arrows_code[r])
		if(r == 1)
			squence_text += "<svg id='sq_"+i+"' class='squence_arrow lv0_icon' style='transform: rotate(0deg);'><use xlink:href='#arrow'></use></svg>"
		else if(r == 2)
			squence_text += "<svg id='sq_"+i+"' class='squence_arrow lv0_icon' style='transform: rotate(90deg);'><use xlink:href='#arrow'></use></svg>"
		else if(r == 3)
			squence_text += "<svg id='sq_"+i+"' class='squence_arrow lv0_icon' style='transform: rotate(180deg);'><use xlink:href='#arrow'></use></svg>"
		else
			squence_text += "<svg id='sq_"+i+"' class='squence_arrow lv0_icon' style='transform: rotate(270deg);'><use xlink:href='#arrow'></use></svg>"

	}

	keyToBePressed = squence_arr[0]
	$("#current_task_text").html(">: "+squence_text);

	current_task_reward_type = ranged_random(2,1) //1=credit, 2=data
	$("#tasks_mini_reward_icon").empty()
	if(current_task_reward_type == 1) {
		current_task_reward = ((sr*Game.impermanent.sequence_task_multi+((Game.impermanent.sequence_task_chaining*Game.impermanent.hardware_count.h1/100)*cps))*Game.impermanent.ol.Sequence.multi)*difficulty_multi
		create_svg(0, "credit", "tasks_mini_reward_icon");
		$("#current_task_reward").text("Reward: "+simplifyNumber(current_task_reward));
	}
	else {
		current_task_reward = ((sr+((Game.impermanent.sequence_task_chaining*Game.impermanent.hardware_count.h1/100)*dps))*Game.impermanent.ol.Sequence.multi)*difficulty_multi
		create_svg(0, "data", "tasks_mini_reward_icon");
		$("#current_task_reward").text("Reward: "+get_data_with_symbol(current_task_reward, 3))
	}
};

function set_task_diffculity() {
	if(task === "task1") {
		if(difficulty == "Easy") {
			task_points_loop = 35
			lose_points = 3
			MinkeyToBePressed = 11
			MaxkeyToBePressed = 18
			difficulty_multi = 1
		}
		else if(difficulty == "Normal") {
			task_points_loop = 35
			lose_points = 15
			MinkeyToBePressed = 7
			MaxkeyToBePressed = 11
			difficulty_multi = 2
		}
		else {
			task_points_loop = 35
			lose_points = 35
			MinkeyToBePressed = 3
			MaxkeyToBePressed = 6
			difficulty_multi = 3
		}
	}
	else if(task === "task2") {
		if(difficulty == "Easy") {
			task_points_loop = 60
			difficulty_multi = 1
		}
		else if(difficulty == "Normal") {
			task_points_loop = 40
			difficulty_multi = 2
		}
		else {
			task_points_loop = 25
			difficulty_multi = 3
		}
	}
	else {
		if(difficulty == "Easy") {
			task_points_loop = 10
			lose_points = 1
			squence_amount = 4
			difficulty_multi = 1
		}
		else if(difficulty == "Normal") {
			task_points_loop = 7
			lose_points = 1
			squence_amount = 7
			difficulty_multi = 2
		}
		else {
			task_points_loop = 5
			lose_points = 1
			squence_amount = 10
			difficulty_multi = 3
		}
	}
	
}

function setActiveTask() {
	Game.impermanent.task = mnewsel
	task_progress = 0
	$("#current_task_bar_value").css("width", "0%")
	$("#"+moldsel).css("box-shadow", "none")
	$("#"+mnewsel).css("box-shadow", "inset 0px 0px 15px var(--mainClr)")

	set_task_diffculity()

	if(task === "task1") {
		activeTask = pressTask
		log("<br>> Changed to 'Pressing' Task on "+difficulty+" mode", "sys")
		$("#tasks_mini_icon").empty()
		create_svg(0, "pressing", "tasks_mini_icon")
		$("#currentTask_progress").text(task_progress+" / "+task_points_loop)
	}
	else if(task === "task2") {
		activeTask = addTask
		log("<br>> Changed to 'Addition' Task on "+difficulty+" mode", "sys")
		$("#tasks_mini_icon").empty()
		create_svg(0, "calculator", "tasks_mini_icon")
		$("#currentTask_progress").text(task_progress+" / "+task_points_loop)
	}
	else if(task === "task3") {
		activeTask = squenceTask
		log("<br>> Changed to 'Sequence' Task on "+difficulty+" mode", "sys")
		$("#tasks_mini_icon").empty()
		create_svg(0, "sequence", "tasks_mini_icon")
		$("#currentTask_progress").text(task_progress+" / "+task_points_loop)
	}
	else {
		log("<br>> Unable to Start Task, something went wrong!", "sys")
		return
	}
}

//when staring game
function init_contribution_rewards(argument) {
	if(Game.impermanent.current_contribution_points >= 10) {
		if(Game.impermanent.tasks_rewards.tier_1.collected == true)
			$("#tier_1").css("filter", "brightness(1.0)")
		else
			$("#tier_1_icon").css("box-shadow", "0 0 10px var(--mainClr)")
	}
	if(Game.impermanent.current_contribution_points >= 25) {
		if(Game.impermanent.tasks_rewards.tier_2.collected == true)
			$("#tier_2").css("filter", "brightness(1.0)")
		else
			$("#tier_2_icon").css("box-shadow", "0 0 10px var(--mainClr)")
	}
	if(Game.impermanent.current_contribution_points >= 40) {
		if(Game.impermanent.tasks_rewards.tier_3.collected == true)
			$("#tier_3").css("filter", "brightness(1.0)")
		else
			$("#tier_3_icon").css("box-shadow", "0 0 10px var(--mainClr)")
	}
	if(Game.impermanent.current_contribution_points >= 55) {
		if(Game.impermanent.tasks_rewards.tier_4.collected == true)
			$("#tier_4").css("filter", "brightness(1.0)")
		else
			$("#tier_4_icon").css("box-shadow", "0 0 10px var(--mainClr)")
	}
	if(Game.impermanent.current_contribution_points >= 100) {
		if(Game.impermanent.tasks_rewards.tier_5.collected == true) {
			$("#tier_5").css("filter", "brightness(1.0)")
		}
		else
			$("#tier_5_icon").css("box-shadow", "0 0 10px var(--mainClr)")
	}

	$("#all_tasks_progress_text").text(Game.impermanent.current_contribution_points+" / 100")
	$("#all_tasks_bar_value").css("width", Game.impermanent.current_contribution_points / 100 * 100 +"%")
	reset_contribution_rewards()
}

function reset_contribution_rewards() {
	if(Game.impermanent.tasks_rewards.tier_1.collected == true && Game.impermanent.tasks_rewards.tier_2.collected == true &&
		Game.impermanent.tasks_rewards.tier_3.collected == true && Game.impermanent.tasks_rewards.tier_4.collected == true &&
		Game.impermanent.tasks_rewards.tier_5.collected == true) {

		Game.impermanent.tasks_rewards.tier_1.reward = (cps/Game.impermanent.g_eff.coin_credit+77)*180
		Game.impermanent.tasks_rewards.tier_1.collected = false
		Game.impermanent.tasks_rewards.tier_2.reward = (cps/Game.impermanent.g_eff.coin_credit+77)*520
		Game.impermanent.tasks_rewards.tier_2.collected = false
		Game.impermanent.tasks_rewards.tier_3.reward = (dps/Game.impermanent.g_eff.coin_data+1)*924
		Game.impermanent.tasks_rewards.tier_3.collected = false
		Game.impermanent.tasks_rewards.tier_4.reward = (cps/Game.impermanent.g_eff.coin_credit+77)*1300
		Game.impermanent.tasks_rewards.tier_4.collected = false
		Game.impermanent.tasks_rewards.tier_5.reward = (dps/Game.impermanent.g_eff.coin_data+1)*3720
		Game.impermanent.tasks_rewards.tier_5.collected = false

		Game.impermanent.current_contribution_points = 0
		$(".rewards_block_icon").css({
			"box-shadow": "",
		});
		$(".rewards_block").css({
			"filter": "brightness(0.6)"
		});
		$("#all_tasks_progress_text").text(Game.impermanent.current_contribution_points+" / 100")
		$("#all_tasks_bar_value").css("width", Game.impermanent.current_contribution_points / 100 * 100 +"%")
		log("<br>> "+con_span("HQ: ", "var(--hqClr)")+"Contribution Rewards have been updated", "hq")
	}
}

function contribution_progress(points) {
	Game.impermanent.current_contribution_points += points

	if(Game.impermanent.current_contribution_points >= 100)
		Game.impermanent.current_contribution_points = 100
		
		
	Game.permanent.total_contribution_points += points
	$("#all_tasks_progress_text").text(Game.impermanent.current_contribution_points+" / 100")
	$("#all_tasks_bar_value").css("width", Game.impermanent.current_contribution_points / 100 * 100 +"%")

	if(Game.impermanent.current_contribution_points >= 10 && Game.impermanent.tasks_rewards.tier_1.collected == false){
		$("#tier_1_icon").css("box-shadow", "0 0 15px var(--mainClr)")
		log("<br>> "+con_span("Tier 1 ", "gray")+"contribution reward is ready to collect.", "sys")
	}
	if(Game.impermanent.current_contribution_points >= 25 && Game.impermanent.tasks_rewards.tier_2.collected == false) {
		$("#tier_2_icon").css("box-shadow", "0 0 15px var(--mainClr)")
		log("<br>> "+con_span("Tier 2 ", "Magenta")+"contribution reward is ready to collect.", "sys")
	}
	if(Game.impermanent.current_contribution_points >= 40 && Game.impermanent.tasks_rewards.tier_3.collected == false) {
		$("#tier_3_icon").css("box-shadow", "0 0 15px var(--mainClr)")
		log("<br>> "+con_span("Tier 3 ", "cyan")+"contribution reward is ready to collect.", "sys")
	}
	if(Game.impermanent.current_contribution_points >= 55 && Game.impermanent.tasks_rewards.tier_4.collected == false) {
		$("#tier_4_icon").css("box-shadow", "0 0 15px var(--mainClr)")
		log("<br>> "+con_span("Tier 4 ", "DodgerBlue")+"contribution reward is ready to collect.", "sys")
	}
	if(Game.impermanent.current_contribution_points >= 100 && Game.impermanent.tasks_rewards.tier_5.collected == false) {
		$("#tier_5_icon").css("box-shadow", "0 0 15px var(--mainClr)")
		log("<br>> "+con_span("Tier 5 ", "orange")+"contribution reward is ready to collect.", "sys")
	}
}

function rewards_block_click(num, id, fun, funArg, funCurrency, currency) {
	tier = parseInt(this.id.split('_')[1])
	color = ""
	switch(tier) {
	case 1: 
		color = "gray"
		break
	case 2:
		color = "Magenta"
		break
	case 3:
		color = "cyan"
		break
	case 4:
		color = "DodgerBlue"
		break
	case 5:
		color = "orange"
		break
	}
	if(Game.impermanent.current_contribution_points >= num) {
		if(!Game.impermanent.tasks_rewards[id].collected) {
			Game.impermanent.tasks_rewards[id].collected = true
			fun(funArg);
			$("#"+id+"_icon").css("box-shadow", "")
			$("#"+id).css("filter", "brightness(1.0)")
			log("<br>> "+con_span("HQ: ", "var(--hqClr)")+"Transferred "+con_span("Tier "+tier+" ", color)+"reward: "+con_span(funCurrency(funArg)+" "+currency, "var(--positiveClr)"), "hq")
			Game.permanent["total_"+id+"_reward_gained"]++
		}
		else
			log("<br>> "+con_span("HQ: ", "var(--hqClr)")+"Reward already Transferred", "sys")
	}
	else
		log("<br>> "+con_span("HQ: ", "var(--hqClr)")+con_span("Insufficient contribution points", "var(--negativeClr)"), "sys")
}

//for pressTask
$(document).keydown(function(e) {
	if(!is_attack && e.code != "Enter" && isLogin) {
		if(Game.impermanent.threat < 100) {
			if(!task_isPauseed) {
				$("#current_task_bar_value").removeClass("pc-fc-box-f")
				if (task === "task1") {
					if (!event.repeat) {
						if(e.code == keyToBePressed) {
							pressCount++
							task_progress++
							$("#current_task_text").text("Press "+keyToBePressed.substring(3)+": "+(pressMaxCount-pressCount)+". Next: "+next_keyToBePressed.substring(3))
							$("#currentTask_progress").text(task_progress+" / "+task_points_loop)
							$("#current_task_bar_value").css("width", task_progress / task_points_loop * 100 +"%")
							if(pressCount >= pressMaxCount) {
								if(current_task_reward_type == 1) {
									increase_credit(current_task_reward)
									Game.permanent.total_credit_generated_tasks += current_task_reward
									Game.permanent.total_credit_generated_from_pressing_task += current_task_reward
									Game.impermanent.credit_generated_from_pressing_task += current_task_reward
									Observer["TASKS"]["CREDIT"]()
									log("<br>> Pressing Task, "+con_span("+"+simplifyNumber(current_task_reward)+" ", "var(--blockedClr)")+"credit", "sys")
								}
								else {
									increase_data(current_task_reward)
									Game.permanent.total_data_generated_tasks += current_task_reward
									Game.permanent.total_data_generated_from_pressing_task += current_task_reward
									Game.impermanent.data_generated_from_pressing_task += current_task_reward
									Observer["TASKS"]["DATA"]()
									log("<br>> Pressing Task, "+con_span("+"+get_data_with_symbol(current_task_reward, 3)+" ", "var(--blockedClr)")+"Data", "sys")
								}
								activeTask();
							}
							if(task_progress >= task_points_loop) {
								task_progress = 0
								Game.permanent.total_pressing_task_complated++
								if(difficulty == "Hard")
									Game.permanent.total_hard_pressing_task_complated++
								log("<br>> Pressing Task complated, "+con_span("+"+difficulty_multi, "var(--blockedClr)")+" Contribution.", "sys")
								$("#currentTask_progress").text(task_progress+" / "+task_points_loop)
								$("#current_task_bar_value").css("width", 0+"%")
								contribution_progress(difficulty_multi)
								Observer["TASKS"]["COMPLATE"]()
								Observer["TASKS"]["PRESS"]()
							}
						}
						else {
							log("<br>> "+con_span("Incorrect input", "var(--negativeClr)"), "sys")
							task_progress -= lose_points
							if(task_progress <= 0)
								task_progress = 0
							$("#currentTask_progress").text(task_progress+" / "+task_points_loop)
							$("#current_task_bar_value").css("width", task_progress / task_points_loop * 100 +"%")
							$("#current_task_bar_value").addClass("pc-fc-box-f")
						}
					}
				}
				else if(task == "task2") {
					if (!event.repeat) {
						if(e.code == keyToBePressed || e.code == keyToBePressed_digit) {
							task_progress +=addAnswer
							$("#currentTask_progress").text(task_progress+" / "+task_points_loop)
							$("#current_task_bar_value").css("width", task_progress / task_points_loop * 100 +"%")
							if(current_task_reward_type == 1) {
								increase_credit(current_task_reward)
								Game.permanent.total_credit_generated_tasks += current_task_reward
								Game.permanent.total_credit_generated_from_add_task += current_task_reward
								Game.impermanent.credit_generated_from_add_task += current_task_reward
								Observer["TASKS"]["CREDIT"]()
								log("<br>> Addition Task, "+con_span("+"+simplifyNumber(current_task_reward)+" ", "var(--blockedClr)")+"credit", "sys")
							}
							else {
								increase_data(current_task_reward)
								Game.permanent.total_data_generated_tasks += current_task_reward
								Game.permanent.total_data_generated_from_add_task += current_task_reward
								Game.impermanent.data_generated_from_add_task += current_task_reward
								Observer["TASKS"]["DATA"]()
								log("<br>> Addition Task, "+con_span("+"+get_data_with_symbol(current_task_reward, 3)+" ", "var(--blockedClr)")+"Data", "sys")
							}
							activeTask();
							if(task_progress >= task_points_loop) {
								task_progress -= task_points_loop
								Game.permanent.total_add_task_complated++
								if(difficulty == "Hard")
									Game.permanent.total_hard_add_task_complated++
								log("<br>> Addition Task complated, "+con_span("+"+difficulty_multi, "var(--blockedClr)")+" Contribution.", "sys")
								$("#currentTask_progress").text(task_progress+" / "+task_points_loop)
								$("#current_task_bar_value").css("width", task_progress / task_points_loop * 100 +"%")
								contribution_progress(difficulty_multi)
								Observer["TASKS"]["COMPLATE"]()
								Observer["TASKS"]["ADD"]()
							}
						} else {
							log("<br>> "+con_span("Incorrect answer", "var(--negativeClr)"), "sys")
							task_progress -= lose_points
							if(task_progress <= 0) task_progress = 0
							$("#currentTask_progress").text(task_progress+" / "+task_points_loop)
							$("#current_task_bar_value").css("width", task_progress / task_points_loop * 100 +"%")
							$("#current_task_bar_value").addClass("pc-fc-box-f")
						}
					}
				}
				else if(task == "task3") {
					if (!event.repeat) {
						if(e.code == keyToBePressed) {
							$("#sq_"+squence_curr_pos).removeClass("lv0_icon")
							$("#sq_"+squence_curr_pos).addClass("lv200_icon")
							squence_curr_pos++
							if(squence_curr_pos >= squence_arr.length) {
								task_progress ++
								$("#currentTask_progress").text(task_progress+" / "+task_points_loop)
								$("#current_task_bar_value").css("width", task_progress / task_points_loop * 100 +"%")
								if(current_task_reward_type == 1) {
									increase_credit(current_task_reward)
									Game.permanent.total_credit_generated_tasks += current_task_reward
									Game.permanent.total_credit_generated_from_sequence_task += current_task_reward
									Game.impermanent.credit_generated_from_sequence_task += current_task_reward
									Observer["TASKS"]["CREDIT"]()
									log("<br>> Sequence Task, "+con_span("+"+simplifyNumber(current_task_reward)+" ", "var(--blockedClr)")+"credit", "sys")
								}
								else {
									increase_data(current_task_reward)
									Game.permanent.total_data_generated_tasks += current_task_reward
									Game.permanent.total_data_generated_from_sequence_task += current_task_reward
									Game.impermanent.data_generated_from_sequence_task += current_task_reward
									Observer["TASKS"]["DATA"]()
									log("<br>> Sequence Task, "+con_span("+"+get_data_with_symbol(current_task_reward, 3)+" ", "var(--blockedClr)")+"Data", "sys")
								}
								squenceTask();
								if(task_progress >= task_points_loop) {
									task_progress -= task_points_loop
									Game.permanent.total_sequence_task_complated++
									if(difficulty == "Hard")
										Game.permanent.total_hard_sequence_task_complated++
									log("<br>> Sequence Task complated, "+con_span("+"+difficulty_multi, "var(--blockedClr)")+" Contribution.", "sys")
									$("#currentTask_progress").text(task_progress+" / "+task_points_loop)
									$("#current_task_bar_value").css("width", task_progress / task_points_loop * 100 +"%")
									contribution_progress(difficulty_multi)
									Observer["TASKS"]["COMPLATE"]()
									Observer["TASKS"]["SEQUENCE"]()
								}
							}
							else 
								keyToBePressed = squence_arr[squence_curr_pos]
						}
						else {
							log("<br>> "+con_span("Incorrect sequence", "var(--negativeClr)"), "sys")
							squence_curr_pos = 0
							task_progress -= lose_points
							if(task_progress < 0) task_progress = 0
							squenceTask()
							$("#currentTask_progress").text(task_progress+" / "+task_points_loop)
							$("#current_task_bar_value").css("width", task_progress / task_points_loop * 100 +"%")
							$("#current_task_bar_value").addClass("pc-fc-box-f")
						}
					}
				}
			}
		}
	}
	else if(task === "blocker") {
		if(e.key === "ArrowUp") {
			direction = 1
			$("#"+grid_pos[0]+"_"+grid_pos[1]).css("transform", "rotate(0deg)")
		}
		else if(e.key === "ArrowRight") {
			direction = 2
			$("#"+grid_pos[0]+"_"+grid_pos[1]).css("transform", "rotate(90deg)")
		}
		else if(e.key === "ArrowDown") {
			direction = 3
			$("#"+grid_pos[0]+"_"+grid_pos[1]).css("transform", "rotate(180deg)")
		}
		else if(e.key === "ArrowLeft") {
			direction = 4
			$("#"+grid_pos[0]+"_"+grid_pos[1]).css("transform", "rotate(270deg)")
		}
	}
	
	if(e.code === "Escape") {
		$("#update_menu").css("display", "none")
		$("#make_sure").css("display", "none")
		$("#idle_hiber_report").css("display", "none")
	}
})

$("#gaia_input_input").keyup(function(e) {
	if(task == "fake_certificate") {
		temp = $(this).val()
		curr_fc_charAt = temp.length-1
		if(e.key !== 'Backspace' && e.key !== 'Shift') {
			if(temp.charAt(curr_fc_charAt) !== pc_fc_problem_answers[pc_fc_current].charAt(curr_fc_charAt)) {
				tries_left = tries_left - 1
				// Remove one of the first children
				$("#tries_left").children().eq(0).remove()
				if(tries_left <= 0) {
					is_attack = false
					end_attack(1)
				}		
			}
			else if(pc_fc_problem_answers[pc_fc_current].charAt(curr_fc_charAt+1) === "-") {
				$(this).val(temp+"-")
				temp = $(this).val()
				curr_fc_charAt++
			}
		}

		for(let i = 0; i <= curr_fc_charAt; i++) {
			if(temp.charAt(i) === pc_fc_problem_answers[pc_fc_current].charAt(i)) {
				$("#b_p_s"+pc_fc_current+i).css("color", "var(--golden)")
			}
			else {
				$("#b_p_s"+pc_fc_current+i).css("color", "var(--negativeClr)")
			}
		}

		for(let i = curr_fc_charAt+1; i < pc_fc_problem_answers[pc_fc_current].length; i++) {
			$("#b_p_s"+pc_fc_current+i).css("color", "var(--mainClr)")
		}
	}
})

function getInput(key) {
	if(key === 'Enter') {
		let temp = $("#gaia_input_input").val()
		if(temp.charAt(0) !== "/") {
			if(task === "pass_crack") {
				$("#b"+pc_fc_current).removeClass("pc-fc-box-f")
				let temp = $("#gaia_input_input").val()
				if(temp == pc_fc_problem_answers[pc_fc_current]) {
					$("#b"+pc_fc_current).css("background-color", "var(--def_solv)")
					$("#qm"+pc_fc_current).text(temp)
					pc_fc_problem_is_answered[pc_fc_current] = true
					pc_fc_current++
					$("#b"+pc_fc_current).css("background-color", "var(--def_curr)")
					let is_all_answered = true
					for(let i = 0; i < pc_fc_problem_is_answered.length; i++) {
						if(pc_fc_problem_is_answered[i] == false)
							is_all_answered = false
					}
					if(is_all_answered){
						Game.permanent.total_crack_password_blocked++
						end_attack(2)
					}
				}
				else {
					tries_left = tries_left - 1
					// Remove one of the first children
					$("#tries_left").children().eq(0).remove()
					$("#b"+pc_fc_current).outerHeight() //trggier reflow
					$("#b"+pc_fc_current).addClass("pc-fc-box-f")
				}

				if(tries_left <= 0) {
					end_attack(1)
				}
			}
			else if(task === "fake_certificate") {
				$("#b"+pc_fc_current).removeClass("pc-fc-box-f")
				let temp = $("#gaia_input_input").val()
				if(temp === pc_fc_problem_answers[pc_fc_current]) {
					$("#b"+pc_fc_current).css("background-color", "var(--def_solv)")
					pc_fc_problem_is_answered[pc_fc_current] = true
					pc_fc_current++
					$("#b"+pc_fc_current).css("background-color", "var(--def_curr)")
					let is_all_answered = true
					for(let i = 0; i < pc_fc_problem_is_answered.length; i++) {
						if(pc_fc_problem_is_answered[i] == false)
							is_all_answered = false
					}
					if(is_all_answered){
						Game.permanent.total_face_certificate_blocked++
						end_attack(2)
					}
				}
				else {
					tries_left = tries_left - 1
					// Remove one of the first children
					$("#tries_left").children().eq(0).remove()
					$("#b"+pc_fc_current).outerHeight() //trggier reflow
					$("#b"+pc_fc_current).addClass("pc-fc-box-f")
				}

				if(tries_left <= 0) {
					end_attack(1)
				}
			}
			else
				log("<br>> Unknown input!", "sys")
		}
		else if(Game.impermanent.commands_manual) {
			com = temp.substring(1)
			if(commands.hasOwnProperty(com))
				commands[com]()
			else 
				log("<br>> Unknown Command!", "sys")
		}
		else log("<br>> Unknown input!", "sys")
		$("#gaia_input_input").val("")
	}	
}

function toggle_task() {
	if(task_isPauseed) {
		task_isPauseed = false
		$("#task_toggle").text("Pause")
		$("#tasks_section").css("box-shadow", "inset 0px 0px 10px var(--selectClr")
	}
	else {
		task_isPauseed = true
		$("#task_toggle").text("Resume")
		$("#tasks_section").css("box-shadow", "")
	}
}

function onhover_tasks_info_element(id) {
	let t_title = "",
	t_info = "",
	t_des = "",
	q_status = "",
	q_need = "";
	$("#t_info_").empty()
	switch(id) {
	case "tier_1": 
		t_title = "Tier 1"
		t_info = "Contains: "+simplifyNumber(Game.impermanent.tasks_rewards.tier_1.reward)
		create_svg(0, "credit", "t_info_")
		t_des = "A Reward from HQ for collecting 10 Contribution points"
		break;
	case "tier_2": 
		t_title = "Tier 2"
		t_info = "Contains: "+simplifyNumber(Game.impermanent.tasks_rewards.tier_2.reward)
		create_svg(0, "credit", "t_info_")
		t_des = "A Reward from HQ for collecting 25 Contribution points"
		break;
	case "tier_3": 
		t_title = "Tier 3"
		t_info = "Contains: "+get_data_with_symbol(Game.impermanent.tasks_rewards.tier_3.reward, 3)
		create_svg(0, "data", "t_info_")
		t_des = "A Reward from HQ for collecting 40 Contribution points"
		break;
	case "tier_4": 
		t_title = "Tier 4"
		t_info = "Contains: "+simplifyNumber(Game.impermanent.tasks_rewards.tier_4.reward)
		create_svg(0, "credit", "t_info_")
		t_des = "A Reward from HQ for collecting 55 Contribution points"
		break;
	case "tier_5": 
		t_title = "Tier 5"
		t_info = "Contains: "+get_data_with_symbol(Game.impermanent.tasks_rewards.tier_5.reward, 3)
		create_svg(0, "data", "t_info_")
		t_des = "A Reward from HQ for collecting 100 Contribution points"
		break;
	case "task_toggle": 
		t_title = "Pasue/Resume"
		t_info = "Pause/Resume button, to receive inputs towards tasks or not"
		t_des = "When paused, inputs will not be counted towards tasks progression"
		break;
	case "task_reset": 
		t_title = "Tiers reset"
		t_info = "Reset contribution points progression to 0"
		t_des = "When resetting, all Tiers rewards will be recalculated to the current scale"
		break;
	case "all_tasks_bar_bar": 
		t_title = "Contribution progression"
		t_info = "Shows current Contribution points progression for the next HQ Contribution reward"
		t_des = "Get Rewards from HQ when collecting 10, 25, 40, 55, and 100 Contribution points"
		break;
	case "task1": 
		t_title = "Pressing"
		t_info = "Repeatedly press requested keyboard key x amount of times"
		t_des = "A Task given by HQ"
		break;
	case "task2": 
		t_title = "Addition"
		t_info = "Solve given Addition problems and find the value of (?) where its presented"
		t_des = "A Task given by HQ"
		break;
	case "task3": 
		t_title = "Sequence"
		t_info = "Correctly enter given arrow sequence using keyboard arrows keys"
		t_des = "A Task given by HQ"
		break;
	case "Easy": 
		t_title = "Easy mode"
		if(task == "task1")
			t_info = "Easy Pressing Tasks:<br>35 Loop points<br>Lose 3 loop points on incorrect input<br>Min 11, max 18, amount for eacy requested key"
		else if(task == "task2")
			t_info = "Easy Addition Tasks:<br>60 Loop points<br>Lose as (Answer) loop points on incorrect  input<br>Solve for 1 digit numbers"
		else
			t_info = "Easy Sequence Tasks:<br>10 Loop points<br>Lose 1 loop points on incorrect input<br>Sequence of 4 arrows"
		t_des = "Tasks on Easy mode give:<br>Rewards: x1 on completing current requested task<br>Contribution points: x1 on completing one loop"
		break;
	case "Normal": 
		t_title = "Normal mode"
		if(task == "task1")
			t_info = "Normal Pressing Tasks:<br>35 Loop points<br>Lose 15 loop points on incorrect input<br>Min 7, max 11, amount for eacy requested key"
		else if(task == "task2")
			t_info = "Normal Addition Tasks:<br>40 Loop points<br>Lose as (Answer) loop points on incorrect input<br>Solve for 2 digits numbers"
		else
			t_info = "Normal Sequence Tasks:<br>7 Loop points<br>Lose 1 loop points on incorrect input<br>Sequence of 7 arrows"
		t_des = "Tasks on Normal mode give:<br>Rewards: x2 on completing current requested task<br>Contribution points: x2 on completing one loop"
		break;
	case "Hard": 
		t_title = "Hard mode"
		if(task == "task1")
			t_info = "Hard Pressing Tasks:<br>35 Loop points<br>Lose 35 loop points on incorrect input<br>Min 3, max 6, amount for eacy requested key<br>Same key will not be requested in a row"
		else if(task == "task2")
			t_info = "Hard Addition Tasks:<br>30 Loop points<br>Lose as (Answer) loop points on incorrect input<br>Solve for 3 digits numbers"
		else
			t_info = "Hard Sequence Tasks:<br>5 Loop points<br>Lose 1 loop points on incorrect input<br>Sequence of 10 arrows"
		t_des = "Tasks on Hard mode give:<br>Rewards: x3 on completing current requested task<br>Contribution points: x3 on completing one loop"
		break;
	}

	$("#t_title").html(t_title)
	$("#t_info").html(t_info)
	$("#t_des").html(t_des)
}