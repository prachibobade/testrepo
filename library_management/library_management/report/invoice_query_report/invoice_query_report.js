frappe.query_reports["Invoice query report"] = {
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
                'fieldname': 'from_date',
                'default':frappe.datetime.add_days(frappe.datetime.get_today(),-30),
                'label': __('From date'),
                'fieldtype': 'Date'
        },
        {
                'fieldname': 'to_date',
                'default':frappe.datetime.get_today(),
                'label': __('To date'),
                'fieldtype': 'Date'
        }
        
	]

        
};
