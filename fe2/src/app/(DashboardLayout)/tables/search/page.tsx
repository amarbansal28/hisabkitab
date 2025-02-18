"use client";

import { Box } from "@mui/material";
import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import ProductTableList from "@/app/components/apps/ecommerce/ProductTableList/ProductTableList";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Search Table",
  },
];

const SearchTable = () => {
  return (
    <PageContainer title="Search Table" description="this is Search Table">
      <Breadcrumb title="Search Table" items={BCrumb} />

      <Box>
        <ProductTableList />
      </Box>
    </PageContainer>
  );
};

export default SearchTable;
