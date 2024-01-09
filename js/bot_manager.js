let mpm = 0, max_energy = 0, curr_energy = 0, eff_2 = 2.5, eff_3 = 6.25, warehouse, bot_sel = "", mtrls_timer = 60, 
auto_clicker_on = false,
bm_stat = {
	auto_clicker_energy: 0,
	network_listener_energy: 0,
	auto_pressing_energy: 0,
	auto_addition_energy: 0,
	auto_sequencer_energy: 0,
	scrapping_energy: 0,
	recycling_energy: 0,
	mining_energy: 0,
	casting_energy: 0,
	exploring_energy: 0,

	auto_clicker_effect: 0,
	network_listener_effect: 0,
	auto_pressing_effect: 0,
	auto_addition_effect: 0,
	auto_sequencer_effect: 0,
	scrapping_effect: 0,
	recycling_effect: 0,
	mining_effect: 0,
	casting_effect: 0,
	exploring_effect: 0,

	auto_clicker_inc: 0,
	network_listener_inc: 0,
	auto_pressing_credit_inc: 0,
	auto_pressing_data_inc: 0,
	auto_addition_credit_inc: 0,
	auto_addition_data_inc: 0,
	auto_sequencer_credit_inc: 0,
	auto_sequencer_data_inc: 0
};

function check_energy() {
	if(curr_energy <= max_energy) {
		$(".bot_interdiction_icon").css("display", "none")
	}
	else {
		bm_stat.auto_clicker_effect = 0
		bm_stat.network_listener_effect = 0
		bm_stat.auto_pressing_effect = 0
		bm_stat.auto_addition_effect = 0
		bm_stat.auto_sequencer_effect = 0

		bm_stat.scrapping_effect = 0
		bm_stat.recycling_effect = 0
		bm_stat.mining_effect = 0
		bm_stat.casting_effect = 0
		bm_stat.exploring_effect = 0

		$("#scrapping_eff_txt").text(simplifyNumber(bm_stat.scrapping_effect))
		$("#recycling_eff_txt").text(simplifyNumber(bm_stat.recycling_effect))
		$("#mining_eff_txt").text(simplifyNumber(bm_stat.mining_effect))
		$("#casting_eff_txt").text(simplifyNumber(bm_stat.casting_effect))
		$("#exploring_eff_txt").text(simplifyNumber(bm_stat.exploring_effect))
		$("#auto_clicker_eff_n_txt").text("+"+get_procedure_effect("auto_clicker"))
		$("#network_listener_eff_n_txt").text("+"+get_procedure_effect("network_listener"))
		$("#auto_pressing_eff_n_txt").text("+"+get_procedure_effect("auto_pressing"))
		$("#auto_addition_eff_n_txt").text("+"+get_procedure_effect("auto_addition"))
		$("#auto_sequencer_eff_n_txt").text("+"+get_procedure_effect("auto_sequencer"))
	}
}

function hover_bot_item(id) {
	$("#bot_name").text(bot_data[id].name);
	$("#bot_price").text(simplifyNumber(get_bot_price(id)));
	if(Game.permanent.materials >= get_bot_price(id)) 
		$("#bot_price").css("color", "var(--positiveClr)");
	else 
		$("#bot_price").css("color", "var(--negativeClr)");
	$("#bot_des").text(bot_data[id].des);
	$("#bot_energy").text(bot_data[id].energy);
	$("#bot_heart").text(bot_data[id].heart);
	$("#bot_fire_power").text(bot_data[id].fire_power);
	$("#bot_cargo").text(bot_data[id].cargo);
}

function click_bot_item(id) {
	if(Game.permanent.materials >= get_bot_price(id)) {
		Game.permanent.materials -= get_bot_price(id)
		if(Game.permanent.bots[id] == 0)
			create_warehouse_card(id)
		Game.permanent.bots[id]++
		warehouse[id]++
		update_warehouse_card(id)
		$("#mNum").text(simplifyNumber(Game.permanent.materials))
		$("#bot_price").text(simplifyNumber(get_bot_price(id)))
		check_bot_item_price()
		if(Game.permanent.materials >= get_bot_price(id))
			$("#bot_price").css("color", "var(--positiveClr)")
		else 
		$("#bot_price").css("color", "var(--negativeClr)")	
		log("<br>> Assembled x1 "+bot_data[id].name, "sys")
	}
	else
		log("<br>> "+con_span("Insufficient materials", "var(--negativeClr)"), "sys")
}

function check_bot_item_price() {
	for(key in bot_data) {
		if(Game.permanent.materials >= get_bot_price(key))
			$("#"+key).css("filter", "brightness(1)")
		else {
			$("#"+key).css("filter", "brightness(0.6)")
		}
	}
}

