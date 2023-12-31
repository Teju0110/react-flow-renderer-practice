import React, { useMemo } from "react";
import ReactFlow, { ReactFlowProvider } from "react-flow-renderer";
//import Node from "./Node";
import 'react-flow-renderer/dist/style.css';

const data = 
[
  {
    "id": 1,
    "type": "email-1to1",
    "name": "Email 1to1",
    "contentName": "OME Forum 08/06/21 > Votre invitation à l’OME Forum le 8 juin",
    "phase": "Execution",
    "date": {
      "from": "01/06",
      "to": "15/06"
    },
    "previous": [], 
    "data": {
     "target": 2000,
     "potentialTarget": 2000,
     "percentOK": {
       "label": "CTOR",
       "value": 10
     },
     "analytics": [
       {
         "label": "Accepted",
         "color": "#003f5c",
         "value": 200
       },
       {
        "label": "Refused",
        "color": "#d45087",
        "value": 10
       },
       {
        "label": "Unsubscribed",
        "color": "#ffa600",
        "value": 5
       },
       {
        "label": "Opened",
        "color": "#665191",
        "value": 500
       },
       {
        "label": "Not Opened",
        "color": "#a05195",
        "value": 600
       },
       {
        "label": "Bounced",
        "color": "#ff7c43",
        "value": 485
       },
       {
        "label": "Target Lost",
        "color": "#f95d6a",
        "value": 200
       }
     ]
    }
  },
  {
    "id": 2,
    "previous": [
      { "stepId": 1, "count": 500, "label": "Opened" }
    ],
    "type": "automated-email",
    "name": "Automated Email",
    "contentName": "Echanges Franco Belges Connexion 26/05 > Vos informations de connexion : Échanges Franco Belges",
    "phase": "Execution",
    "date": {
      "from": "10/06",
      "to": "20/06"
    },
    "data": {
     "target": 100,
     "potentialTarget": 500,
     "percentOK": {
       "label": "CTOR",
       "value": 40
     },
     "analytics": [
      {
        "label": "Accepted",
        "color": "#003f5c",
        "value": 40
      },
      {
       "label": "Refused",
       "color": "#d45087",
       "value": 2
      },
      {
       "label": "Unsubscribed",
       "color": "#ffa600",
       "value": 0
      },
       {
        "label": "Opened",
        "color": "#58508d",
        "value": 48
       },
       {
        "label": "Not Opened",
        "color": "#bc5090",
        "value": 10
       },
       {
        "label": "Bounced",
        "color": "#ff6361",
        "value": 0
       }
     ]
    }
  },
  {
    "id": 3,
    "previous": [
      { "stepId": 2, "count": 40, "label": "Accepted" }
    ],
    "type": "sms",
    "name": "SMS",
    "phase": "Execution",
    "date": {
      "from": "15/06",
      "to": "30/06"
    },
    "data": {
     "target": 30,
     "potentialTarget": 40,
     "percentOK": {
        "label": "CTOR",
        "value": 20
      },
     "analytics": [
       {
        "label": "Accepted",
        "color": "#003f5c",
        "value": 6
       },
       {
        "label": "Opened",
        "color": "#58508d",
        "value": 14
       },
       {
        "label": "Not opened",
        "color": "#bc5090",
        "value": 10
       },
       {
        "label": "Bounced",
        "color": "#ff6361",
        "value": 0
       }
     ]
    }
  },
  {
    "id": 4,
    "previous": [
      { "stepId": 1, "count": 200, "label": "Accepted" }
    ],
    "type": "survey",
    "name": "Survey",
    "phase": "Execution",
    "date": {
      "from": "1/06",
      "to": "20/06"
    },
    "data": {
      "target": 150,
      "potentialTarget": 200,
      "percentOK": {
         "label": "Submitted",
         "value": 73
       },
      "analytics": [
        {
          "label": "Submitted",
          "color": "#003f5c",
          "value": 110
        },
        {
          "label": "Not Submitted",
          "color": "#58508d",
          "value": 33
        },
        {
          "label": "CSAT",
          "color": "#bc5090",
          "value": 7
        },
        {
          "label": "NPS",
          "color": "#ffa600",
          "value": 0
        }
      ]
     }
  },
  {
    "id": 5,
    "previous": [
      { "stepId": 4, "count": 110, "label": "Submitted" }
    ],
    "type": "call",
    "name": "Call",
    "phase": "Integration",
    "date": {
      "from": "10/06",
      "to": "20/06"
    },
    "data": {
      "target": 110,
      "potentialTarget": 110,
      "percentOK": {
         "label": "Visited",
         "value": 54
       },
      "analytics": [
        {
          "label": "Visited",
          "color": "#003f5c",
          "value": 60
        },
        {
          "label": "Not Visited",
          "color": "#ffa600",
          "value": 50
        }
      ]
    }
  },
  {
    "id": 6,
    "final": true,
    "previous": [
      { "stepId": 5, "count": 60, "label": "Visited" },
      { "stepId": 3, "count": 6, "label": "Accepted" }
    ],
    "type": "event",
    "name": "Event",
    "phase": "Preparation",
    "date": "30/06/2021",
    "data": {
      "target": 30,
      "potentialTarget": 66,
      "percentOK": {
         "label": "Attended",
         "value": 0
       },
     "analytics": [
        {
          "label": "Confirmed",
          "color": "#58508d",
          "value": 20
        },
        {
          "label": "Cancelled",
          "color": "#ffa600",
          "value": 10
        },
        {
          "label": "Not Attended",
          "color": "#ff6361",
          "value": 0
        },
        {
          "label": "Attended",
          "color": "#003f5c",
          "value": 0
        }
     ]
    }
  }
]


function transformDataToFlowElements(data) {
  if (!data || !Array.isArray(data)) {
    return [];
  }

  const nodes = data.map((step) => ({
    id: step.id.toString(),
    type: "custom", // Use your custom node type here
    data: { label: step.name }, // Make sure the correct data is being passed here
    position: { x: step.id * 250, y: 50 },
  }));

  const edges = data.flatMap((step) =>
    step.previous.map((prevStep) => ({
      id: `${prevStep.stepId}-${step.id}`,
      source: prevStep.stepId.toString(),
      target: step.id.toString(),
      animated: true,
    }))
  );

  return [...nodes, ...edges];
}

const Flow = () => {
  const elements = useMemo(() => transformDataToFlowElements(data), [data]);

  if (!data || !Array.isArray(data) || elements.length === 0) {
    // Handle the case where data is not available, not an array, or no elements to display
    return <div>No flow elements to display.</div>;
  }



  const nodeTypes = {
    custom: Node,
  };

  console.log(nodeTypes)

  return (
    <ReactFlowProvider>
      <div style={{height:"85vh"}}><ReactFlow elements={elements} nodeTypes={nodeTypes} /></div>
    </ReactFlowProvider>
  );
};

export default Flow;
