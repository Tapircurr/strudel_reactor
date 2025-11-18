import React from 'react';
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";

export const UseD3 = (renderChartFn, dependencies) => {
    const ref = React.useRef();

    React.useEffect(() => {
        renderChartFn(d3.select(ref.current));
        return () => { };
    }, dependencies);
    return ref;
}