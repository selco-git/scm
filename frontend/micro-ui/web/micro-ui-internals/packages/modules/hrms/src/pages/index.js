import { PrivateRoute } from "@upyog/digit-ui-react-components";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link, Switch, useLocation } from "react-router-dom";
import CreateDepartment from "./createDeparment";
import AddHeadOfDepartment from "./createHOD"
import AddOffice from "./AddOffice";
import AddGro from "./AddGro"
import ViewOrg from "./ViewOrg";
import EditOrg from "./EditOrg"
import EditDepartment from "./editDepartment";
import ViewOffice from "./ViewOffice";
import EditOffice from "./EditOffice";
import Dashboard from "./Dashboard";
import ManageOrganization from "./ViewOrganization";
import ManageNodalUser from "./ViewNodalManagement";
import ManageUserManagement from "./ViewUserManagement";
const EmployeeApp = ({ path, url, userType }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const mobileView = innerWidth <= 640;
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const inboxInitialState = {
    searchParams: {
      tenantId: tenantId,
    },
  };

  const HRMSResponse = Digit?.ComponentRegistryService?.getComponent("HRMSResponse");
  const HRMSDetails = Digit?.ComponentRegistryService?.getComponent("HRMSDetails");
  const Inbox = Digit?.ComponentRegistryService?.getComponent("HRInbox");
  const CreateEmployee = Digit?.ComponentRegistryService?.getComponent("HRCreateEmployee");
  const EditEmpolyee = Digit?.ComponentRegistryService?.getComponent("HREditEmpolyee");
  const AppealDashboard = Digit?.ComponentRegistryService?.getComponent("PGRAppealDashboard");
  const GrievanceDetailsPage = Digit?.ComponentRegistryService?.getComponent("PGRGrievanceDetailsPage");
  return (
    <Switch>
      <React.Fragment>
        <div className="ground-container" style={{marginTop:"20px"}}>
          <p className="breadcrumb" style={{ marginLeft: mobileView ? "1vw" : "15px" }}>
            <Link to="/digit-ui/employee" style={{ cursor: "pointer", color: "#666" }}>
              {t("HR_COMMON_BUTTON_HOME")}
            </Link>{" "}
            / <span>{location.pathname === "/digit-ui/employee/hrms/inbox" ? t("HR_COMMON_HEADER") : t("HR_COMMON_HEADER")}</span>
          </p>
          <PrivateRoute
            path={`${path}/inbox`}
            component={() => (
              <Inbox parentRoute={path} businessService="hrms" filterComponent="HRMS_INBOX_FILTER" initialStates={inboxInitialState} isInbox={true} />
            )}
          />
          <PrivateRoute path={`${path}/create`} component={() => <CreateEmployee />} />
          <PrivateRoute path={`${path}/createHod`} component={() => <AddHeadOfDepartment />} />
          <PrivateRoute path={`${path}/createDepartment`} component={() => <CreateDepartment />} />
          <PrivateRoute path={`${path}/createOffice`} component={() => <AddOffice />} />
          <PrivateRoute path={`${path}/createGro`} component={() => <AddGro />} />
          <PrivateRoute path={`${path}/viewOrg`} component={() => <ViewOrg />} />
          <PrivateRoute path={`${path}/viewOffice`} component={() => <ViewOffice />} />
          <PrivateRoute path={`${path}/editOrg`} component={() => <EditOrg />} />
          <PrivateRoute path={`${path}/editDepartment`} component={() => <EditDepartment />} />
          <PrivateRoute path={`${path}/EditOffice`} component={() => <EditOffice />} />
          <PrivateRoute path={`${path}/appeal-dashboard`} component={() => <AppealDashboard />} />
          <PrivateRoute path={`${path}/grievance-details/:grievanceId/:appealId`} component={() => <GrievanceDetailsPage />} />
          <PrivateRoute path={`${path}/manageOrg`} component={() => <ManageOrganization />} />
          <PrivateRoute path={`${path}/manageUser`} component={() => <ManageUserManagement />} />
          <PrivateRoute path={`${path}/manageNodal`} component={() => <ManageNodalUser />} />
          <PrivateRoute path={`${path}/Dashboard`} component={() => <Dashboard />} />
          <PrivateRoute path={`${path}/response`} component={(props) => <HRMSResponse {...props} parentRoute={path} />} />
          <PrivateRoute path={`${path}/details/:tenantId/:id`} component={() => <HRMSDetails />} />
          <PrivateRoute path={`${path}/edit/:tenantId/:id`} component={() => <EditEmpolyee />} />
        </div>
      </React.Fragment>
    </Switch>
  );
};

export default EmployeeApp;
