import React from "react";
import { useHistory,useLocation } from "react-router-dom";

const Dashboard = () => {
    const history = useHistory();
    const nodal = Digit.Utils.NodalAccess();
    const hrms = Digit.Utils.hrmsAccess();
const userName = JSON.parse(window.localStorage.getItem("Employee.user-info"))?.name
    const onSubmit =(event)=>{
        event.preventDefault();
        history.push("/digit-ui/employee/hrms/manageOrg")
    }
    const onSubmitNodal =(event)=>{
        event.preventDefault();
        if(nodal)
        {
            history.push("/digit-ui/employee/hrms/manageNodal")
        }
        else {
            history.push("/digit-ui/employee/hrms/manageUser")
        }
       
       
    }
    console.log("userName",userName)
  return (
    <div style={{ fontFamily: "Arial, sans-serif", margin: "20px",width:"100%",marginTop:"30px" }}>
      {/* Header */}
      <style>
        {
            `
            .nameHeader{
                display: flex;
                align-items: center;
                background-color: #fff;
                padding: 15px;
                border-radius: 20px;
                box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px 10px;
            }
            `
        }
      </style>
      <div
        className="nameHeader"
      >
        <img
          src="https://via.placeholder.com/50"
          alt="User"
          style={{ borderRadius: "50%", marginRight: "10px" }}
        />
        <h2 style={{ margin: 0 }}>Welcome <b>{userName}</b></h2>
      </div>

      {/* Modules Section */}
      <h3 style={{ marginTop: "20px", fontWeight:"bolder", fontSize:"x-large",marginBottom:"10px" }}>Modules</h3>
      <div style={{ display: "flex", gap: "20px" }}>
        {/* Module Cards */}
        <div
          style={{
            backgroundColor: "#f6c6ac",
            borderRadius: "12px",
            width: "150px",
            textAlign: "center",
            padding: "15px",
            boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
            cursor:"pointer"
          }}
          onClick={onSubmit}
        >
          <div style={{ fontSize: "30px", marginBottom: "10px" }}>⚙️</div>
          <div>
            <strong>Manage Organization</strong>
          </div>
        </div>
       <div
          style={{
            backgroundColor: "#e9ecef",
            borderRadius: "12px",
            width: "150px",
            textAlign: "center",
            padding: "15px",
            boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
            cursor:"pointer"
          }}
          onClick={onSubmitNodal}
        >
          <div style={{ fontSize: "30px", marginBottom: "10px" }}>💼</div>
          <div style={{fontWeight:"bolder"}}>
            <strong>User Management</strong>
          </div>
        </div>
      </div>

      {/* Dashboard & Analytics Section */}
      <h3 style={{ marginTop: "30px" }}>Dashboard & Analytics</h3>
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          alignItems: "flex-start",
        }}
      >
        {/* Chart Card */}
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "15px",
            boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
            width: "55%",
          }}
        >
          {/* <h4>Trend Analysis - Audit</h4> */}
          <img
            src="https://via.placeholder.com/650x200"
            alt="Analytics Graph"
            style={{ width: "100%", borderRadius: "8px" }}
          />
          <button
            style={{
              marginTop: "10px",
              backgroundColor: "#d9534f",
              color: "white",
              border: "none",
              padding: "8px 12px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Go to Dashboard
          </button>
        </div>

        {/* Latest Updates */}
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: "10px",
            padding: "15px",
            boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
            flex: "1",
          }}
        >
          <h4>Latest Updates</h4>
          <p style={{ margin: "5px 0" }}>
            <span style={{ color: "red", fontWeight: "bold" }}>1,500</span> New
            Grievance raised today
          </p>
          <p style={{ margin: "5px 0" }}>
            <span style={{ color: "red", fontWeight: "bold" }}>100</span> new
            Appeals raised
          </p>
          <p style={{ margin: "5px 0" }}>
            <span style={{ color: "red", fontWeight: "bold" }}>23</span> new
            offices created
          </p>
          <p style={{ margin: "5px 0" }}>
            <span style={{ color: "red", fontWeight: "bold" }}>50+</span> Pending
            grievances delayed
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
