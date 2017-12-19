import {
  BASIC_API_TOKEN,
  BEARER_API_TOKEN,
  PRIVACY_TYPE_AUTH,
  API_URL
} from '../Constants';


//------------------------------------------------------------------------------
//-------------------- A global handler for failed API calls -------------------
//------------------------------------------------------------------------------


const defaultCatchCallback = err => {
  console.error(err)
}

//------------------------------------------------------------------------------
//--- Build the value for the "Workyard-Agent" key in the API request header ---
//------------------------------------------------------------------------------


const getWorkyardAgentHeader = () => {
  return ""
}


//------------------------------------------------------------------------------
//---------- Build the HTTP headers needed for the Workyard API ----------------
//------------------------------------------------------------------------------

const buildWorkyardHeaders = (privacyType) => {

  // Get the right Authorisation request header.
  const isCallPrivate = privacyType === PRIVACY_TYPE_AUTH;
  const authorization = isCallPrivate ? `Bearer ${BEARER_API_TOKEN}` : `Basic ${BASIC_API_TOKEN}`;

  // Build the Workyard-Agent request header.
  const workyardAgent = getWorkyardAgentHeader();
  
  // Return the headers for the API Call
  const headers = new Headers({
    "Workyard-Agent": workyardAgent,
    "Authorization": authorization,
    "Content-Type": "application/json"
  });
  return headers;
}


//-----------------------------------------------------------------------------------------
//----------------------- Generate the URL for the HTTP request ---------------------------
//-----------------------------------------------------------------------------------------

const generateUrl = relativeUrl => {
  return `${API_URL}${relativeUrl}`;
}

//-----------------------------------------------------------------------------------------
//--------------------- Build the request object that we pass to fetch --------------------
//-----------------------------------------------------------------------------------------


const generateRequest = (url, type, headers, payload) => {
  if (type === 'GET') {
    return new Request(url, {
      method: type, 
      mode: 'cors', 
      headers: headers,
    });
  } else {
    return new Request(url, {
      method: type, 
      mode: 'cors', 
      headers: headers,
      body: JSON.stringify(payload)
    });
  }
}


export {
  defaultCatchCallback,
  buildWorkyardHeaders,
  generateUrl,
  generateRequest
};