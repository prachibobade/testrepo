// Copyright (c) 2022, library_management and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Test4"] = {
	"filters": [{
                'fieldname': 'company',
                'label': __('Company'),
                'fieldtype': 'Link',
                'options': 'Company',
		'reqd': 1
        },
        {
                'fieldname': 'supplier_group',
                'label': __('Supplier'),
                'fieldtype': 'Link',
                'options': 'Supplier'
        },
        {
		"fieldname": "name",
		"label": __("Purchase Order"),
		"fieldtype": "Link",
		"width": "80",
		"options": "Purchase Order",
		"get_query": () =>{
		return {
			filters: { "docstatus": 1 }
				}
			}
	}]

        
};
