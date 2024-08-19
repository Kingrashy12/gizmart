import { Flex, Paragraph, StaticImage } from "@/lib";
import { nairaSym } from "@/styles/global";
import {
  Badge,
  ProgressBar,
  Table,
  TableBody,
  TableCell,
  TableFoot,
  TableFooterCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { useEffect, useState } from "react";
import CustomIcon from "../icons/CustomIcon";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import SellerProductCard from "../card/products/SellerProductCard";

type PDashType = {
  products: ProductType[];
};

const SellerProductsTable = ({ products }: PDashType) => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5; // Number of rows per page

  // Calculate total pages
  const totalPages = Math.ceil(products?.length / limit);

  // Calculate the data to display for the current page
  const currentData = products?.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  // Handle page change
  const handlePageChange = (page: any) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <Flex className="flex-col">
      <Table className="w-full">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Image</TableHeaderCell>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Price</TableHeaderCell>
            <TableHeaderCell>Total</TableHeaderCell>
            <TableHeaderCell>Available</TableHeaderCell>
            <TableHeaderCell>Action</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {currentData?.map((product, index) => (
            <SellerProductCard key={index} product={product} />
          ))}
        </TableBody>
      </Table>
      <TableFoot>
        <TableFooterCell>
          <Flex className="items-center gap-5">
            <CustomIcon
              icon={RiArrowLeftSLine}
              iconSize="lg"
              iconClass="text-black"
              title="Prev"
              hasTitle
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            <Paragraph fontPoppins fontWeight="medium" className="text-base">
              {currentPage} / {totalPages}
            </Paragraph>
            <CustomIcon
              icon={RiArrowRightSLine}
              iconSize="lg"
              iconClass="text-black"
              title="Next"
              hasTitle
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </Flex>
        </TableFooterCell>
      </TableFoot>
    </Flex>
  );
};

export default SellerProductsTable;
