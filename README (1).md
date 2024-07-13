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

# Button

### Properties

* theme: "dark"(default) | "white"
* size: "small" | "medium"(default)
* text: string
* icon?: ReactNode



{% tabs %}
{% tab title="First Tab" %}
<figure><img src=".gitbook/assets/image (2) (1).png" alt=""><figcaption></figcaption></figure>
{% endtab %}

{% tab title="Second Tab" %}
```tsx
<Button theme={"dark"}
        size={"medium"}
        text={"Open Wallet"}
        icon={<Wallet size={20} className={"mr-3"}/>}
/>
```
{% endtab %}
{% endtabs %}