function get_bot_price(id) {
	result = Math.floor(bot_data[id].price*Math.pow(1.01, Game.permanent.bots[id]))
	switch(id) {
	case "support_1": 
		if(result > 200000) //on amount 99+
			result = 200000
		break
	case "support_2": 
		if(result > 60000) //on amount 70+
			result = 60000
		break
	case "support_3": 
		if(result > 80000) //on amount 209+
			result = 80000
		break
	case "scrapping_1": 
		if(result > 200000) //on amount 562+
			result = 200000
		break
	case "scrapping_2":
		if(result > 225000) //on amout 383+
			result = 225000
		break
	case "scrapping_3":
		if(result > 250000) //on amout 214+
			result = 250000
		break
	case "recycling_1":
		if(result > 225000) //on amout 545+
			result = 225000
		break
	case "recycling_2":
		if(result > 250000) //on amout 375+
			result = 250000
		break
	case "recycling_3":
		if(result > 275000) //on amout 182+
			result = 275000
		break
	case "mining_1":
		if(result > 250000) //on amout 533+
			result = 250000
		break
	case "mining_2":
		if(result > 275000) //on amout 369+
			result = 275000
		break
	case "mining_3":
		if(result > 300000) //on amout 162+
			result = 300000
		break
	case "casting_1":
		if(result > 275000) //on amout 524+
			result = 275000
		break
	case "casting_2":
		if(result > 300000) //on amout 365+
			result = 300000
		break
	case "casting_3":
		if(result > 325000) //on amout 148+
			result = 325000
		break
	case "exploring_1":
		if(result > 300000) //on amout 517+
			result = 300000
		break
	case "exploring_2":
		if(result > 325000) //on amout 361+
			result = 325000
		break
	case "exploring_3":
		if(result > 350000) //on amout 143+
			result = 350000
		break
	case "scout_1":
		if(result > 1500) //on amout 273+
			result = 1500
		break
	case "scout_2":
		if(result > 3000) //on amout 216+
			result = 3000
		break
	case "scout_3":
		if(result > 6000) //on amout 209+
			result = 6000
		break
	case "cargo_1":
		if(result > 2000) //on amout 232+
			result = 2000
		break
	case "cargo_2":
		if(result > 5000) //on amout 232+
			result = 5000
		break
	case "cargo_3":
		if(result > 10000) //on amout 232+
			result = 10000
		break
	case "battle_1":
		if(result > 5000) //on amout 353+
			result = 5000
		break
	case "battle_2":
		if(result > 7500) //on amout 232+
			result = 7500
		break
	case "battle_3":
		if(result > 10000) //on amout 140+
			result = 10000
		break
	case "missile_1":
		if(result > 6000) //on amout 350+
			result = 6000
		break
	case "missile_2":
		if(result > 8500) //on amout 232+
			result = 8500
		break
	case "missile_3":
		if(result > 11000) //on amout 144+
			result = 11000
		break
	case "mega_1":
		if(result > 25000) //on amout 162+
			result = 25000
		break
	case "mega_2":
		if(result > 35000) //on amout 86+
			result = 35000
		break
	case "mega_3":
		if(result > 65000) //on amout 63+
			result = 65000
		break
	case "sentry_1":
		if(result > 6500) //on amout 349+
			result = 6500
		break
	case "sentry_2":
		if(result > 9000) //on amout 232+
			result = 9000
		break
	case "sentry_3":
		if(result > 12000) //on amout 140+
			result = 12000
		break
	case "laserbeam_1":
		if(result > 7500) //on amout 140+
			result = 7500
	case "laserbeam_2":
		if(result > 10500) //on amout 247+
			result = 10500
		break
	case "laserbeam_3":
		if(result > 13500) //on amout 136+
			result = 13500
		break
	case "wallking_1":
		if(result > 25000) //on amout 162+
			result = 25000
		break
	case "wallking_2":
		if(result > 30000) //on amout 111+
			result = 30000
		break
	case "wallking_3":
		if(result > 40000) //on amout 70+
			result = 40000
		break
	}

	return result
}

//set bot manager menu when start game
function set_bot_manager(id) {
	warehouse = deepCopy(Game.permanent.bots)
	warehouse.support_1 = warehouse.support_1-(Game.permanent.auto_clicker_assigned.support_1+ 
		Game.permanent.network_listener_assigned.support_1+Game.permanent.auto_pressing_assigned.support_1+
		Game.permanent.auto_addition_assigned.support_1+Game.permanent.auto_sequencer_assigned.support_1)
	warehouse.support_2 = warehouse.support_2-(Game.permanent.auto_clicker_assigned.support_2+ 
		Game.permanent.network_listener_assigned.support_2+Game.permanent.auto_pressing_assigned.support_2+
		Game.permanent.auto_addition_assigned.support_2+Game.permanent.auto_sequencer_assigned.support_2)
	warehouse.support_3 = warehouse.support_3-(Game.permanent.auto_clicker_assigned.support_3+ 
		Game.permanent.network_listener_assigned.support_3+Game.permanent.auto_pressing_assigned.support_3+
		Game.permanent.auto_addition_assigned.support_3+Game.permanent.auto_sequencer_assigned.support_3)

	warehouse.scrapping_1 -= Game.permanent.scrapping_assigned.scrapping_1
	warehouse.scrapping_2 -= Game.permanent.scrapping_assigned.scrapping_2
	warehouse.scrapping_3 -= Game.permanent.scrapping_assigned.scrapping_3

	warehouse.recycling_1 -= Game.permanent.recycling_assigned.recycling_1
	warehouse.recycling_2 -= Game.permanent.recycling_assigned.recycling_2
	warehouse.recycling_3 -= Game.permanent.recycling_assigned.recycling_3

	warehouse.mining_1 -= Game.permanent.mining_assigned.mining_1
	warehouse.mining_2 -= Game.permanent.mining_assigned.mining_2
	warehouse.mining_3 -= Game.permanent.mining_assigned.mining_3

	warehouse.casting_1 -= Game.permanent.casting_assigned.casting_1
	warehouse.casting_2 -= Game.permanent.casting_assigned.casting_2
	warehouse.casting_3 -= Game.permanent.casting_assigned.casting_3

	warehouse.exploring_1 -= Game.permanent.exploring_assigned.exploring_1
	warehouse.exploring_2 -= Game.permanent.exploring_assigned.exploring_2
	warehouse.exploring_3 -= Game.permanent.exploring_assigned.exploring_3
	
	max_energy = (5+Game.impermanent.hardware_count["h8"]+Game.impermanent.hardware_count["h9"]*3)*Game.impermanent.g_eff.gaia_energy

	cal_bot()
	set_bot_texts()

	for(key in Game.permanent.bots) {
		if(Game.permanent.bots[key] > 0) {
			create_warehouse_card(key)
			update_warehouse_card(key)
		}
	}
}

function create_warehouse_card(id) {
	$("#warehouse_group_"+bot_data[id].group).append('<div class="bot_warehouse_card"><svg class="lv'+bot_data[id].lvl+'_icon bot_warehouse_card_icon"><use xlink:href="#'+bot_data[id].img+'"></use></svg><div class="bot_warehouse_card_info"><p id="wh_'+id+'_t"></p><p id="wh_'+id+'_a"></p><p id="wh_'+id+'_i"></p></div></div>')
}

function update_warehouse_card(id) {
	$("#wh_"+id+"_t").text("Total: "+Game.permanent.bots[id])
	$("#wh_"+id+"_a").text("Assigned: "+(Game.permanent.bots[id]-warehouse[id]))
	$("#wh_"+id+"_i").text("Idle: "+warehouse[id])
}

