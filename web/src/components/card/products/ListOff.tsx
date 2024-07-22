import React, { useEffect, useRef, useState } from "react";
import { products, sorts } from "@/data/product";
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
}

const ListOff = ({ pageName }: ListProps) => {
  const [colors, setColors] = useState<Array<string>>([]);
  const [brands, setBrands] = useState<Array<string>>([]);
  const price =
    products?.map((product) => parseFloat(product.price as any)) || [];
  const lowestPrice = Math.min(...price);
  const highestPrice = Math.max(...price);
  const [low, setLow] = useState(lowestPrice | 0);
  const [high, setHigh] = useState(highestPrice | 0);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selected, setSelected] = useState(sorts[0]);
  const [openPop, setOpenPop] = useState(false);
  const [isfilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    let tempFilteredProducts = products;
    if (colors.length >= 1) {
      tempFilteredProducts = tempFilteredProducts.filter((product) =>
        colors.some((c) => product.color === c)
      );
    }

    if (brands.length >= 1) {
      tempFilteredProducts = tempFilteredProducts.filter((product) =>
        brands.some((brand) => product.brand === brand)
      );
    }

    if (low !== null) {
      tempFilteredProducts = tempFilteredProducts.filter(
        (product) => product.price >= low
      );
    }

    if (high !== null) {
      tempFilteredProducts = tempFilteredProducts.filter(
        (product) => product.price <= high
      );
    }

    if (selected.value === "low to high") {
      tempFilteredProducts = tempFilteredProducts.sort(
        (a, b) => a.price - b.price
      );
    } else if (selected.value === "high to low") {
      tempFilteredProducts = tempFilteredProducts.sort(
        (a, b) => b.price - a.price
      );
    }
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
  function openSort(e: any) {
    e.stopPropagation();
    setOpenPop(!openPop);
  }
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
      />
      <Wrapper className="w-full gap-6 flex flex-col">
        <div className="flex items-center justify-between w-full">
          <HeaderOne
            fontRoboto
            className="text-xl max-[700px]:text-base"
            fontWeight="semi-bold"
          >
            {pageName}
          </HeaderOne>
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
        <div className="flex flex-wrap w-full relative gap-4 max-[700px]:items-center">
          {filteredProducts.map(
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
