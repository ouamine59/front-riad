// jest.setup.ts
import "@testing-library/jest-dom";
// Mock global variables si nécessaire
global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;
