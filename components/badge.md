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

# Badge

### Properties

* border: "white" | "none" (default)
* theme: "dark"(default) | "white"
* size: "small" | "medium"(default) | "large"
* text: string



{% tabs %}
{% tab title="First Tab" %}
<figure><img src="../.gitbook/assets/image (4).png" alt=""><figcaption></figcaption></figure>
{% endtab %}

{% tab title="Second Tab" %}
```tsx
<Badge text={"Hello World!"} 
       border={"white"} 
       theme={"white"} 
       className={"rounded-md"}
/>
```
{% endtab %}
{% endtabs %}

