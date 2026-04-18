import { NextResponse } from 'next/server';

/**
 * Standard API Response Utility
 */
export const apiResponse = {
  success: (data: any, status = 200) => {
    return NextResponse.json({ success: true, data }, { status });
  },
  
  error: (message: string, status = 500, details?: any) => {
    return NextResponse.json(
      { 
        success: false, 
        error: message, 
        details: process.env.NODE_ENV === 'development' ? details : undefined 
      }, 
      { status }
    );
  },

  unauthorized: () => {
    return NextResponse.json({ success: false, error: 'Unauthorized Access' }, { status: 401 });
  },

  notFound: (resource = 'Resource') => {
    return NextResponse.json({ success: false, error: `${resource} Not Found` }, { status: 404 });
  },

  badRequest: (message: string) => {
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
};
