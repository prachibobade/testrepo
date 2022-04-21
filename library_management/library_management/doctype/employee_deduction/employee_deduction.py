# Copyright (c) 2022, library_management and contributors
# For license information, please see license.txt

import frappe
import datetime
#from frappe.model.document import Document

@frappe.whitelist()
def amount(month):
	def deduction_details(doc):
        doc=json.loads(doc)
        print("enter the msg")
        #doc = frappe.get_doc('Deduction Details',name)
        amount=0
        for d in doc['deduction_details']:
                amount+=float(d['amount'])
        print(amount)
        return (amount)