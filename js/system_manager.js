var sys_oldpage = "processes",
sys_newpage = "processes",
sys_oldperf = "perf_res_cpu_btn",
sys_newperf = "perf_res_cpu_btn",
softoldsel,
softnewsel = "";

function toggle_auto_block() {
	if(Game.permanent.auto_block) {
		Game.permanent.auto_block = false
		$("#auto_block_btn").text("TURN ON")
		log("<br> > Turned off Auto block, changed to Manually defending against Hack attempts", "sys")
		$("#auto_block_icon").remove()
	}
	else {
		Game.permanent.auto_block = true
		$("#auto_block_btn").text("TURN OFF")
		log("<br> > Turned on Auto block, changed to Auto defending against Hack attempts based on Firewall block chance rate", "sys")
		$("#auto_icons_section").append('<svg id="auto_block_icon" class="lv0_icon"><use xlink:href="#shieldcomb"></use></svg>')
	}
}

function toggle_auto_install() {
	if(Game.permanent.auto_install) {
		Game.permanent.auto_install = false
		$("#auto_install_btn").text("TURN ON")
		log("<br> > Turned off Auto install, changed to Manually Installing Softwares", "sys")
		$("#auto_install_icon").remove()
	}
	else {
		Game.permanent.auto_install = true
		$("#auto_install_btn").text("TURN OFF")
		log("<br> > Turned on Auto install, changed to Automaticcaly Install Softwares", "sys")
		$("#auto_icons_section").append('<svg id="auto_install_icon" class="lv0_icon"><use xlink:href="#disc"></use></svg>')
	}
}

function update_current_performance() {
	if(sys_newperf == "perf_res_cpu_btn") {
		update_peformance_cpu()
	}
	else if(sys_newperf == "perf_res_gpu_btn") {
		update_peformance_gpu()	
	}
	else if(sys_newperf == "perf_res_ram_btn") {
		update_peformance_ram()
	}
	else {
		update_peformance_heat()
	}
}

function update_peformance_cpu() {
	$("#perf_total_sys").text("Total System CPU power: "+simplifyNumberSmall(100+total_cpu_inc)+"%")
	$("#perf_total_hq").text("CPU power from HQ: "+simplifyNumberSmall(hq_cpu_inc)+"%")
	$("#perf_total_ol").text("CPU power from Online store: "+simplifyNumberSmall(Game.impermanent.ol_cpu_inc)+"%")
	$("#perf_total_usage").text("Total CPU power usage: "+simplifyNumberSmall(total_cpu_con)+"%")
	$("#perf_total_usage_hd").text("Hardwares CPU usage: "+simplifyNumberSmall(hard_cpu_con)+"%")
	$("#perf_total_usage_sf").text("Softwares CPU usage: "+simplifyNumberSmall(soft_cpu_con)+"%")
	$("#perf_total_usage_ol").text("Online store CPU usage: "+simplifyNumberSmall(Game.impermanent.ol_cpu_con)+"%")
	$("#perf_free_res").text("Available CPU power: "+simplifyNumberSmall(100-cpuU)+"%")
	$("#perf_state").text("Decoding speed: "+simplifyNumberSmall(Number((100-cpu_eff).toFixed(2))+"%"+"(-"+cpu_eff+"%)"))
	$("#perf_ability1").text("Online decoding cores: "+simplifyNumberSmall(Game.impermanent.dps_multi_thread))
	$("#perf_ability2").text("Cores base decoding speed: "+get_data_with_symbol(base_dps*Game.impermanent.g_eff.coin_data*Game.impermanent.g_eff.ad_data, 0)+"/s")
}

