const axios = require('axios')

exports.main = async () => {
  const token = process.env.HUBSPOT_SERVERLESS_FUNCTION_TOKEN 

  if (!token ) {
    return {
      statusCode: 500,
      body: { error: 'Missing token' },
      headers: { 'Content-Type': 'application/json' },
    };
  }

  const url = `https://api.hubapi.com/crm/v3/pipelines/tickets`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return {
      statusCode: 200,
      body: response.data,
      headers: { 'Content-Type': 'application/json' },
    };
  } catch (error) {
    console.error('Fetch error:', error);

    return {
      statusCode: 500,
      body: { error: error.message },
      headers: { 'Content-Type': 'application/json' },
    };
  }
};
