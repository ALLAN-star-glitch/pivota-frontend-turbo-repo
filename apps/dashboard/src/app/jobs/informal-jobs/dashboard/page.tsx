import JobsDashboardLayout from "@/components/shared-reusables/jobs-reusables/layouts/JobsDashboardLayout";
import { informalJobsKpiData } from "../../../../../libs/constants/JobsDashboardConstants";
import Sidebar from "@/components/shared-reusables/jobs-reusables/layouts/Sidebar";
import { InformalJobsQuickActions, informalJobsRecentActivity } from "../../../../../libs/constants/InformalJobsSidebarConstants";
import CategoryActivityChart from "@/components/shared-reusables/jobs-reusables/charts/CategoryActivityChart";
import ApplicationTrendChart from "@/components/shared-reusables/jobs-reusables/charts/ApplicationTrendChart";

export default function InformalJobsDashboard() {
  return (
    <JobsDashboardLayout
      config={{
        title: "Informal Jobs Dashboard",
        subtitle: "Monitor and manage Kenya's informal job market with real-time insights",
        ctaLabel: "Post Informal Job",
        ctaHref: "/jobs/informal-jobs/add-job",
        kpis: informalJobsKpiData,
        sidebarComponent: (
          <Sidebar
            quickActions={InformalJobsQuickActions}
            recentActivity={informalJobsRecentActivity}
          />
        ),
        charts: (
          <>
            <ApplicationTrendChart />
            <CategoryActivityChart />
          </>
        ),
      }}
    />
  );
}
