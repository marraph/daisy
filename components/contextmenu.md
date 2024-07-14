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

# Contextmenu

#### Item Properties

* title: string
* shortcut?: string
* icon?: ReactNode
* onClick?: void



{% tabs %}
{% tab title="Example" %}
<figure><img src="../.gitbook/assets/image (1) (1) (1) (1).png" alt=""><figcaption></figcaption></figure>
{% endtab %}

{% tab title="Second Tab" %}
```tsx
<ContextMenu>
    <ContextMenuItem title="Item 1" icon={<GitBranch size={14}/>}/>
    <ContextMenuItem title="Item 2"/>
    <ContextMenuItem title="Item 3" shortcut={"⌘S"}/>
</ContextMenu>
```
{% endtab %}
{% endtabs %}
