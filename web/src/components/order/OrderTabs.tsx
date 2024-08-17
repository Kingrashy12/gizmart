import { Flex } from "@/lib";
import { poppinsFont } from "@/lib/fonts/font";
import { Tab, TabGroup, TabList } from "@tremor/react";
import React from "react";

interface OrderTabProps {
  setTab: any;
  orders: any[];
  tab: string;
}

const OrderTabs = ({ setTab, orders, tab }: OrderTabProps) => {
  const pending = orders.filter((order) => order.status === "pending").length;
  const processing = orders.filter(
    (order) => order.status === "processing"
  ).length;
  const successful = orders.filter(
    (order) => order.status === "completed"
  ).length;
  const failed = orders.filter((order) => order.status === "cancelled").length;

  function switchPending() {
    setTab("pending");
  }
  function switchProcessing() {
    setTab("processing");
  }
  function switchSuccessful() {
    setTab("completed");
  }
  function switchFailed() {
    setTab("cancelled");
  }
  return (
    <Flex className="p-3">
      <TabGroup>
        <TabList
          variant="line"
          color="yellow"
          className={poppinsFont.className}
        >
          <Tab
            value={tab}
            className="font-medium text-lg"
            onClick={switchPending}
          >
            Pending {`(${pending})`}
          </Tab>
          <Tab
            value={tab}
            className="font-medium text-lg"
            onClick={switchProcessing}
          >
            Processing {`(${processing})`}
          </Tab>
          <Tab
            value={tab}
            className="font-medium text-lg"
            onClick={switchSuccessful}
          >
            Successful {`(${successful})`}
          </Tab>
          <Tab
            value={tab}
            className="font-medium text-lg"
            onClick={switchFailed}
          >
            Cancelled {`(${failed})`}
          </Tab>
        </TabList>
      </TabGroup>
    </Flex>
  );
};

export default OrderTabs;