//set all initial text in bot manager when game start
function set_bot_texts() {
	//=================production=================
	for(key in Game.permanent.scrapping_assigned) {
		$("#"+key+"_a").text(Game.permanent.scrapping_assigned[key])
	}
	for(key in Game.permanent.recycling_assigned) {
		$("#"+key+"_a").text(Game.permanent.recycling_assigned[key])
	}
	for(key in Game.permanent.mining_assigned) {
		$("#"+key+"_a").text(Game.permanent.mining_assigned[key])
	}
	for(key in Game.permanent.casting_assigned) {
		$("#"+key+"_a").text(Game.permanent.casting_assigned[key])
	}
	for(key in Game.permanent.exploring_assigned) {
		$("#"+key+"_a").text(Game.permanent.exploring_assigned[key])
	}
	$("#scrapping_energy_txt").text(bm_stat.scrapping_energy+"/"+Game.permanent.scrapping_max_energy)
	$("#recycling_energy_txt").text(bm_stat.recycling_energy+"/"+Game.permanent.recycling_max_energy)
	$("#mining_energy_txt").text(bm_stat.mining_energy+"/"+Game.permanent.mining_max_energy)
	$("#casting_energy_txt").text(bm_stat.casting_energy+"/"+Game.permanent.casting_max_energy)
	$("#exploring_energy_txt").text(bm_stat.exploring_energy+"/"+Game.permanent.exploring_max_energy)
	$("#scrapping_eff_txt").text(simplifyNumber(bm_stat.scrapping_effect))
	$("#recycling_eff_txt").text(simplifyNumber(bm_stat.recycling_effect))
	$("#mining_eff_txt").text(simplifyNumber(bm_stat.mining_effect))
	$("#casting_eff_txt").text(simplifyNumber(bm_stat.casting_effect))
	$("#exploring_eff_txt").text(simplifyNumber(bm_stat.exploring_effect))
	//===================================================

	//=================procedure=================
	$("#auto_clicker_1_a").text(Game.permanent.auto_clicker_assigned.support_1)
	$("#auto_clicker_2_a").text(Game.permanent.auto_clicker_assigned.support_2)
	$("#auto_clicker_3_a").text(Game.permanent.auto_clicker_assigned.support_3)
	$("#network_listener_1_a").text(Game.permanent.network_listener_assigned.support_1)
	$("#network_listener_2_a").text(Game.permanent.network_listener_assigned.support_2)
	$("#network_listener_3_a").text(Game.permanent.network_listener_assigned.support_3)
	$("#auto_pressing_1_a").text(Game.permanent.auto_pressing_assigned.support_1)
	$("#auto_pressing_2_a").text(Game.permanent.auto_pressing_assigned.support_2)
	$("#auto_pressing_3_a").text(Game.permanent.auto_pressing_assigned.support_3)
	$("#auto_addition_1_a").text(Game.permanent.auto_addition_assigned.support_1)
	$("#auto_addition_2_a").text(Game.permanent.auto_addition_assigned.support_2)
	$("#auto_addition_3_a").text(Game.permanent.auto_addition_assigned.support_3)
	$("#auto_sequencer_1_a").text(Game.permanent.auto_sequencer_assigned.support_1)
	$("#auto_sequencer_2_a").text(Game.permanent.auto_sequencer_assigned.support_2)
	$("#auto_sequencer_3_a").text(Game.permanent.auto_sequencer_assigned.support_3)
	$("#auto_clicker_energy_txt").text(bm_stat.auto_clicker_energy+"/"+Game.permanent.auto_clicker_max_energy)
	$("#network_listener_energy_txt").text(bm_stat.network_listener_energy+"/"+Game.permanent.network_listener_max_energy)
	$("#auto_pressing_energy_txt").text(bm_stat.auto_pressing_energy+"/"+Game.permanent.auto_pressing_max_energy)
	$("#auto_addition_energy_txt").text(bm_stat.auto_addition_energy+"/"+Game.permanent.auto_addition_max_energy)
	$("#auto_sequencer_energy_txt").text(bm_stat.auto_sequencer_energy+"/"+Game.permanent.auto_sequencer_max_energy)
	$("#auto_clicker_eff_txt").text(simplifyNumber(bm_stat.auto_clicker_effect))
	$("#network_listener_eff_txt").text(simplifyNumber(bm_stat.network_listener_effect))
	$("#auto_pressing_eff_txt").text(simplifyNumber(bm_stat.auto_pressing_effect))
	$("#auto_addition_eff_txt").text(simplifyNumber(bm_stat.auto_addition_effect))
	$("#auto_sequencer_eff_txt").text(simplifyNumber(bm_stat.auto_sequencer_effect))
	$("#auto_clicker_eff_n_txt").text("+"+get_procedure_effect("auto_clicker"))
	$("#network_listener_eff_n_txt").text("+"+get_procedure_effect("network_listener"))
	$("#auto_pressing_eff_n_txt").text("+"+get_procedure_effect("auto_pressing"))
	$("#auto_addition_eff_n_txt").text("+"+get_procedure_effect("auto_addition"))
	$("#auto_sequencer_eff_n_txt").text("+"+get_procedure_effect("auto_sequencer"))
	//===================================================
}

