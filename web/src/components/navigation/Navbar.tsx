import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Flex,
  useColorMode,
  Box,
  Button,
  HStack,
  useDisclosure,
  Spacer,
  Heading,
  Skeleton,
} from "@chakra-ui/react";
import React from "react";
import { useMeQuery } from "../../generated/graphql";
import { isServer } from "../../utils/isServer";
import { CoachLinks } from "./CoachLinks";
import LoginModal from "../modals/LoginModal";
import { RegisterModal } from "../modals/RegisterModal";
import { UserAvatar } from "../UserAvatar";
import { CoordinatorLinks } from "./CoordinatorLinks";

interface NavBarProps {}

export const Navbar: React.FC<NavBarProps> = () => {
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  const {
    isOpen: isOpenRegister,
    onOpen: onOpenRegister,
    onClose: onCloseRegister,
  } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = { light: "whitesmoke", dark: "indigo.500" };
  const textColor = { light: "black", dark: "white" };

  let body = null;
  let links = null;
  if (!data?.currentCoach) {
    body = (
      <>
        <HStack>
          <Skeleton rounded="full" isLoaded={!fetching}>
            <Button onClick={onOpen} rounded="full">
              Login
            </Button>
          </Skeleton>
          <Skeleton rounded="full" isLoaded={!fetching}>
            <Button ml={2} onClick={onOpenRegister} rounded="full">
              Register
            </Button>
          </Skeleton>
        </HStack>
        <LoginModal onClose={onClose} isOpen={isOpen} />
        <RegisterModal onClose={onCloseRegister} isOpen={isOpenRegister} />
      </>
    );
  } else {
    body = <UserAvatar color={textColor[colorMode]} data={data} />;
    if (data?.currentCoach.isCoordinator) {
      links = <CoordinatorLinks textColor={textColor[colorMode]} />;
    } else {
      links = <CoachLinks textColor={textColor[colorMode]} />;
    }
  }

  return (
    <Flex
      w="100vw"
      bg={bgColor[colorMode]}
      align="center"
      color={textColor[colorMode]}
      justify="center"
      fontSize={["md", "lg", "xl", "xl"]}
      h="7vh"
      p={2}
      zIndex={2}
      position="sticky"
      top="0"
    >
      <Box p={2}>
        <Heading>ROSTER</Heading>
      </Box>
      <Spacer />
      {links}
      <Spacer />
      <HStack>
        <Box pr={8}>{body}</Box>
        <Box>
          <Button rounded="full" onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Box>
      </HStack>
    </Flex>
  );
};
