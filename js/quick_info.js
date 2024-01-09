//update resouces view
function update_main_resouces() {
	//CPU
	if(cpuU >= 100) {
		Events["CPU_100"]()
		$("#percentage_cpu").css("color", "var(--negativeClr)")
		cpu_eff = Number(Math.pow(cpuU-100, 0.9).toFixed(2))
		if(cpu_eff > 99)
			cpu_eff = 99
		$("#dps").css("color", "var(--negativeClr)")
	}
	else {
		$("#percentage_cpu").css("color", "var(--mainClr)")
		$("#click_txt").css("color", "var(--mainClr)")
		if(cpuU <= 0)
		 cpuU = 0
		cpu_eff = 0
		$("#dps").css("color", "")
	}
	//GPU
	if(gpuU >= 100) {
		Events["GPU_100"]()
		$("#percentage_gpu").css("color", "var(--negativeClr)")
		gpu_eff = Number(Math.pow(gpuU-100,0.9).toFixed(2))
		if(gpu_eff > 99)
			gpu_eff = 99
		$("#cps").css("color", "var(--negativeClr)")
	}
	else {
		$("#percentage_gpu").css("color", "var(--mainClr)")
		if(gpuU <= 0) 
			gpuU = 0
		gpu_eff = 0
		$("#cps").css("color", "")
	}
	//RAM
	if(ramU <= 1) {
		$("#percentage_ram").css("color", "var(--negativeClr)")
		if(ramU <= 0)
			ramU = 0
	}
	else 
		$("#percentage_ram").css("color", "var(--mainClr)")
	//Heat
	if(Game.impermanent.heatU < 0 || Game.impermanent.heatU > 95) 
		$("#degree_heat").css("color", "var(--negativeClr)")
	else 
		$("#degree_heat").css("color", "var(--mainClr)")
	//Energy
	if(curr_energy > max_energy)
		$("#max_e").css("color", "var(--negativeClr)")
	else
		$("#max_e").css("color", "var(--mainClr)")
	$("#percentage_cpu").text(cpuU.toFixed(0)+"%")
	$("#percentage_gpu").text(gpuU.toFixed(0)+"%")
	$("#percentage_ram").text(get_data_with_symbol(ramU*1048576, ramU*1048576 > 1073741824? 2:0, 0))
	$("#degree_heat").html(Game.impermanent.heatU.toFixed(0)+'<span style="font-size: 14px;">&#8451;</span>')
	$("#percentage_threat").html(simplifyNumberSmall(Game.impermanent.threat)+"%")
	$("#cps").text("CPS: "+simplifyNumber(cps))
	$("#dps").text("DPS: "+get_data_with_symbol(dps, 3))
	$("#mpm").text("MPM: "+simplifyNumber(mpm))
	$("#nps").text(get_connection_speed_with_symbol(nps))
	$("#max_e").text("Max: "+simplifyNumber(max_energy))
	$("#con_e").text("Con: "+simplifyNumber(curr_energy))
}

