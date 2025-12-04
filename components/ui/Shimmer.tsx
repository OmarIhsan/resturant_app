import React from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';

export default function Shimmer({ style }: { style?: StyleProp<ViewStyle> }) {
  const shimmer = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, { toValue: 1, duration: 900, useNativeDriver: true }),
        Animated.timing(shimmer, { toValue: 0, duration: 900, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [shimmer]);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: shimmer.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] }),
        },
      ]}
    />
  );
}
