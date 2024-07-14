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

# Searchselect

### Properties

* buttonTitle: string
* label?: string
* preSelectedValue: string | null | unedfined
* icon?: ReactNode
* onValueChange?: void

#### ItemProperties

* title: string
* isSelected?: boolean
* highlight?: string
* onClick?: void



{% tabs %}
{% tab title="Example" %}
<figure><img src="../.gitbook/assets/image (2) (1).png" alt=""><figcaption></figcaption></figure>
{% endtab %}

{% tab title="Code" %}
```tsx
const items = ["Option 1", "Option 2", "Option 3"];

<SearchSelect size={"medium"}
              buttonTitle={"Title"}
              icon={<GitBranch size={12}/>}
>
     {items.map((item, index) => (
          <SearchSelectItem key={index}
                            title={item}
                            size={"medium"}
          />
     ))}
</SearchSelect>
```
{% endtab %}
{% endtabs %}
