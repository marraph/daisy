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

# Skeleton

#### ElementProperties

* width: number
* height: number



{% tabs %}
{% tab title="Example" %}
<figure><img src="../.gitbook/assets/image (21).png" alt=""><figcaption></figcaption></figure>
{% endtab %}

{% tab title="Code" %}
```tsx
<Skeleton className={"space-x-4"}>
    <SkeletonElement width={100} height={100}/>
    <SkeletonColumn className={"space-y-2"}>
        <SkeletonElement width={300} height={40}/>
        <SkeletonElement width={400} height={30}/>
    </SkeletonColumn>
</Skeleton>
```
{% endtab %}
{% endtabs %}

