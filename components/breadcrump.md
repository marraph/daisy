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

# Breadcrump

### Properties

* pastText: string
* nowText: string
* onClick?: MouseEventHandler\<HTMLSpanEvent>



{% tabs %}
{% tab title="First Tab" %}
<figure><img src="../.gitbook/assets/image (1) (1) (1) (1) (1).png" alt=""><figcaption></figcaption></figure>
{% endtab %}

{% tab title="Second Tab" %}
```tsx
const router = useRouter();
        
return <Breadcrump pastText={"Home"}
                   nowText={"About"}
                   onClick={() => router.push('/home')}
/>
```
{% endtab %}
{% endtabs %}