function cal_bot() {
	bm_stat.auto_clicker_inc = 0
	bm_stat.network_listener_inc = 0
	bm_stat.auto_pressing_credit_inc = 0
	bm_stat.auto_pressing_data_inc = 0
	bm_stat.auto_addition_credit_inc = 0
	bm_stat.auto_addition_data_inc = 0
	bm_stat.auto_sequencer_credit_inc = 0
	bm_stat.auto_sequencer_data_inc = 0

	bm_stat.auto_clicker_energy = Game.permanent.auto_clicker_assigned.support_1*bot_data.support_1.energy + 
		Game.permanent.auto_clicker_assigned.support_2*bot_data.support_2.energy +
		Game.permanent.auto_clicker_assigned.support_3*bot_data.support_3.energy

	bm_stat.network_listener_energy = Game.permanent.network_listener_assigned.support_1*bot_data.support_1.energy + 
		Game.permanent.network_listener_assigned.support_2*bot_data.support_2.energy +
		Game.permanent.network_listener_assigned.support_3*bot_data.support_3.energy

	bm_stat.auto_pressing_energy = Game.permanent.auto_pressing_assigned.support_1*bot_data.support_1.energy + 
		Game.permanent.auto_pressing_assigned.support_2*bot_data.support_2.energy +
		Game.permanent.auto_pressing_assigned.support_3*bot_data.support_3.energy

	bm_stat.auto_addition_energy = Game.permanent.auto_addition_assigned.support_1*bot_data.support_1.energy + 
		Game.permanent.auto_addition_assigned.support_2*bot_data.support_2.energy +
		Game.permanent.auto_addition_assigned.support_3*bot_data.support_3.energy

	bm_stat.scrapping_energy = Game.permanent.scrapping_assigned.scrapping_1*bot_data.scrapping_1.energy + 
		Game.permanent.scrapping_assigned.scrapping_2*bot_data.scrapping_2.energy +
		Game.permanent.scrapping_assigned.scrapping_3*bot_data.scrapping_3.energy

	bm_stat.recycling_energy = Game.permanent.recycling_assigned.recycling_1*bot_data.recycling_1.energy + 
		Game.permanent.recycling_assigned.recycling_2*bot_data.recycling_2.energy +
		Game.permanent.recycling_assigned.recycling_3*bot_data.recycling_3.energy

	bm_stat.mining_energy = Game.permanent.mining_assigned.mining_1*bot_data.mining_1.energy + 
		Game.permanent.mining_assigned.mining_2*bot_data.mining_2.energy +
		Game.permanent.mining_assigned.mining_3*bot_data.mining_3.energy

	bm_stat.casting_energy = Game.permanent.casting_assigned.casting_1*bot_data.casting_1.energy + 
		Game.permanent.casting_assigned.casting_2*bot_data.casting_2.energy +
		Game.permanent.casting_assigned.casting_3*bot_data.casting_3.energy

	bm_stat.exploring_energy = Game.permanent.exploring_assigned.exploring_1*bot_data.exploring_1.energy + 
		Game.permanent.exploring_assigned.exploring_2*bot_data.exploring_2.energy +
		Game.permanent.exploring_assigned.exploring_3*bot_data.exploring_3.energy

	bm_stat.scrapping_effect = Game.permanent.scrapping_base_effect*Game.permanent.scrapping_assigned.scrapping_1 + 
		Game.permanent.scrapping_assigned.scrapping_2*eff_2 +
		Game.permanent.scrapping_assigned.scrapping_3*eff_3

	bm_stat.recycling_effect = Game.permanent.recycling_base_effect*Game.permanent.recycling_assigned.recycling_1 + 
		Game.permanent.recycling_assigned.recycling_2*eff_2 +
		Game.permanent.recycling_assigned.recycling_3*eff_3

	bm_stat.mining_effect = Game.permanent.mining_base_effect*Game.permanent.mining_assigned.mining_1 + 
		Game.permanent.mining_assigned.mining_2*eff_2 +
		Game.permanent.mining_assigned.mining_3*eff_3

	bm_stat.casting_effect = Game.permanent.casting_base_effect*Game.permanent.casting_assigned.casting_1 + 
		Game.permanent.casting_assigned.casting_2*eff_2 +
		Game.permanent.casting_assigned.casting_3*eff_3
		
	bm_stat.exploring_effect = Game.permanent.exploring_base_effect*Game.permanent.exploring_assigned.exploring_1 + 
		Game.permanent.exploring_assigned.exploring_2*eff_2 +
		Game.permanent.exploring_assigned.exploring_3*eff_3

	bm_stat.auto_clicker_effect = Game.permanent.auto_clicker_base_effect*(Game.permanent.auto_clicker_assigned.support_1 + 
		Game.permanent.auto_clicker_assigned.support_2*eff_2 +
		Game.permanent.auto_clicker_assigned.support_3*eff_3)

	bm_stat.network_listener_effect = Game.permanent.network_listener_base_effect*(Game.permanent.network_listener_assigned.support_1 + 
		Game.permanent.network_listener_assigned.support_2*eff_2 +
		Game.permanent.network_listener_assigned.support_3*eff_3)

	bm_stat.auto_pressing_effect = Game.permanent.auto_pressing_base_effect*(Game.permanent.auto_pressing_assigned.support_1 + 
		Game.permanent.auto_pressing_assigned.support_2*eff_2 +
		Game.permanent.auto_pressing_assigned.support_3*eff_3)

	bm_stat.auto_addition_effect = Game.permanent.auto_addition_base_effect*(Game.permanent.auto_addition_assigned.support_1 + 
		Game.permanent.auto_addition_assigned.support_2*eff_2 +
		Game.permanent.auto_addition_assigned.support_3*eff_3)

	bm_stat.auto_sequencer_effect = Game.permanent.auto_sequencer_base_effect*(Game.permanent.auto_sequencer_assigned.support_1 + 
		Game.permanent.auto_sequencer_assigned.support_2*eff_2 +
		Game.permanent.auto_sequencer_assigned.support_3*eff_3)

	curr_energy = bm_stat.auto_clicker_energy+bm_stat.network_listener_energy+bm_stat.auto_pressing_energy+
		bm_stat.auto_addition_energy+bm_stat.scrapping_energy+bm_stat.recycling_energy+bm_stat.mining_energy+
		bm_stat.casting_energy+bm_stat.exploring_energy
	//this will return number with two dicimal digits
	curr_energy = preciseNumber(curr_energy, 0, "+", 2)

	if(curr_energy <= max_energy) {
		$(".bot_interdiction_icon").css("display", "none")
		bm_stat.auto_clicker_inc = click_total*preciseNumber(bm_stat.auto_clicker_effect, 100, "/", 3)
		bm_stat.network_listener_inc = dps*preciseNumber(bm_stat.network_listener_effect, 100, "/", 3)
		bm_stat.auto_pressing_credit_inc = ((14.5*Game.impermanent.pressing_task_multi+((Game.impermanent.pressing_task_infinite_keys*Game.impermanent.hardware_count.h1/100)*cps))*Game.impermanent.ol.Pressing.multi)*preciseNumber(bm_stat.auto_pressing_effect, 100, "/", 3)
		bm_stat.auto_pressing_data_inc = ((14.5+((Game.impermanent.pressing_task_infinite_keys*Game.impermanent.hardware_count.h1/100)*dps))*Game.impermanent.ol.Pressing.multi)*preciseNumber(bm_stat.auto_pressing_effect, 100, "/", 3)
		bm_stat.auto_addition_credit_inc = ((5*Game.impermanent.add_task_multi+((Game.impermanent.add_task_overflow*Game.impermanent.hardware_count.h1/100)*cps))*Game.impermanent.ol.Add.multi)*preciseNumber(bm_stat.auto_addition_effect, 100, "/", 3)
		bm_stat.auto_addition_data_inc = ((5+((Game.impermanent.add_task_overflow*Game.impermanent.hardware_count.h1/100)*dps))*Game.impermanent.ol.Add.multi)*preciseNumber(bm_stat.auto_addition_effect, 100, "/", 3)
		bm_stat.auto_sequencer_credit_inc = ((4*Game.impermanent.sequence_task_multi+((Game.impermanent.sequence_task_chaining*Game.impermanent.hardware_count.h1/100)*cps))*Game.impermanent.ol.Sequence.multi)*preciseNumber(bm_stat.auto_sequencer_effect, 100, "/", 3)
		bm_stat.auto_sequencer_data_inc = ((4+((Game.impermanent.sequence_task_chaining*Game.impermanent.hardware_count.h1/100)*dps))*Game.impermanent.ol.Sequence.multi)*preciseNumber(bm_stat.auto_sequencer_effect, 100, "/", 3)
		auto_clicker_on = bm_stat.auto_clicker_effect > 0 ? true: false
	}
	else {
		$(".bot_interdiction_icon").css("display", "block")
		auto_clicker_on = false
	}

	mpm = (preciseNumber(bm_stat.scrapping_effect, 5, "/", 2)+preciseNumber(bm_stat.recycling_effect, 4, "/", 2)+
	preciseNumber(bm_stat.mining_effect, 3, "/", 2)+preciseNumber(bm_stat.casting_effect, 2, "/", 2)+bm_stat.exploring_effect)*Game.impermanent.g_eff.gaia_materials

	$("#auto_clicker_eff_n_txt").text("+"+get_procedure_effect("auto_clicker"))
	$("#network_listener_eff_n_txt").text("+"+get_procedure_effect("network_listener"))
	$("#auto_pressing_eff_n_txt").text("+"+get_procedure_effect("auto_pressing"))
	$("#auto_addition_eff_n_txt").text("+"+get_procedure_effect("auto_addition"))
	$("#auto_sequencer_eff_n_txt").text("+"+get_procedure_effect("auto_sequencer"))
}