function update_peformance_gpu() {
	$("#perf_total_sys").text("Total System GPU power: "+simplifyNumberSmall(100+total_gpu_inc)+"%")
	$("#perf_total_hq").text("GPU power from HQ: "+simplifyNumberSmall(hq_gpu_inc)+"%")
	$("#perf_total_ol").text("GPU power from Online store: "+simplifyNumberSmall(Game.impermanent.ol_gpu_inc)+"%")
	$("#perf_total_usage").text("Total GPU power usage: "+simplifyNumberSmall(total_gpu_con)+"%")
	$("#perf_total_usage_hd").text("Hardwares GPU usage: "+simplifyNumberSmall(hard_gpu_con)+"%")
	$("#perf_total_usage_sf").text("Softwares GPU usage: "+simplifyNumberSmall(soft_gpu_con)+"%")
	$("#perf_total_usage_ol").text("Online store GPU usage: "+simplifyNumberSmall(Game.impermanent.ol_gpu_con)+"%")
	$("#perf_free_res").text("Available GPU power: "+simplifyNumberSmall(100-gpuU)+"%")
	$("#perf_state").text("Credit generating speed: "+simplifyNumberSmall(Number((100-gpu_eff).toFixed(2))+"%"+"(-"+gpu_eff+"%)"))
	$("#perf_ability1").text("");
	$("#perf_ability2").text("");
}

function update_peformance_ram() {
	$("#perf_total_sys").text("Total System RAM: "+get_data_with_symbol(total_ram_inc*1048576, 2))
	$("#perf_total_hq").text("RAM space from HQ: "+get_data_with_symbol(hq_ram_inc*1048576, 2))
	$("#perf_total_ol").text("RAM space from Online store: "+get_data_with_symbol(Game.impermanent.ol_ram_inc*1048576, 2))
	$("#perf_total_usage").text("Total RAM usage: "+get_data_with_symbol(total_ram_con*1048576*-1, 2))
	$("#perf_total_usage_hd").text("Hardwares RAM usage: "+get_data_with_symbol(hard_ram_con*1048576*-1, 2))
	$("#perf_total_usage_sf").text("Softwares RAM usage: "+get_data_with_symbol(soft_ram_con*1048576*-1, 2))
	$("#perf_total_usage_ol").text("Online store RAM usage: "+get_data_with_symbol(Game.impermanent.ol_ram_con*1048576*-1, 2))
	$("#perf_free_res").text("Available RAM: "+get_data_with_symbol(ramU*1048576, 2))
	$("#perf_state").text("");
	$("#perf_ability1").text("");
	$("#perf_ability2").text("");
}

function update_peformance_heat() {
	$("#perf_total_sys").html("Total System Cooling power: "+simplifyNumberSmall(total_heat_inc)+"<span style='font-size: 100%;'>&#8451</span>")
	$("#perf_total_hq").html("Cooling power from HQ: "+simplifyNumberSmall(hq_heat_inc)+"<span style='font-size: 100%;'>&#8451</span>")
	$("#perf_total_ol").html("Cooling power from Online store: "+simplifyNumberSmall(Game.impermanent.ol_heat_inc)+"<span style='font-size: 100%;'>&#8451</span>")
	$("#perf_total_usage").html("Total system Heat: "+simplifyNumberSmall(total_heat_con)+"<span style='font-size: 100%;'>&#8451</span>")
	$("#perf_total_usage_hd").html("Hardwares Heat: "+simplifyNumberSmall(hard_heat_con)+"<span style='font-size: 100%;'>&#8451</span>")
	$("#perf_total_usage_sf").html("Softwares Heat: "+simplifyNumberSmall(soft_heat_con)+"<span style='font-size: 100%;'>&#8451</span>")
	$("#perf_total_usage_ol").html("Online store Heat: "+simplifyNumberSmall(Game.impermanent.ol_heat_con)+"<span style='font-size: 100%;'>&#8451</span>")
	$("#perf_free_res").html("Current System Heat: "+simplifyNumberSmall(Game.impermanent.heatU)+"<span style='font-size: 100%;'>&#8451</span>")
	$("#perf_state").text(Game.impermanent.heatU > 95 ? "System Heat: Overheated":Game.impermanent.heatU < 0 ? "System Heat: Overcooled": "System Heat: Stable")
	$("#perf_ability1").html("Heat difference: "+(heatMU-Game.impermanent.heatU)+"<span style='font-size: 100%;'>&#8451</span>")
	$("#perf_ability2").text(Game.impermanent.heatU < heatMU ? "Heat: Increasing":Game.impermanent.heatU > heatMU ? "Heat: Reducing": "Heat: Stable")
}

