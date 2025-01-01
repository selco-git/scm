import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const AppealDashboard = () => {
    const history = useHistory();
    const [appeals, setAppeals] = useState([]); 
    const [loading, setLoading] = useState(true);

    const actionButtonStyle = {
        backgroundColor: '#23316b',
        color: '#ffffff',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        width: '200px',
    };

    const handleAppealClick = (grievanceId, appealId) => {
        history.push(`/digit-ui/employee/pgr/grievance-details/${grievanceId}/${appealId}`); 
    };

    useEffect(() => {
        const fetchAppeals = async () => {
            try {
                const tenantId = Digit.ULBService.getCurrentTenantId();
                const authToken = window.localStorage.getItem("token");
                const response = await fetch(
                    `/pgr-services/appeal/_search?tenantId=${tenantId}`,
                    {
                        method: "POST",
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json;charset=UTF-8'
                        },
                        body: JSON.stringify({
                            "RequestInfo": {
                                "apiId": "Rainmaker",
                                "ver": ".01",
                                "action": "",
                                "did": "1",
                                "key": "",
                                "msgId": "20170310130900|en_IN",
                                "requesterId": "",
                                "authToken": authToken,
                            }
                        })
                    }
                );
                const data = await response.json();
                if (data && data.Appeals) {
                    setAppeals(data.Appeals);
                }
            } catch (error) {
                console.error("Error fetching appeal data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAppeals();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="HomePageContainer" style={{width:"calc(100% - 100px)", marginLeft:"50px"}}>
            <div
                className="HomePageWrapper"
                style={{
                    justifyItems: 'flex-start',
                    marginTop: '0px',
                    marginLeft: '-20px',
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ textAlign: 'center', marginTop: "5px", marginBottom: "25px" }}>
                        <p style={{ fontSize: '40px', fontWeight: 'bold', color: '#4f4f82' }}>
                            Appeal Menu
                        </p>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '20px',
                            marginBottom: '20px',
                        }}
                    >
                        {[
                            { title: 'New Appeals', count: appeals?.length },
                            { title: 'Pending Appeals', count: 1 },
                            { title: 'In-Process Appeals', count: 7 },
                            { title: 'Closed Appeals', count: 11 },
                            { title: 'Transfer Appeals (To Citizen/GRO for Clarification)', count: 3 },
                        ].map((stat, index) => (
                            <div
                                key={index}
                                style={{
                                    backgroundColor: '#e6f5f4',
                                    color: '#004d40',
                                    padding: '20px',
                                    borderRadius: '10px',
                                    textAlign: 'center',
                                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                    width: '200px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    height: '150px',
                                }}
                            >

                                <h4 style={{ margin: '0', fontWeight: 'bold', fontSize: '16px' }}>{stat.title}</h4>


                                <h2
                                    style={{
                                        marginTop: '10px',
                                        fontWeight: 'bold',
                                        fontSize: '36px',
                                        marginBottom: '0',
                                    }}
                                >
                                    {stat.count}
                                </h2>
                            </div>
                        ))}
                    </div>

                    <div style={{ padding: '0 20px', marginTop: "25px" }}>
                        <table
                            style={{
                                width: '100%',
                                borderCollapse: 'collapse',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <thead style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
                                <tr>
                                    {['Sr. No.', 'Appeal ID', 'Appeal Description (From Citizen)', 'Appeal Lodged Date', 'Mapped Grievance ID', 'Status', 'Action'].map(
                                        (header, index) => (
                                            <th
                                                key={index}
                                                style={{ padding: '10px', borderBottom: '1px solid #ddd' }}
                                            >
                                                {header}
                                            </th>
                                        )
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {appeals.map((appeal, index) => (
                                    <tr key={index}>
                                        <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{index + 1}</td>
                                        <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                            <span
                                                style={{
                                                    color: '#004d40',
                                                    textDecoration: 'underline',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => handleAppealClick(appeal.grievanceId, appeal.applicationNumber)}
                                            >
                                                {appeal.applicationNumber}
                                            </span>
                                        </td>
                                        <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                            {appeal.comments || 'No comments'}
                                        </td>
                                        <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                            {new Date(appeal.auditDetails.createdTime).toLocaleDateString()}
                                        </td>
                                        <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                            {appeal.grievanceId}
                                        </td>
                                        <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                            <span
                                                style={{
                                                    color:
                                                        appeal.status === 'INITIATED'
                                                            ? 'red'
                                                            : appeal.status === 'CLOSED'
                                                                ? 'green'
                                                                : '#000',
                                                }}
                                            >
                                                {appeal.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                            <button
                                                style={{
                                                    backgroundColor: '#23316b',
                                                    color: '#ffffff',
                                                    padding: '5px 10px',
                                                    border: 'none',
                                                    borderRadius: '5px',
                                                    cursor: 'pointer',
                                                }}
                                                onClick={() => handleAppealClick(appeal.grievanceId, appeal.applicationNumber)}
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppealDashboard;
