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

# Daterangepicker

### Properties

* text: string
* preSelectedRange?: DateRange | undefined
* closeButton: boolean
* dayFormat: "short" | "long"
* onClose?: void
* onRangeChange?: void



{% tabs %}
{% tab title="Example" %}
<figure><img src="../.gitbook/assets/image.png" alt=""><figcaption></figcaption></figure>
{% endtab %}

{% tab title="Second Tab" %}
```tsx
<DateRangePicker text={"Select a range"}
                 size={"medium"}
                 dayFormat={"short"}
                 closeButton={true}
/>
```
{% endtab %}
{% endtabs %}
