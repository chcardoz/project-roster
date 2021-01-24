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
import { CreateStudentModal } from "../components/modals/CreateStudent";
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
    header = (
      <>
        <Heading>Roster Management</Heading>
        <Text mt={3}>
          This is a place to locate all of your students and their details. You
          cannot add or delete students but you can view their details.
        </Text>
        <Button mt={5} onClick={onOpen} rounded="full">
          Create Student
        </Button>
        <CreateStudentModal isOpen={isOpen} onClose={onClose} />
      </>
    );
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
