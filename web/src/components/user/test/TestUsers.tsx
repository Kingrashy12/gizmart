import { useAppSelector } from "@/hooks/store";
import { Flex, Paragraph } from "@/lib";
import React from "react";
import TestUser from "./TestUser";
import CustomButton from "@/components/CustomButton";

const TestUsers: React.FC<{
  exitCurrent: React.Dispatch<React.SetStateAction<TestCurrentType>>;
}> = ({ exitCurrent }) => {
  const testState = useAppSelector((state) => state.user);
  const is_empty = testState.demo_accounts.length < 1;
  return (
    <Flex className="flex-col overflow-y-auto h-full gap-3">
      {is_empty ? (
        <Flex className="items-center justify-center flex-col gap-2 h-full">
          <Paragraph
            fontPoppins
            className="font-medium text-base text-neutral-500"
          >
            You platform test user available
          </Paragraph>
          <CustomButton
            variant="primary"
            onClick={() => exitCurrent("add-user")}
          >
            Add
          </CustomButton>
        </Flex>
      ) : (
        testState.users.map((user, index) => (
          <TestUser key={index} user={user} />
        ))
      )}
    </Flex>
  );
};

export default TestUsers;