function set_processes_apps_table() {
	for (let i = 0; i < Game.impermanent.hardware_in_list.length; i++) {
		if(Game.impermanent.hardware_count[Game.impermanent.hardware_in_list[i]] > 0) {
			create_processes_apps_table_row(Game.impermanent.hardware_in_list[i])
			update_processes_apps_table(Game.impermanent.hardware_in_list[i])
		}
	}
	$("#proc_apps_txt").text("Apps ("+$("#processes_app_table_body").children().length+")")
}

function update_processes_apps_table(id, type) {
	$("#"+id+"_cpu").text(hardwares[id].cpu*Game.impermanent.hardware_count[id]+"%")
	$("#"+id+"_gpu").text(hardwares[id].gpu*Game.impermanent.hardware_count[id]+"%")
	$("#"+id+"_ram").text(hardwares[id].ram*-1*Game.impermanent.hardware_count[id]+"MB")
	$("#"+id+"_heat").html(hardwares[id].heat*Game.impermanent.hardware_count[id]+'<span style="font-size: 100%;">&#8451;</span>')
}

function create_processes_apps_table_row(item) {
	name = "";
	switch(item) {
	case "h1":
		name = "Keyboard"
		break;
	case "h2":
		name = "Mouse"
		break;
	case "h3":
		name = "Chair"
		break;
	case "h4":
		name = "Desk"
		break;
	case "h5":
		name = "Monitor"
		break;
	case "h6":
		name = "Router"
		break;
	case "h7":
		name = "PC"
		break;
	case "h8":
		name = "Solar power"
		break;
	case "h9":
		name = "Magnatic generator"
		break;
	case "h10":
		name = "Radio tower"
		break;
	case "h11":
		name = "Radar dish"
		break;
	case "h12":
		name = "Satellite"
		break;
	}

	$("#processes_app_table_body").append('<tr class="table_tr"><th class="sys_cell proc_cellB">'+name+'</th><th id="'+item+'_cpu" class="sys_cell proc_cellS"></th><th id="'+item+'_gpu" class="sys_cell proc_cellS"></th><th id="'+item+'_ram" class="sys_cell proc_cellS"></th><th id="'+item+'_heat" class="sys_cell proc_cellS"></th></tr>')
}

function set_processes_bg_table() {
	Game.impermanent.unlocked_software.forEach((value, key) => {
		if(value) {
			id = get_software_name_parts(key)
			id = "s"+id[1]
			if($('#processes_bg_table_body').children('#'+id+"_pbg").length == 0) {
				create_processes_bg_table_row(get_software_name_parts(key))
	  			update_processes_bg_table(get_software_name_parts(key))
	  			$("#proc_bg_txt").text("Background processes ("+$("#processes_bg_table_body").children().length+")")
			}
			else
				update_processes_bg_table(get_software_name_parts(key))
		}
	})
	$("#proc_bg_txt").text("Background processes ("+$("#processes_bg_table_body").children().length+")")
}

function create_processes_bg_table_row(arr) {
	item = "s"+arr[1]
	$("#processes_bg_table_body").append('<tr id="'+item+'_pbg" class="table_tr"><th id="'+item+'_name" class="sys_cell proc_cellB"></th><th id="'+item+'_cpu" class="sys_cell proc_cellS"></th><th id="'+item+'_gpu" class="sys_cell proc_cellS"></th><th id="'+item+'_ram" class="sys_cell proc_cellS"></th><th id="'+item+'_heat" class="sys_cell proc_cellS"></th></tr>')
}

