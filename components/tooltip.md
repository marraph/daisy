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

# Tooltip

### Properties

message: string

delay: number



{% tabs %}
{% tab title="Example" %}

{% endtab %}

{% tab title="Code" %}


<pre class="language-tsx"><code class="lang-tsx"><strong>const tooltipRef = useRef&#x3C;TooltipRef>(null);
</strong><strong>
</strong><strong>&#x3C;div onMouseEnter={(event) => tooltipRef.current?.show(event)}
</strong>     onMouseLeave={() => tooltipRef.current?.hide()}
/>

&#x3C;Tooltip message={"this is a tooltip"} 
         delay={500} 
         ref={tooltipRef}
/>
</code></pre>
{% endtab %}
{% endtabs %}
