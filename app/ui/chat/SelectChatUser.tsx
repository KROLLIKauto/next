'use client'

import { CustomerField } from '@/app/lib/definitions'

export default async function SelectChatUser({ customers } : {customers: CustomerField[]}) {

  const selectValue = (CustomerId: any) => {
    const customer = customers.find(customer => customer.id === CustomerId)
    sessionStorage.setItem('customer', customer?.name || '')

    console.log(customer?.name, 'CustomerName')
  }

  return (
    <select
      id="customer"
      name="customerId"
      className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
      defaultValue=""
      aria-describedby="customer-error"
      onChange={(e)=>selectValue(e.target.value)}
    >
      <option value="" disabled>
        Select a customer
      </option>
      {customers.map((customer) => (
        <option key={customer.id} value={customer.id} >
          {customer.name}
        </option>
      ))}
    </select>
  );
}