function update_processes_bg_table(arr) {
	let cpu = 0, gpu = 0, ram = 0, heat = 0, item = "s"+arr[0]+arr[1], id = "s"+arr[1]
	for(i = 1; i <= arr[0]; i++) {
		item = "s"+i+arr[1]
		cpu += softwares[item].cpu
		gpu += softwares[item].gpu
		ram += softwares[item].ram
		heat += softwares[item].heat
	}
	$("#"+id+"_name").text(softwares[item].name)
	$("#"+id+"_cpu").text(cpu+"%")
	$("#"+id+"_gpu").text(gpu+"%")
	$("#"+id+"_ram").text(ram*-1+"MB")
	$("#"+id+"_heat").html(heat+'<span style="font-size: 100%;">&#8451;</span>')
}

function update_processes_resources_title() {
	$("#MangOperation_sys_cpu").text(total_cpu_con+"%")
	$("#MangOperation_sys_gpu").text(total_gpu_con+"%")
	$("#MangOperation_sys_ram").text(total_ram_con*-1+"MB")
	$("#MangOperation_sys_heat").html(total_heat_con+'<span style="font-size: 100%;">&#8451;</span>')
	$("#MangOperation_sys_network").text(get_connection_speed_with_symbol(nps))
	$("#ph_cpu").html("CPU ("+total_cpu_con+"%)")
	$("#ph_gpu").html("GPU ("+total_gpu_con+"%)")
	$("#ph_ram").html("RAM ("+total_ram_con*-1+"MB)")
	$("#ph_heat").html("Heat ("+total_heat_con+'<span style="font-size: 100%;">&#8451;</span>)')
}

function create_sys_software_icons() {
	Game.impermanent.unlocked_software.forEach((value, key) => {
		if(value) {
			id = get_software_name_parts(key)
			if ($("#sys_"+key).length == 0)
				$("#s"+id[1]).append('<div id="sys_'+key+'" class="sys_software_top_icon"><svg class="lv'+softwares[key].lvl+'_icon"><use xlink:href="#'+softwares[key].img+'"></use></svg></div>')

			if(id[1] == "cr") {
				$("#s"+id[1]+"_eff").html("Effect: +"+simplifyNumber(Game.impermanent.crown_effect_multi*100)+
					"%<br>Visibility: +"+simplifyNumber(Game.impermanent.crown_coin_visibility_appearance*100)+
					"%<br>Frequently: +"+simplifyNumber(Game.impermanent.crown_cycle_multi*100)+
					"%<br>Duration: +"+simplifyNumber(Game.impermanent.crown_effect_duration_multi*100)+"%")
			}
			else if(id[1] == "c") {
				$("#s"+id[1]+"_eff").html("Effect: x"+simplifyNumber(Game.impermanent.click_multi)+
					"<br>clicktinuum: +"+simplifyNumber(Game.impermanent.clicktinuum)+"%/Mouse")
			}
			else if(id[1] == "pt") {
				$("#s"+id[1]+"_eff").html("Effect: x"+simplifyNumber(Game.impermanent.pressing_task_multi)+
					"<br>Base Credit: +"+simplifyNumber(Game.impermanent.pressing_task_infinite_keys)+"%/Keyboard"+
					"<br>Base Data: +"+simplifyNumber(Game.impermanent.pressing_task_infinite_keys)+"%/Keyboard")
			}
			else if(id[1] == "mt") {
				$("#s"+id[1]+"_eff").html("Effect: x"+simplifyNumber(Game.impermanent.add_task_multi)+
					"<br>Base Credit: +"+simplifyNumber(Game.impermanent.add_task_overflow)+"%/Keyboard"+
					"<br>Base Data: +"+simplifyNumber(Game.impermanent.add_task_overflow)+"%/Keyboard")
			}
			else if(id[1] == "sq") {
				$("#s"+id[1]+"_eff").html("Effect: x"+simplifyNumber(Game.impermanent.sequence_task_multi)+
					"<br>Base Credit: +"+simplifyNumber(Game.impermanent.sequence_task_chaining)+"%/Keyboard"+
					"<br>Base Data: +"+simplifyNumber(Game.impermanent.sequence_task_chaining)+"%/Keyboard")
			}
			else {
				if(Number(softwares[key].eff) >= 1)
					$("#s"+id[1]+"_eff").text("Effect: x"+simplifyNumber(Game.impermanent[softwares[key].multi]))
				else 
					$("#s"+id[1]+"_eff").text("Effect: +"+simplifyNumber(Game.impermanent[softwares[key].multi]*100)+"%")
			}
		}
	});
}

