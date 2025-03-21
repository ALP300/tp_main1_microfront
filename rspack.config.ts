import * as path from "node:path";
import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import * as RefreshPlugin from "@rspack/plugin-react-refresh";
import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";

const isDev = process.env.NODE_ENV === "development";

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ["chrome >= 87", "edge >= 88", "firefox >= 78", "safari >= 14"];

export default defineConfig({
  context: __dirname,
  entry: {
    main: "./src/index.ts", // Punto de entrada de la aplicación
  },
  resolve: {
    extensions: ["...", ".ts", ".tsx", ".jsx"], // Extensiones de archivo que se resolverán
  },
  devServer: {
    port: 4002, // Puerto del servidor de desarrollo
    historyApiFallback: true, // Habilita el soporte para React Router
    watchFiles: [path.resolve(__dirname, "src")], // Archivos a observar en desarrollo
  },
  output: {
    uniqueName: "appTwo", // Identificador único para este microfrontend
    publicPath: isDev ? "auto" : "http://react-tp-site.s3-website-sa-east-1.amazonaws.com/",
  },
  experiments: {
    css: true, // Habilita el soporte para CSS
  },
  module: {
    rules: [
      {
        test: /\.svg$/, // Maneja archivos SVG
        type: "asset",
      },
      {
        test: /\.css$/, // Maneja archivos CSS
        use: ["postcss-loader"],
        type: "css",
      },
      {
        test: /\.(jsx?|tsx?)$/, // Maneja archivos JSX/TSX
        use: [
          {
            loader: "builtin:swc-loader", // Usa SWC para transpilar
            options: {
              jsc: {
                parser: {
                  syntax: "typescript", // Soporte para TypeScript
                  tsx: true, // Soporte para TSX
                },
                transform: {
                  react: {
                    runtime: "automatic", // Usa el nuevo JSX transform
                    development: isDev, // Habilita el modo desarrollo
                    refresh: isDev, // Habilita React Refresh en desarrollo
                  },
                },
              },
              env: { targets }, // Define los navegadores objetivo
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: "./index.html", // Usa este archivo como plantilla HTML
    }),
    new ModuleFederationPlugin({
      name: "appTwo", // Nombre único de esta aplicación
      filename: "remoteEntry.js", // Nombre del archivo remoto
      remotes: {
        components: "app1@http://localhost:4001/remoteEntry.js", // Carga el microfrontend app1
      },
      exposes: {}, // No expone ningún módulo (ya que es un consumidor)
      shared: {
        react: { singleton: true }, // Comparte React como un singleton
        "react-dom": { singleton: true }, // Comparte React DOM como un singleton
      },
    }),
    isDev ? new RefreshPlugin() : null, // Habilita React Refresh en desarrollo
  ].filter(Boolean), // Filtra plugins nulos
  optimization: {
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin(), // Minimiza JavaScript con SWC
      new rspack.LightningCssMinimizerRspackPlugin({
        minimizerOptions: { targets }, // Minimiza CSS con Lightning CSS
      }),
    ],
  },
});