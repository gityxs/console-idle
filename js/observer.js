/*
Based on the current design of achivements, it is better to just keep all indexes = 0, then all 
will get updated to current, unlock_achievement() will return if achievement already unlocked, so only 
one time will run more than 1/2 times for each to get current index.
No need to make a function to set current.
*/

//t = total,_ ? = name, m = marks
let
h_marks_index_achiv = {
	h1: 0,
	h2: 0,
	h3: 0,
	h4: 0,
	h5: 0,
	h6: 0,
	h7: 0,
	h8: 0,
	h9: 0,
	h10: 0,
	h11: 0,
	h12: 0
},
h_marks_index_soft = {
	h1: 1,
	h2: 1,
	h3: 1,
	h4: 1,
	h5: 1,
	h6: 1,
	h7: 1,
	h8: 1,
	h9: 1,
	h10: 1,
	h11: 1,
	h12: 1
},
t_hw_m_index = 0, //total_hardware_marks
thr_m_index = 0, //multi_thr_marks
bm_m_index = 0, //board_management_marks
t_sw_index = 0, //total_software_marks
adv_dcd_index = 0, //adv_dcd_marks
d_f_index = 0, //data_filtering_marks
d_a_index = 0, //data_analysis_marks
d_s_index = 0, //data_sorting_marks
sw_m_index = 0, //software_management_marks
f_w_index = 0, //fire_wall_markss
t_ol_p_index = 0, //total_ol_purchases_marks
t_c_f_c_index = 0, //total_credit_from_clicks_marks
t_c_index = 0, //total_clicks_marks
t_d_index = 0, //total_data_marks
t_c_g_index = 0, //total_credit_generated_marks
t_d_in_session = 0, // total decoded data in one session
t_c_in_one_s_index = 0, //total_credit_in_one_session_marks
c_c_index = 0, //crown_coin_marks
t_c_s_index = 0, //total_credit_spent_marks
h_cps_index = 0, //highist_cps_marks
h_dps_index = 0, //highist_dps_marks
c_index = 0, //click_marks
c_p_index = 0, //click_p_marks
cps_m_index = 0, //cps_multis
t_t_p_index = 0, //total_time_played_marks
t_t_c_index = 0, //total_task_complated_marks
t_c_f_t_index = 0, //total_credit_from_tasks_marks
t_d_f_t_index = 0, //total_data_from_tasks_marks
p_t_c_index = 0, //pressing_task_complated_marks
t_p_t_c_index = 0, //total_pressing_task_complated_marks
a_t_c_index = 0, //add_task_complated_marks
t_a_t_c_index = 0, // total_add_task_complated_marks
s_t_c_index = 0, //sequence_task_complated_marks
t_s_t_c_index = 0, //total_sequence_task_complated_marks


