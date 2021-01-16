import { withUrqlClient } from "next-urql";
import { Wrapper } from "../components/Wrapper";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Heading, Text, useDisclosure, Button } from "@chakra-ui/react";
import { CreateStudentModal } from "../components/modals/CreateStudent";
import { useMeQuery } from "../generated/graphql";
import { PopulationTabs } from "../components/PopulationTabs";

const Roster = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [{ data }] = useMeQuery();

  return (
    <>
      <Wrapper>
        {data?.currentCoach === null ? (
          <Heading>Please log in to see your student roster</Heading>
        ) : (
          <>
            <Heading>Roster Management</Heading>
            <Text>
              This is a place to locate all of your students and their details.
              You cannot add or delete students but you can view their details.
            </Text>
            <Button onClick={onOpen} rounded="full">
              Create Student
            </Button>
            <CreateStudentModal isOpen={isOpen} onClose={onClose} />
          </>
        )}
      </Wrapper>
      <Wrapper>
        <PopulationTabs />
      </Wrapper>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Roster);
