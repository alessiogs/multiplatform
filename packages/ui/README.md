# `@multiplatform/ui`

Shared primitives for the SPA, Next.js, and Expo apps. The package selects DOM renderers for web and React Native renderers for native platforms while keeping the component props consistent.

Import the components from the package root:

```tsx
import { Button, Card, Input, Text } from '@multiplatform/ui';
```

Load the component stylesheet once in each web app, after the token stylesheet:

```css
@import '@multiplatform/tokens/tokens.css';
@import '@multiplatform/ui/ui.css';
```

On Expo, the stylesheet is used only on web; the native implementations use the same tokens through React Native styles.

Available variants:

- `Text`: `body`, `small`, `heading`, `title`, `subtitle`, `code`
- `Button`: `primary`, `secondary`, `outline`, `danger`; sizes `sm`, `md`, `lg`
- `Card`: `default`, `outlined`, `elevated`; padding `none`, `sm`, `md`, `lg`
- `Input`: `text`, `email`, `password`, `search`

`Button` uses `onPress`, and `Input` uses `onChangeText` to keep event behavior portable across DOM and native implementations.
