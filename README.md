# Toast Notification System for Expo React Native Project

This is a custom toast notification system for Expo React Native projects. The system uses a singleton `ToastManager` to manage toast notifications globally, and a `ToastContainer` component to display the toast messages.

## Features

- **Global Toast Management**: The `ToastManager` allows toast notifications to be triggered from anywhere in the app.
- **Customizable Toasts**: You can specify the message, type (`success`, `error`, `info`), and duration of the toast.
- **Automatic or Manual Dismissal**: Toasts automatically disappear after a specified duration, or they can be manually dismissed by tapping on them.
- **React Native Reanimated**: Uses `react-native-reanimated` to animate toast appearances and disappearances.

## Installation

1. Clone the repository:

```bash
npm i expo-toastee
```

2. Import the `ToastManager` and `ToastContainer` components into your project:

```tsx
import { ToastContainer } from 'expo-toastee'

// Inside your main component
return (
  <View style={styles.container}>
    <Text>My App</Text>
    <ToastContainer />
  </View>
)
```

3. Trigger a toast message from anywhere in your app:

```tsx
import { toast } from 'expo-toastee'

// Show a toast message
toast.show({
  message: 'Operation successful!',
  type: 'success', // 'success', 'error', 'info'
  duration: 3000, // Duration in milliseconds (default is 2000ms)
})
```

## Usage

The toast notification system consists of two components: `ToastManager` and `ToastContainer`.

# Toast Notification System for Expo React Native Project

This is a custom toast notification system for Expo React Native projects. The system uses a singleton `ToastManager` to manage toast notifications globally, and a `ToastContainer` component to display the toast messages.