function hover_sys_software_icons(id) {
	id = id.substring(id.indexOf("_")+1, id.length)
	$("#sys_s_item_name").text(softwares[id].name)
	let txt = softwares[id].des
	txt = txt.replace("/e", get_item_info(id))
	$("#sys_s_installed").html("Installed")
	$("#sys_s_item_effect").html(txt)
	$("#sys_s_item_cpu").text(softwares[id].cpu+"%")
	$("#sys_s_item_gpu").text(softwares[id].gpu+"%")
	$("#sys_s_item_ram").text(softwares[id].ram+"MB")
	$("#sys_s_item_fan").html(softwares[id].heat+"&#8451;")
}

function update_details() {
	$("#dtls_total_time").text("Total time played: "+formatTime(Game.permanent.total_time_played))
	$("#dtls_session_time").text("Session time played: "+formatTime(session_time))
	$("#dtls_total_coin").text("Crown coin found: "+simplifyNumber(Game.permanent.total_crown_coin_collected))
	$("#dtls_total_format").text("Formats: "+simplifyNumber(Game.permanent.total_formats))
	$("#dtls_total_cps_multi").text("Total permanent CPS multipliers: "+simplifyNumber((Game.permanent.format_cps_multi+Game.permanent.achievementsMulti)*100)+"%")
	$("#dtls_total_hd").text("Hardwares: "+simplifyNumberSmall(Game.impermanent.total_hardware))
	$("#dtls_total_sf").text("Softwares: "+simplifyNumberSmall(Game.impermanent.total_software))

	$("#dtls_total_credit").text("Total Credit generated: "+simplifyNumber(Game.permanent.total_credit_generated))
	$("#dtls_session_credit").text("Session Credit generated: "+simplifyNumber(total_credit_in_one_session))
	$("#dtls_total_credit_spent").text("Total Credit spent: "+simplifyNumber(Game.permanent.total_credit_spent))
	$("#dtls_total_data").text("Total Data decoded: "+get_data_with_symbol(Game.permanent.total_data, 0))
	$("#dtls_session_data").text("Session Data decoded: "+get_data_with_symbol(total_data_in_one_session, 0))
	$("#dtls_total_materials").text("Total Materials produced: "+simplifyNumber(Game.permanent.total_materials_generated))
	$("#dtls_session_materials").text("Session Materials produced: "+simplifyNumber(total_materials_in_one_session))

	$("#dtls_gaia_diff").text("G.A.I.A. diffculity: "+simplifyNumberSmall(Game.permanent.gaia_difficulty))
	$("#dtls_gaia_hacks").text("G.A.I.A. Hacks attempts: "+simplifyNumber(Game.permanent.total_gaia_hack))
	$("#dtls_gaia_hacked").text("G.A.I.A. successful Hacks attempts: "+simplifyNumber(Game.permanent.total_gaia_hacked))
	$("#dtls_gaia_blocked").text("G.A.I.A. blocked Hacks attempts: "+simplifyNumber(Game.permanent.total_gaia_blocked))
	$("#dtls_gaia_easy_blocked").text("G.A.I.A. easy blocked Hacks attempts: "+simplifyNumber(Game.permanent.total_easy_hack_blocked))
	$("#dtls_gaia_normal_blocked").text("G.A.I.A. normal blocked Hacks attempts: "+simplifyNumber(Game.permanent.total_easy_hack_blocked))
	$("#dtls_gaia_hard_blocked").text("G.A.I.A. hard blocked Hacks attempts: "+simplifyNumber(Game.permanent.total_hard_hack_blocked))
	$("#dtls_gaia_impossible_blocked").text("G.A.I.A. impossible blocked Hacks attempts: "+simplifyNumber(Game.permanent.total_impossible_hack_blocked))
	$("#dtls_gaia_pass_blocked").text("G.A.I.A. crack password blocked Hacks attempts: "+simplifyNumber(Game.permanent.total_crack_password_blocked))
	$("#dtls_gaia_fake_blocked").text("G.A.I.A. fake certificate blocked Hacks attempts: "+simplifyNumber(Game.permanent.total_face_certificate_blocked))
	$("#dtls_gaia_blocker_blocked").text("G.A.I.A. blocker blocked Hacks attempts: "+simplifyNumber(Game.permanent.total_crack_password_blocked))
	
	$("#dtls_total_clicks").text("Total Clicks: "+simplifyNumber(Game.permanent.total_clicks))
	$("#dtls_total_credit_clicks").text("Credit Generated from Clicker: "+simplifyNumber(Game.permanent.total_credit_from_clicks))

	$("#dtls_total_hq").text("Total HQ store purchases: "+simplifyNumber(Game.permanent.total_hq_purchases_count))
	$("#dtls_total_ol").text("Total Online store purchases: "+simplifyNumber(Game.permanent.total_ol_purchases_count))
	
	$("#dtls_total_contribution").text("contribution points: "+simplifyNumber(Game.permanent.total_contribution_points));
	$("#dtls_total_task_comp").text("Total Tasks completed: "+simplifyNumber(Game.permanent.total_pressing_task_complated+Game.permanent.total_add_task_complated+Game.permanent.total_sequence_task_complated))
	$("#dtls_total_task_credit").text("Total Tasks Credit generated: "+simplifyNumber(Game.permanent.total_credit_generated_tasks))
	$("#dtls_total_task_data").text("Total Data Credit generated: "+get_data_with_symbol(Game.permanent.total_data_generated_tasks, 0))
	$("#dtls_total_press_comp").text("Pressing Task completed: "+simplifyNumber(Game.permanent.total_pressing_task_complated))
	$("#dtls_total_press_credit").text("Credit generated from Pressing task: "+simplifyNumber(Game.permanent.total_credit_generated_from_pressing_task))
	$("#dtls_total_press_data").text("Data gained from Pressing task: "+get_data_with_symbol(Game.permanent.total_data_generated_from_pressing_task, 0))
	$("#dtls_total_add_comp").text("Addition Task completed: "+simplifyNumber(Game.permanent.total_add_task_complated))
	$("#dtls_total_add_credit").text("Credit generated from Addition task: "+simplifyNumber(Game.permanent.total_credit_generated_from_add_task))
	$("#dtls_total_add_data").text("Data gained from Addition task: "+get_data_with_symbol(Game.permanent.total_data_generated_from_add_task))
	$("#dtls_total_sequence_comp").text("Sequence Task completed: "+simplifyNumber(Game.permanent.total_sequence_task_complated))
	$("#dtls_total_sequence_credit").text("Credit generated from Sequence task: "+simplifyNumber(Game.permanent.total_credit_generated_from_sequence_task))
	$("#dtls_total_sequence_data").text("Data gained from Sequence task: "+get_data_with_symbol(Game.permanent.total_data_generated_from_sequence_task, 0))
}