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

# Dialog

### Properties

* width: number

#### HeaderProperties

* title: string
* dialogRef:  MutableRefObject\<DialogRef>
* onClose: void

#### FooterProperties

* cancelButton: boolean
* switchButton: boolean
* saveButtonTitle: string
* disabledButton?: boolean
* dialogRef: MutableRefObject\<DialogRef>
* switchRef?: MutableRefObject\<DialogRef>
* onClick?: void
* onClose?: void



{% tabs %}
{% tab title="Example" %}
<figure><img src="../.gitbook/assets/image (20).png" alt=""><figcaption></figcaption></figure>
{% endtab %}

{% tab title="Code" %}


```tsx
const dialogRef = useRef<DialogRef>(null);

<Dialog ref={dialogRef} width={600}>
    <DialogHeader title={"Example Dialog"}
                  dialogRef={dialogRef}
    />
    <DialogContent className={"space-y-2"}>
        <div className={"space-y-2"}>
            <Button text={"Button"}></Button>
            <Input placeholder={"Placeholder"}></Input>
        </div>
    </DialogContent>
    <DialogFooter saveButtonTitle={"Save"}
                  cancelButton={true}
                  switchButton={false}
                  dialogRef={dialogRef}
                  disabledButton={false}
    />
</Dialog>

<button onClick={() => dialogRef?.current.show()}>Dialog</button>
```
{% endtab %}
{% endtabs %}
