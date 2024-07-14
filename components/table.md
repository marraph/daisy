---
layout:
  title:
    visible: true
  description:
    visible: false
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
---

# Table

#### TableActionProperties

* onClick: void
* className?: string



{% tabs %}
{% tab title="Example" %}
<figure><img src="../.gitbook/assets/image (2).png" alt=""><figcaption></figcaption></figure>
{% endtab %}

{% tab title="Code" %}
```tsx
const invoices = [...];

<Table>
    <TableHeader>
        <TableRow className={"border-none hover:bg-black w-full"}>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Amount</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
                <TableCell>{invoice.invoice}</TableCell>
                <TableCell>{invoice.paymentStatus}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell>{invoice.totalAmount}</TableCell>
                <TableAction onClick={() => console.log("Clicked")}/>
            </TableRow>
        ))}
    </TableBody>
</Table>
```
{% endtab %}
{% endtabs %}
