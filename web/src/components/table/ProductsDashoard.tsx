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

type PDashType = {
  productdas: any[];
};

const ProductsDashoard = ({ productdas }: PDashType) => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5; // Number of rows per page

  // Calculate total pages
  const totalPages = Math.ceil(productdas.length / limit);

  // Calculate the data to display for the current page
  const currentData = productdas.slice(
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
            <TableHeaderCell>Total</TableHeaderCell>
            <TableHeaderCell>Progress</TableHeaderCell>
            <TableHeaderCell>Value</TableHeaderCell>
            <TableHeaderCell>Sold</TableHeaderCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {currentData.map((product, index) => (
            <TableRow key={index} className="w-auto">
              <TableCell>
                <StaticImage
                  src={product.image}
                  alt={product.name}
                  className="w-[45px]"
                />
              </TableCell>
              <TableCell className=" w-[200px]">
                {product.name.slice(0, 40) + "..."}
              </TableCell>
              <TableCell>
                <Badge color="yellow">{product.total}</Badge>
              </TableCell>
              <TableCell>
                <ProgressBar color="yellow" value={product.progress} />
              </TableCell>
              <TableCell
                dangerouslySetInnerHTML={{
                  __html: nairaSym + product.price.toLocaleString(),
                }}
              />
              {/* {product.price.toLocaleString()}
          </TableCell> */}
            </TableRow>
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

export default ProductsDashoard;
