frappe.ui.form.on("Supplier Quotation","before_cancel", function(frm, doctype, name) { 
msgprint("Called");
var data1 =  {
	    //"doc": frm.name
	     frm: cur_frm
           };
	    frappe.call({
                       method: "library_management.delete_doctype.check_if_doc_is_linked1",
	               args: data1,
                       callback: function(r) 
                      { }
});
msgprint("Code Passed");
});