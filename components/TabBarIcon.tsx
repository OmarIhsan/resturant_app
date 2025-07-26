import { MaterialIcons } from '@expo/vector-icons';
import { Icon, Box, Text } from 'native-base';
import React from 'react';

interface TabBarIconProps {
  name: React.ComponentProps<typeof MaterialIcons>['name'];
  color: string;
  focused: boolean;
  size?: number;
  badgeCount?: number;
}

export const TabBarIcon: React.FC<TabBarIconProps> = ({
  name,
  color,
  focused,
  size = 28, // Increased default size
  badgeCount,
}) => {
  return (
    <Box position="relative">
      <Icon
        as={MaterialIcons}
        name={name}
        size={size}
        color={color}
        opacity={focused ? 1 : 0.7}
      />
      {badgeCount && badgeCount > 0 && (
        <Box
          position="absolute"
          top={-2}
          right={-2}
          bg="red.500"
          rounded="full"
          w={5}
          h={5}
          alignItems="center"
          justifyContent="center"
        >
          <Text color="white" fontSize="xs" fontWeight="bold">
            {badgeCount}
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default TabBarIcon;
