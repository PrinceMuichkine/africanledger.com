import React from 'react';
import { useColorMode, IconButton, IconButtonProps, useColorModeValue } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

interface DarkModeSwitchProps extends Omit<IconButtonProps, 'aria-label'> {
  color?: string;
}

const DarkModeSwitch: React.FC<DarkModeSwitchProps> = ({ color, ...props }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const iconColor = useColorModeValue("black", "white");

  return (
    <IconButton
      aria-label="Toggle dark mode"
      icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
      onClick={toggleColorMode}
      variant="ghost"
      color={color || iconColor}
      _hover={{ background: "none" }}
      _focus={{ background: "none", border: "none" }}
      {...props}
    />
  );
};

export default DarkModeSwitch;