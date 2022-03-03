
import frappe
#from frappe import __

def execute(filters=None):
        columns = get_columns()
        conditions=get_conditions(filters)
        data=get_data(filters,conditions)
        return columns, data

def get_columns():
        columns = [
        {
            'fieldname': 'company',
                'label': 'Company',
                'fieldtype': "Data",
        },
        {  
                 'fieldname': 'supplier_group',
                'label': 'Supplier_Group',
                'fieldtype': "Link",
                'options': 'Supplier Group'
        },
        {
            'fieldname': 'name',
                'label': 'Name',
                'fieldtype': "Data",
        },
        {
                'fieldname': 'supplier_name',
                'label': 'Supplier',
                'fieldtype': "Link",
                'options': 'Supplier'
        },
        {
                'fieldname': 'rate',
                'label': 'Rate',
                'fieldtype': "float",
        },
        {
                'fieldname': 'amount',
                'label': 'Amount',
                'fieldtype': "float",
        },
        {
                'fieldname': 'item_code',
                'label': 'Item_Code',
                'fieldtype': "Link",
                'options': 'Item'        
        }
        
        ]
        return columns
def get_conditions(filters):
        conditions=""
        if filters.get("company"):
                conditions+= "and p.company='{}'".format(filters.get('company'))

        if filters.get("supplier_group"):
                conditions+="and `tabSupplier`.supplier_group='{}'".format(filters.get('supplier_group'))
        if filters.get("name"):
                conditions+="and p.name='{}'".format(filters.get('name'))
        return conditions

def get_data(filters,conditions):
        query=frappe.db.sql(""" select p.company,tabSupplier.supplier_group,
        p.name,`tabSupplier`.supplier_name,
        `tabPurchase Order Item`.rate,`tabPurchase Order Item`.amount,
        `tabPurchase Order Item`.item_code from `tabPurchase Order`p
        left  join `tabPurchase Order Item` on p.name=`tabPurchase Order Item`.parent 
        left join `tabSupplier` on `tabSupplier`.supplier_name=p.supplier where 
        `tabSupplier`.supplier_name!= '' %s""" %(conditions),as_dict=1)        
        return query


