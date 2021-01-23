import {
  Popover,
  PopoverTrigger,
  Avatar,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Button,
  Badge,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { MeQuery, useLogoutMutation } from "../generated/graphql";

interface UserAvatarProps {
  data: MeQuery;
  color: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ data, color }) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar name={data?.currentCoach?.username} mr={2} />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader color={color}>
          <Flex align="center">
            {data?.currentCoach?.firstName} {data?.currentCoach?.lastName}
            <Badge ml={5} colorScheme="green">
              {data?.currentCoach?.isCoordinator ? "Coordinator" : "Coach"}
            </Badge>
          </Flex>
        </PopoverHeader>
        <PopoverBody maxW="sm">
          <Button
            onClick={() => {
              logout();
            }}
            isLoading={logoutFetching}
            color={color}
            variant="link"
          >
            logout
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
