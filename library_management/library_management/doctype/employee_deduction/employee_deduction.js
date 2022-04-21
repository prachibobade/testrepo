// Copyright (c) 2022, library_management and contributors
// For license information, please see license.txt

frappe.ui.form.on('Employee Deduction', {
	before_save:function(frm,cdt,cdn) {
		var d = new Date();
		var year = d.getFullYear().toString().slice(-2);
		const month = d.toLocaleString('default', { month: 'short' });
		var dateStr = month + "-" + year;
		var current_month_amount = 0
		var total_amount=0
		var curr_month_number=new Date(month +'-1-01').getMonth()+1
		$.each(frm.doc.deduction_calculation, function(i,d){
			var curr_month=d.month
			const month_array = curr_month.split("-");
			var date_month=new Date(month_array[0] +'-1-01').getMonth()+1
			if(year==month_array[1] && date_month<=curr_month_number){
				total_amount += d.balance;
				console.log("output",total_amount)
			}
			if(d.month==dateStr){
				current_month_amount=d.balance
			}
		})
		frm.set_value('current_month_balance',current_month_amount)
		frm.set_value('total_balance',total_amount)
		refresh_field('total_balance')
	}
});

frappe.ui.form.on('Deduction Detail', {
	start_date: function(frm,cdt,cdn) {
		var d = locals[cdt][cdn];
		if(d.deduction_type == 'Onetime') {
			var end_date = moment(d.start_date).endOf('month').format('YYYY-MM-DD')
			d.end_date=end_date
			
			frm.refresh_field("deduction_detail")
		}
	},
	amount:function(frm,cdt,cdn) {
		var cur_grid =frm.get_field('deduction_detail').grid;
		var cur_doc = locals[cdt][cdn];
		var cur_row = cur_grid.get_row(cur_doc.name);
		if (cur_doc.end_date==null){
			cur_frm.refresh_field('amount')
			frappe.throw("end_date is mandetory")
		}
		else{
		if (cur_doc.amount < 0){
			frappe.msgprint("amount shoukd not be negative")
		}
		else if(cur_doc.deduction_type=='Onetime'){
			frappe.call({
				method:"library_management.library_management.doctype.employee_deduction.employee_deduction.calculation_deduction_detail",
				args:{
					'start_date' : cur_doc.start_date,
					'end_date' : cur_doc.end_date,
					'total':cur_doc.total,
					'actual_paid':cur_doc.actual_paid,
					'balance':cur_doc.balance
				},
				async:false,
				callback:function(r){
					var child = false
					$.each(frm.doc.deduction_calculation, function(i,d){
						if(d.month == r.message){
							// d.onetime = cur_doc.amount;
							// d.total = d.onetime + d.recurring;
							 d.onetime += cur_doc.amount;
							 d.total += cur_doc.amount;
							d.balance = d.total - d.actual_paid;
							child = true
						}
					})
					if(child==false){
						var child = cur_frm.add_child("deduction_calculation");
						frappe.model.set_value(child.doctype,child.name,"month",r.message);
						frappe.model.set_value(child.doctype,child.name,"onetime",cur_doc.amount);
						var total = child.onetime + child.recurring;
						frappe.model.set_value(child.doctype,child.name,"total",total);
						var balance = child.total - child.actual_paid;
						frappe.model.set_value(child.doctype,child.name,"balance",balance);
						
			  			
					}
					cur_frm.refresh_field('deduction_calculation')
				}
			
			})
		
		}
		else if(cur_doc.deduction_type=='Recurring'){
			frappe.call({
				method:"library_management.library_management.doctype.employee_deduction.employee_deduction.calculation_detail",
				args:{
					'start_date' : cur_doc.start_date,
					'end_date' : cur_doc.end_date,
					'amount'	: cur_doc.amount,
					'total':cur_doc.total,
					'actual_paid':cur_doc.actual_paid,
					'balance':cur_doc.balance
				},
				async:false,
				callback:function(r){
					for (var result=0 ; result < r.message.list_of_month.length; result++){
						var child_table = false
						$.each(frm.doc.deduction_calculation, function(i,d){
						  if(d.month == r.message.list_of_month[result]){
								  d.recurring += r.message.dis_amount;
								  //d.recurring = r.message.dis_amount;
								  d.total += r.message.dis_amount;
								  //d.total +=  d.onetime + d.recurring;
								  d.balance = d.total-d.actual_paid;
								  child_table = true;
								}
							})
							if(child_table==false){
								var child_table = cur_frm.add_child("deduction_calculation");
								frappe.model.set_value(child_table.doctype,child_table.name,"month",r.message.list_of_month[result]);
								frappe.model.set_value(child_table.doctype,child_table.name,"recurring",r.message.dis_amount);
								frappe.model.set_value(child_table.doctype,child_table.name,"total",r.message.dis_amount);
								var balance = child_table.total - child_table.actual_paid
								console.log("doe",balance)
								frappe.model.set_value(child_table.doctype,child_table.name,"balance",balance);
							}
							cur_frm.refresh_field('deduction_calculation')
						}
					
					}
				})
			}
		}
	}
})
frappe.ui.form.on('Deduction Calculation',{
	actual_paid:function(frm,cdt,cdn){
		var set_value = locals[cdt][cdn];
		set_value.balance=set_value.total-set_value.actual_paid;
		refresh_field('deduction_calculation')
	}
})

