import { applyDecorators } from '@nestjs/common';
import { 
  ApiOperation, 
  ApiResponse, 
  ApiBody,
  ApiCookieAuth
} from '@nestjs/swagger';

export function SwaggerLogin() {
  return applyDecorators(
    ApiOperation({ 
      summary: 'Admin login',
      description: 'Authenticate admin with username and password. Returns access token and sets refresh token as HTTP-only cookie.'
    }),
    ApiBody({
      description: 'Admin login credentials',
      schema: {
        type: 'object',
        required: ['username', 'password'],
        properties: {
          username: { 
            type: 'string', 
            example: 'admin',
            description: 'Admin username'
          },
          password: { 
            type: 'string', 
            example: 'password123',
            description: 'Admin password'
          }
        }
      }
    }),
    ApiResponse({
      status: 200,
      description: 'Login successful',
      schema: {
        type: 'object',
        properties: {
          admin: {
            type: 'object',
            properties: {
              _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
              username: { type: 'string', example: 'admin' }
            },
            description: 'Admin information (password excluded)'
          },
          accessToken: { 
            type: 'string', 
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            description: 'JWT access token for API authentication (expires in 1h)'
          },
          refreshToken: { 
            type: 'string', 
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            description: 'JWT refresh token (expires in 7d, also set as HTTP-only cookie)'
          }
        }
      },
      headers: {
        'Set-Cookie': {
          description: 'HTTP-only refresh token cookie (expires in 1 day)',
          schema: {
            type: 'string',
            example: 'refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...; HttpOnly; Secure; SameSite=none; Domain=localhost'
          }
        }
      }
    }),
    ApiResponse({ 
      status: 400, 
      description: 'Bad request - Invalid input data',
      schema: {
        type: 'object',
        properties: {
          message: { 
            type: 'array', 
            items: { type: 'string' },
            example: ['username should not be empty', 'password should not be empty']
          },
          error: { type: 'string', example: 'Bad Request' },
          statusCode: { type: 'number', example: 400 }
        }
      }
    }),
    ApiResponse({ 
      status: 404, 
      description: 'User not found',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'User not found' },
          error: { type: 'string', example: 'Not Found' },
          statusCode: { type: 'number', example: 404 }
        }
      }
    }),
    ApiResponse({ 
      status: 401, 
      description: 'Unauthorized - Invalid password',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Invalid password' },
          error: { type: 'string', example: 'Unauthorized' },
          statusCode: { type: 'number', example: 401 }
        }
      }
    })
  );
}

export function SwaggerRefreshToken() {
  return applyDecorators(
    ApiOperation({ 
      summary: 'Refresh access token',
      description: 'Get new access token using refresh token from HTTP-only cookie. Also returns a new refresh token.'
    }),
    ApiCookieAuth('refreshToken'),
    ApiResponse({
      status: 200,
      description: 'Token refresh successful',
      schema: {
        type: 'object',
        properties: {
          admin: {
            type: 'object',
            properties: {
              _id: { type: 'string', example: '507f1f77bcf86cd799439011' },
              username: { type: 'string', example: 'admin' }
            },
            description: 'Admin information (password excluded)'
          },
          accessToken: { 
            type: 'string', 
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            description: 'New JWT access token (expires in 1h)'
          },
          refreshToken: { 
            type: 'string', 
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            description: 'New JWT refresh token (expires in 7d)'
          }
        }
      },
      headers: {
        'Set-Cookie': {
          description: 'New HTTP-only refresh token cookie',
          schema: {
            type: 'string',
            example: 'refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...; HttpOnly; Secure; SameSite=none'
          }
        }
      }
    }),
    ApiResponse({ 
      status: 401, 
      description: 'Unauthorized - Invalid or missing refresh token',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Refresh token not passed' },
          error: { type: 'string', example: 'Unauthorized' },
          statusCode: { type: 'number', example: 401 }
        }
      }
    }),
    ApiResponse({ 
      status: 400, 
      description: 'Bad request - Admin not found',
      schema: {
        type: 'object',
        properties: {
          message: { type: 'string', example: 'Admin not found' },
          error: { type: 'string', example: 'Bad Request' },
          statusCode: { type: 'number', example: 400 }
        }
      }
    })
  );
}

export function SwaggerLogout() {
  return applyDecorators(
    ApiOperation({ 
      summary: 'Admin logout',
      description: 'Logout admin by clearing the refresh token cookie.'
    }),
    ApiResponse({
      status: 200,
      description: 'Logout successful',
      schema: {
        type: 'object',
        properties: {
          message: { 
            type: 'string', 
            example: 'Logged out successfully',
            description: 'Logout confirmation message'
          }
        }
      },
      headers: {
        'Set-Cookie': {
          description: 'Cleared refresh token cookie',
          schema: {
            type: 'string',
            example: 'refreshToken=; HttpOnly; Secure; SameSite=none; Expires=Thu, 01 Jan 1970 00:00:00 GMT'
          }
        }
      }
    })
  );
}