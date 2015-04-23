package org.egov.ptis.actions.reports;
/**
 * This Action class is used to generate the a report called Zone wise Demand
 * Implementation 
 * 
 * @author Sathish Reddy
 * @version 2.00
 */
import static java.math.BigDecimal.ZERO;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;
import org.egov.exceptions.EGOVRuntimeException;
import org.egov.ptis.domain.dao.property.PropertyDAOFactory;
import org.hibernate.criterion.Criterion;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projection;
import org.hibernate.criterion.Projections;

import com.opensymphony.xwork2.ActionSupport;

public class ZoneWiseDemandAction extends ActionSupport {
	private static  final Logger LOGGER = Logger.getLogger(ZoneWiseDemandAction.class);
	public String execute()	{
		LOGGER.debug("Entered into execute method");
		String target="failure";
		List zoneDemandList;
		LinkedList<Map<String,Object>> links;
		try
		{   
			HttpServletRequest request = ServletActionContext.getRequest();
			org.egov.ptis.domain.dao.property.PropertyDAO propDao = PropertyDAOFactory.getDAOFactory().getPropertyDAO();
			//criterion object consists of statements that needs to done in where clause
			Criterion criterion=null;
			// Projection object consists of the fields that are required in select statements
			Projection projection=Projections.projectionList()
			.add(Projections.property("zone.id"))
			.add(Projections.sum("aggrArrDmd"))
			.add(Projections.sum("aggrCurrDmd"))
			.add(Projections.groupProperty("zone.id"));
			//In Order object we can mention the order in which result needs to displayed. 		   	
			Order order=Order.asc("zone.id");
			zoneDemandList=propDao.getPropMaterlizeViewList(projection,criterion,order);
			LOGGER.debug("Zone wise demand list : " + (zoneDemandList != null ? zoneDemandList : ZERO));
			links=prepareDispTagList(zoneDemandList);
			request.setAttribute("links",links);
			target="success";
		}catch(Exception e)
		{
			target="failure";
			LOGGER.error("Error in ZoneWiseDemandAction : " + e.getMessage());
			throw new EGOVRuntimeException("error in ZoneWiseDemandAction---------------",e);
		}
		LOGGER.debug("Exit from execute method");
		return target;
	}

	//This method returns the linked list which needs to added in Display tag to view the results in jsp.
	public LinkedList<Map<String,Object>> prepareDispTagList(List zoneDemandList)
	{
		LOGGER.debug("Entered into prepareDispTagList method");
		LOGGER.debug("Zone wise demand list : " + (zoneDemandList != null ? zoneDemandList : ZERO));
		String zoneNumber="";
		BigDecimal arrearDemand = BigDecimal.ZERO;
		BigDecimal currentDemand =BigDecimal.ZERO;
		BigDecimal totalCurrDemand =BigDecimal.ZERO;
		BigDecimal totalArrearDemand =BigDecimal.ZERO;
		BigDecimal totalDemand =BigDecimal.ZERO;
		BigDecimal grandTotalDemand =BigDecimal.ZERO;
		LinkedList<Map<String,Object>> links = new LinkedList<Map<String,Object>>();
		Map<String,Object> map;
		Map<String,Object> totalsMap=new Hashtable<String,Object>();
		if(zoneDemandList!=null && !zoneDemandList.isEmpty())
		{
			for(Object object : zoneDemandList)
			{
				map=new HashMap<String,Object>();
				zoneNumber="";
				arrearDemand =BigDecimal.ZERO;
				currentDemand =BigDecimal.ZERO;
				Object[] arrayObject = (Object[])object;

				if(arrayObject[0]!=null)
				{
					zoneNumber =  arrayObject[0].toString();
					LOGGER.debug("Zone number : " + zoneNumber);
				}
				if(arrayObject[1]!=null)
				{
					arrearDemand =  (BigDecimal)arrayObject[1];
					LOGGER.debug("Arrear Demand : " + arrearDemand);
					totalArrearDemand=totalArrearDemand.add(arrearDemand);
				}
				if(arrayObject[2]!=null)
				{
					currentDemand =  (BigDecimal)arrayObject[2];
					LOGGER.debug("Current Demand : " + currentDemand);
					totalCurrDemand=totalCurrDemand.add(currentDemand);
				}
				totalDemand=arrearDemand.add(currentDemand);
				LOGGER.debug("Total Demand : " + totalDemand);
				grandTotalDemand=grandTotalDemand.add(totalDemand);
				map.put("zoneNumber",zoneNumber);
				map.put("totalArrearsDemand(Rs.)",arrearDemand);
				map.put("totalCurrentDemand(Rs.)",currentDemand);
				map.put("totalDemand(Rs.)",totalDemand);
				links.add(map);
			}
			totalsMap.put("zoneNumber", "Total(Rs.)");
			totalsMap.put("totalArrearsDemand(Rs.)", totalArrearDemand);
			LOGGER.debug("Total Arrear Demand : " + totalArrearDemand);
			totalsMap.put("totalCurrentDemand(Rs.)", totalCurrDemand);
			LOGGER.debug("Total Current Demand : " + totalCurrDemand);
			totalsMap.put("totalDemand(Rs.)", grandTotalDemand);
			LOGGER.debug("Grand Total Demand : " + grandTotalDemand);
			links.add(totalsMap);
		}
		LOGGER.debug("Exit from prepareDispTagList method");
		return links;
	}
}
