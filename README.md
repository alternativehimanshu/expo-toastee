# CustomToast Component & ToastManager

This repository contains a custom toast notification implementation for React Native using the `react-native-reanimated` library. The `CustomToast` component displays a toast notification with smooth animations, while the `ToastManager` is responsible for managing and emitting toast notifications throughout the app.

## Features

- Displays customizable toast notifications with smooth animations.
- Supports multiple toast types: `success`, `error`, and `info`.
- Toast disappears automatically after a specified duration or can be dismissed by the user.
- Allows global toast management using a singleton `ToastManager`.

## Components

### `CustomToast`

The `CustomToast` component renders a toast notification with a background color depending on the toast type (`success`, `error`, `info`). It provides smooth entrance and exit animations, and can be dismissed on touch or after a specified duration.

#### Props

- `message` (string, required): The message to be displayed in the toast notification.
- `type` ('success' | 'error' | 'info', optional): The type of the toast, which determines the background color. Default is `info`.
- `onHide` (function, optional): A callback function that is called when the toast is dismissed.
- `duration` (number, optional): The duration (in milliseconds) for which the toast is visible before it disappears. Default is `4000` ms.

#### Example Usage

```tsx
<CustomToast
  message="Data saved successfully!"
  type="success"
  duration={3000}
  onHide={() => console.log('Toast hidden')}
/>
```