//unlockable checking like achievements and softwares
Observer = {
	BUYING_HARDWARE: function(item) {
		if(Game.impermanent.hardware_count[item] == 1) {
			create_processes_apps_table_row(item)
			$("#proc_apps_txt").text("Apps ("+$("#processes_app_table_body").children().length+")")
		}
		
		update_processes_apps_table(item)
		update_processes_resources_title()
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
	
		if(item == "h6") {
			if(Game.impermanent.hardware_count.h6 > 0) {
				Game.impermanent.ol_unlocked = true
				Events["STORE0"]();
			}
			set_onlineStore_locked_items()
		}

		if(Game.impermanent.total_hardware >= 10) {
			Events["HARDWARE"]()
		}

		if(item == "h8" || item == "h9") {
			max_energy = (5+Game.impermanent.hardware_count["h8"]+Game.impermanent.hardware_count["h9"]*3)*Game.impermanent.g_eff.gaia_energy
			$("#max_e").text("Max: "+simplifyNumber(max_energy))
			$("#con_e").text("Consumption: "+simplifyNumber(curr_energy))
		}

		//chack for hardware (item) achivement
		if(h_mark_achiv.hasOwnProperty(item)) {
			for(h_marks_index_achiv[item]; h_marks_index_achiv[item] < h_mark_achiv[item].length; h_marks_index_achiv[item]++) {
				if(Game.impermanent.hardware_count[item] >= h_mark_achiv[item][h_marks_index_achiv[item]][1])
					unlock_achievement(h_mark_achiv[item][h_marks_index_achiv[item]][0], h_marks_index_achiv[item]+1)
				else
					break
			}
		}
		//check for total hardware achievement
		for(t_hw_m_index; t_hw_m_index < total_hardware_marks.length; t_hw_m_index++) {
			if(Game.impermanent.total_hardware >= total_hardware_marks[t_hw_m_index][1])
				unlock_achievement(total_hardware_marks[t_hw_m_index][0], t_hw_m_index+1)
			else
				break
		}
		//check for hardware (item) sofrware
		for(h_marks_index_soft[item]; h_marks_index_soft[item] < upgradesMarks.length; h_marks_index_soft[item]++) {
			if(Game.impermanent.hardware_count[item] >= upgradesMarks[h_marks_index_soft[item]])
				unlock_software("s"+(h_marks_index_soft[item])+item)
			else
				break
		}
		//check for total hardware multi threads software
		for(thr_m_index; thr_m_index < multi_thr_marks.length; thr_m_index++) {
			if(Game.impermanent.total_hardware >= multi_thr_marks[thr_m_index][1])
				unlock_software(multi_thr_marks[thr_m_index][0])
			else
				break
		}
		//check for total hardware board management software
		for(bm_m_index; bm_m_index < board_management_marks.length; bm_m_index++) {
			if(Game.impermanent.total_hardware >= board_management_marks[bm_m_index][1])
				unlock_software(board_management_marks[bm_m_index][0])
			else
				break
		}	
	},
	BUYING_SOFTWARE: function(item) {
		id = get_software_name_parts(item)
		id = "s"+id[1]
		if($('#processes_bg_table_body').children('#'+id+"_pbg").length == 0) {
			create_processes_bg_table_row(get_software_name_parts(item))
	  		update_processes_bg_table(get_software_name_parts(item))
	  		$("#proc_bg_txt").text("Background processes ("+$("#processes_bg_table_body").children().length+")")
		}
		else
			update_processes_bg_table(get_software_name_parts(item))
		
	  	update_processes_resources_title()
	  	create_sys_software_icons()

		if(Game.impermanent.total_software >= 3) {
			Events["SOFTWARE"]()
		}
		//check for total software achievement
		for(t_sw_index; t_sw_index < total_software_marks.length; t_sw_index++) {
			if(Game.impermanent.total_software >= total_software_marks[t_sw_index][1])
				unlock_achievement(total_software_marks[t_sw_index][0], t_sw_index+1)
			else
				break
		}
		//check for total software data filtering software
		for(d_f_index; d_f_index < data_filtering_marks.length; d_f_index++) {
			if(Game.impermanent.total_software >= data_filtering_marks[d_f_index][1])
				unlock_software(data_filtering_marks[d_f_index][0])
			else
				break
		}
		//check for total software data analysis software
		for(d_a_index; d_a_index < data_analysis_marks.length; d_a_index++) {
			if(Game.impermanent.total_software >= data_analysis_marks[d_a_index][1])
				unlock_software(data_analysis_marks[d_a_index][0])
			else
				break
		}
		//check for total software data sorting software
		for(d_s_index; d_s_index < data_sorting_marks.length; d_s_index++) {
			if(Game.impermanent.total_software >= data_sorting_marks[d_s_index][1])
				unlock_software(data_sorting_marks[d_s_index][0])
			else
				break
		}
		//check for total software software management software
		for(sw_m_index; sw_m_index < software_management_marks.length; sw_m_index++) {
			if(Game.impermanent.total_software >= software_management_marks[sw_m_index][1])
				unlock_software(software_management_marks[sw_m_index][0])
			else
				break
		}
		//check for total software fire wall software
		for(f_w_index; f_w_index < fire_wall_marks.length; f_w_index++) {
			if(Game.impermanent.total_software >= fire_wall_marks[f_w_index][1])
				unlock_software(fire_wall_marks[f_w_index][0])
			else
				break
		}
	},
	BUYING_HQ_ITEM: function() {
		
	},
	BUYING_OL_ITEM: function() {
		//check for total ol purchases count achievement
		for(t_ol_p_index; t_ol_p_index < total_ol_purchases_marks.length; t_ol_p_index++) {
			if(Game.permanent.total_ol_purchases_count >= total_ol_purchases_marks[t_ol_p_index][1])
				unlock_achievement(total_ol_purchases_marks[t_ol_p_index][0], t_ol_p_index+1)
			else
				break
		}
	},
	CLICK_ON_CONSOLE: function() {
		//check for total credit from clicks achievement
		for(t_c_f_c_index; t_c_f_c_index < total_credit_from_clicks_marks.length; t_c_f_c_index++) {
			if(Game.permanent.total_credit_from_clicks >= total_credit_from_clicks_marks[t_c_f_c_index][1])
				unlock_achievement(total_credit_from_clicks_marks[t_c_f_c_index][0], t_c_f_c_index+1)
			else
				break
		}
		//check for total clicks achievement
		for(t_c_index; t_c_index < total_clicks_marks.length; t_c_index++) {
			if(Game.permanent.total_clicks >= total_clicks_marks[t_c_index][1])
				unlock_achievement(total_clicks_marks[t_c_index][0], t_c_index+1)
			else
				break
		}
	},
	CREDIT_INCREASE: function() {
		//check for total credit generated achievement
		for(t_c_g_index; t_c_g_index < total_credit_generated_marks.length; t_c_g_index++) {
			if(Game.permanent.total_credit_generated >= total_credit_generated_marks[t_c_g_index][1])
				unlock_achievement(total_credit_generated_marks[t_c_g_index][0], t_c_g_index+1)
			else
				break
		}
		//check for total credit in one session achievement
		for(t_c_in_one_s_index; t_c_in_one_s_index < total_credit_in_one_session_marks.length; t_c_in_one_s_index++) {
			if(total_credit_in_one_session >= total_credit_in_one_session_marks[t_c_in_one_s_index][1])
				unlock_achievement(total_credit_in_one_session_marks[t_c_in_one_s_index][0], t_c_in_one_s_index+1)
			else
				break
		}
		//check for total credit generated crown coin software
		for(c_c_index; c_c_index < crown_coin_marks.length; c_c_index++) {
			if(Game.permanent.total_credit_generated >= crown_coin_marks[c_c_index][1])
				unlock_software(crown_coin_marks[c_c_index][0])
			else
				break
		}
	},
	CREDIT_DECREASE: function() {
		//check for total credit spent achievement
		for(t_c_s_index; t_c_s_index < total_credit_spent_marks.length; t_c_s_index++) {
			if(Game.permanent.total_credit_spent >= total_credit_spent_marks[t_c_s_index][1])
				unlock_achievement(total_credit_spent_marks[t_c_s_index][0], t_c_s_index+1)
			else
				break
		}
	},
	DATA_INCREASE: function() {
		//check for decoded data in one session
		for(t_d_in_session; t_d_in_session < total_data_in_sesstion_marks.length; t_d_in_session++) {
			if(total_data_in_one_session >= total_data_in_sesstion_marks[t_d_in_session][1]) {
				unlock_achievement(total_data_in_sesstion_marks[t_d_in_session][0], t_d_in_session+1)
			}
			else
				break
		}
		//check for total decoded data
		for(t_d_index; t_d_index < total_data_marks.length; t_d_index++) {
			if(Game.permanent.total_data >= total_data_marks[t_d_index][1]) {
				unlock_achievement(total_data_marks[t_d_index][0], t_d_index+1)
			}
			else
				break
		}
	},
	MATERIALS_INCREASE: function() {

	},
	TASKS: {
		COMPLATE: function() {
			//check for total complated tasks achievement
			for(t_t_c_index; t_t_c_index < total_task_complated_marks.length; t_t_c_index++) {
				if((Game.permanent.total_pressing_task_complated+Game.permanent.total_add_task_complated+Game.permanent.total_sequence_task_complated) >= total_task_complated_marks[t_t_c_index][1])
					unlock_achievement(total_task_complated_marks[t_t_c_index][0], t_t_c_index+1)
				else
					break
			}
		},
		CREDIT: function() {
			//check for total credit generated from tasks achievement
			for(t_c_f_t_index; t_c_f_t_index < total_credit_from_tasks_marks.length; t_c_f_t_index++) {
				if(Game.permanent.total_credit_generated_tasks >= total_credit_from_tasks_marks[t_c_f_t_index][1])
					unlock_achievement(total_credit_from_tasks_marks[t_c_f_t_index][0], t_c_f_t_index+1)
				else
					break
			}
		},
		DATA: function() {
			//check for total data generated from tasks achievement
			for(t_d_f_t_index; t_d_f_t_index < total_data_from_tasks_marks.length; t_d_f_t_index++) {
				if(Game.permanent.total_data_generated_tasks >= total_data_from_tasks_marks[t_d_f_t_index][1])
					unlock_achievement(total_data_from_tasks_marks[t_d_f_t_index][0], t_d_f_t_index+1)
				else
					break
			}
		},
		PRESS: function() {
			//check for total pressing task complated achievement
			for(t_p_t_c_index; t_p_t_c_index < total_pressing_task_complated_marks.length; t_p_t_c_index++) {
				if(Game.permanent.total_pressing_task_complated >= total_pressing_task_complated_marks[t_p_t_c_index][1])
					unlock_achievement(total_pressing_task_complated_marks[t_p_t_c_index][0], t_p_t_c_index+1)
				else
					break
			}
			//check for total pressing task complated software
			for(p_t_c_index; p_t_c_index < pressing_tasks_complated_marks.length; p_t_c_index++) {
				if(Game.permanent.total_pressing_task_complated >= pressing_tasks_complated_marks[p_t_c_index][1])
					unlock_software(pressing_tasks_complated_marks[p_t_c_index][0])
				else
					break
			}
		},
		ADD: function() {
			//check for total add task complated achievement
			for(t_a_t_c_index; t_a_t_c_index < total_add_task_complated_marks.length; t_a_t_c_index++) {
				if(Game.permanent.total_add_task_complated >= total_add_task_complated_marks[t_a_t_c_index][1])
					unlock_achievement(total_add_task_complated_marks[t_a_t_c_index][0], t_a_t_c_index+1)
				else
					break
			}
			//check for total add task complated software
			for(a_t_c_index; a_t_c_index < add_tasks_complated_marks.length; a_t_c_index++) {
				if(Game.permanent.total_add_task_complated >= add_tasks_complated_marks[a_t_c_index][1])
					unlock_software(add_tasks_complated_marks[a_t_c_index][0])
				else
					break
			}
		},
		SEQUENCE: function() {
			//check for total sequence task complated achievement
			for(t_s_t_c_index; t_s_t_c_index < total_sequence_task_complated_marks.length; t_s_t_c_index++) {
				if(Game.permanent.total_sequence_task_complated >= total_sequence_task_complated_marks[t_s_t_c_index][1])
					unlock_achievement(total_sequence_task_complated_marks[t_s_t_c_index][0], t_s_t_c_index+1)
				else
					break
			}
			//check for total sequence task complated software
			for(s_t_c_index; s_t_c_index < sequence_task_complated_marks.length; s_t_c_index++) {
				if(Game.permanent.total_sequence_task_complated >= sequence_task_complated_marks[s_t_c_index][1])
					unlock_software(sequence_task_complated_marks[s_t_c_index][0])
				else
					break
			}
		}
	},
	GAIA_HACK: function() {
		
	},
	GAIA_HACKED: function() {
		
	},
	GAIA_BLOCKED: function() {
		
	},
	MISCELLANEOUS: {
		REDUCE_HARDWARE: function(item) {
			if(item == "h6") {
				if(Game.impermanent.hardware_count.h6 <=0) {
					Game.impermanent.ol_unlocked = false
					Game.impermanent.online_store_cycle = 600-Game.permanent.ol_timer_reduce
					$("#ol_timer").text("Next in: "+formatTime(0))
					$('#hq_btn').click()
				}
				set_onlineStore_locked_items()
			}
		},
		//highest cps
		H_CPS:function() {
			//check for highist CPS achievement
			for(h_cps_index; h_cps_index < highist_cps_marks.length; h_cps_index++) {
				if(cps >= highist_cps_marks[h_cps_index][1])
					unlock_achievement(highist_cps_marks[h_cps_index][0], h_cps_index+1)
				else
					break
			}
			//check for highist CPS click software
			for(c_index; c_index < click_marks.length; c_index++) {
				if(cps >= click_marks[c_index][1])
					unlock_software(click_marks[c_index][0])
				else
					break
			}
			//check for highist CPS click mode software
			for(c_p_index; c_p_index < click_p_marks.length; c_p_index++) {
				if(cps >= click_p_marks[c_p_index][1])
					unlock_software(click_p_marks[c_p_index][0])
				else
					break
			}
			//check for highist CPS CPS multies softwares
			for(cps_m_index; cps_m_index < cps_multis.length; cps_m_index++) {
				if(cps >= cps_multis[cps_m_index][1])
					unlock_software(cps_multis[cps_m_index][0])
				else
					break
			}
			//check for highist CPS CPS multies softwares
			for(cps_m_index; cps_m_index < cps_multis.length; cps_m_index++) {
				if(cps >= cps_multis[cps_m_index][1])
					unlock_software(cps_multis[cps_m_index][0])
				else
					break
			}
			//check for highist CPS Advanced Decoding algorithms softwares
			for(adv_dcd_index; adv_dcd_index < adv_dcd_marks.length; adv_dcd_index++) {
				if(cps >= adv_dcd_marks[adv_dcd_index][1])
					unlock_software(adv_dcd_marks[adv_dcd_index][0])
				else
					break
			}
		},
		//highest cps
		H_DPS:function() {
			//check for highist DPS achievement
			for(h_dps_index; h_dps_index < highist_dps_marks.length; h_dps_index++) {
				if(dps >= highist_dps_marks[h_dps_index][1])
					unlock_achievement(highist_dps_marks[h_dps_index][0], h_dps_index+1)
				else
					break
			}
		},
		TIME_PLAYED: function() {
			//check for total time played achievement
			for(t_t_p_index; t_t_p_index < total_time_played_marks.length; t_t_p_index++) {
				if(Game.permanent.total_time_played >= total_time_played_marks[t_t_p_index][1])
					unlock_achievement(total_time_played_marks[t_t_p_index][0], t_t_p_index+1)
				else
					break
			}
		}
	}
}