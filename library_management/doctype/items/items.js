//frappe.ui.form.on('Item', {
//        refresh(frm) {
//                console.log("text")
                // your code here
        
  //      frm.add_custom_button(__('codes'), function(){
                    //frappe.new_doc('Item',true)
                    //frappe.set_route("Form", "Purchase Order")
                    //frappe.msgprint(InsertBarcode);
        
 //       frappe.call({
 //        method:"library_management.doctype.items.items.item_code",
  //        args:{
 //             'item_code' : frm.doc.item_code
  //        },
//              async:false,
              
 //             callback:function(r){
 //                 console.log(r);
 //             }
  //    })
  //      })
  //}
        
//})

frappe.ui.form.on('Item', {
    refresh: function(frm) {
    frm.add_custom_button(__('Barcode'), function(){
         //frappe.new_doc('barcodes',true)
    //frappe.msgprint(frm.doc.Barcode);
     {
      frappe.call({
          method:"library_management.doctype.items.items.item_code",
          
          args:{
              'item_code' : frm.doc.item_code
          },
              async:false,
              callback:function(r){
                 frm.reload_doc()
                  console.log(r);
              }
      })
  }
     
});
  }
 
})