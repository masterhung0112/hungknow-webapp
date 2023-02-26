module.exports = {
    presets: [
        ['@babel/preset-env', {
        }],
        [
            '@babel/preset-react',
            {
                useBuiltIns: true,
            },
        ],
        ['@babel/typescript', {
            isTSX: true,
            allExtensions: true
        }],
    ]
}