@frappe.whitelist(allow_guest=True)
def check_if_doc_is_linked1(source_name, method="Cancel"):
	doc_m = frappe.get_doc("Supplier Quotation", source_name)
	frappe.msgprint("Function Called")
	"""
		Raises excption if the given doc(dt, dn) is linked in another record.
	"""
	from frappe.model.rename_doc import get_link_fields
	link_fields = get_link_fields(doc_m.doctype)
	link_fields = [[lf['parent'], lf['fieldname'], lf['issingle']] for lf in link_fields]
	for link_dt, link_field, issingle in link_fields:
		if not issingle:
			for item in frappe.db.get_values(link_dt, {link_field:doc_m.name},
				["name", "parent", "parenttype", "docstatus"], as_dict=True):
				if item and ((item.parent or item.name) != doc_m.name) \
						and ((method=="Delete" and item.docstatus<2) or (method=="Cancel" and item.docstatus==0)):
					# raise exception only if
					# linked to an non-cancelled doc when deleting
					# or linked to a submitted doc when cancelling
					frappe.throw(_('Cannot delete or cancel because {0} <a href="#Form/{0}/{1}">{1}</a> is linked with {2} <a href="#Form/{2}/{3}">{3}</a>')
						.format(doc_m.doctype, doc_m.name, item.parenttype if item.parent else link_dt,
						item.parent or item.name), frappe.LinkExistsError)