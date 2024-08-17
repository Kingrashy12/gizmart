import { No_Products_Found } from "@/lib";
import { Flex } from "@tremor/react";
import React from "react";

const Campaign = () => {
  return (
    <Flex>
      <No_Products_Found
        isCampaign
        message="Campaign isn't avaialbe yets come back"
      />
    </Flex>
  );
};

export default Campaign;
