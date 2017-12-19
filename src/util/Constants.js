//-----------------------------------------------
//---------------- App variables ----------------
//-----------------------------------------------

// Uploadcare
export const DEFAULT_UPLOADCARE_SETTINGS = {
  multiple: true,
  tabs: 'file camera',
  imageShrink: '1920x1440 80%',
  previewStep: true,
  inputAcceptTypes: null
}

// Middleware & RestApiClient
export const BASIC_API_TOKEN = 'YXBwOllYQndPbk5wWlc1dVlUSXdNVEZ6YjJacFlUSXdNVFU9';
export const BEARER_API_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9zdGFnaW5nLWFwaS53b3JreWFyZC5jb21cL2xvZ2luX2VtYWlsIiwic3ViIjoyODkyLCJpYXQiOjE1MDE4MDQyOTYsImV4cCI6MjEwMTgwNDI5Nn0.rRUQWiC4a-0r8j-6nRKGP2b77HV8ciiUcMS8gTHtXvo';
export const PRIVACY_TYPE_AUTH = 'auth';
export const PRIVACY_TYPE_BASIC = 'basic';
export const API_URL = "https://staging-api.workyard.com";

// Add Project Modal
export const PROJECT_TYPES = [
  {
    "id": "1",
    "name": "Home Renovation"
  },
  {
    "id": "2",
    "name": "Granny Flat"
  },
  {
    "id": "3",
    "name": "New Home"
  },
  {
    "id": "4",
    "name": "Multi Unit Residential"
  },
  {
    "id": "5",
    "name": "High End Residential"
  },
  {
    "id": "6",
    "name": "Retail"
  },
  {
    "id": "7",
    "name": "Commercial"
  }
];

export const CONTRACT_VALUES = [
  {id: 0, description: '$500 — $1K', min: 500, max: 1000},
  {id: 1, description: '$1K — $2.5K', min: 1000, max: 2500},
  {id: 2, description: '$2.5K — $5K', min: 2500, max: 5000},
  {id: 3, description: '$5K — $10K', min: 5000, max: 10000},
  {id: 4, description: '$10K — $15K', min: 10000, max: 15000},
  {id: 5, description: '$15K — $20K', min: 15000, max: 20000},
  {id: 6, description: '$20K — $30K', min: 20000, max: 30000},
  {id: 7, description: '$30K — $40K', min: 30000, max: 40000},
  {id: 8, description: '$40K — $50K', min: 40000, max: 50000},
  {id: 9, description: '$50K — $75K', min: 50000, max: 75000},
  {id: 10, description: '$75K — $100K', min: 75000, max: 100000},
  {id: 11, description: '$100K — $200K', min: 100000, max: 200000},
  {id: 12, description: '$200K — $300K', min: 200000, max: 300000},
  {id: 13, description: '$400K — $500K', min: 400000, max: 500000},
  {id: 14, description: '$500K — $1M', min: 500000, max: 1000000},
  {id: 15, description: '$1M — $2M', min: 1000000, max: 2000000},
  {id: 16, description: '$2M — $3M', min: 2000000, max: 3000000},
  {id: 17, description: '$3M — $4M', min: 3000000, max: 4000000},
  {id: 18, description: '$4M — $5M+', min: 4000000, max: 5000000}
];

//-----------------------------------------------
//---------------- Action names -----------------
//-----------------------------------------------

// Store you action names e.g. ADD_PROJECT, here

