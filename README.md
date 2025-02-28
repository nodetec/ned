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
    </div>
  );
}
```

### Adding Images

1. Use markdown syntax in the editor:

```
![Alt text](https://example.com/image.jpg)
```

2. Just paste an image directly into the editor
