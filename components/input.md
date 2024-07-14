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

# Input

### Properties

* placeholder: string
* label?: string
* icon: ReactNode
* preSelectedValue?: string | number | null | unedfined
* onChange?: void



{% tabs %}
{% tab title="Example" %}
<figure><img src="../.gitbook/assets/image (1) (1).png" alt=""><figcaption></figcaption></figure>
{% endtab %}

{% tab title="Code" %}
```tsx
<Input placeholder={"Small input"}
       elementSize={"medium"}
       label={"Label"}
       icon={<Hourglass size={16}/>}
/>
```
{% endtab %}
{% endtabs %}
