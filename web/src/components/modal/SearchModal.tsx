import { Flex, FlexBetween } from "@/lib";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import SearchInput from "../filter/Search";
import toast from "react-hot-toast";
import { Icon, Textarea, TextInput } from "@tremor/react";
import { useSearchModal } from "@/context/useSearch";
import { RiCloseLine } from "@remixicon/react";

const SearchModal = () => {
  const { onClose } = useSearchModal();
  const router = useRouter();
  const [query, setQuery] = useState("");

  function Search(e: React.KeyboardEvent<HTMLInputElement> | any) {
    const searchQuery = query
      .toLowerCase()
      .replace(/\s/g, "-")
      .replace(/\--+/g, "-");
    if (e.key === "Enter") {
      // setQuery("");
      router.prefetch(`/search?query=${searchQuery}`);
      if (typeof window !== undefined) {
        window.location.href = `/search?query=${searchQuery}`;
      }
      onClose();
    }
  }

  return (
    <div className="flex-col bg-white p-5 z-[600] w-full h-full top-0 bottom-0 right-0 left-0 fixed max-[580px]:flex hidden">
      <FlexBetween className="gap-4">
        <SearchInput
          className="w-full"
          placeholder="Search products"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={(e) => Search(e)}
        />
        <Icon
          icon={RiCloseLine}
          size="md"
          className="text-white rounded-full bg-black"
          onClick={onClose}
        />
      </FlexBetween>
    </div>
  );
};

export default SearchModal;
