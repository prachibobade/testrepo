import frappe
@frappe.whitelist()
def item_code(item_code):
        item_code = frappe.form_dict.get('item_code')
        i = frappe.get_doc('Item',item_code)
        frappe.msgprint("item code is " +item_code);

        i.append('barcodes',{
            'barcode' : item_code
        })

        i.save();
        return "sucess"