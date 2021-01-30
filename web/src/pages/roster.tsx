import { withUrqlClient } from "next-urql";
import { Wrapper } from "../components/Wrapper";
import { createUrqlClient } from "../utils/createUrqlClient";
import {
  Heading,
  Text,
  useDisclosure,
  Button,
  Spinner,
} from "@chakra-ui/react";
import CreateStudentModal from "../components/modals/CreateStudent";
import { useMeQuery } from "../generated/graphql";
import { PopulationTabs } from "../components/tables/PopulationTabs";

const Roster = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [{ data, fetching }] = useMeQuery();

  let header = null;
  let tabs = null;
  if (fetching) {
    header = <Spinner />;
  } else if (data?.currentCoach === null) {
    header = <Heading> Please log in to see your student roster </Heading>;
    tabs = null;
  } else if (data?.currentCoach !== null) {
    if (data?.currentCoach.isCoordinator) {
      header = (
        <>
          <Heading>STUDENT ROSTER</Heading>
          <Text mt={3}>
            Place to see all the assigned and unassigned students. You can
            create new students with the button below and also click on actions
            to assign or unassign students to your coaches
          </Text>
          <Button mt={5} onClick={onOpen} rounded="full">
            Create Student
          </Button>
          <CreateStudentModal isOpen={isOpen} onClose={onClose} />
        </>
      );
    } else {
      header = (
        <>
          <Heading>STUDENT ROSTER</Heading>
          <Text mt={3}>
            This is a place to locate all of your students and their details.
            You cannot add or delete students but you can view their details.
          </Text>
        </>
      );
    }
    tabs = <PopulationTabs />;
  }

  return (
    <>
      <Wrapper>{header}</Wrapper>
      {tabs === null ? null : <Wrapper>{tabs}</Wrapper>}
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Roster);
