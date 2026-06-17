import type { NytlexConfigFunction } from 'nytlex';

const nytlexConfig: NytlexConfigFunction = (phase, { defaultConfig }) => {
    return {
        ...defaultConfig,
        port: 2575,
    };
};

export default nytlexConfig;
