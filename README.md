# ned

Ned is a markdown editor built on top of [lexical](https://lexical.dev).

## Features

- Markdown support
- Image support
- Hashtag support
- Rich text editing

## Usage

```tsx
import { Editor, InsertImageButton } from "nostr-edit";

function MyEditor() {
  return (
    <div>
      <Editor 
        editorName="myEditor"
        onChange={(markdown) => console.log(markdown)}
        onBlur={(markdown) => console.log("blur", markdown)}
        onFocus={(markdown) => console.log("focus", markdown)}
      />
      <InsertImageButton />
    </div>
  );
}
```

### Adding Images

There are two ways to add images:

1. Use the `InsertImageButton` component:

```tsx
<InsertImageButton altText="My image" />
```

2. Use markdown syntax in the editor:

```
![Alt text](https://example.com/image.jpg)
```

3. Programmatically dispatch the insert image command:

```tsx
import { INSERT_IMAGE_COMMAND, ImagePayload } from "nostr-edit";

// Inside a component with access to the Lexical editor instance
editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
  src: "https://example.com/image.jpg",
  altText: "My image",
  width: 500, // optional
  height: 300, // optional
});
```
