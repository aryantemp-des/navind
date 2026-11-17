import React from "react";
import SubpageLayout from "@/components/layout/SubpageLayout";
import SEOHead from "@/components/seo/SEOHead";
import PortfolioAdminModal from "@/components/admin/PortfolioAdminModal";
import { useRoute } from "@/context/RouteContext";

export const AdminPortfolioPage: React.FC = () => {
  const { navigate } = useRoute();

  return (
    <SubpageLayout breadcrumbs={[{ label: "Admin Portfolio" }]}>
      <SEOHead
        title="Portfolio Administration | Navya Tech Industry"
        description="Secure administrator console for managing Navya Tech business portfolio records and keyword intelligence."
        canonicalPath="/admin/portfolio"
        noIndex={true}
      />
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <PortfolioAdminModal
          isOpen={true}
          onClose={() => navigate("/contact")}
        />
      </div>
    </SubpageLayout>
  );
};

export default AdminPortfolioPage;
