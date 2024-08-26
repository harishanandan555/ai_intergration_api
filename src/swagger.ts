const swaggerDocument = {
    "openapi": "3.0.0",
    "info": {
        "description": "NodeJS API project to demonstrate QMetrix API Swagger Documentation",
        "version": "1.0.0",
        "title": "QMetrix API by Mango Leef Tech Labs",
        "contact": {
            "email": "support@bullbox.in"
        },
        "license": {
            "name": "Apache 2.0",
            "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
        }
    },
    "servers": [
        {
            "url": "http://localhost:8000",
            "description": "Local Server - api"
        },
        {
            "url": "http://localhost:3000",
            "description": "Local Server - react"
        },
        {
            "url": "https://bullboxconnect.onrender.com",
            "description": "Render Production Server - RenderApi"
        }
    ],
    "paths" : {
        "/auth/register" : {
            "post" : {
                "summary" : "Register a new user",
                "description": "Endpoint to register a new user",
                "tags": ["Authentication"],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/definitions/register"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/userResponse"
                        }
                    },
                    "400": {
                        "description": "Registration failed",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/InvalidResponse"
                        }
                    }
                }
            }
        },
        "/auth/login" : {
            "post" : {
                "summary" : "Sign in with email and password",
                "description": "Endpoint to sign in with email and password",
                "tags": ["Authentication"],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/definitions/login"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/userResponse"
                        }
                    },
                    "400": {
                        "description": "Invalid credentials",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/InvalidResponse"
                        }
                    }
                }
            }
        },
        "/auth/validateotp" : {
            "post" : {
                "summary" : "validate email otp",
                "description": "Endpoint to sign in with email and password",
                "tags": ["Authentication"],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/definitions/validateotp"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/userResponse"
                        }
                    },
                    "400": {
                        "description": "Invalid credentials",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/InvalidResponse"
                        }
                    }
                }
            }
        },
        "/auth/forgotpassword" : {
            "post" : {
                "summary" : "forgotpassword",
                "description": "Endpoint to sign in with email and password",
                "tags": ["Authentication"],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/definitions/forgotpassword"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/userResponse"
                        }
                    },
                    "400": {
                        "description": "Invalid credentials",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/InvalidResponse"
                        }
                    }
                }
            }
        },
        "/auth/resetpassword" : {
            "post" : {
                "summary" : "resetpassword",
                "description": "Endpoint to sign in with email and password",
                "tags": ["Authentication"],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/definitions/resetpassword"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/userResponse"
                        }
                    },
                    "400": {
                        "description": "Invalid credentials",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/InvalidResponse"
                        }
                    }
                }
            }
        },
        "/auth/add/user" : {
            "post" : {
                "summary" : "add user",
                "description": "Endpoint to sign in with email and password",
                "tags": ["Authentication"],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/definitions/addUser"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/userResponse"
                        }
                    },
                    "400": {
                        "description": "Invalid credentials",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/InvalidResponse"
                        }
                    }
                },
                "security": [
                    {
                        "qmetrix-token": []
                    }
                ]
            }
        },
        "/master/add/role/detail" : {
            "post" : {
                "summary" : "add role detail",
                "description": "Endpoint to sign in with email and password",
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/definitions/addrole"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/userResponse"
                        }
                    },
                    "400": {
                        "description": "Invalid credentials",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/InvalidResponse"
                        }
                    }
                },
                "security": [
                    {
                        "qmetrix-token": []
                    }
                ]
            }
        },
        "/master/add/team/detail" : {
            "post" : {
                "summary" : "add team detail",
                "description": "Endpoint to sign in with email and password",
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/definitions/addteam"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/userResponse"
                        }
                    },
                    "400": {
                        "description": "Invalid credentials",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/InvalidResponse"
                        }
                    }
                },
                "security": [
                    {
                        "qmetrix-token": []
                    }
                ]
            }
        },
        "/master/get/roles/detail" : {
            "get" : {
                "summary" : "Get roles details",
                "description": "Endpoint to get roles details",
                "responses": {
                    "200": {
                        "description": "Success",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/userResponse"
                        }
                    },
                    "400": {
                        "description": "Invalid request",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/InvalidResponse"
                        }
                    }
                },
                "security": [
                    {
                        "qmetrix-token": []
                    }
                ]
            }
        },
        "/master/get/teams/detail" : {
            "get" : {
                "summary" : "Get teams details",
                "description": "Endpoint to get teams details",
                "responses": {
                    "200": {
                        "description": "Success",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/userResponse"
                        }
                    },
                    "400": {
                        "description": "Invalid request",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/InvalidResponse"
                        }
                    }
                },
                "security": [
                    {
                        "qmetrix-token": []
                    }
                ]
            }
        },
        "/master/add/company/detail" : {
            "post" : {
                "summary": "Add company detail",
                "description": "Endpoint to add company details",
                "tags": ["company detail"],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/definitions/addcompany"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/userResponse"
                        }
                    },
                    "400": {
                        "description": "Invalid credentials",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/InvalidResponse"
                        }
                    }
                },
                "security": [
                    {
                        "qmetrix-token": []
                    }
                ]
            }
        },
        "/master/get/companys/detail" : {
            "get" : {
                "summary" : "Get company details",
                "description": "Endpoint to get company details",
                "tags": ["company detail"],
                "responses": {
                    "200": {
                        "description": "Success",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/userResponse"
                        }
                    },
                    "400": {
                        "description": "Invalid request",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/InvalidResponse"
                        }
                    }
                },
                "security": [
                    {
                        "qmetrix-token": []
                    }
                ]
            }
        },
        "/master/fetch/add/allprojectdetials/totenant" : {
            "post" : {
                "summary" : "add jira project to tenant",
                "description": "Endpoint to sign in with email and password",
                "tags": ["project detail"],
                "parameters": [
                    {
                        "name": "page",
                        "in": "query",
                        "required": false,
                        "schema": {
                            "type": "integer",
                            "example": 1
                        },
                        "description": "Page number for pagination"
                    },
                    {
                        "name": "pageSize",
                        "in": "query",
                        "required": false,
                        "schema": {
                            "type": "integer",
                            "example": 10
                        },
                        "description": "Number of records per page"
                    }
                ],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/definitions/projectConnection"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/userResponse"
                        }
                    },
                    "400": {
                        "description": "Invalid credentials",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/InvalidResponse"
                        }
                    }
                },
                "security": [
                    {
                        "qmetrix-token": []
                    }
                ]
            }
        },
        "/master/get/projectdetials/fromtenant" : {
            "post" : {
                "summary" : "Get projects details",
                "description": "Endpoint to get projects details",
                "tags": ["project detail"],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/definitions/connectToProject"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/userResponse"
                        }
                    },
                    "400": {
                        "description": "Invalid request",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/InvalidResponse"
                        }
                    }
                },
                "security": [
                    {
                        "qmetrix-token": []
                    }
                ]
            }
        },
        "/master/fetch/alljirasprints/issues/inmetrics" : {
            "post" : {
                "summary" : "Get projects details",
                "description": "Endpoint to get projects details",
                "tags": ["jirasprints detail"],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/definitions/connectToProject"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/userResponse"
                        }
                    },
                    "400": {
                        "description": "Invalid request",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/InvalidResponse"
                        }
                    }
                },
                "security": [
                    {
                        "qmetrix-token": []
                    }
                ]
            }
        },
        "/master/fetch/jirasprint/issuebyid/inmetrics" : {
            "post" : {
                "summary" : "Get projects details",
                "description": "Endpoint to get projects details",
                "tags": ["jirasprints detail"],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/definitions/connectToProjectWithSprintId"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/userResponse"
                        }
                    },
                    "400": {
                        "description": "Invalid request",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/InvalidResponse"
                        }
                    }
                },
                "security": [
                    {
                        "qmetrix-token": []
                    }
                ]
            }
        },
        "/master/fetch/tickets/graphdata" : {
            "post" : {
                "summary" : "Get projects details",
                "description": "Endpoint to get projects details",
                "tags": ["jirasprints graph data"],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/definitions/connectToProject"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/userResponse"
                        }
                    },
                    "400": {
                        "description": "Invalid request",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/InvalidResponse"
                        }
                    }
                },
                "security": [
                    {
                        "qmetrix-token": []
                    }
                ]
            }
        },
        "/master/jirasprint/issuebyid/StoryPointsCommitted" : {
            "post" : {
                "summary" : "Get projects details",
                "description": "Endpoint to get projects details",
                "tags": ["jirasprints graph data"],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/definitions/connectToProjectWithSprintId"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/userResponse"
                        }
                    },
                    "400": {
                        "description": "Invalid request",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/InvalidResponse"
                        }
                    }
                },
                "security": [
                    {
                        "qmetrix-token": []
                    }
                ]
            }
        },
        "/master/jira/currentsprint/storypoints" : {
            "post" : {
                "summary" : "Get projects details",
                "description": "Endpoint to get projects details",
                "tags": ["jirasprints graph data"],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/definitions/connectToProjectWithSprintId"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/userResponse"
                        }
                    },
                    "400": {
                        "description": "Invalid request",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/InvalidResponse"
                        }
                    }
                },
                "security": [
                    {
                        "qmetrix-token": []
                    }
                ]
            }
        },
        "/master/jira/currentsprint/averagecycletime" : {
            "post" : {
                "summary" : "Get projects details",
                "description": "Endpoint to get projects details",
                "tags": ["jirasprints graph data"],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/definitions/connectToProjectWithSprintId"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/userResponse"
                        }
                    },
                    "400": {
                        "description": "Invalid request",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/InvalidResponse"
                        }
                    }
                },
                "security": [
                    {
                        "qmetrix-token": []
                    }
                ]
            }
        },
        "/master/jira/storypoints/addedafter/sprintstart" : {
            "post" : {
                "summary" : "Get projects details",
                "description": "Endpoint to get projects details",
                "tags": ["jirasprints graph data"],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/definitions/connectToProjectWithSprintId"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/userResponse"
                        }
                    },
                    "400": {
                        "description": "Invalid request",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/InvalidResponse"
                        }
                    }
                },
                "security": [
                    {
                        "qmetrix-token": []
                    }
                ]
            }
        },
        "/master/jira/storypoints/removedafter/sprintstart" : {
            "post" : {
                "summary" : "Get projects details",
                "description": "Endpoint to get projects details",
                "tags": ["jirasprints graph data"],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/definitions/connectToProjectWithSprintId"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/userResponse"
                        }
                    },
                    "400": {
                        "description": "Invalid request",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/InvalidResponse"
                        }
                    }
                },
                "security": [
                    {
                        "qmetrix-token": []
                    }
                ]
            }
        },
        "/master/jira/storypoints/committedvscompleted/trend" : {
            "post" : {
                "summary" : "Get projects details",
                "description": "Endpoint to get projects details",
                "tags": ["jirasprints graph data"],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/definitions/connectToProjectWithSprintId"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/userResponse"
                        }
                    },
                    "400": {
                        "description": "Invalid request",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/InvalidResponse"
                        }
                    }
                },
                "security": [
                    {
                        "qmetrix-token": []
                    }
                ]
            }
        },
        "/master/jira/sprints/completedgapanalysis" : {
            "post" : {
                "summary" : "Get projects details",
                "description": "Endpoint to get projects details",
                "tags": ["jirasprints graph data"],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/definitions/connectToProjectWithSprintId"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/userResponse"
                        }
                    },
                    "400": {
                        "description": "Invalid request",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/InvalidResponse"
                        }
                    }
                },
                "security": [
                    {
                        "qmetrix-token": []
                    }
                ]
            }
        },
        "/master/get/jira/sprints/blockedstoriestrend" : {
            "post" : {
                "summary" : "Get projects details",
                "description": "Endpoint to get projects details",
                "tags": ["jirasprints graph data"],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/definitions/connectToProjectWithSprintId"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/userResponse"
                        }
                    },
                    "400": {
                        "description": "Invalid request",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/InvalidResponse"
                        }
                    }
                },
                "security": [
                    {
                        "qmetrix-token": []
                    }
                ]
            }
        },
        "/master/jira/sprints/calculate/averageblockedduration" : {
            "post" : {
                "summary" : "Get projects details",
                "description": "Endpoint to get projects details",
                "tags": ["jirasprints graph data"],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/definitions/connectToProjectWithSprintId"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/userResponse"
                        }
                    },
                    "400": {
                        "description": "Invalid request",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/InvalidResponse"
                        }
                    }
                },
                "security": [
                    {
                        "qmetrix-token": []
                    }
                ]
            }
        },
        "/master/jira/sprints/get/blockedstories/count" : {
            "post" : {
                "summary" : "Get projects details",
                "description": "Endpoint to get projects details",
                "tags": ["jirasprints graph data"],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/definitions/connectToProjectWithSprintId"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/userResponse"
                        }
                    },
                    "400": {
                        "description": "Invalid request",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/InvalidResponse"
                        }
                    }
                },
                "security": [
                    {
                        "qmetrix-token": []
                    }
                ]
            }
        },
        "/master/jira/sprints/calculate/storypoints" : {
            "post" : {
                "summary" : "Get projects details",
                "description": "Endpoint to get projects details",
                "tags": ["jirasprints graph data"],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/definitions/connectToProjectWithSprintId"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/userResponse"
                        }
                    },
                    "400": {
                        "description": "Invalid request",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/InvalidResponse"
                        }
                    }
                },
                "security": [
                    {
                        "qmetrix-token": []
                    }
                ]
            }
        },
        "/master/jira/sprints/calculate/deviation/storypoints" : {
            "post" : {
                "summary" : "Get projects details",
                "description": "Endpoint to get projects details",
                "tags": ["jirasprints graph data"],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/definitions/connectToProjectWithSprintId"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/userResponse"
                        }
                    },
                    "400": {
                        "description": "Invalid request",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/InvalidResponse"
                        }
                    }
                },
                "security": [
                    {
                        "qmetrix-token": []
                    }
                ]
            }
        },
        "/master/jira/sprints/calculate/deviation/trend" : {
            "post" : {
                "summary" : "Get projects details",
                "description": "Endpoint to get projects details",
                "tags": ["jirasprints graph data"],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/definitions/connectToProjectWithSprintId"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/userResponse"
                        }
                    },
                    "400": {
                        "description": "Invalid request",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/InvalidResponse"
                        }
                    }
                },
                "security": [
                    {
                        "qmetrix-token": []
                    }
                ]
            }
        },
        "/master/fetch/details/sprint" : {
            "post" : {
                "summary" : "Get projects details",
                "description": "Endpoint to get projects details",
                "tags": ["jirasprints graph data"],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/definitions/connectToProjectWithSprintId"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/userResponse"
                        }
                    },
                    "400": {
                        "description": "Invalid request",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/InvalidResponse"
                        }
                    }
                },
                "security": [
                    {
                        "qmetrix-token": []
                    }
                ]
            }
        },
        "/master/jira/sprints/get/demo/date" : {
            "post" : {
                "summary" : "Get projects details",
                "description": "Endpoint to get projects details",
                "tags": ["jirasprints graph data"],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/definitions/connectToProjectWithSprintId"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/userResponse"
                        }
                    },
                    "400": {
                        "description": "Invalid request",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/InvalidResponse"
                        }
                    }
                },
                "security": [
                    {
                        "qmetrix-token": []
                    }
                ]
            }
        },
        "/master/jira/sprints/get/totalcompleted/storypoints" : {
            "post" : {
                "summary" : "Get projects details",
                "description": "Endpoint to get projects details",
                "tags": ["jirasprints graph data"],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/definitions/connectToProjectWithSprintId"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/userResponse"
                        }
                    },
                    "400": {
                        "description": "Invalid request",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/InvalidResponse"
                        }
                    }
                },
                "security": [
                    {
                        "qmetrix-token": []
                    }
                ]
            }
        },
        "/master/jira/sprints/calculate/story/points" : {
            "post" : {
                "summary" : "Get projects details",
                "description": "Endpoint to get projects details",
                "tags": ["jirasprints graph data"],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/definitions/connectToProjectWithSprintId"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/userResponse"
                        }
                    },
                    "400": {
                        "description": "Invalid request",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/InvalidResponse"
                        }
                    }
                },
                "security": [
                    {
                        "qmetrix-token": []
                    }
                ]
            }
        },
        "/master/jira/sprints/culate/completion/percentage" : {
            "post" : {
                "summary" : "Get projects details",
                "description": "Endpoint to get projects details",
                "tags": ["jirasprints graph data"],
                "requestBody": {
                    "required": true,
                    "content": {
                        "application/json": {
                            "schema": {
                                "$ref": "#/components/definitions/connectToProjectWithSprintId"
                            }
                        }
                    }
                },
                "responses": {
                    "200": {
                        "description": "Success",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/userResponse"
                        }
                    },
                    "400": {
                        "description": "Invalid request",
                        "schema": {
                            "$ref": "#/components/definitions/apiResponse/InvalidResponse"
                        }
                    }
                },
                "security": [
                    {
                        "qmetrix-token": []
                    }
                ]
            }
        },
    },
    "components": {
        "definitions": {
            "login": {
                "type": "object",
                "properties": {
                    "login_email": {
                        "type": "string",
                        "example": "user@example.com"
                    },
                    "login_password": {
                        "type": "string",
                        "example": "password"
                    }
                }
            },
            "register": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string",
                        "example": "John Doe"
                    },
                    "email": {
                        "type": "string",
                        "example": "user@example.com"
                    },
                    "password": {
                        "type": "string",
                        "example": "password"
                    },
                    "company_name": {
                        "type": "string",
                        "example": "Mango Leef Tech Labs"
                    },
                }
            },
            "validateotp": {
                "type": "object",
                "properties": {
                    "email": {
                        "type": "string",
                        "example": "user@example.com"
                    },
                    "otp": {
                        "type": "string",
                        "example": "123456"
                    }
                }
            },
            "forgotpassword": {
                "type": "object",
                "properties": {
                    "email": {
                        "type": "string",
                        "example": "user@example.com"
                    }
                }
            },
            "resetpassword": {
                "type": "object",
                "properties": {
                    "token": {
                        "type": "string",
                        "example": "**********"
                    },
                    "new_password": {
                        "type": "string",
                        "example": "newpassword"
                    }
                }
            },
            "addUser": {
                "type": "object",
                "properties": {
                    "auth_name": {
                        "type": "string",
                        "example": "Admin"
                    },
                    "team": {
                        "type": "string",
                        "example": "Admin"
                    },
                    "team_description": {
                        "type": "string",
                        "example": "pr"
                    },
                    "role_name": {
                        "type": "string",
                        "example": "Admin"
                    },
                    "role_description": {
                        "type": "string",
                        "example": "pr"
                    },
                }
            },
            "addrole": {
                "type": "object",
                "properties": {
                    "role_name": {
                        "type": "string",
                        "example": "Admin"
                    },
                    "role_description": {
                        "type": "string",
                        "example": "pr"
                    },
                }
            },
            "addteam": {
                "type": "object",
                "properties": {
                    "team_name": {
                        "type": "string",
                        "example": "Development"
                    },
                    "team_description": {
                        "type": "string",
                        "example": "Development"
                    },
                }
            },
            "addcompany": {
                "type": "object",
                "properties": {
                    "company_code": {
                        "type": "string",
                        "example": "12344566"
                    },
                    "company_description": {
                        "type": "string",
                        "example": "Mutual Funds."
                    },
                    "street1": {
                        "type": "string",
                        "example": "main road"
                    },
                    "street2": {
                        "type": "string",
                        "example": "shadhasiva nagar"
                    },
                    "zip_code": {
                        "type": "string",
                        "example": "500234."
                    },
                }
            },
            "projectConnection": {
                "type": "object",
                "properties": {
                    "BASE_URL": {
                        "type": "string",
                        "example": "https://*****.atlassian.net"
                    },
                    "USERNAME": {
                        "type": "string",
                        "example": "gokul_p@*****.in"
                    },
                    "API_TOKEN": {
                        "type": "string",
                        "example": "ATATT3xFfGF07I1x5tO8XPZkwIAO0wg--fiNXWMmF4yf2_CDw0=887F3496..........!"
                    },
                }
            },
            "connectToProject": {
                "type": "object",
                "properties": {
                    "PROJECT_KEY": {
                        "type": "string",
                        "example": "BFAA"
                    }
                }
            },
            "connectToProjectWithSprintId": {
                "type": "object",
                "properties": {
                    "PROJECT_KEY": {
                        "type": "string",
                        "example": "BFAA"
                    },
                    "sprintid": {
                        "type": "string",
                        "example": "1"
                    },
                }
            },
            "apiResponse": {
                "userResponse": {
                    "type": "object",
                    "properties": {
                        "status": {
                            "type": "string",
                            "example": "success"
                        },
                        "message": {
                            "type": "string",
                            "example": "Operation successful"
                        },
                        "data": {
                            "type": "object",
                            "example": {}
                        }
                    }
                },
                "InvalidResponse": {
                    "type": "object",
                    "properties": {
                        "status": {
                            "type": "string",
                            "example": "error"
                        },
                        "message": {
                            "type": "string",
                            "example": "Operation failed"
                        }
                    }
                }
            }
        },
        "securitySchemes": {
            "qmetrix-token": {
                "type": "apiKey",
                "name": "qmetrix-token",
                "in": "header",
                "description": "Token to access the QMetrix API"
            }
        }
    }
};

module.exports = swaggerDocument;