import React, { useEffect, useRef, useState } from "react";
import { sorts } from "@/data/product";
import { HeaderOne, MobileDrop, Paragraph } from "@/lib";
import toast from "react-hot-toast";
import { Icon } from "@tremor/react";
import { RiEqualizer2Line } from "@remixicon/react";
import MobileFloat from "./MobileFloat";
import Sort from "./popover/Sort";
import Wrapper from "../Wrapper";
import Filter from "./Filter";
import MobileFilter from "@/components/mobile/MobileFilter";
import All_Product from "./All_Product";

interface ListProps {
  pageName: string;
  products: ProductType[];
  hasProductsFound?: boolean;
  hideBrandFilter?: boolean;
}

const ListOff = ({
  pageName,
  products,
  hasProductsFound,
  hideBrandFilter,
}: ListProps) => {
  const [colors, setColors] = useState<Array<string>>([]);
  const [brands, setBrands] = useState<Array<string>>([]);
  const price =
    products?.map((product) => parseFloat(product?.price as any)) || [];
  const lowestPrice = Math.min(...price);
  const highestPrice = Math.max(...price);
  const [low, setLow] = useState(lowestPrice);
  const [high, setHigh] = useState(highestPrice);
  const [filteredProducts, setFilteredProducts] = useState(products || []);
  const [selected, setSelected] = useState(sorts[0]);
  const [openPop, setOpenPop] = useState(false);
  const [isfilterOpen, setIsFilterOpen] = useState(false);

  // Update the price incase of reload
  useEffect(() => {
    setLow(lowestPrice);
  }, [lowestPrice]);
  // Update the price incase of reload
  useEffect(() => {
    setHigh(highestPrice);
  }, [highestPrice]);

  useEffect(() => {
    if (high > highestPrice) {
      toast(`No products as high as ₦${high.toLocaleString()}`);
    }
    if (low < lowestPrice) {
      toast(`No products as low as ₦${low.toLocaleString()}`);
      // setLow(lowestPrice);
    }
  }, [high, low]);

  useEffect(() => {
    // Initailize products variable
    let tempFilteredProducts = products;
    if (colors.length >= 1) {
      tempFilteredProducts = tempFilteredProducts.filter((product) =>
        colors.some((c) => product?.color === c)
      );
    }
    // Filter products by brand
    if (brands.length >= 1) {
      tempFilteredProducts = tempFilteredProducts.filter((product) =>
        brands.some((brand) => product?.brand === brand)
      );
    }
    //   Filter products by price starting from the lowest
    if (low !== null) {
      tempFilteredProducts = tempFilteredProducts.filter(
        (product: any) => product?.price >= low
      );
    }
    // Filter products by price, ..reduce the high price range
    if (high !== null) {
      tempFilteredProducts = tempFilteredProducts.filter(
        (product: any) => product?.price <= high
      );
    }
    //** Sorting products by price value */
    if (selected.value === "low to high") {
      tempFilteredProducts = tempFilteredProducts.sort(
        (a: any, b: any) => a.price - b.price
      );
    } else if (selected.value === "high to low") {
      tempFilteredProducts = tempFilteredProducts.sort(
        (a: any, b: any) => b.price - a.price
      );
    }
    // Set the filtered products to state
    setFilteredProducts(tempFilteredProducts);
  }, [products, colors, low, high, brands, selected]);

  function handlePrice(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    const numericValue = parseFloat(value);

    if (name === "low") {
      setLow(numericValue);
    } else if (name === "high") {
      setHigh(numericValue);
    }
  }

  const parentRef = useRef<HTMLDivElement>(null);

  function closeFromParent() {
    if (parentRef.current) {
      setOpenPop(false);
    }
  }
  // open products sorting modal
  function openSort(e: any) {
    e.stopPropagation();
    setOpenPop(!openPop);
  }
  // open products filter modal for mobile device
  function openFilter(e: any) {
    e.stopPropagation();
    setIsFilterOpen(!isfilterOpen);
  }

  return (
    <div
      className="flex gap-5 w-full h-full relative"
      onClick={closeFromParent}
      ref={parentRef}
    >
      <Filter
        product={products}
        setColors={setColors}
        colors={colors}
        setHigh={setHigh}
        setLow={setLow}
        low={low}
        high={high}
        handlePrice={handlePrice}
        setBrands={setBrands}
        brands={brands}
        hideBrandFilter={hideBrandFilter}
      />
      <Wrapper className="w-full gap-6 flex flex-col">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <HeaderOne
              fontRoboto
              className="text-xl max-[700px]:text-base"
              fontWeight="semi-bold"
            >
              {pageName}
            </HeaderOne>
            {hasProductsFound && (
              <Paragraph
                fontRoboto
                fontWeight="normal"
                className="text-base text-neutral-500"
              >
                {`(${products?.length} products found)`}
              </Paragraph>
            )}
          </div>
          <div className="flex flex-col relative gap-4">
            <div
              className="flex items-center cursor-pointer max-[480px]:hidden"
              onClick={openSort}
            >
              <Icon icon={RiEqualizer2Line} color="neutral" />
              <Paragraph fontWeight="medium" fontRoboto>
                Sort by
              </Paragraph>
            </div>
            <MobileDrop close={!openPop} onClose={() => setOpenPop(false)}>
              <Sort
                open={openPop}
                setopen={setOpenPop}
                selected={selected}
                setSelected={setSelected}
              />
            </MobileDrop>
            <MobileDrop
              close={!isfilterOpen}
              onClose={() => setIsFilterOpen(false)}
            >
              <MobileFilter
                setColors={setColors}
                colors={colors}
                setHigh={setHigh}
                setLow={setLow}
                low={low}
                high={high}
                handlePrice={handlePrice}
                setBrands={setBrands}
                brands={brands}
              />
            </MobileDrop>
          </div>
        </div>
        <div className="flex flex-wrap w-full relative gap-2">
          {filteredProducts?.map(
            (product, index: React.Key | null | undefined) => (
              <All_Product key={index} product={product} />
            )
          )}
        </div>
      </Wrapper>
      <MobileFloat openSort={openSort} openFilter={openFilter} />
    </div>
  );
};

export default ListOff;
