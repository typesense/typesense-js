{
  description = "Typesense JS dev shell with Node version from .nvmrc";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs =
    { nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs { inherit system; };
        lib = pkgs.lib;
        nvmrcRaw = builtins.readFile ./.nvmrc;
        nvmrcVersion = lib.strings.removeSuffix "\n" nvmrcRaw;
        versionMatch = builtins.match "v?([0-9]+)(\\..*)?" nvmrcVersion;
        nodeMajor =
          if versionMatch == null then
            throw "Unsupported .nvmrc value: ${nvmrcVersion}. Expected a major version like 22 or v22."
          else
            builtins.elemAt versionMatch 0;
        nodePackage = lib.attrByPath [ "nodejs_${nodeMajor}" ] pkgs.nodejs pkgs;
      in
      {
        devShells.default = pkgs.mkShell {
          packages = [
            nodePackage
            pkgs.pnpm
          ];

          shellHook = ''
            echo "Using Node $(node -v) from .nvmrc (${nvmrcVersion})"
            echo "Using pnpm $(pnpm -v)"
          '';
        };
      }
    );
}
