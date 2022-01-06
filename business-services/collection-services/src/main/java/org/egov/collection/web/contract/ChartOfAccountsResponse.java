package org.egov.collection.web.contract;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.egov.common.contract.response.ResponseInfo;

import java.util.List;

@Getter
@Setter
@ToString
public class ChartOfAccountsResponse {

     ResponseInfo responseInfo;

    List<ChartOfAccount> chartOfAccounts;
}