function get_procedure_effect(type) {
	res = ""
	switch(type) {
	case "auto_clicker":
		res = simplifyNumber(bm_stat.auto_clicker_inc)
		break
	case "network_listener":
		res = get_data_with_symbol(bm_stat.network_listener_inc, 3)
		break
	case "auto_pressing":
		res = simplifyNumber(bm_stat.auto_pressing_credit_inc)+" / "+get_data_with_symbol(bm_stat.auto_pressing_data_inc, 3)
		break
	case "auto_addition":
		res = simplifyNumber(bm_stat.auto_addition_credit_inc)+" / "+get_data_with_symbol(bm_stat.auto_addition_data_inc, 3)
		break
	case "auto_sequencer":
		res = simplifyNumber(bm_stat.auto_sequencer_credit_inc)+" / "+get_data_with_symbol(bm_stat.auto_sequencer_data_inc, 3)
		break
	}
	return res
}

function assign_bot(id) {
	type = id.substr(id.indexOf("_")+1, id.length);
	lvl = bot_assign_new.substr(bot_assign_new.length-1, bot_assign_new.length)
	assign = bot_assign_new
	bot_name = bot_mene_new == "production" ? type+"_"+lvl:"support_"+lvl

	if(warehouse[bot_name] > 0) {
		if(curr_energy+bot_data[bot_name].energy <= max_energy) {
			if(bm_stat[type+"_energy"]+bot_data[bot_name].energy < Game.permanent[type+"_max_energy"]) {
				warehouse[bot_name]--
				Game.permanent[type+"_assigned"][bot_name]++
				log("<br>> Assigned 1 bot", "sys")
				CalResources()
				update_warehouse_card(bot_name)
				$("#"+type+"_"+lvl+"_a").text(Game.permanent[type+"_assigned"][bot_name])
				$("#"+type+"_energy_txt").text(bm_stat[type+"_energy"]+"/"+Game.permanent[type+"_max_energy"])
				$("#"+type+"_eff_txt").text(simplifyNumber(bm_stat[type+"_effect"]))
				$("#max_e").text("Max: "+simplifyNumber(max_energy))
				$("#con_e").text("Con: "+simplifyNumber(curr_energy))
				if(bot_mene_new == "procedure") {
					$("#"+type+"_eff_n_txt").text("+"+get_procedure_effect(type))
					if(type == "auto_clicker")
					auto_clicker_on = true
				}
			}
			else
				log("<br>> "+con_span("Can not assain bot, Overloading", "var(--negativeClr)"), "sys")
		}
		else
			log("<br>> "+con_span("Insufficient System energy", "var(--negativeClr)"), "sys")
	}
	else
		log("<br>> "+con_span("Insufficient bot type", "var(--negativeClr)"), "sys")
}

function withdraw_bot(id) {
	type = id.substr(id.indexOf("_")+1, id.length);
	lvl = bot_assign_new.substr(bot_assign_new.length-1, bot_assign_new.length)
	assign = bot_assign_new
	bot_name = bot_mene_new == "production" ? type+"_"+lvl:"support_"+lvl

	if(Game.permanent[type+"_assigned"][bot_name] > 0) {
		warehouse[bot_name]++
		Game.permanent[type+"_assigned"][bot_name]--
		log("<br>> withdrawn 1 bot", "sys")
		check_energy()
		CalResources()
		update_warehouse_card(bot_name)
		$("#"+type+"_"+lvl+"_a").text(Game.permanent[type+"_assigned"][bot_name])
		$("#"+type+"_energy_txt").text(bm_stat[type+"_energy"]+"/"+Game.permanent[type+"_max_energy"])
		$("#"+type+"_eff_txt").text(simplifyNumber(bm_stat[type+"_effect"]))
		$("#max_e").text("Max: "+simplifyNumber(max_energy))
		$("#con_e").text("Con: "+simplifyNumber(curr_energy))
		if(bot_mene_new == "procedure")
			$("#"+type+"_eff_n_txt").text(get_procedure_effect(type))
		if(bm_stat.auto_clicker_effect == 0)
			auto_clicker_on = false
		}
	else
		log("<br>> "+con_span("No bots to withdraw", "var(--negativeClr)"), "sys")
}

