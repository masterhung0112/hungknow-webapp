/** Returns whether `process.env.NODE_ENV` exists and equals `env`. */
export function isNodeEnv(env: string) {
    return typeof process !== "undefined" && process.env && process.env.NODE_ENV === env;
}