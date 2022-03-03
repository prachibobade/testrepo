import frappe
from frappe.core.doctype.communication.email import make

def send_notifications(self,doc):
	print("print the sales order nub")
	msg="Your msg is submitted successfully"
	make(subject = "Email Subject", content=msg,recipients='prachi.b@promantia.com',send_email=True)
	frappe.msgprint(msg)




























#import frappe
#from frappe.core.doctype.communication.email import make

#def send_notifications(self,doc):
#	try:
#		print("print the sales order nub")
#		msg="Your msg is submitted successfully"
#		make(subject = "Email Subject", content=msg, recipients='prachi.b@promantia.com',send_email=True)
#		frappe.msgprint(msg)
#	except:
#		msg1 = "could not send"
#		frappe.msgprint(msg1)
  


#def get_sender_details(self,doc):
 #   return "Vijay N", "vijay.n@promantia.com"

#def send(self, sender, recipient, msg):
    # smtp or http request
 #   self.update_status("Sending")


