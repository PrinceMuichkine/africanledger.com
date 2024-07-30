"use client"

import {
  Menu,
  Box,
  Flex,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

// Define the types for the props
interface MenuItemType {
  href: string;
  label: string;
}

interface MenuHamburguerProps {
  menuItems: MenuItemType[]; // Array of menu items
  color: string; // Color type
}

const MenuHamburguer: React.FC<MenuHamburguerProps> = ({ menuItems, color }) => {
  const menuBgColor = useColorModeValue("rgba(255, 255, 255, 0.8)", "rgba(0, 0, 0, 0.8)");
  const menuHoverBgColor = useColorModeValue("rgba(237, 242, 247, 0.8)", "rgba(45, 55, 72, 0.8)");

  return (
    <Flex
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
      as="nav"
      px={1}
      my={0}
      mx="auto"
      display={["flex", "flex", "none", "none"]}
      color={color}
      zIndex={2}
    >
      <Box>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="ghost"
            color={color}
            _hover={{ bg: "transparent" }}
            _active={{ bg: "transparent" }}
            _focus={{ boxShadow: "none" }}
          />
          <MenuList bg={menuBgColor} borderColor="transparent">
            {menuItems.map((item) => (
              <MenuItem
                key={item.href}
                as={NextLink}
                href={item.href}
                passHref
                _hover={{ bg: menuHoverBgColor }}
              >
                {item.label}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Box>
    </Flex>
  );
};

export default MenuHamburguer;