function onhover_quick_info_element(id) {
	let q_title = "",
	q_sys_total = "",
	q_sys_usage = "",
	q_status = "",
	q_need = "";
	switch(id) {
	case "q_cpu": 
		q_title = "CPU usage"
		q_sys_total = "System CPU: "+simplifyNumberSmall(100+total_cpu_inc+"%")
		q_sys_usage = "CPU usage: "+simplifyNumberSmall(total_cpu_con+"%")
		q_status = "Data decoding speed: "+simplifyNumberSmall(Number((100-cpu_eff).toFixed(2))+"%")
		q_need = total_cpu_con-(100+total_cpu_inc) < 0 ? "CPU is stable": "Require at least "+simplifyNumberSmall(total_cpu_con-total_cpu_inc-100)+"% CPU power to stableize it"
		q_des = "CPU is required for everything, mainly for softwares, keep CPU under 100% to decode data at max speed"
		break;
	case "q_gpu": 
		q_title = "GPU usage"
		q_sys_total = "System GPU: "+simplifyNumberSmall(100+total_gpu_inc+"%")
		q_sys_usage = "GPU usage: "+simplifyNumberSmall(total_gpu_con+"%")
		q_status = "Credit generating speed: "+simplifyNumberSmall(Number((100-gpu_eff).toFixed(2))+"%")
		q_need = total_gpu_con-(100+total_gpu_inc) < 0 ? "GPU is stable": "Require at least"+simplifyNumberSmall(total_cpu_con-total_cpu_inc-100)+"% GPU power to stableize it"
		q_des = "GPU is required for everything, mainly for generating Credit, keep GPU under 100% to generate at max speed"
		break;
	case "q_ram": 
		q_title = "RAM usage"
		q_sys_total = "System RAM: "+get_data_with_symbol(total_ram_inc*1048576, 3)
		q_sys_usage = "RAM usage: "+get_data_with_symbol(-1*(total_ram_con*1048576), 3)
		q_status = ""
		q_need = -1*(total_ram_con*1048576)-(total_ram_inc*1048576) < 0 ? "RAM space is avaliable": "Low RAM"
		q_des = "RAM is required for installing all kinds of new wares"
		break;
	case "q_fan": 
		q_title = "Heat status"
		q_sys_total = "System Cooling: "+simplifyNumberSmall(total_heat_inc)+'<span style="font-size: 12px;">&#8451;</span>'
		q_sys_usage = "System heat: "+simplifyNumberSmall(total_heat_con)+'<span style="font-size: 12px;">&#8451;</span>'
		q_status = Game.impermanent.heatU > 95 ? "System Heat: Overheated":Game.impermanent.heatU < 0 ? "System Heat: Overcooled": "System Heat: Stable"
		if(Game.impermanent.heatU > 95) {
			if(total_heat_con-total_heat_inc-94 < 0)
				q_need = "Sufficient Cooling. Wait for cooldown"
			else 
				"Require at least "+simplifyNumberSmall(total_heat_con-total_heat_inc-94)+'<span style="font-size: 12px;">&#8451;</span> Cooling to stableize it'
		}
		else if(Game.impermanent.heatU < 0)
			if(total_heat_con-total_heat_inc > 0)
		 		q_need = "Sufficient Heat. Wait for temperature rise"
		 	else 
		 		q_need = "Require at least "+simplifyNumberSmall(total_heat_inc-total_heat_con+1)+'<span style="font-size: 12px;">&#8451;</span> Heat to stableize it'
		 else
		 	q_need = ""
		q_des = "Heat should be balanced between 0"+'<span style="font-size: 12px;">&#8451;</span>'+" and 95"+'<span style="font-size: 12px;">&#8451;</span>'+" to avoid Hardwares failures"
		break;
	case "q_threat": 
		q_title = "G.A.I.A status"
		q_sys_total = "Threat Level: "+simplifyNumberSmall(Game.impermanent.threat)+"%"
		q_sys_usage = "G.A.I.A difficulity: "+simplifyNumberSmall(Game.permanent.gaia_difficulty)
		q_status = "Firewall: "+simplifyNumberSmall(Game.impermanent.fire_wall*100)+"%"
		q_need = ""
		q_des = "When Threat reaches 100%, G.A.I.A will take control over the System, blocking access to it<br><br>G.A.I.A difficulity increases frequency of Hack attempts, sobatage effect and duration"
		break;
	case "q_cps": 
		q_title = "Credit"
		q_sys_total = "Credit generating: "+(Game.impermanent.g_eff.gaia_credit*100)+"%"
		q_sys_usage = "Total Generating Multipliers: "+simplifyNumber(Game.impermanent.total_multi*100-100)+"%"
		q_status = ""
		q_need = ""
		q_des = "Credit is used to buy all kindes of wares"
		break;
	case "q_dps": 
		q_title = "Decoded Data"
		q_sys_total = "Data decoding: "+(Game.impermanent.g_eff.gaia_data*100)+"%"
		q_sys_usage = "Total Decoding Multipliers: "+simplifyNumber(Game.impermanent.dps_total_multi*100-100)+"%"
		q_status = ""
		q_need = ""
		q_des = "Data is used to research new technologies"
		break;
	case "q_mpm": 
		q_title = "Materials"
		q_sys_total = "Materials production: "+(Game.impermanent.g_eff.gaia_materials*100)+"%"
		q_sys_usage = "Total Production Multipliers: 0%"
		q_status = ""
		q_need = ""
		q_des = "Materials is used to assumble new bots"
		break;
		break;
	case "q_net": 
		q_title = "Network"
		q_sys_total = "Network Connection: "+(Game.impermanent.g_eff.gaia_network*100)+"%"
		q_sys_usage = "Total Connection speed Multipliers: 0%"
		q_status = ""
		q_need = ""
		q_des = "Network speed is how fast you can download from the Network"
		break;
	case "q_eng": 
		q_title = "Energy"
		q_sys_total = "System Energy reach: "+(Game.impermanent.g_eff.gaia_energy*100)+"%"
		q_sys_usage = "Total Energy Multipliers: 0%"
		q_status = "Free energy: "+(max_energy-curr_energy)
		q_need = curr_energy <= max_energy ? "Energy: stable":"Energy: overload"
		q_des = "Energy is required when assigning bots, gain +1 Energy for each Solar power, and +3 for each Magnetic generator Hardwares<br><br>When Energy consumption is greater than Max Energy, all assigned bots will stop working"
		break;
	}

	$("#q_title").html(q_title)
	$("#q_sys_total").html(q_sys_total)
	$("#q_sys_usage").html(q_sys_usage)
	$("#q_status").html(q_status)
	$("#q_need").html(q_need)
	$("#q_des").html(q_des)
}