import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";  


const GrievanceDetailsPage = () => {
  const [appealData, setAppealData] = useState(null);
  const [grievanceData, setGrievanceData] = useState(null);
  const [loadingGrievance, setLoadingGrievance] = useState(false);
  const [loadingAppeal, setLoadingAppeal] = useState(true);
  const [error, setError] = useState(null);
  const tenantId = Digit.ULBService.getCurrentTenantId()
  const { grievanceId, appealId } = useParams(); 

 // Fetch Grievance Data
//  useEffect(() => {
//   const fetchGrievanceData = async () => {
//     try {
//       setLoadingGrievance(true); // Set loading state for grievance
//       const grievanceResponse = await Digit.PGRService.search(tenantId, { grievanceId });
//       setGrievanceData(grievanceResponse.data);  // Assuming response contains data
//     } catch (err) {
//       setError("An error occurred while fetching grievance data");
//     } finally {
//       setLoadingGrievance(false); // Set loading to false after API call
//     }
//   };

//   if (grievanceId) {
//     fetchGrievanceData();
//   }
// }, [grievanceId]); // Fetch grievance data when grievanceId changes

// Function to fetch appeal details
const fetchAppealDetails = async () => {
  const url = `/pgr-services/appeal/_search?applicationNumber=${appealId}&tenantId=${tenantId}`;
  const authToken = window.localStorage.getItem("token");

    const data = {
      "RequestInfo": {
          "apiId": "Rainmaker",
          "ver": ".01",
          "action": "",
          "did": "1",
          "key": "",
          "msgId": "20170310130900|en_IN",
          "requesterId": "",
          "authToken": authToken
      }
  }
  try {
    setLoadingAppeal(true);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log("Appeal API Response:", result); 
    if (result && result.Appeals && result.Appeals.length > 0) {
      setAppealData(result.Appeals[0]); 
      console.log("appealdata", result.Appeals[0])
    } else {
      setAppealData(null);
    }
  } catch (err) {
    setError("An error occurred while fetching appeal details.");
  } finally {
    setLoadingAppeal(false);
  }
};


useEffect(() => {
  if (appealId) {
    fetchAppealDetails();
  }
}, [appealId]);

  
  if (loadingGrievance || loadingAppeal) {
    return <div>Loading...</div>;
  }

  
  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  
  const styles = {
    container: {
      padding: "20px",
      maxWidth: "1000px",
      margin: "0 auto",
    },
    heading: {
      textAlign: "center",
      color: "#23316b",
      marginBottom: "20px",
      fontSize: "24px",
      fontWeight: "bold",
    },
    card: {
      padding: "20px",
      backgroundColor: "#f4f4f9",
      borderRadius: "8px",
      border: "1px solid #ccc",
     
      margin: "20px auto",
    },
    cardTitle: {
      textAlign: "center",
      color: "#23316b",
      fontSize: "20px",
      fontWeight: "bold",
      marginBottom: "15px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    tableCell: {
      padding: "10px",
      border: "1px solid #ccc",
      textAlign: "left",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Grievance and Appeal Details</h2>

      
      {grievanceData && (
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Grievance Details</h3>
          <table style={styles.table}>
            <tbody>
              <tr>
                <td style={styles.tableCell}><strong>Grievance ID</strong></td>
                <td style={styles.tableCell}>{grievanceData.grievanceId}</td>
              </tr>
              <tr>
                <td style={styles.tableCell}><strong>Lodging Date</strong></td>
                <td style={styles.tableCell}>{grievanceData.lodgingDate}</td>
              </tr>
              <tr>
                <td style={styles.tableCell}><strong>Category</strong></td>
                <td style={styles.tableCell}>{grievanceData.category}</td>
              </tr>
              <tr>
                <td style={styles.tableCell}><strong>Status</strong></td>
                <td style={styles.tableCell}>{grievanceData.status}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      
      {appealData && (
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Appeal Details</h3>
          <table style={styles.table}>
            <tbody>
              <tr>
                <td style={styles.tableCell}><strong>Appeal ID</strong></td>
                <td style={styles.tableCell}>{appealData?.applicationNumber}</td>
              </tr>
              <tr>
                <td style={styles.tableCell}><strong>Comments</strong></td>
                <td style={styles.tableCell}>{appealData?.comments}</td>
              </tr>
              <tr>
                <td style={styles.tableCell}><strong>Applicant Name</strong></td>
                <td style={styles.tableCell}>{appealData?.additionalDetails?.applicantName}</td>
              </tr>
              <tr>
                <td style={styles.tableCell}><strong>Location</strong></td>
                <td style={styles.tableCell}>{appealData?.additionalDetails?.location}</td>
              </tr>
              <tr>
                <td style={styles.tableCell}><strong>Category</strong></td>
                <td style={styles.tableCell}>{appealData?.additionalDetails?.category}</td>
              </tr>
              <tr>
                <td style={styles.tableCell}><strong>Status</strong></td>
                <td style={styles.tableCell}>{appealData?.status}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GrievanceDetailsPage;
