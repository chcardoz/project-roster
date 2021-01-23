import { Box, Stack } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

interface CoachLinksProps {
  textColor: string;
}

export const CoachLinks: React.FC<CoachLinksProps> = ({ textColor }) => {
  const router = useRouter();
  return (
    <Stack
      spacing={6}
      color={textColor}
      justify="center"
      align="center"
      isInline
    >
      <Box position="relative" opacity={router.pathname !== "/" ? 0.4 : 1}>
        <Link href="/">
          <a>Dashboard</a>
        </Link>
      </Box>
      <Box
        position="relative"
        opacity={router.pathname !== "/roster" ? 0.4 : 1}
      >
        <Link href="/roster">
          <a>Roster</a>
        </Link>
      </Box>
      <Box
        position="relative"
        opacity={router.pathname !== "/meetings" ? 0.4 : 1}
      >
        <Link href="/meetings">
          <a>Meetings</a>
        </Link>
      </Box>
      <Box position="relative" opacity={router.pathname !== "/list" ? 0.4 : 1}>
        <Link href="/list">
          <a>List</a>
        </Link>
      </Box>
    </Stack>
  );
};
