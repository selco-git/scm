import { ActionBar, ApplyFilterBar, CloseSvg, Dropdown, SubmitBar, FilterIcon } from "@egovernments/digit-ui-react-components";
import React ,{useState}from "react";
import { useTranslation } from "react-i18next";
import Status from "./Status";

const applicationTypes = [
  {
    name: "BUILDING_PLAN_SCRUTINY",
  },
  {
    name: "BUILDING_NEW_PLAN_SCRUTINY",
  },
];

const serviceTypes = [
  {
    name: "NEW_CONSTRUCTION",
  },
];

const Filter = ({ searchParams, paginationParms, onFilterChange, onSearch, onClose, removeParam, statuses, ...props }) => {
  const { t } = useTranslation();
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const [_searchParams, setSearchParams] = useState(() => ({...searchParams,applicationStatus:[]}));
  

  const onStatusChange = (e, type) => {
    if (e.target.checked) setSearchParams({ applicationStatus: [..._searchParams?.applicationStatus, type] });
    else setSearchParams({ applicationStatus: _searchParams?.applicationStatus.filter((option) => type.name !== option.name) });
  };

  const handleChange = (option) => {
    setSearchParams(old=>({...old,...option}));
  };
  const clearAll = () => {setSearchParams({applicationStatus:[]});
  onFilterChange({});
};

  return (
    <React.Fragment>
      <div className="filter">
        <div className="filter-card">
          <div className="heading">
            <div className="filter-label">
              <FilterIcon />
              {t("ES_COMMON_FILTER_BY")}:
              <span className="clear-search" onClick={clearAll} style={{ border: "1px solid #e0e0e0", padding: "6px" }}>
                <svg width="17" height="17" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                  d="M8 5V8L12 4L8 0V3C3.58 3 0 6.58 0 11C0 12.57 0.46 14.03 1.24 15.26L2.7 13.8C2.25 12.97 2 12.01 2 11C2 7.69 4.69 5 8 5ZM14.76 6.74L13.3 8.2C13.74 9.04 14 9.99 14 11C14 14.31 11.31 17 8 17V14L4 18L8 22V19C12.42 19 16 15.42 16 11C16 9.43 15.54 7.97 14.76 6.74Z"
                  fill="#505A5F"
                  />
                </svg>
              </span>
            </div>
            {props.type === "mobile" && (
              <span onClick={onClose}>
                <CloseSvg />
              </span>
            )}
          </div>
          <div>
            <div className="filter-label">{t("BPA_BASIC_DETAILS_APPLICATION_TYPE_LABEL")}</div>
            <Dropdown t={t} option={applicationTypes} selected={{name:_searchParams?.applicationType}} optionKey={"name"} select={(arg) => handleChange({ applicationType: arg?.name })} />
          </div>
          <div>
            <div className="filter-label">{t("BPA_BASIC_DETAILS_SERVICE_TYPE_LABEL")}</div>
            <Dropdown t={t} option={serviceTypes} optionKey={"name"} selected={{name:_searchParams?.serviceType}} select={(arg) => handleChange({ serviceType: arg?.name })} />
          </div>
          <div>
            <Status onAssignmentChange={onStatusChange} statuses={statuses} searchParams={_searchParams} />
          </div>
          {props.type !== "mobile" && (
            <div>
              <SubmitBar
                // disabled={status?.length == mdmsStatus?.length&& service?.code == defaultService}
                onSubmit={() => {
                  onFilterChange(_searchParams);
                  props?.onClose?.();
                }}
                label={t("ACTION_TEST_APPLY")}
              />
            </div>
          )}
        </div>

        {props.type === "mobile" && (
          <ActionBar>
            <ApplyFilterBar
              submit={false}
              labelLink={t("ES_COMMON_CLEAR_ALL")}
              buttonLink={t("ES_COMMON_FILTER")}
              onClear={clearAll}
              onSubmit={() => {
                // if (props.type === "mobile") onSearch({ delete: ["applicationNos"] });
                // else onSearch();
                if (props.type === "mobile") {
                  onClose();
                }
                onFilterChange(_searchParams);
              }}
              style={{ flex: 1 }}
            />
          </ActionBar>
        )}
      </div>
    </React.Fragment>
  );
};

export default Filter;
