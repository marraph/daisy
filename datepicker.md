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

# Datepicker

### Properties

* text: string
* size: "small" | "medium"(default)
* preSelectedValue?: Date | null | undefined
* dayFormat: "short" | "long"
* closeButton: boolean
* onClose?: void
* onValueChange?: void



{% tabs %}
{% tab title="Example" %}
<figure><img src=".gitbook/assets/image.png" alt=""><figcaption></figcaption></figure>
{% endtab %}

{% tab title="Code" %}
```tsx
<DatePicker text={"Select a date"}
            size={"small"}
            dayFormat={"long"}
            closeButton={true}
            onValueChange={(value) => console.log(value)}
/>
```
{% endtab %}
{% endtabs %}