bot_data = {
	support_1: {
		name: "Regular Support Hand",
		des: "Regular Support Hand used in Procedure activities",
		price: 20000,
		group: 0,
		lvl: 1,
		img: "support_bot",
		energy: 1,
		heart: 0,
		fire_power: 0,
		cargo: 0
	},
	support_2: {
		name: "Fine Support Hand",
		des: "Fine Support Hand used in Procedure activities with x2.5 efficiency",
		price: 40000,
		group: 0,
		lvl: 2,
		img: "support_bot",
		energy: 2,
		heart: 0,
		fire_power: 0,
		cargo: 0
	},
	support_3: {
		name: "Advanced Support Hand",
		des: "Advanced Support Hand used in Procedure activities with x6.25 efficiency",
		price: 60000,
		group: 0,
		lvl: 3,
		img: "support_bot",
		energy: 4,
		heart: 0,
		fire_power: 0,
		cargo: 0
	},
	scrapping_1: {
		name: "Regular Scrap Grapple",
		des: "Regular Scrap Grapple used in Scrapping activities",
		price: 750,
		group: 0,
		lvl: 1,
		img: "scrapping_bot",
		energy: 1,
		heart: 0,
		fire_power: 0,
		cargo: 0
	},
	scrapping_2: {
		name: "Fine Scrap Grapple",
		des: "Fine Scrap Grapple used in Scrapping activities with x2.5 efficiency",
		price: 5000,
		group: 0,
		lvl: 2,
		img: "scrapping_bot",
		energy: 2,
		heart: 0,
		fire_power: 0,
		cargo: 0
	},
	scrapping_3: {
		name: "Advanced Scrap Grapple",
		des: "Advanced Scrap Grapple used in Scrapping activities with x6.25 efficiency",
		price: 30000,
		group: 0,
		lvl: 3,
		img: "scrapping_bot",
		energy: 3,
		heart: 0,
		fire_power: 0,
		cargo: 0
	},
	recycling_1: {
		name: "Regular Recycling bot",
		des: "Regular Recycling bot used in Recycling activities",
		price: 1000,
		group: 0,
		lvl: 1,
		img: "recycling_bot",
		energy: 1.2,
		heart: 0,
		fire_power: 0,
		cargo: 0
	},
	recycling_2: {
		name: "Fine Recycling bot",
		des: "Fine Recycling bot used in Recycling activities with x2.5 efficiency",
		price: 6000,
		group: 0,
		lvl: 2,
		img: "recycling_bot",
		energy: 2.4,
		heart: 0,
		fire_power: 0,
		cargo: 0
	},
	recycling_3: {
		name: "Advanced Recycling bot",
		des: "Advanced Recycling bot used in Recycling activities with x6.25 efficiency",
		price: 45000,
		group: 0,
		lvl: 3,
		img: "recycling_bot",
		energy: 3.6,
		heart: 0,
		fire_power: 0,
		cargo: 0
	},
	mining_1: {
		name: "Regular Mining bot",
		des: "Regular Mining bot used in Mining activities",
		price: 1250,
		group: 0,
		lvl: 1,
		img: "mining_bot",
		energy: 1.5,
		heart: 0,
		fire_power: 0,
		cargo: 0
	},
	mining_2: {
		name: "Fine Mining bot",
		des: "Fine Mining bot used in Mining activities with x2.5 efficiency",
		price: 7000,
		group: 0,
		lvl: 2,
		img: "mining_bot",
		energy: 3.1,
		heart: 0,
		fire_power: 0,
		cargo: 0
	},
	mining_3: {
		name: "Advanced Mining bot",
		des: "Advanced Mining bot used in Mining activities with x6.25 efficiency",
		price: 60000,
		group: 0,
		lvl: 3,
		img: "mining_bot",
		energy: 4.6,
		heart: 0,
		fire_power: 0,
		cargo: 0
	},
	casting_1: {
		name: "Regular Casting tong",
		des: "Regular Casting tong used in Casting activities",
		price: 1500,
		group: 0,
		lvl: 1,
		img: "casting_bot",
		energy: 2.1,
		heart: 0,
		fire_power: 0,
		cargo: 0
	},
	casting_2: {
		name: "Fine Casting tong",
		des: "Fine Casting tong used in Casting activities with x2.5 efficiency",
		price: 8000,
		group: 0,
		lvl: 2,
		img: "casting_bot",
		energy: 4.4,
		heart: 0,
		fire_power: 0,
		cargo: 0
	},
	casting_3: {
		name: "Advanced Casting tong",
		des: "Advanced Casting tong used in Casting activities with x6.25 efficiency",
		price: 75000,
		group: 0,
		lvl: 3,
		img: "casting_bot",
		energy: 6.5,
		heart: 0,
		fire_power: 0,
		cargo: 0
	},
	exploring_1: {
		name: "Regular Explorer bot",
		des: "Regular Explorer bot used in Exploring activities",
		price: 1750,
		group: 0,
		lvl: 1,
		img: "exploring_bot",
		energy: 4,
		heart: 0,
		fire_power: 0,
		cargo: 0
	},
	exploring_2: {
		name: "Fine Explorer bot",
		des: "Fine Explorer bot used in Exploring activities with x2.5 efficiency",
		price: 9000,
		group: 0,
		lvl: 2,
		img: "exploring_bot",
		energy: 8,
		heart: 0,
		fire_power: 0,
		cargo: 0
	},
	exploring_3: {
		name: "Advanced Explorer bot",
		des: "Advanced Explorer bot used in Exploring activities with x6.25 efficiency",
		price: 85000,
		group: 0,
		lvl: 3,
		img: "exploring_bot",
		energy: 12,
		heart: 0,
		fire_power: 0,
		cargo: 0
	},
	scout_1: {
		name: "Regular Scout drone",
		des: "Regular Scout drone used to scout unknown territories",
		price: 100,
		group: 1,
		lvl: 1,
		img: "scout_drone",
		energy: 0,
		heart: 30,
		fire_power: 0,
		cargo: 0
	},
	scout_2: {
		name: "Fine Scout drone",
		des: "Fine Scout drone used to scout unknown territories, +5% surviving chance",
		price: 350,
		group: 1,
		lvl: 2,
		img: "scout_drone",
		energy: 0,
		heart: 60,
		fire_power: 0,
		cargo: 0
	},
	scout_3: {
		name: "Advanced Scout drone",
		des: "Advanced Scout drone used to scout unknown territories, +10% surviving chance",
		price: 750,
		group: 1,
		lvl: 3,
		img: "scout_drone",
		energy: 0,
		heart: 90,
		fire_power: 0,
		cargo: 0
	},
	cargo_1: {
		name: "Regular Cargo bot",
		des: "Regular Cargo bot used to collect Materials from explored territories",
		price: 200,
		group: 1,
		lvl: 1,
		img: "cargo_bot",
		energy: 0,
		heart: 50,
		fire_power: 0,
		cargo: 300
	},
	cargo_2: {
		name: "Fine Cargo bot",
		des: "Fine Cargo bot used to collect Materials from explored territories, have 5% chance to collect double its capacity",
		price: 500,
		group: 1,
		lvl: 2,
		img: "cargo_bot",
		energy: 0,
		heart: 100,
		fire_power: 0,
		cargo: 600
	},
	cargo_3: {
		name: "Advanced Cargo bot",
		des: "Advanced Cargo bot used to collect materials from explored territories, have 10% chance to collect double its capacity",
		price: 1000,
		group: 1,
		lvl: 3,
		img: "cargo_bot",
		energy: 0,
		heart: 150,
		fire_power: 0,
		cargo: 900
	},
	battle_1: {
		name: "Regular Battle bot",
		des: "Regular Battle bot, good for all setuations",
		price: 150,
		group: 1,
		lvl: 1,
		img: "battle_bot",
		energy: 0,
		heart: 100,
		fire_power: 20,
		cargo: 0
	},
	battle_2: {
		name: "Fine Battle bot",
		des: "Fine Battle bot, good for all setuations, have a 20% chance to deal double its damage in one turn",
		price: 750,
		group: 1,
		lvl: 2,
		img: "battle_bot",
		energy: 0,
		heart: 200,
		fire_power: 40,
		cargo: 0
	},
	battle_3: {
		name: "Advanced Battle bot",
		des: "Advanced Battle bot, good for all setuations, have a 40% chance to deal double its damage in one turn",
		price: 2500,
		group: 1,
		lvl: 3,
		img: "battle_bot",
		energy: 0,
		heart: 300,
		fire_power: 60,
		cargo: 0
	},
	missile_1: {
		name: "Regular Missile bot",
		des: "Regular Missile bot, prioritize defences",
		price: 185,
		group: 1,
		lvl: 1,
		img: "missile_bot",
		energy: 0,
		heart: 50,
		fire_power: 30,
		cargo: 0
	},
	missile_2: {
		name: "Fine Missile bot",
		des: "Fine Missile bot, prioritize defences, deals x2 damage to defences",
		price: 850,
		group: 1,
		lvl: 2,
		img: "missile_bot",
		energy: 0,
		heart: 100,
		fire_power: 40,
		cargo: 0
	},
	missile_3: {
		name: "Advanced Missile bot",
		des: "Advanced Missile bot, prioritize defences, deals x3 damage to defences",
		price: 2650,
		group: 1,
		lvl: 3,
		img: "missile_bot",
		energy: 0,
		heart: 150,
		fire_power: 50,
		cargo: 0
	},
	mega_1: {
		name: "Regular Mega Mech",
		des: "Regular Mega Mech, attack 2 times in one turn",
		price: 5000,
		group: 1,
		lvl: 1,
		img: "mega_mech",
		energy: 0,
		heart: 600,
		fire_power: 60,
		cargo: 60
	},
	mega_2: {
		name: "Fine Mega Mech",
		des: "Fine Mega Mech, attack 2 times in one turn, have 20% chance to take damage instead of allay target",
		price: 15000,
		group: 1,
		lvl: 2,
		img: "mega_mech",
		energy: 0,
		heart: 1200,
		fire_power: 80,
		cargo: 150
	},
	mega_3: {
		name: "Advanced Mega Mech",
		des: "Advanced Mega Mech, attack 2 times in one turn, have 40% chance to take damage instead of allay target",
		price: 35000,
		group: 1,
		lvl: 3,
		img: "mega_mech",
		energy: 0,
		heart: 1700,
		fire_power: 100,
		cargo: 250
	},
	sentry_1: {
		name: "Regular Sentry gun",
		des: "Regular Sentry gun, good for all setuations",
		price: 200,
		group: 2,
		lvl: 1,
		img: "sentry_gun",
		energy: 0,
		heart: 150,
		fire_power: 20,
		cargo: 0
	},
	sentry_2: {
		name: "Fine Sentry gun",
		des: "Fine Sentry gun, good for all setuations, have 30% chance to attack 3 times in one turn",
		price: 900,
		group: 2,
		lvl: 2,
		img: "sentry_gun",
		energy: 0,
		heart: 300,
		fire_power: 40,
		cargo: 0
	},
	sentry_3: {
		name: "Advanced Sentry gun",
		des: "Advanced Sentry gun, good for all setuations, have 60% chance to attack 3 times in one turn",
		price: 3000,
		group: 2,
		lvl: 3,
		img: "sentry_gun",
		energy: 0,
		heart: 450,
		fire_power: 60,
		cargo: 0
	},
	laserbeam_1: {
		name: "Regular Laserbeam cannon",
		des: "Regular Laserbeam cannon, prioritize Missle bots",
		price: 250,
		group: 2,
		lvl: 1,
		img: "laserbeam_cannon",
		energy: 0,
		heart: 100,
		fire_power: 20,
		cargo: 0
	},
	laserbeam_2: {
		name: "Fine Laserbeam cannon",
		des: "Fine Laserbeam cannon, prioritize Missle bots, have 2.5% chance to destroy target in one shot",
		price: 1000,
		group: 2,
		lvl: 2,
		img: "laserbeam_cannon",
		energy: 0,
		heart: 150,
		fire_power: 40,
		cargo: 0
	},
	laserbeam_3: {
		name: "Advanced Laserbeam tcannon",
		des: "Advanced Laserbeam tcannon, prioritize Missle bots, have 5% chance to destroy target in one shot",
		price: 3000,
		group: 2,
		lvl: 3,
		img: "laserbeam_cannon",
		energy: 0,
		heart: 200,
		fire_power: 60,
		cargo: 0
	},
	wallking_1: {
		name: "Regular Wallking turrent",
		des: "Regular Wallking turrent, prioritize Mega Mech",
		price: 5000,
		group: 2,
		lvl: 1,
		img: "wallking_turrent",
		energy: 0,
		heart: 500,
		fire_power: 40,
		cargo: 0
	},
	wallking_2: {	
		name: "Fine Wallking turrent",
		des: "Fine Wallking turrent, prioritize Mega Mech, have 20% chance to dodge incoming damage",
		price: 10000,
		group: 2,
		lvl: 2,
		img: "wallking_turrent",
		energy: 0,
		heart: 800,
		fire_power: 60,
		cargo: 0
	},
	wallking_3: {
		name: "Advanced Wallking turrent",
		des: "Advanced Wallking turrent, prioritize Mega Mech, have 40% chance to dodge incoming damage",
		price: 20000,
		group: 2,
		lvl: 3,
		img: "wallking_turrent",
		energy: 0,
		heart: 1100,
		fire_power: 80,
		cargo: 0
	}
}

