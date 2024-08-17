import { Flex } from "@tremor/react";
import React, { useEffect, useState } from "react";
import StaticChart from "./StaticChart";
import TopSelling from "./TopSelling";
import EachStatistic from "./EachStatistic";
import PopMessage from "@/components/modal/PopMessage";
import { Paragraph } from "@/lib";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "next/router";

const Dashboard = () => {
  const currentWidth = global?.window?.innerWidth;
  const cantView = currentWidth <= 768;
  // const [hideFromMobile, setHideFromMobile] = useState(true);

  // useEffect(() => {
  //   if (cantView) {
  //     setHideFromMobile(true);
  //   } else if (currentWidth > 768) {
  //     setHideFromMobile(false);
  //   }
  // });

  const router = useRouter();

  function close() {}
  return (
    <Flex>
      {cantView ? (
        <PopMessage
          isOpen={cantView}
          onClose={close}
          className="p-6 w-1/2 max-[480px]:w-[90%] bg-white rounded-lg"
        >
          <Flex className="flex-col gap-4">
            <Paragraph fontPoppins fontWeight="medium" className="text-center">
              Please use a desktop device to view your dashboard
            </Paragraph>
            <CustomButton onClick={() => router.back()} variant="primary">
              Go back
            </CustomButton>
          </Flex>
        </PopMessage>
      ) : (
        <Flex className="flex-col gap-10">
          <Flex className="gap-3 max-[768px]:flex-col">
            <StaticChart />
            <EachStatistic />
          </Flex>
          <TopSelling />
        </Flex>
      )}
    </Flex>
  );
};

export default Dashboard;
