// components/Toast/CustomToast.tsx

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Dimensions, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

const DURATION = 4000;
const WINDOW_HEIGHT = Dimensions.get('window').height;

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onHide?: () => void;
  duration?: number;
}

export const CustomToast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  onHide,
  duration = DURATION,
}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(WINDOW_HEIGHT);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateY: translateY.value },
      { translateX: '-50%' }, // Use fixed value instead of percentage
    ],
  }));

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 100 });
    translateY.value = withSpring(-0, {
      damping: 15,
      stiffness: 100,
    });

    const timer = setTimeout(() => {
      hideToast();
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  const hideToast = () => {
    opacity.value = withTiming(0, { duration: 200 });
    translateY.value = withSpring(
      WINDOW_HEIGHT,
      {
        damping: 15,
        stiffness: 100,
      },
      () => {
        runOnJS(onHide as any)?.();
      },
    );
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return '#4caf50';
      case 'error':
        return '#f44336';
      default:
        return '#2196f3';
    }
  };

  return (
    <Animated.View
      onTouchEnd={hideToast}
      style={[
        animatedStyle,
        {
          backgroundColor: '#000000aa',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          left: '50%',
          bottom: 100,
          borderRadius: 8,
          padding: 8,
          paddingHorizontal: 12,
          zIndex: 999999999,
          gap: 8,
        },
      ]}
    >
      <View
        style={{
          width: 8,
          height: 8,
          borderRadius: 50,
          backgroundColor: getBackgroundColor(),
        }}
      ></View>
      <Text style={{ fontSize: 14, color: 'white' }}>{message}</Text>
    </Animated.View>
  );
};

import { EventEmitter } from 'events';

type ToastType = 'success' | 'error' | 'info';

interface ToastOptions {
  message: string;
  type?: ToastType;
  duration?: number;
}

class ToastManager {
  private static instance: ToastManager;
  private emitter: EventEmitter;

  private constructor() {
    this.emitter = new EventEmitter();
  }

  public static getInstance(): ToastManager {
    if (!ToastManager.instance) {
      ToastManager.instance = new ToastManager();
    }
    return ToastManager.instance;
  }

  show(options: ToastOptions) {
    this.emitter.emit('show', options);
  }

  subscribe(callback: (options: ToastOptions) => void) {
    this.emitter.on('show', callback);
    return () => this.emitter.off('show', callback);
  }
}

export const toast = ToastManager.getInstance();

// ToastContainer.tsx

export const ToastContainer: React.FC = () => {
  const [toastConfig, setToastConfig] = useState<{
    visible: boolean;
    message: string;
    type: ToastType;
    duration: number;
  }>({
    visible: false,
    message: '',
    type: 'info',
    duration: 2000,
  });

  //@ts-ignore
  useEffect(() => {
    const unsubscribe = toast.subscribe((options) => {
      setToastConfig({
        visible: true,
        message: options.message,
        type: options.type || 'info',
        duration: options.duration || 2000,
      });
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      {toastConfig.visible && (
        <CustomToast
          message={toastConfig.message}
          type={toastConfig.type}
          onHide={() => setToastConfig((prev) => ({ ...prev, visible: false }))}
          duration={toastConfig.duration}
        />
      )}
    </>
  );
};