function click_production_item(id) {
	$("#production_name").text(production_data[id].name);
	$("#production_des").text(production_data[id].des);

	icon = ""
	switch(bot_new) {
	case "scrapping":
		icon = "scrapping_bot"
		break
	case "recycling":
		icon = "recycling_bot"
		break
	case "mining":
		icon = "mining_bot"
		break
	case "casting":
		icon = "casting_bot"
		break
	case "exploring":
		icon = "exploring_bot"
		break
	}
	
	$("#"+bot_old).css("border", "1px solid var(--mainClr)")
	$("#"+bot_new).css("border", "1px solid var(--selectClr)")

	$("#production_sel_1").empty().append('<p id="production_sel_1_text" class="bot_card_count">0</p> <svg class="lv1_icon"><use xlink:href="#'+icon+'"></use></svg>')
	$("#production_sel_2").empty().append('<p id="production_sel_2_text" class="bot_card_count">0</p> <svg class="lv2_icon"><use xlink:href="#'+icon+'"></use></svg>')
	$("#production_sel_3").empty().append('<p id="production_sel_3_text" class="bot_card_count">0</p> <svg class="lv3_icon"><use xlink:href="#'+icon+'"></use></svg>')
	$("#production_sel_1_text").text(Game.permanent[id+"_assigned"][id+"_1"])
	$("#production_sel_2_text").text(Game.permanent[id+"_assigned"][id+"_2"])
	$("#production_sel_3_text").text(Game.permanent[id+"_assigned"][id+"_3"])
}

