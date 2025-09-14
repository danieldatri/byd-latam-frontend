const { createDefaultPreset } = require("ts-jest");
const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node", // Cambio temporal hasta resolver dependencias
  transform: {
    ...tsJestTransformCfg,
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  // setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Comentado temporalmente
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1'
  },
};
