{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/serve",
      "outFiles": ["${workspaceFolder}/**/*.js"]
    },
    {
      "type": "node",
      "request": "attach",
      "name": "Attach y process id",
      "processId": "${command:PickProcess}"
    },
    {
      "name": "Attach to 7777",
      "type": "node",
      "request": "attach",
      "port": 7777
    },
    {
      "request": "attach",
      "name": "Attach to remote pwa",
      "address": "localhost",
      "port": 9229,
      "type": "pwa-node",
      "resolveSourceMapLocations": [
        "${workspaceFolder}/**",
        "!**/node_modules/**"
      ]
    },
    {
      "request": "attach",
      "name": "Attach to remote",
      "address": "localhost",
      "port": 9229,
      "type": "node"
    },
    {
      "name": "Launch localhost",
      "type": "chrome",
      "request": "launch",
      "urlFilter": "http://localhost:4200/*",
      "webRoot": "${workspaceFolder}/wwwroot"
    },
    {
      "type": "chrome",
      "request": "attach",
      "name": "Attach to Chrome",
      "port": 9222,
      "webRoot": "${workspaceRoot}"
    },
    {
      "name": "Current TS File",
      "request": "launch",
      "args": ["${workspaceFolder}/tools/cli/src/index.ts", "generate-prisma2"],
      "env": {
        "TS_NODE_TRANSPILE_ONLY": "true",
        "TS_NODE_PROJECT": "./tsconfig.json"
      },
      "runtimeArgs": [
        "-r",
        "ts-node/register",
        "-r",
        "tsconfig-paths/register"
      ],
      "type": "pwa-node",
      "resolveSourceMapLocations": [
        "${workspaceFolder}/**",
        "!**/node_modules/**"
      ],
      "sourceMaps": true,
      "cwd": "${workspaceRoot}"
    }
  ]
}