production_data = {
	scrapping: {
		name: "Scrapping",
		des: "Produce /e material every 5 minutes for each Scrap Grapple assigned"
	},
	recycling: {
		name: "Recycling",
		des: "Produce /e material every 4 minutes for each Recycling bot assigned"
	},
	mining: {
		name: "Mining",
		des: "Produce /e material every 3 minutes for each Mining bot assigned"
	},
	casting: {
		name: "Casting",
		des: "Produce /e material every 2 minutes for each Casting tong assigned"
	},
	exploring: {
		name: "Exploring",
		des: "Produce /e material every 1 minute for each Explorer bot assigned"
	},
}

function click_procedure_item(id) {
	$("#"+bot_old).css("outline", "1px solid var(--mainClr)")
	$("#"+bot_new).css("outline", "2px solid var(--selectClr)")

	$("#procedure_name").text(procedure_data[id].name); 
	$("#procedure_des").text(procedure_data[id].des.replace("/e", Game.permanent[id+"_base_effect"]+"%"));

	$("#procedure_sel_1_text").text(Game.permanent[id+"_assigned"]["support_1"])
	$("#procedure_sel_2_text").text(Game.permanent[id+"_assigned"]["support_2"])
	$("#procedure_sel_3_text").text(Game.permanent[id+"_assigned"]["support_3"])
}

function auto_clicker() {
	$("#auto_click_txt").remove()
	$("#clicker").append('<p id="auto_click_txt" class="auto_click_text"></p>')
	ac_text = $("#auto_click_txt")
	ac_text.removeClass('click_text_flaot')
	increase_credit(bm_stat.auto_clicker_inc)
	ac_text.text("+"+simplifyNumber(bm_stat.auto_clicker_inc))
	ac_text.addClass('click_text_flaot')	
}

procedure_data = {
	auto_clicker: {
		name: "Clicker",
		des: "Automatically click the Clicker one time every 1 second and gain /e of current CPC for each support Hand"
	},
	network_listener: {
		name: "Listener",
		des: "Set a Network listener and increase DPS by /e for each support Hand"
	},
	auto_pressing: {
		name: "Presser",
		des: "Increase CPS and DPS by /e of current avarage (Easy) Pressing task rewards"
	},
	auto_addition: {
		name: "Adder",
		des: "Increase CPS and DPS by /e of current avarage (Easy) Addition task rewards"
	},
	auto_sequencer: {
		name: "Sequencer",
		des: "Increase CPS and DPS by /e of current (Easy) Sequencer task rewards"
	},
}

function increase_materials(value) {
	Game.permanent.materials += value
	Game.permanent.total_materials_generated += value
	total_materials_in_one_session += value
	idle_materials+= value
	$("#mNum").text(simplifyNumber(Game.permanent.materials))
	Observer["MATERIALS_INCREASE"]()
	check_bot_item_price()
}