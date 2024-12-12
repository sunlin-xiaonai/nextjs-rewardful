import { NextRequest, NextResponse } from 'next/server';

const REWARDFUL_API = 'https://api.getrewardful.com/v1';

export async function POST(request: NextRequest) {
  console.log('🔵 API Route: POST Request Received');
  const apiKey = process.env.NEXT_PUBLIC_REWARDFUL_API_KEY;
  const apiSecret = process.env.NEXT_PUBLIC_REWARDFUL_API_SECRET;

  try {
    const body = await request.json();
    const path = request.nextUrl.searchParams.get('path') || '';
    
    console.log('📤 Forwarding to Rewardful API:', {
      path,
      body,
    });

    const response = await fetch(`${REWARDFUL_API}${path}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiSecret}`,
        'Content-Type': 'application/json',
        'X-Rewardful-API-Key': apiKey || '',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log('📥 Rewardful API Response:', {
      status: response.status,
      data,
    });

    if (!response.ok) {
      console.error('❌ API Error:', data.error, data.details);
      return NextResponse.json(
        { 
          error: data.error,
          details: data.details
        },
        { status: response.status }
      );
    }

    console.log('✅ Request Successful');
    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ Server Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const apiKey = process.env.NEXT_PUBLIC_REWARDFUL_API_KEY;
  const apiSecret = process.env.NEXT_PUBLIC_REWARDFUL_API_SECRET;
  const path = request.nextUrl.searchParams.get('path') || '';

  try {
    const response = await fetch(`${REWARDFUL_API}${path}`, {
      headers: {
        'Authorization': `Bearer ${apiSecret}`,
        'Content-Type': 'application/json',
        'X-Rewardful-API-Key': apiKey || '',
      },
    });

    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));
    console.log('📥 Rewardful API Response:', {
      status: response.status,
      data,
    });
    if (!response.ok) {
      console.error('❌ API Error:', data.error, data.details);
      return NextResponse.json(
        { 
          error: data.error,
          details: data.details
        },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 


export async function PUT(request: NextRequest) {
  console.log('🔵 API Route: PUT Request Received');
  const apiKey = process.env.NEXT_PUBLIC_REWARDFUL_API_KEY;
  const apiSecret = process.env.NEXT_PUBLIC_REWARDFUL_API_SECRET;

  try {
    const path = request.nextUrl.searchParams.get('path') || '';
    
    console.log('📤 Forwarding to Rewardful API:', {
      path,
      method: 'PUT',
    });

    const response = await fetch(`${REWARDFUL_API}${path}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${apiSecret}`,
        'Content-Type': 'application/json',
        'X-Rewardful-API-Key': apiKey || '',
      }
    });

    const data = await response.json();
    console.log('📥 Rewardful API Response:', {
      status: response.status,
      data,
    });

    if (!response.ok) {
      console.error('❌ API Error:', data.error, data.details);
      return NextResponse.json(
        { 
          error: data.error,
          details: data.details
        },
        { status: response.status }
      );
    }

    console.log('✅ Request Successful');
    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ Server Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}