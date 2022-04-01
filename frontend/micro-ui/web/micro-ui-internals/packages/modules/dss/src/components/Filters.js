import { CloseSvg, FilterIcon, RefreshIcon } from "@egovernments/digit-ui-react-components";
import React, { useContext, useEffect, useMemo, useState } from "react";
import DateRange from "./DateRange";
import FilterContext from "./FilterContext";
import Switch from "./Switch";
import MultiSelectDropdown from "./MultiSelect";


const Filters = ({
  t,
  ulbTenants,
  isOpen,
  closeFilters,
  showDateRange = true,
  showDDR = true,
  showUlb = true,
  showDenomination = true
}) => {
  const { value, setValue } = useContext(FilterContext);

  const [selected, setSelected] = useState(() =>
    ulbTenants?.ulb.filter((tenant) => value.filters.tenantId.find((selectedTenant) => selectedTenant === tenant.code))
  );

  useEffect(() => {
    setSelected(ulbTenants?.ulb.filter((tenant) => value.filters.tenantId.find((selectedTenant) => selectedTenant === tenant.code)));
  }, [value.filters.tenantId]);

  const handleFilterChange = (data) => {
    setValue({ ...value, ...data });
  };

  const selectFilters = (e, data) => {
    setValue({ ...value, filters: { tenantId: e.map((allPropsData) => allPropsData?.[1]?.code) } });
  };

  const selectDDR = (e, data) => {
    const DDRsSelectedByUser = ulbTenants.ulb.filter((ulb) => {
      return !!e.find((tenant) => {
        return ulb.ddrKey === tenant?.[1].ddrKey;
      });
    });
    setValue({ ...value, filters: { tenantId: DDRsSelectedByUser.map((allPropsData) => allPropsData?.code) } });
  };

  const selectedDDRs = useMemo(
    () =>
      selected
        .map((ulb) => ulbTenants.ulb.filter((e) => e.code === ulb.code)[0])
        .filter((item, i, arr) => i === arr.findIndex((t) => t.ddrKey === item.ddrKey)),
    [selected, ulbTenants]
  );

  const handleClear = () => {
    setValue({
      denomination: "Unit",
      range: Digit.Utils.dss.getInitialRange(),
    });
  };
  return (
    <div className={`filters-wrapper ${isOpen ? "filters-modal" : ""}`}>
      <span className="filter-close" onClick={() => closeFilters()}>
        <CloseSvg />
      </span>
      {isOpen && (
        <div className="filter-header">
          <FilterIcon />
          <p>{t(`DSS_FILTERS`)}</p>
          <span onClick={handleClear}>
            <RefreshIcon />
          </span>
        </div>
      )}
      {showDateRange && (
        <div className="filters-input">
          <DateRange onFilterChange={handleFilterChange} values={value?.range} t={t} />
        </div>
      )}
      {showDDR && (
        <div className="filters-input">
          <div className="mbsm">{t( "ES_DSS_DDR")}</div>
          <MultiSelectDropdown
            options={ulbTenants?.ddr && ulbTenants.ddr?.sort((x, y) => x?.ddrKey?.localeCompare(y?.ddrKey))}
            optionsKey="ddrKey"
            onSelect={selectDDR}
            selected={selectedDDRs}
            defaultLabel={t( "ES_DSS_ALL_DDR_SELECTED")}
            defaultUnit={t("ES_DSS_DDR_SELECTED")}
          />
        </div>
      )}
      {showUlb && (
        <div className="filters-input">
          <div className="mbsm">{t("ES_DSS_ULB")}</div>
          <MultiSelectDropdown
            options={
              ulbTenants?.ulb?.sort((x, y) => x?.ulbKey?.localeCompare(y?.ulbKey))
              /*    Removed filter for selected ddr/state rain-5426
              ulbTenants?.ulb && ulbTenants.ulb.filter((e) => Digit.Utils.dss.checkSelected(e, selectedDDRs))?.sort((x, y) => x?.ulbKey?.localeCompare(y?.ulbKey))
             */
            }
            optionsKey="ulbKey"
            onSelect={selectFilters}
            selected={selected}
            defaultLabel={t("ES_DSS_ALL_ULB_SELECTED")}
            defaultUnit={t("ES_DSS_DDR_SELECTED")}
          />
        </div>
      )}
      {showDenomination && (
        <div className="filters-input" style={{ flexBasis: "16%" }}>
          <Switch onSelect={handleFilterChange} t={t} />
        </div>
      )}
    </div>
  );
};

export default Filters;