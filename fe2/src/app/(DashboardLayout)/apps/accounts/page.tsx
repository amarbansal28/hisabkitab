"use client";

import Breadcrumb from "@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb";
import PageContainer from "@/app/components/container/PageContainer";
import AccountListing from "@/app/components/apps/accounts/AccountListing";
// import AccounttFilter from "@/app/components/apps/accounts/AccounttFilter";
import ChildCard from "@/app/components/shared/ChildCard";

const BCrumb = [
  {
    to: "/",
    title: "Home",
  },
  {
    title: "Accounts",
  },
];

const TicketList = () => {
  return (
    <PageContainer title="Account App" description="this is Account App">
      <Breadcrumb title="Accounts app" items={BCrumb} />
      <ChildCard>
        {/* <AccounttFilter /> */}
        <AccountListing />
      </ChildCard>
    </PageContainer>
  );
};

export default TicketList;
