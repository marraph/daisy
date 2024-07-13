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

# Combobox

### Properties

* buttonTitle: string
* size: "small" | "medium"(default)
* preSelectedValue?: string | null | undefined
* icon?: ReactNode
* onValueChange?: void
* label?: string

#### Item Properties

* title: string
* isSelected?: boolean
* onClick?: void



{% tabs %}
{% tab title="Example" %}
<figure><img src="../.gitbook/assets/image (19).png" alt=""><figcaption></figcaption></figure>
{% endtab %}

{% tab title="Code" %}
```tsx
const items = ["Option 1", "Option 2", "Option 3"];

<Combobox size={"medium"}
          buttonTitle={"Title"}
          icon={<GitBranch size={12} className={"mr-2"}/>}
          onValueChange={(value) => console.log(value)}
          label={"Label"}
>
   {items.map((item, index) => (
        <ComboboxItem key={index} 
                      title={item} 
                      size={"medium"}
        />
    ))}
</Combobox>
```
{% endtab %}
{% endtabs %}
